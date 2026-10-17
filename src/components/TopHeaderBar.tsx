import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  Check, 
  Globe, 
  Settings as SettingsIcon, 
  LogOut, 
  ArrowLeftRight,
  PhoneCall
} from 'lucide-react';
import type { LanguageCode } from '../types';

interface TopHeaderBarProps {
  onToggleSidebar?: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({ onToggleSidebar }) => {
  const { 
    alerts, 
    setCurrentPage, 
    currentUser, 
    userRole, 
    switchToPatient, 
    switchToCaregiver, 
    logoutUser,
    setIsSettingsOpen, 
    setIsAlertsDrawerOpen,
    setIsEmergencyModalOpen,
    language,
    setLanguage,
    t
  } = useApp();

  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadAlerts = alerts.filter((a) => !a.acknowledged).length;

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  ];

  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Menu toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            padding: '8px',
            borderRadius: '8px',
            color: '#102A43',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
          }}
          aria-label="Toggle sidebar navigation"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        {/* Emergency Call Quick Button (Issue 5) */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            fontWeight: 700,
            fontSize: '12.5px',
            boxShadow: '0 1px 3px rgba(220, 38, 38, 0.1)',
          }}
          aria-label="Emergency Help 112 / 100"
        >
          <PhoneCall size={14} />
          <span>{t('emergencyHelpButton', 'Emergency 112')}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsAlertsDrawerOpen(true)}
          style={{
            position: 'relative',
            padding: '8px',
            borderRadius: '50%',
            color: '#475569',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="View notifications and alerts"
        >
          <Bell size={18} />
          {unreadAlerts > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '10px',
                height: '10px',
                backgroundColor: '#DC2626',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
              }}
            />
          )}
        </button>

        {/* Language Selector (Issue 1) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
            }}
            aria-label="Select website language"
          >
            <Globe size={14} color="#0D9488" />
            <span>{language === 'kn' ? 'ಕನ್ನಡ' : 'English'}</span>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {langOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0 10px 25px rgba(16,42,67,0.12)',
                border: '1px solid #E2E8F0',
                padding: '6px',
                minWidth: '160px',
                zIndex: 100,
              }}
            >
              {languages.map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      textAlign: 'left',
                      color: isSelected ? '#0D9488' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? '#F0FDFA' : 'transparent',
                    }}
                  >
                    <span>{l.label}</span>
                    {isSelected && <Check size={14} color="#0D9488" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Patient / Caregiver Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 6px',
              borderRadius: '24px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <img
              src={currentUser.avatar}
              alt={`${currentUser.name} Profile`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #0D9488',
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#102A43' }}>
              {currentUser.name.split(' ')[0]}
            </span>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(16,42,67,0.12)',
                border: '1px solid #E2E8F0',
                padding: '12px',
                minWidth: '230px',
                zIndex: 100,
              }}
            >
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid #E2E8F0', marginBottom: '8px' }}>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#102A43' }}>{currentUser.name}</p>
                <p style={{ fontSize: '12px', color: '#64748B' }}>
                  {currentUser.email}
                </p>
                <p style={{ fontSize: '11px', color: '#0D9488', marginTop: '2px', fontWeight: 600 }}>
                  Role: {currentUser.role === 'patient' ? t('patientRole', 'Patient') : t('caregiverRole', 'Caregiver')}
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('timeline');
                  setProfileOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#334155',
                }}
              >
                {t('patientTimelineTitle', 'View Patient Timeline')}
              </button>

              <button
                onClick={() => {
                  if (userRole === 'patient') {
                    switchToCaregiver();
                  } else {
                    switchToPatient();
                  }
                  setProfileOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#0D9488',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeftRight size={14} />
                <span>Switch to {userRole === 'patient' ? 'Caregiver View' : 'Patient View'}</span>
              </button>

              <button
                onClick={() => {
                  setIsSettingsOpen(true);
                  setProfileOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <SettingsIcon size={14} />
                <span>{t('sidebarSettings', 'Account Settings')}</span>
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  logoutUser();
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#DC2626',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <LogOut size={14} />
                <span>{t('logout', 'Sign Out')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
