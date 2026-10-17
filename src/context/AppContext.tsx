import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PageId, UserRole, Medicine, TimelineEvent, HelpAlert, LinkedPatient, UserProfile } from '../types';
import { INITIAL_MEDICINES, INITIAL_TIMELINE, INITIAL_PATIENTS, INITIAL_ALERTS } from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const DEFAULT_PATIENT_USER: UserProfile = {
  id: 'user-ramesh',
  name: 'Ramesh Kumar',
  email: 'ramesh.kumar@example.com',
  role: 'patient',
  avatar: '/assets/avatar_ramesh.jpg',
  ageGender: '64 yrs, Male',
};

const DEFAULT_CAREGIVER_USER: UserProfile = {
  id: 'user-anitha',
  name: 'Anitha Sharma',
  email: 'anitha.care@example.com',
  role: 'caregiver',
  avatar: '/assets/avatar_anitha.jpg',
  relation: 'Daughter / Primary Caregiver',
};

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  medicines: Medicine[];
  timeline: TimelineEvent[];
  alerts: HelpAlert[];
  patients: LinkedPatient[];
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isAlertsDrawerOpen: boolean;
  setIsAlertsDrawerOpen: (open: boolean) => void;
  markAsTaken: (medicineId: string) => void;
  snoozeReminder: (medicineId: string, minutes: number) => void;
  sendHelpRequest: (medicineId?: string, reason?: string) => void;
  updateStock: (medicineId: string, newTablets: number) => void;
  addMedicine: (medicine: Omit<Medicine, 'id' | 'estimatedDaysLeft' | 'isLowStock' | 'isVeryLow' | 'status'>) => void;
  editMedicine: (medicine: Medicine) => void;
  deleteMedicine: (medicineId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  resetAllData: () => void;
  switchToPatient: () => void;
  switchToCaregiver: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_PATIENT_USER);
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [activePatientId, setActivePatientId] = useState<string>('patient-ramesh');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('medimitra_medicines');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_MEDICINES;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('medimitra_timeline');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_TIMELINE;
  });

  const [alerts, setAlerts] = useState<HelpAlert[]>(() => {
    const saved = localStorage.getItem('medimitra_alerts');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_ALERTS;
  });

  const [patients] = useState<LinkedPatient[]>(INITIAL_PATIENTS);

  useEffect(() => {
    localStorage.setItem('medimitra_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('medimitra_timeline', JSON.stringify(timeline));
  }, [timeline]);

  useEffect(() => {
    localStorage.setItem('medimitra_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const markAsTaken = (medicineId: string) => {
    const med = medicines.find((m) => m.id === medicineId);
    if (!med) return;

    if (med.status === 'Taken') {
      showToast(`${med.name} is already recorded as taken for this scheduled slot.`, 'info');
      return;
    }

    const newStock = Math.max(0, med.tabletsLeft - 1);
    const newDaysLeft = med.dailyDose > 0 ? Math.floor(newStock / med.dailyDose) : 0;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    setMedicines((prev) =>
      prev.map((item) =>
        item.id === medicineId
          ? {
              ...item,
              status: 'Taken',
              tabletsLeft: newStock,
              estimatedDaysLeft: newDaysLeft,
              isLowStock: newStock <= 10,
              isVeryLow: newStock <= 5,
              lastTakenTime: nowTime,
            }
          : item
      )
    );

    // Update timeline
    setTimeline((prev) => [
      {
        id: `t-${Date.now()}`,
        dateGroup: 'Today',
        time: nowTime,
        title: med.name,
        medicineName: med.name,
        status: 'Taken',
        description: `Confirmed dose at ${nowTime}`,
      },
      ...prev.filter((item) => !(item.dateGroup === 'Today' && item.medicineName === med.name && item.status === 'Pending')),
    ]);

    showToast(`Dose recorded! ${med.name} marked as Taken. (${newStock} tablets remaining)`, 'success');
  };

  const snoozeReminder = (medicineId: string, minutes: number) => {
    const med = medicines.find((m) => m.id === medicineId);
    if (!med) return;

    setMedicines((prev) =>
      prev.map((item) =>
        item.id === medicineId
          ? { ...item, status: 'Snoozed' }
          : item
      )
    );

    showToast(`Reminder snoozed for ${minutes} minutes. We will prompt you again shortly.`, 'warning');
  };

  const sendHelpRequest = (medicineId?: string, reason?: string) => {
    const med = medicineId ? medicines.find((m) => m.id === medicineId) : null;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    const newAlert: HelpAlert = {
      id: `alert-${Date.now()}`,
      patientName: 'Ramesh',
      patientId: 'patient-ramesh',
      time: nowTime,
      message: reason || (med ? `Needs assistance with ${med.name} (${med.instructions})` : 'Requested assistance from caregiver'),
      acknowledged: false,
      severity: 'urgent',
    };

    setAlerts((prev) => [newAlert, ...prev]);
    showToast(`Urgent alert sent to caregiver Anitha. Help is on the way!`, 'error');
  };

  const updateStock = (medicineId: string, newTablets: number) => {
    const med = medicines.find((m) => m.id === medicineId);
    if (!med) return;

    const validatedCount = Math.max(0, newTablets);
    const newDaysLeft = med.dailyDose > 0 ? Math.floor(validatedCount / med.dailyDose) : 0;
    const isLow = validatedCount <= 10;
    const isVery = validatedCount <= 5;

    setMedicines((prev) =>
      prev.map((item) =>
        item.id === medicineId
          ? {
              ...item,
              tabletsLeft: validatedCount,
              estimatedDaysLeft: newDaysLeft,
              isLowStock: isLow,
              isVeryLow: isVery,
            }
          : item
      )
    );

    // Record stock event in timeline
    setTimeline((prev) => [
      {
        id: `stock-${Date.now()}`,
        dateGroup: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        title: 'Stock updated by Ramesh',
        medicineName: med.name,
        isStockEvent: true,
        status: 'Refill',
        description: `Inventory adjusted to ${validatedCount} tablets (~${newDaysLeft} days remaining)`,
      },
      ...prev,
    ]);

    showToast(`Stock updated for ${med.name}: ${validatedCount} tablets (~${newDaysLeft} days remaining)`, 'success');
  };

  const addMedicine = (medData: Omit<Medicine, 'id' | 'estimatedDaysLeft' | 'isLowStock' | 'isVeryLow' | 'status'>) => {
    const daysLeft = medData.dailyDose > 0 ? Math.floor(medData.tabletsLeft / medData.dailyDose) : 0;
    const newMed: Medicine = {
      ...medData,
      id: `med-${Date.now()}`,
      estimatedDaysLeft: daysLeft,
      isLowStock: medData.tabletsLeft <= 10,
      isVeryLow: medData.tabletsLeft <= 5,
      status: 'Pending',
    };

    setMedicines((prev) => [...prev, newMed]);
    showToast(`Added ${newMed.name} to your schedule.`, 'success');
  };

  const editMedicine = (updatedMed: Medicine) => {
    const daysLeft = updatedMed.dailyDose > 0 ? Math.floor(updatedMed.tabletsLeft / updatedMed.dailyDose) : 0;
    const isLow = updatedMed.tabletsLeft <= 10;
    const isVery = updatedMed.tabletsLeft <= 5;

    setMedicines((prev) =>
      prev.map((m) =>
        m.id === updatedMed.id
          ? {
              ...updatedMed,
              estimatedDaysLeft: daysLeft,
              isLowStock: isLow,
              isVeryLow: isVery,
            }
          : m
      )
    );
    showToast(`Updated instructions for ${updatedMed.name}.`, 'success');
  };

  const deleteMedicine = (medicineId: string) => {
    const med = medicines.find((m) => m.id === medicineId);
    setMedicines((prev) => prev.filter((m) => m.id !== medicineId));
    showToast(`Removed ${med?.name || 'medicine'} from your active routine.`, 'info');
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    showToast('Alert marked as acknowledged by caregiver.', 'info');
  };

  const resetAllData = () => {
    localStorage.removeItem('medimitra_medicines');
    localStorage.removeItem('medimitra_timeline');
    localStorage.removeItem('medimitra_alerts');
    setMedicines(INITIAL_MEDICINES);
    setTimeline(INITIAL_TIMELINE);
    setAlerts(INITIAL_ALERTS);
    showToast('Reset sample data back to exact reference values.', 'info');
  };

  const switchToPatient = () => {
    setCurrentUser(DEFAULT_PATIENT_USER);
    setUserRole('patient');
    setCurrentPage('dashboard');
    showToast('Switched to Patient view (Ramesh Kumar).', 'info');
  };

  const switchToCaregiver = () => {
    setCurrentUser(DEFAULT_CAREGIVER_USER);
    setUserRole('caregiver');
    setCurrentPage('caregiver');
    showToast('Switched to Caregiver view (Anitha Sharma).', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        medicines,
        timeline,
        alerts,
        patients,
        activePatientId,
        setActivePatientId,
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
        switchToPatient,
        switchToCaregiver,
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
