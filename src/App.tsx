import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/Toast';
import { SettingsModal } from './components/SettingsModal';
import { AlertsDrawer } from './components/AlertsDrawer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { TodaysReminderPage } from './pages/TodaysReminderPage';
import { MyMedicinesPage } from './pages/MyMedicinesPage';
import { StockRefillPage } from './pages/StockRefillPage';
import { CaregiverDashboardPage } from './pages/CaregiverDashboardPage';
import { PatientTimelinePage } from './pages/PatientTimelinePage';

const AppRouter: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'dashboard':
        return <PatientDashboardPage />;
      case 'reminder':
        return <TodaysReminderPage />;
      case 'medicines':
        return <MyMedicinesPage />;
      case 'stock':
        return <StockRefillPage />;
      case 'caregiver':
        return <CaregiverDashboardPage />;
      case 'timeline':
        return <PatientTimelinePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderCurrentView()}
      </main>
      <Toast />
      <SettingsModal />
      <AlertsDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
