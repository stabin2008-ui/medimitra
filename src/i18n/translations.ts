/**
 * MediMitra CareLoop — Centralized Translation System (i18n)
 * Supports English ('en') and Kannada ('kn')
 */

export type LanguageCode = 'en' | 'kn';

export interface Translations {
  [key: string]: {
    en: string;
    kn: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & Common
  brandName: {
    en: 'MediMitra CareLoop',
    kn: 'ಮೆಡಿಮಿತ್ರ ಕೇರ್‌ಲೂಪ್',
  },
  tagline: {
    en: 'Better medicine routines. Stronger care connections.',
    kn: 'ಉತ್ತಮ ಔಷಧಿ ದಿನಚರಿ. ಬಲವಾದ ಆರೈಕೆಯ ಸಂಬಂಧಗಳು.',
  },
  home: {
    en: 'Home',
    kn: 'ಮುಖಪುಟ',
  },
  features: {
    en: 'Features',
    kn: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
  },
  howItWorks: {
    en: 'How It Works',
    kn: 'ಕಾರ್ಯವಿಧಾನ',
  },
  safety: {
    en: 'Safety',
    kn: 'ಸುರಕ್ಷತೆ',
  },
  contact: {
    en: 'Contact',
    kn: 'ಸಂಪರ್ಕ',
  },
  signIn: {
    en: 'Sign In',
    kn: 'ಲಾಗಿನ್ ಮಾಡಿ',
  },
  getStarted: {
    en: 'Get Started',
    kn: 'ಪ್ರಾರಂಭಿಸಿ',
  },
  logout: {
    en: 'Logout',
    kn: 'ಲಾಗ್ ಔಟ್',
  },
  cancel: {
    en: 'Cancel',
    kn: 'ರದ್ದುಮಾಡಿ',
  },
  save: {
    en: 'Save',
    kn: 'ಉಳಿಸಿ',
  },
  saveChanges: {
    en: 'Save Changes',
    kn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
  },
  delete: {
    en: 'Delete',
    kn: 'ಅಳಿಸಿ',
  },
  edit: {
    en: 'Edit',
    kn: 'ಬದಲಾಯಿಸಿ',
  },
  viewAll: {
    en: 'View All',
    kn: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
  },
  or: {
    en: 'or',
    kn: 'ಅಥವಾ',
  },

  // Landing Page
  heroBadge: {
    en: 'Smart Healthcare & Caregiver Support',
    kn: 'ಸ್ಮಾರ್ಟ್ ಆರೋಗ್ಯ ಸೇವೆ ಮತ್ತು ಆರೈಕೆ ಬೆಂಬಲ',
  },
  heroHeadingLine1: {
    en: 'Better medicine routines.',
    kn: 'ಉತ್ತಮ ಔಷಧಿ ದಿನಚರಿ.',
  },
  heroHeadingLine2: {
    en: 'Stronger care connections.',
    kn: 'ಬಲವಾದ ಆರೈಕೆಯ ಸಂಬಂಧಗಳು.',
  },
  heroDescription: {
    en: 'Designed with love for seniors and their families. Timely visual reminders, zero double-doses, and real-time peace of mind for loved ones across the country.',
    kn: 'ಹಿರಿಯರು ಮತ್ತು ಅವರ ಕುಟುಂಬಗಳಿಗೆ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ನೆನಪಿಸುವಿಕೆ, ಡಬಲ್-ಡೋಸ್ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಕುಟುಂಬಸ್ಥರಿಗೆ ಮನಸ್ಸಿನ ನೆಮ್ಮದಿ.',
  },
  startFreeCareLoop: {
    en: 'Start Free CareLoop',
    kn: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
  },
  exploreFeatures: {
    en: 'Explore Features',
    kn: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ',
  },
  stepReminderTitle: {
    en: 'Visual Reminder',
    kn: 'ಸ್ಪಷ್ಟ ದೃಶ್ಯ ಜ್ಞಾಪನೆ',
  },
  stepReminderDesc: {
    en: 'Clear photos of exact medicines at prescribed dosage times.',
    kn: 'ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಔಷಧಿಗಳ ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳು.',
  },
  stepConfirmTitle: {
    en: 'One-Tap Confirmation',
    kn: 'ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ದೃಢೀಕರಣ',
  },
  stepConfirmDesc: {
    en: 'Senior confirms dose taken with large, accessible buttons.',
    kn: 'ದೊಡ್ಡ ಬಟನ್‌ಗಳ ಮೂಲಕ ಹಿರಿಯರು ಸುಲಭವಾಗಿ ಔಷಧಿ ಸೇವನೆಯನ್ನು ದೃಢೀಕರಿಸಬಹುದು.',
  },
  stepAlertTitle: {
    en: 'Caregiver Peace of Mind',
    kn: 'ಆರೈಕೆದಾರರಿಗೆ ಸಮಾಧಾನ',
  },
  stepAlertDesc: {
    en: 'Daughter or caregiver receives live notification and stock tracking.',
    kn: 'ಕುಟುಂಬಸ್ಥರು ಅಥವಾ ಆರೈಕೆದಾರರಿಗೆ ತಕ್ಷಣದ ಮಾಹಿತಿ ಮತ್ತು ಸ್ಟಾಕ್ ವಿವರ ದೊರೆಯುತ್ತದೆ.',
  },
  feature1Title: {
    en: 'Smart Reminders',
    kn: 'ಸ್ಮಾರ್ಟ್ ಜ್ಞಾಪನೆಗಳು',
  },
  feature1Desc: {
    en: 'Gentle, clear alerts at breakfast, lunch, and dinner with high-contrast pill imagery.',
    kn: 'ಉಪಾಹಾರ, ಊಟ ಮತ್ತು ರಾತ್ರಿಯ ಊಟದ ಸಮಯದಲ್ಲಿ ಸ್ಪಷ್ಟ ಮತ್ತು ಸೌಮ್ಯವಾದ ಎಚ್ಚರಿಕೆಗಳು.',
  },
  feature2Title: {
    en: 'CareLoop Alerts',
    kn: 'ಕೇರ್‌ಲೂಪ್ ಎಚ್ಚರಿಕೆಗಳು',
  },
  feature2Desc: {
    en: 'Family members get instant visibility into medication adherence and urgent help requests.',
    kn: 'ಕುಟುಂಬ ಸದಸ್ಯರಿಗೆ ಔಷಧಿ ಸೇವನೆ ಮತ್ತು ತುರ್ತು ಸಹಾಯ ವಿನಂತಿಗಳ ತ್ವರಿತ ಅರಿವು.',
  },
  feature3Title: {
    en: 'Refill Tracking',
    kn: 'ಸ್ಟಾಕ್ ಮತ್ತು ಮರುಪೂರಣ',
  },
  feature3Desc: {
    en: 'Predictive inventory countdown warns you days before tablets run out so refills are never late.',
    kn: 'ಮಾತ್ರೆಗಳು ಖಾಲಿಯಾಗುವ ಮುನ್ನವೇ ಎಚ್ಚರಿಕೆ ನೀಡಿ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಔಷಧಿ ತರಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
  },

  // Auth: Login & Sign Up
  welcomeBack: {
    en: 'Welcome Back!',
    kn: 'ಮರಳಿ ಸ್ವಾಗತ!',
  },
  loginSubtitle: {
    en: 'Please sign in to access your MediMitra CareLoop dashboard',
    kn: 'ನಿಮ್ಮ ಮೆಡಿಮಿತ್ರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ',
  },
  emailLabel: {
    en: 'Email Address',
    kn: 'ಇಮೇಲ್ ವಿಳಾಸ',
  },
  passwordLabel: {
    en: 'Password',
    kn: 'ಪಾಸ್‌ವರ್ಡ್',
  },
  confirmPasswordLabel: {
    en: 'Confirm Password',
    kn: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
  },
  fullNameLabel: {
    en: 'Full Name',
    kn: 'ಪೂರ್ಣ ಹೆಸರು',
  },
  rememberMe: {
    en: 'Remember Me',
    kn: 'ನನ್ನನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ',
  },
  forgotPassword: {
    en: 'Forgot Password?',
    kn: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
  },
  signInButton: {
    en: 'Sign In',
    kn: 'ಸೈನ್ ಇನ್',
  },
  signInWithGoogle: {
    en: 'Sign in with Google',
    kn: 'Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ',
  },
  noAccountPrompt: {
    en: "Don't have an account?",
    kn: 'ಖಾತೆ ಇಲ್ಲವೇ?',
  },
  createAccountLink: {
    en: 'Create Account',
    kn: 'ಹೊಸ ಖಾತೆ ರಚಿಸಿ',
  },
  createAccountTitle: {
    en: 'Create Your Account',
    kn: 'ನಿಮ್ಮ ಹೊಸ ಖಾತೆ ರಚಿಸಿ',
  },
  signUpSubtitle: {
    en: 'Join MediMitra CareLoop to protect routines and connect with loved ones',
    kn: 'ಔಷಧಿ ದಿನಚರಿ ಕಾಪಾಡಲು ಮತ್ತು ಕುಟುಂಬವನ್ನು ಸಂಪರ್ಕಿಸಲು ಮೆಡಿಮಿತ್ರ ಸೇರಿ',
  },
  accountTypeLabel: {
    en: 'Account Type',
    kn: 'ಖಾತೆಯ ಪ್ರಕಾರ',
  },
  patientRole: {
    en: 'Patient / Senior',
    kn: 'ರೋಗಿ / ಹಿರಿಯ ನಾಗರಿಕರು',
  },
  caregiverRole: {
    en: 'Caregiver / Family',
    kn: 'ಆರೈಕೆದಾರರು / ಕುಟುಂಬಸ್ಥರು',
  },
  agreeTermsText: {
    en: 'I agree to the Terms of Use and Privacy Policy',
    kn: 'ನಾನು ನಿಯಮಗಳು ಮತ್ತು ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು ಒಪ್ಪುತ್ತೇನೆ',
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    kn: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
  },
  quickDemoPersonas: {
    en: 'Quick Demo Personas',
    kn: 'ಡೆಮೊ ಬಳಕೆದಾರರು',
  },

  // Sidebar & Navigation
  sidebarDashboard: {
    en: 'Dashboard',
    kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  sidebarMedicines: {
    en: 'My Medicines',
    kn: 'ನನ್ನ ಔಷಧಿಗಳು',
  },
  sidebarReminders: {
    en: "Today's Reminders",
    kn: 'ಇಂದಿನ ಜ್ಞಾಪನೆಗಳು',
  },
  sidebarHistory: {
    en: 'Medicine History',
    kn: 'ಔಷಧಿ ಇತಿಹಾಸ',
  },
  sidebarStock: {
    en: 'Stock & Refills',
    kn: 'ಸ್ಟಾಕ್ ಮತ್ತು ಮರುಪೂರಣ',
  },
  sidebarCaregivers: {
    en: 'Caregivers',
    kn: 'ಆರೈಕೆದಾರರು',
  },
  sidebarNotifications: {
    en: 'Notifications',
    kn: 'ಸೂಚನೆಗಳು',
  },
  sidebarSettings: {
    en: 'Settings',
    kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  },
  sidebarHelp: {
    en: 'Help & Support',
    kn: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
  },

  // Patient Dashboard
  goodMorning: {
    en: 'Good Morning',
    kn: 'ಶುಭೋದಯ',
  },
  nextReminderCard: {
    en: 'Next Reminder',
    kn: 'ಮುಂದಿನ ಜ್ಞಾಪನೆ',
  },
  medicinesTodayCard: {
    en: 'Medicines Today',
    kn: 'ಇಂದಿನ ಔಷಧಿಗಳು',
  },
  lowStockCard: {
    en: 'Low Stock',
    kn: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
  },
  caregiversCard: {
    en: 'Caregivers',
    kn: 'ಆರೈಕೆದಾರರು',
  },
  todaysScheduleTitle: {
    en: "Today's Schedule",
    kn: 'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ',
  },
  stockOverviewTitle: {
    en: 'Medicine Stock Overview',
    kn: 'ಔಷಧಿ ಸ್ಟಾಕ್ ಅವಲೋಕನ',
  },
  recentActivityTitle: {
    en: 'Recent Activity',
    kn: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
  },

  // Today's Reminder Interface
  nextReminderAt: {
    en: 'Next Reminder',
    kn: 'ಮುಂದಿನ ಜ್ಞಾಪನೆ',
  },
  doseTaken: {
    en: 'Taken',
    kn: 'ತೆಗೆದುಕೊಂಡೆ',
  },
  doseTakenRecorded: {
    en: 'Taken (Recorded)',
    kn: 'ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ',
  },
  remindMeLater: {
    en: 'Remind Me Later',
    kn: 'ನಂತರ ನೆನಪಿಸಿ',
  },
  needHelp: {
    en: 'Need Help',
    kn: 'ಸಹಾಯ ಬೇಕು',
  },
  snoozeOptions: {
    en: 'Snooze Options',
    kn: 'ಸ್ನೂಜ್ ಆಯ್ಕೆಗಳು',
  },
  min15: {
    en: '15 min',
    kn: '15 ನಿಮಿಷ',
  },
  min30: {
    en: '30 min',
    kn: '30 ನಿಮಿಷ',
  },
  hour1: {
    en: '1 hour',
    kn: '1 ಗಂಟೆ',
  },

  // Daily Health Check-Up (Issue 4)
  dailyHealthCheckupTitle: {
    en: 'Daily Health Check-up',
    kn: 'ದೈನಂದಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆ',
  },
  howAreYouFeeling: {
    en: 'How are you feeling today?',
    kn: 'ಇಂದು ನಿಮ್ಮ ಆರೋಗ್ಯ ಹೇಗಿದೆ?',
  },
  feelingGood: {
    en: '😊 Feeling Good',
    kn: '😊 ಆರೋಗ್ಯವಾಗಿದ್ದೇನೆ',
  },
  feelingOkay: {
    en: '😐 Okay',
    kn: '😐 ಪರವಾಗಿಲ್ಲ',
  },
  needAssistance: {
    en: '⚠️ Need Assistance',
    kn: '⚠️ ಸಹಾಯ ಬೇಕಾಗಿದೆ',
  },
  dailyCheckInCompleted: {
    en: 'Completed for today',
    kn: 'ಇಂದಿನ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
  },
  dailyCheckInPending: {
    en: 'Daily wellness check pending',
    kn: 'ದೈನಂದಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಬಾಕಿ ಇದೆ',
  },
  postponeCheckIn: {
    en: 'Remind Later',
    kn: 'ನಂತರ ನೆನಪಿಸಿ',
  },
  checkInRecordedMessage: {
    en: 'Daily health check-in recorded successfully!',
    kn: 'ದೈನಂದಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆಯನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ!',
  },

  // Emergency Call (Issue 5)
  emergencyHelpButton: {
    en: 'Emergency',
    kn: 'ತುರ್ತು ಸಹಾಯ',
  },
  emergencyModalTitle: {
    en: 'Emergency Contact Directory (India)',
    kn: 'ತುರ್ತು ಸಂಪರ್ಕ ಡೈರೆಕ್ಟರಿ (ಭಾರತ)',
  },
  emergency112Label: {
    en: '112 — National Integrated Emergency',
    kn: '112 — ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯ (ಪೊಲೀಸ್, ಅಂಬುಲೆನ್ಸ್, ಅಗ್ನಿಶಾಮಕ)',
  },
  emergency100Label: {
    en: '100 — Police Helpline',
    kn: '100 — ಪೊಲೀಸ್ ಸಹಾಯವಾಣಿ',
  },
  emergency108Label: {
    en: '108 — Medical Emergency & Ambulance',
    kn: '108 — ತುರ್ತು ವೈದ್ಯಕೀಯ ಮತ್ತು ಅಂಬುಲೆನ್ಸ್',
  },
  confirmCallTitle: {
    en: 'Confirm Emergency Call',
    kn: 'ತುರ್ತು ಕರೆ ದೃಢೀಕರಿಸಿ',
  },
  confirmCallPrompt: {
    en: 'Are you sure you want to call {number}? This will initiate a phone call from your device.',
    kn: 'ನೀವು ಖಂಡಿತವಾಗಿ {number} ಗೆ ಕರೆ ಮಾಡಲು ಬಯಸುವಿರಾ? ಇದು ನಿಮ್ಮ ಮೊಬೈಲ್ ಮೂಲಕ ಕರೆಯನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ.',
  },
  callNowButton: {
    en: 'Yes, Call Now',
    kn: 'ಹೌದು, ಕರೆ ಮಾಡಿ',
  },
  desktopCallingNotice: {
    en: 'On desktop devices, dialing depends on your computer’s default calling application (e.g. Phone Link or Skype).',
    kn: 'ಡೆಸ್ಕ್‌ಟಾಪ್ ಕಂಪ್ಯೂಟರ್‌ಗಳಲ್ಲಿ ಕರೆ ಮಾಡುವುದು ನಿಮ್ಮ ಸಾಧನದ ಸಾಫ್ಟ್‌ವೇರ್ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ.',
  },

  // My Medicines
  myMedicinesTitle: {
    en: 'My Medicines',
    kn: 'ನನ್ನ ಔಷಧಿಗಳು',
  },
  addNewMedicine: {
    en: 'Add Medicine',
    kn: 'ಔಷಧಿ ಸೇರಿಸಿ',
  },
  editMedicine: {
    en: 'Edit Medicine',
    kn: 'ಔಷಧಿ ಬದಲಾಯಿಸಿ',
  },
  deleteMedicine: {
    en: 'Delete Medicine',
    kn: 'ಔಷಧಿ ಅಳಿಸಿ',
  },
  tabletsLeft: {
    en: 'tablets left',
    kn: 'ಮಾತ್ರೆಗಳು ಬಾಕಿ ಇವೆ',
  },
  daysLeft: {
    en: 'days left',
    kn: 'ದಿನಗಳು ಬಾಕಿ',
  },
  noMedicinesYet: {
    en: 'No medicines added yet. Tap "Add Medicine" to begin your prescription routine.',
    kn: 'ಇನ್ನೂ ಯಾವುದೇ ಔಷಧಿ ಸೇರಿಸಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪ್ರಾರಂಭಿಸಲು "ಔಷಧಿ ಸೇರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',
  },
  confirmDeleteMedicine: {
    en: 'Are you sure you want to delete this medicine prescription?',
    kn: 'ನೀವು ಖಂಡಿತವಾಗಿ ಈ ಔಷಧಿಯನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?',
  },

  // Stock & Refill Tracker
  stockTrackerTitle: {
    en: 'Stock & Refill Tracker',
    kn: 'ಸ್ಟಾಕ್ ಮತ್ತು ಮರುಪೂರಣ ಟ್ರ್ಯಾಕರ್',
  },
  liveEstimateSub: {
    en: 'Live estimate based on your daily routine',
    kn: 'ನಿಮ್ಮ ದೈನಂದಿನ ದಿನಚರಿಯ ಆಧಾರದ ಮೇಲಿನ ಅಂದಾಜು',
  },
  updateStock: {
    en: 'Update Stock',
    kn: 'ಸ್ಟಾಕ್ ನವೀಕರಿಸಿ',
  },
  lowStockBadge: {
    en: 'Low Stock',
    kn: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
  },
  veryLowBadge: {
    en: 'Very Low',
    kn: 'ತುಂಬಾ ಕಡಿಮೆ',
  },
  quickAdd10: {
    en: '+10 Tablets',
    kn: '+10 ಮಾತ್ರೆಗಳು',
  },
  quickAdd20: {
    en: '+20 Tablets',
    kn: '+20 ಮಾತ್ರೆಗಳು',
  },
  quickAdd30: {
    en: '+30 Tablets',
    kn: '+30 ಮಾತ್ರೆಗಳು',
  },
  stockDisclaimer: {
    en: 'Stock estimates are calculated from your entered quantities. MediMitra CareLoop never automatically purchases or dispenses medicine.',
    kn: 'ಸ್ಟಾಕ್ ಅಂದಾಜುಗಳು ನೀವು ನಮೂದಿಸಿದ ಮಾಹಿತಿಯ ಮೇಲೆ ಆಧಾರಿತವಾಗಿವೆ. ಮೆಡಿಮಿತ್ರ ಕೇರ್‌ಲೂಪ್ ಎಂದಿಗೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಔಷಧಿಗಳನ್ನು ಖರೀದಿಸುವುದಿಲ್ಲ.',
  },

  // Caregiver Portal
  caregiverDashboardTitle: {
    en: 'Caregiver Dashboard',
    kn: 'ಆರೈಕೆದಾರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  linkedPatientsTitle: {
    en: 'Linked Patients',
    kn: 'ಸಂಪರ್ಕಿತ ರೋಗಿಗಳು',
  },
  unconfirmedRemindersTitle: {
    en: 'Unconfirmed Reminders',
    kn: 'ದೃಢೀಕರಿಸದ ಜ್ಞಾಪನೆಗಳು',
  },
  helpRequestsTitle: {
    en: 'Help Requests',
    kn: 'ಸಹಾಯ ವಿನಂತಿಗಳು',
  },
  lowStockAlertsTitle: {
    en: 'Low Stock Alerts',
    kn: 'ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆಗಳು',
  },
  allGood: {
    en: 'All good',
    kn: 'ಎಲ್ಲವೂ ಸರಿಯಾಗಿದೆ',
  },
  acknowledge: {
    en: 'Acknowledge',
    kn: 'ದೃಢೀಕರಿಸಿ',
  },

  // Patient Timeline
  patientTimelineTitle: {
    en: 'Patient Timeline',
    kn: 'ರೋಗಿಯ ಇತಿಹಾಸ',
  },
  tabTimeline: {
    en: 'Timeline',
    kn: 'ಸಮಯಾವಳಿ',
  },
  tabMedicines: {
    en: 'Medicines',
    kn: 'ಔಷಧಿಗಳು',
  },
  todayLabel: {
    en: 'Today',
    kn: 'ಇಂದು',
  },
  yesterdayLabel: {
    en: 'Yesterday',
    kn: 'ನಿನ್ನೆ',
  },
  viewProfile: {
    en: 'View Profile',
    kn: 'ಪ್ರೊಫೈಲ್ ನೋಡಿ',
  },
  patientHealthProfile: {
    en: 'Patient Health Profile',
    kn: 'ರೋಗಿಯ ಆರೋಗ್ಯ ಪ್ರೊಫೈಲ್',
  },
  closeProfile: {
    en: 'Close Profile',
    kn: 'ಪ್ರೊಫೈಲ್ ಮುಚ್ಚಿ',
  },
  noTimelineEvents: {
    en: 'No activity recorded yet.',
    kn: 'ಇನ್ನೂ ಯಾವುದೇ ಚಟುವಟಿಕೆ ದಾಖಲಾಗಿಲ್ಲ.',
  },
};

/**
 * Translation helper function
 */
export function getTranslation(key: string, lang: LanguageCode, fallback?: string): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  return fallback || (TRANSLATIONS[key] ? TRANSLATIONS[key].en : key);
}
