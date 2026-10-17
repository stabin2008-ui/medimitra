import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Bell, Pill, Layers, Settings, Users, BellRing } from 'lucide-react';

interface MobileBottomNavProps {
  role?: 'patient' | 'caregiver';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ role = 'patient' }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    alerts, 
    setIsSettingsOpen, 
    setIsAlertsDrawerOpen 
  } = useApp();

  const unreadAlerts = alerts.filter((a) => !a.acknowledged).length;

  if (role === 'caregiver') {
    return (
      <nav
        aria-label="Caregiver mobile navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '8px 12px 12px 12px',
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          boxShadow: '0 -2px 10px rgba(16,42,67,0.04)',
        }}
      >
        <button
          onClick={() => setCurrentPage('caregiver')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 12px',
            color: currentPage === 'caregiver' ? '#0D9488' : '#94A3B8',
          }}
        >
          <Home size={19} />
          <span style={{ fontSize: '11px', fontWeight: currentPage === 'caregiver' ? 600 : 500 }}>Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentPage('timeline')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 12px',
            color: currentPage === 'timeline' ? '#0D9488' : '#94A3B8',
          }}
        >
          <Users size={19} />
          <span style={{ fontSize: '11px', fontWeight: currentPage === 'timeline' ? 600 : 500 }}>Patients</span>
        </button>

        <button
          onClick={() => setIsAlertsDrawerOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 12px',
            color: '#94A3B8',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative' }}>
            <BellRing size={19} />
            {unreadAlerts > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '1px 4px',
                  borderRadius: '9999px',
                }}
              >
                {unreadAlerts}
              </span>
            )}
          </div>
          <span style={{ fontSize: '11px', fontWeight: 500 }}>Alerts</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 12px',
            color: '#94A3B8',
          }}
        >
          <Settings size={19} />
          <span style={{ fontSize: '11px', fontWeight: 500 }}>Settings</span>
        </button>
      </nav>
    );
  }

  // Patient items
  return (
    <nav
      aria-label="Patient mobile navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '8px 8px 12px 8px',
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        boxShadow: '0 -2px 10px rgba(16,42,67,0.04)',
      }}
    >
      <button
        onClick={() => setCurrentPage('dashboard')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 10px',
          color: currentPage === 'dashboard' ? '#0D9488' : '#94A3B8',
        }}
      >
        <Home size={19} />
        <span style={{ fontSize: '11px', fontWeight: currentPage === 'dashboard' ? 600 : 500 }}>Dashboard</span>
      </button>

      <button
        onClick={() => setCurrentPage('reminder')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 10px',
          color: currentPage === 'reminder' ? '#0D9488' : '#94A3B8',
        }}
      >
        <Bell size={19} />
        <span style={{ fontSize: '11px', fontWeight: currentPage === 'reminder' ? 600 : 500 }}>Reminders</span>
      </button>

      <button
        onClick={() => setCurrentPage('medicines')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 10px',
          color: currentPage === 'medicines' ? '#0D9488' : '#94A3B8',
        }}
      >
        <Pill size={19} />
        <span style={{ fontSize: '11px', fontWeight: currentPage === 'medicines' ? 600 : 500 }}>Medicines</span>
      </button>

      <button
        onClick={() => setCurrentPage('stock')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 10px',
          color: currentPage === 'stock' ? '#0D9488' : '#94A3B8',
        }}
      >
        <Layers size={19} />
        <span style={{ fontSize: '11px', fontWeight: currentPage === 'stock' ? 600 : 500 }}>Stock</span>
      </button>

      <button
        onClick={() => setIsSettingsOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 10px',
          color: '#94A3B8',
        }}
      >
        <Settings size={19} />
        <span style={{ fontSize: '11px', fontWeight: 500 }}>Settings</span>
      </button>
    </nav>
  );
};
