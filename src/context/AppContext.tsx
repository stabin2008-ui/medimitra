import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { 
  PageId, 
  UserRole, 
  Medicine, 
  TimelineEvent, 
  HelpAlert, 
  LinkedPatient, 
  UserProfile, 
  LanguageCode, 
  HealthCheckState,
  RegisteredAccount
} from '../types';
import { INITIAL_MEDICINES, INITIAL_TIMELINE, INITIAL_PATIENTS, INITIAL_ALERTS } from '../data/mockData';
import { getTranslation } from '../i18n/translations';
import { isFirebaseConfigured, auth, googleProvider, signInWithPopup, firebaseSignOut } from '../services/firebase';

interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export const DEFAULT_PATIENT_USER: UserProfile = {
  id: 'user-ramesh',
  name: 'Ramesh Kumar',
  email: 'ramesh.kumar@example.com',
  role: 'patient',
  avatar: '/assets/avatar_ramesh.jpg',
  ageGender: '64 yrs, Male',
  isDemoUser: true,
};

export const DEFAULT_CAREGIVER_USER: UserProfile = {
  id: 'user-anitha',
  name: 'Anitha Sharma',
  email: 'anitha.care@example.com',
  role: 'caregiver',
  avatar: '/assets/avatar_anitha.jpg',
  relation: 'Daughter / Primary Caregiver',
  isDemoUser: true,
};

const DEFAULT_HEALTH_CHECK: HealthCheckState = {
  enabled: true,
  reminderTime: '09:00 AM',
  lastCheckInDate: null,
  status: 'pending',
};

interface AppContextType {
  // Navigation & Language
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;

  // User Profile & Authentication
  currentUser: UserProfile;
  userRole: UserRole;
  registerUser: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  switchToPatient: () => void;
  switchToCaregiver: () => void;

  // Medication, Timeline & Inventory State
  medicines: Medicine[];
  timeline: TimelineEvent[];
  alerts: HelpAlert[];
  patients: LinkedPatient[];
  activePatientId: string;
  setActivePatientId: (id: string) => void;

  // Daily Health Check-Up (Issue 4)
  healthCheck: HealthCheckState;
  completeHealthCheck: (feeling: 'great' | 'okay' | 'need_help') => void;
  snoozeHealthCheck: () => void;
  updateHealthCheckSettings: (enabled: boolean, reminderTime: string) => void;

  // Emergency Call Dialog (Issue 5)
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  openEmergencyModal: () => void;

  // Modals & Notifications
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isAlertsDrawerOpen: boolean;
  setIsAlertsDrawerOpen: (open: boolean) => void;

  // Domain Actions
  markAsTaken: (medicineId: string) => void;
  snoozeReminder: (medicineId: string, minutes: number) => void;
  sendHelpRequest: (medicineId?: string, reason?: string) => void;
  updateStock: (medicineId: string, newTablets: number) => void;
  addMedicine: (medicine: Omit<Medicine, 'id' | 'estimatedDaysLeft' | 'isLowStock' | 'isVeryLow' | 'status'>) => void;
  editMedicine: (medicine: Medicine) => void;
  deleteMedicine: (medicineId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper function to safely hash passwords in browser Web Crypto API
async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language State with persistence
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('medimitra_language');
    return (saved === 'kn' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('medimitra_language', lang);
  };

  const t = useCallback((key: string, fallback?: string): string => {
    return getTranslation(key, language, fallback);
  }, [language]);

  // Page Routing & Modals
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Active User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('medimitra_active_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return DEFAULT_PATIENT_USER;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => currentUser.role);
  const [activePatientId, setActivePatientId] = useState<string>('patient-ramesh');

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToast({ id, message, type });
  }, []);

  // Compute storage key partitioned strictly by user ID
  const getUserStorageKey = useCallback((dataset: string) => {
    if (currentUser.id === DEFAULT_PATIENT_USER.id) {
      return `medimitra_demo_ramesh_${dataset}`;
    }
    if (currentUser.id === DEFAULT_CAREGIVER_USER.id) {
      return `medimitra_demo_anitha_${dataset}`;
    }
    return `medimitra_usr_${currentUser.id}_${dataset}`;
  }, [currentUser.id]);

  // Load user-specific datasets
  const loadUserMedicines = useCallback((): Medicine[] => {
    const key = getUserStorageKey('medicines');
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    // Demo accounts receive demo medicines; new users start with their own empty prescription list
    return currentUser.isDemoUser ? INITIAL_MEDICINES : [];
  }, [getUserStorageKey, currentUser.isDemoUser]);

  const loadUserTimeline = useCallback((): TimelineEvent[] => {
    const key = getUserStorageKey('timeline');
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return currentUser.isDemoUser ? INITIAL_TIMELINE : [];
  }, [getUserStorageKey, currentUser.isDemoUser]);

  const loadUserAlerts = useCallback((): HelpAlert[] => {
    const key = getUserStorageKey('alerts');
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return currentUser.isDemoUser ? INITIAL_ALERTS : [];
  }, [getUserStorageKey, currentUser.isDemoUser]);

  const loadUserHealthCheck = useCallback((): HealthCheckState => {
    const key = getUserStorageKey('health_check');
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed: HealthCheckState = JSON.parse(saved);
        const today = new Date().toISOString().slice(0, 10);
        // Automatic daily reset: if checked in on a previous day, reset status to pending for today!
        if (parsed.lastCheckInDate && parsed.lastCheckInDate !== today) {
          return { ...parsed, status: 'pending', feeling: undefined };
        }
        return parsed;
      } catch { /* fallback */ }
    }
    return DEFAULT_HEALTH_CHECK;
  }, [getUserStorageKey]);

  const [medicines, setMedicines] = useState<Medicine[]>(loadUserMedicines);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(loadUserTimeline);
  const [alerts, setAlerts] = useState<HelpAlert[]>(loadUserAlerts);
  const [healthCheck, setHealthCheck] = useState<HealthCheckState>(loadUserHealthCheck);
  const [patients] = useState<LinkedPatient[]>(INITIAL_PATIENTS);

  // Sync state when currentUser changes (e.g. logging into another account)
  useEffect(() => {
    setUserRole(currentUser.role);
    localStorage.setItem('medimitra_active_user', JSON.stringify(currentUser));
    setMedicines(loadUserMedicines());
    setTimeline(loadUserTimeline());
    setAlerts(loadUserAlerts());
    setHealthCheck(loadUserHealthCheck());
  }, [currentUser, loadUserMedicines, loadUserTimeline, loadUserAlerts, loadUserHealthCheck]);

  // Persist datasets to user's isolated storage
  useEffect(() => {
    localStorage.setItem(getUserStorageKey('medicines'), JSON.stringify(medicines));
  }, [medicines, getUserStorageKey]);

  useEffect(() => {
    localStorage.setItem(getUserStorageKey('timeline'), JSON.stringify(timeline));
  }, [timeline, getUserStorageKey]);

  useEffect(() => {
    localStorage.setItem(getUserStorageKey('alerts'), JSON.stringify(alerts));
  }, [alerts, getUserStorageKey]);

  useEffect(() => {
    localStorage.setItem(getUserStorageKey('health_check'), JSON.stringify(healthCheck));
  }, [healthCheck, getUserStorageKey]);

  // --- Registration & Authentication Handlers (Issue 2 & Issue 3) ---

  const getAccountsRegistry = (): RegisteredAccount[] => {
    const raw = localStorage.getItem('medimitra_registered_accounts');
    if (raw) {
      try { return JSON.parse(raw); } catch { /* fallback */ }
    }
    return [];
  };

  const registerUser = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const accounts = getAccountsRegistry();

    // Prevent duplicate accounts
    if (
      accounts.some((acc) => acc.email.toLowerCase() === trimmedEmail) ||
      trimmedEmail === DEFAULT_PATIENT_USER.email.toLowerCase() ||
      trimmedEmail === DEFAULT_CAREGIVER_USER.email.toLowerCase()
    ) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const passwordHash = await hashPassword(password);
    const newUid = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const newProfile: RegisteredAccount = {
      id: newUid,
      name: name.trim(),
      email: trimmedEmail,
      role,
      avatar: role === 'patient' ? '/assets/avatar_ramesh.jpg' : '/assets/avatar_anitha.jpg',
      ageGender: role === 'patient' ? 'Patient' : 'Caregiver',
      isDemoUser: false,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    // Save to accounts registry (never storing plaintext password)
    accounts.push(newProfile);
    localStorage.setItem('medimitra_registered_accounts', JSON.stringify(accounts));

    // Sign in the newly created user with their fresh, isolated account
    setCurrentUser(newProfile);
    setUserRole(role);

    return { success: true };
  };

  const loginUser = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check demo accounts
    if (trimmedEmail === DEFAULT_PATIENT_USER.email.toLowerCase()) {
      setCurrentUser(DEFAULT_PATIENT_USER);
      setUserRole('patient');
      return { success: true };
    }
    if (trimmedEmail === DEFAULT_CAREGIVER_USER.email.toLowerCase()) {
      setCurrentUser(DEFAULT_CAREGIVER_USER);
      setUserRole('caregiver');
      return { success: true };
    }

    // Check registered accounts
    const accounts = getAccountsRegistry();
    const userAcc = accounts.find((a) => a.email.toLowerCase() === trimmedEmail);

    if (!userAcc) {
      return { success: false, error: 'No account found with this email. Please check your credentials or create an account.' };
    }

    const inputHash = await hashPassword(password);
    if (userAcc.passwordHash && userAcc.passwordHash !== inputHash) {
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    // Load registered user's distinct profile
    setCurrentUser(userAcc);
    setUserRole(userAcc.role);
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return {
        success: false,
        error: 'Google Sign-In requires active Firebase credentials. Please configure VITE_FIREBASE_API_KEY in .env and enable Google Sign-In in Firebase Console. (For offline local testing, please register a new account or use demo persona).'
      };
    }

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const googleUser = res.user;
      
      const accounts = getAccountsRegistry();
      let appUser = accounts.find((a) => a.id === googleUser.uid || a.email.toLowerCase() === (googleUser.email || '').toLowerCase());

      if (!appUser) {
        // Create new isolated Google user
        appUser = {
          id: googleUser.uid,
          name: googleUser.displayName || 'Google User',
          email: googleUser.email || '',
          role: 'patient',
          avatar: googleUser.photoURL || '/assets/avatar_ramesh.jpg',
          isDemoUser: false,
          createdAt: new Date().toISOString(),
        };
        accounts.push(appUser);
        localStorage.setItem('medimitra_registered_accounts', JSON.stringify(accounts));
      }

      setCurrentUser(appUser);
      setUserRole(appUser.role);
      return { success: true };
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Google sign-in popup was closed before completion.' };
      }
      if (errorObj?.code === 'auth/unauthorized-domain') {
        return { success: false, error: 'Current domain is not authorized in Firebase Authentication Console.' };
      }
      return { success: false, error: errorObj?.message || 'Google authentication failed.' };
    }
  };

  const logoutUser = () => {
    if (isFirebaseConfigured && auth) {
      firebaseSignOut(auth).catch(() => {});
    }
    // Return to default patient demo or clean guest state
    setCurrentUser(DEFAULT_PATIENT_USER);
    setUserRole('patient');
    setCurrentPage('landing');
    showToast('Logged out successfully.', 'info');
  };

  const switchToPatient = () => {
    setCurrentUser(DEFAULT_PATIENT_USER);
    setUserRole('patient');
    setCurrentPage('dashboard');
    showToast('Switched to Patient view (Ramesh Kumar)', 'info');
  };

  const switchToCaregiver = () => {
    setCurrentUser(DEFAULT_CAREGIVER_USER);
    setUserRole('caregiver');
    setCurrentPage('caregiver');
    showToast('Switched to Caregiver view (Anitha Sharma)', 'info');
  };

  // --- Daily Health Check-Up (Issue 4) ---

  const completeHealthCheck = (feeling: 'great' | 'okay' | 'need_help') => {
    const today = new Date().toISOString().slice(0, 10);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setHealthCheck((prev) => ({
      ...prev,
      lastCheckInDate: today,
      status: 'completed',
      feeling,
      completedAt: timeStr,
    }));

    // Record health check-in to patient timeline
    const feelingLabel = feeling === 'great' ? 'Feeling Good' : feeling === 'okay' ? 'Feeling Okay' : 'Reported Difficulty / Needs Assistance';
    const newEvent: TimelineEvent = {
      id: `health-check-${Date.now()}`,
      dateGroup: 'Today',
      time: timeStr,
      title: 'Daily Health Check-up',
      status: feeling === 'need_help' ? 'Help' : 'Taken',
      description: `Daily wellness response: ${feelingLabel}.`,
    };
    setTimeline((prev) => [newEvent, ...prev]);

    if (feeling === 'need_help') {
      sendHelpRequest(undefined, 'Patient indicated needing assistance during Daily Health Check-up');
    }

    showToast(t('checkInRecordedMessage', 'Daily health check-in recorded successfully!'), 'success');
  };

  const snoozeHealthCheck = () => {
    setHealthCheck((prev) => ({ ...prev, status: 'snoozed' }));
    showToast('Health check-in snoozed for 1 hour.', 'info');
  };

  const updateHealthCheckSettings = (enabled: boolean, reminderTime: string) => {
    setHealthCheck((prev) => ({ ...prev, enabled, reminderTime }));
    showToast('Health check reminder preferences updated.', 'success');
  };

  // --- Medication Domain Actions ---

  const markAsTaken = (medicineId: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let takenMedName = 'Medicine';

    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medicineId) {
          takenMedName = med.name;
          const newTablets = Math.max(0, med.tabletsLeft - med.dailyDose);
          const daysLeft = Math.floor(newTablets / (med.dailyDose || 1));
          return {
            ...med,
            status: 'Taken',
            tabletsLeft: newTablets,
            estimatedDaysLeft: daysLeft,
            isLowStock: newTablets <= 10,
            isVeryLow: newTablets <= 5,
            lastTakenTime: now,
          };
        }
        return med;
      })
    );

    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      dateGroup: 'Today',
      time: now,
      title: `${takenMedName} dose confirmed`,
      medicineName: takenMedName,
      status: 'Taken',
      description: `Confirmed on time by ${currentUser.name}.`,
    };
    setTimeline((prev) => [newEvent, ...prev]);

    showToast(`${takenMedName} recorded as taken!`, 'success');
  };

  const snoozeReminder = (medicineId: string, minutes: number) => {
    const med = medicines.find((m) => m.id === medicineId);
    const medName = med ? med.name : 'Medicine';
    
    setMedicines((prev) =>
      prev.map((m) => (m.id === medicineId ? { ...m, status: 'Snoozed' } : m))
    );

    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      dateGroup: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `${medName} reminder snoozed`,
      medicineName: medName,
      status: 'Pending',
      description: `Postponed by ${minutes} minutes.`,
    };
    setTimeline((prev) => [newEvent, ...prev]);

    showToast(`Reminder postponed for ${minutes} minutes.`, 'warning');
  };

  const sendHelpRequest = (medicineId?: string, reason?: string) => {
    const med = medicineId ? medicines.find((m) => m.id === medicineId) : undefined;
    const medName = med ? med.name : 'Medication Routine';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAlert: HelpAlert = {
      id: `alert-${Date.now()}`,
      patientName: currentUser.name,
      patientId: currentUser.id,
      time: now,
      message: reason || `Patient requested urgent assistance with ${medName}.`,
      acknowledged: false,
      severity: 'urgent',
    };
    setAlerts((prev) => [newAlert, ...prev]);

    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      dateGroup: 'Today',
      time: now,
      title: `Emergency help request: ${medName}`,
      medicineName: medName,
      status: 'Help',
      description: reason || 'Urgent assistance dispatched to caregiver.',
    };
    setTimeline((prev) => [newEvent, ...prev]);

    showToast('Urgent alert sent to caregiver Anitha Sharma.', 'error');
  };

  const updateStock = (medicineId: string, newTablets: number) => {
    let updatedMedName = 'Medicine';
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medicineId) {
          updatedMedName = med.name;
          const daysLeft = Math.floor(newTablets / (med.dailyDose || 1));
          return {
            ...med,
            tabletsLeft: newTablets,
            estimatedDaysLeft: daysLeft,
            isLowStock: newTablets <= 10,
            isVeryLow: newTablets <= 5,
          };
        }
        return med;
      })
    );

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      dateGroup: 'Today',
      time: now,
      title: `Refill updated: ${updatedMedName}`,
      medicineName: updatedMedName,
      status: 'Refill',
      description: `Stock updated to ${newTablets} tablets.`,
      isStockEvent: true,
    };
    setTimeline((prev) => [newEvent, ...prev]);

    showToast(`Stock updated for ${updatedMedName}.`, 'success');
  };

  const addMedicine = (
    newMed: Omit<Medicine, 'id' | 'estimatedDaysLeft' | 'isLowStock' | 'isVeryLow' | 'status'>
  ) => {
    const id = `med-${Date.now()}`;
    const daysLeft = Math.floor(newMed.tabletsLeft / (newMed.dailyDose || 1));
    const created: Medicine = {
      ...newMed,
      id,
      estimatedDaysLeft: daysLeft,
      isLowStock: newMed.tabletsLeft <= 10,
      isVeryLow: newMed.tabletsLeft <= 5,
      status: 'Pending',
    };

    setMedicines((prev) => [created, ...prev]);
    showToast(`Added ${newMed.name} to prescriptions.`, 'success');
  };

  const editMedicine = (updated: Medicine) => {
    const daysLeft = Math.floor(updated.tabletsLeft / (updated.dailyDose || 1));
    const normalized: Medicine = {
      ...updated,
      estimatedDaysLeft: daysLeft,
      isLowStock: updated.tabletsLeft <= 10,
      isVeryLow: updated.tabletsLeft <= 5,
    };

    setMedicines((prev) => prev.map((m) => (m.id === updated.id ? normalized : m)));
    showToast(`Updated prescription: ${updated.name}`, 'success');
  };

  const deleteMedicine = (medicineId: string) => {
    const target = medicines.find((m) => m.id === medicineId);
    const medName = target ? target.name : 'Medicine';
    setMedicines((prev) => prev.filter((m) => m.id !== medicineId));
    showToast(`Deleted ${medName}.`, 'info');
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    showToast('Alert acknowledged.', 'info');
  };

  const resetAllData = () => {
    localStorage.removeItem(getUserStorageKey('medicines'));
    localStorage.removeItem(getUserStorageKey('timeline'));
    localStorage.removeItem(getUserStorageKey('alerts'));
    localStorage.removeItem(getUserStorageKey('health_check'));
    setMedicines(currentUser.isDemoUser ? INITIAL_MEDICINES : []);
    setTimeline(currentUser.isDemoUser ? INITIAL_TIMELINE : []);
    setAlerts(currentUser.isDemoUser ? INITIAL_ALERTS : []);
    setHealthCheck(DEFAULT_HEALTH_CHECK);
    showToast('User data reset to default.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        t,
        currentUser,
        userRole,
        registerUser,
        loginUser,
        loginWithGoogle,
        logoutUser,
        switchToPatient,
        switchToCaregiver,
        medicines,
        timeline,
        alerts,
        patients,
        activePatientId,
        setActivePatientId,
        healthCheck,
        completeHealthCheck,
        snoozeHealthCheck,
        updateHealthCheckSettings,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        openEmergencyModal: () => setIsEmergencyModalOpen(true),
        toast,
        showToast,
        isSettingsOpen,
        setIsSettingsOpen,
        isAlertsDrawerOpen,
        setIsAlertsDrawerOpen,
        markAsTaken,
        snoozeReminder,
        sendHelpRequest,
        updateStock,
        addMedicine,
        editMedicine,
        deleteMedicine,
        acknowledgeAlert,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
