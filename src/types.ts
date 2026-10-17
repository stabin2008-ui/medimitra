export type PageId =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'reminder'
  | 'medicines'
  | 'stock'
  | 'caregiver'
  | 'timeline';

export type UserRole = 'patient' | 'caregiver' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  ageGender?: string;
  relation?: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  doseTime: string;
  timePeriod: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  tabletsLeft: number;
  dailyDose: number;
  estimatedDaysLeft: number;
  isLowStock: boolean;
  isVeryLow: boolean;
  status: 'Taken' | 'Pending' | 'Snoozed' | 'Missed';
  lastTakenTime?: string;
  image: string;
  details?: string;
}

export interface TimelineEvent {
  id: string;
  dateGroup: 'Today' | 'Yesterday' | '23 May' | string;
  time: string;
  title: string;
  medicineName?: string;
  status?: 'Taken' | 'Pending' | 'Help' | 'Refill' | 'Info';
  description?: string;
  isStockEvent?: boolean;
}

export interface HelpAlert {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  message: string;
  acknowledged: boolean;
  severity: 'urgent' | 'warning' | 'info';
}

export interface LinkedPatient {
  id: string;
  name: string;
  relation: string;
  ageGender: string;
  avatar: string;
  statusSummary: string;
  unconfirmedCount: number;
  lowStockCount: number;
  isAllGood: boolean;
}
