import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import type { PageId } from '../types';
import {
  LayoutDashboard,
  Pill,
  Bell,
  Clock,
  Layers,
  Users,
  BellRing,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    alerts, 
    setIsSettingsOpen, 
    setIsAlertsDrawerOpen, 
    sendHelpRequest,
    logoutUser,
    t
  } = useApp();

  const unreadAlerts = alerts.filter((a) => !a.acknowledged).length;

  const navItems = [
    { id: 'dashboard' as PageId, labelKey: 'sidebarDashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'medicines' as PageId, labelKey: 'sidebarMedicines', label: 'My Medicines', icon: <Pill size={18} /> },
    { id: 'reminder' as PageId, labelKey: 'sidebarReminders', label: "Today's Reminders", icon: <Bell size={18} /> },
    { id: 'timeline' as PageId, labelKey: 'sidebarHistory', label: 'Medicine History', icon: <Clock size={18} /> },
    { id: 'stock' as PageId, labelKey: 'sidebarStock', label: 'Stock & Refills', icon: <Layers size={18} /> },
    { id: 'caregiver' as PageId, labelKey: 'sidebarCaregivers', label: 'Caregivers', icon: <Users size={18} /> },
    { 
      id: 'notifications' as unknown as PageId, 
      labelKey: 'sidebarNotifications',
      label: 'Notifications', 
      icon: <BellRing size={18} />, 
      badge: unreadAlerts > 0 ? unreadAlerts : undefined,
    },
    { id: 'settings' as unknown as PageId, labelKey: 'sidebarSettings', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'help' as unknown as PageId, labelKey: 'sidebarHelp', label: 'Help & Support', icon: <HelpCircle size={18} /> },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'notifications') {
      setIsAlertsDrawerOpen(true);
    } else if (id === 'settings') {
      setIsSettingsOpen(true);
    } else if (id === 'help') {
      sendHelpRequest(undefined, 'Assistance requested via Help & Support menu');
    } else {
      setCurrentPage(id as PageId);
    }
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogout = () => {
    logoutUser();
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: '#102A43',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        height: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div>
        {/* Logo and close button for mobile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            paddingLeft: '6px',
          }}
        >
          <div onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer' }}>
            <Logo variant="white" size="md" />
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              style={{
                color: '#94A3B8',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  backgroundColor: isActive ? '#0D9488' : 'transparent',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#CBD5E1';
                  }
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{t(item.labelKey, item.label)}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '9999px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '11px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#CBD5E1',
            backgroundColor: 'transparent',
            textAlign: 'left',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
            e.currentTarget.style.color = '#FCA5A5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#CBD5E1';
          }}
        >
          <LogOut size={18} />
          <span>{t('logout', 'Logout')}</span>
        </button>
      </div>
    </aside>
  );
};
