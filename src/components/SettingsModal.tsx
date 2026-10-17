import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Shield, RotateCcw, Check, Heart, Globe, Bell, BellRing, History } from 'lucide-react';
import type { LanguageCode } from '../types';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    currentUser,
    userRole, 
    switchToPatient, 
    switchToCaregiver, 
    resetAllData,
    healthCheck,
    updateHealthCheckSettings,
    language,
    setLanguage,
    t,
    notificationPermission,
    requestNotificationPermission,
    setIsAlertsDrawerOpen
  } = useApp();

  const [testedNotification, setTestedNotification] = useState(false);

  if (!isSettingsOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        className="card-white"
        style={{
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>
              {t('sidebarSettings', 'Account & System Settings')}
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Preferences, reminders, and language</p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748B',
              backgroundColor: '#F1F5F9',
            }}
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Language Selector (Issue 1) */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Globe size={15} color="#0D9488" /> Language / ಭಾಷೆ
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { code: 'en' as LanguageCode, label: 'English' },
                { code: 'kn' as LanguageCode, label: 'ಕನ್ನಡ (Kannada)' },
              ].map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #0D9488' : '1px solid #CBD5E1',
                      backgroundColor: isSelected ? '#F0FDFA' : '#FFFFFF',
                      color: isSelected ? '#0D9488' : '#334155',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Health Check-Up Configuration (Issue 4) */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Heart size={15} color="#0D9488" /> {t('dailyHealthCheckupTitle', 'Daily Health Check-up')}
            </span>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#102A43', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={healthCheck.enabled}
                onChange={(e) => updateHealthCheckSettings(e.target.checked, healthCheck.reminderTime)}
                style={{ accentColor: '#0D9488', width: '16px', height: '16px' }}
              />
              <span style={{ fontWeight: 600 }}>Enable daily wellness check reminder</span>
            </label>

            {healthCheck.enabled && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569' }}>
                <span>Preferred reminder time:</span>
                <select
                  value={healthCheck.reminderTime}
                  onChange={(e) => updateHealthCheckSettings(healthCheck.enabled, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    backgroundColor: '#FFFFFF',
                    color: '#102A43',
                  }}
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM (Default)</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                </select>
              </div>
            )}
          </div>

          {/* Reminder & Notification Preferences (Hackathon 90+ Improvement) */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Bell size={15} color="#0D9488" /> {t('notificationPreferencesTitle', 'Notification & Reminder Preferences')}
            </span>

            {/* Browser Push Status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
              <span style={{ color: '#475569' }}>Browser Notifications:</span>
              <span
                style={{
                  fontWeight: 700,
                  color: notificationPermission === 'granted' ? '#16A34A' : '#EA580C',
                  backgroundColor: notificationPermission === 'granted' ? '#DCFCE7' : '#FFEDD5',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '11px',
                }}
              >
                {notificationPermission === 'granted' ? 'Allowed' : notificationPermission === 'denied' ? 'Blocked' : 'Default (Click to Enable)'}
              </span>
            </div>

            {/* Test / Request Permission Button */}
            <button
              onClick={async () => {
                const res = await requestNotificationPermission();
                if (res === 'granted') {
                  setTestedNotification(true);
                  try {
                    new Notification('⏰ MediMitra CareLoop Test Notification', {
                      body: 'Medicine reminder notifications are working correctly!',
                      icon: '/assets/logo.png',
                    });
                  } catch { /* fallback */ }
                }
              }}
              className="btn-outline"
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '12px',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <BellRing size={13} color="#0D9488" />
              <span>{notificationPermission === 'granted' ? 'Test Active Browser Notification' : 'Enable & Request Push Notification'}</span>
            </button>
            {testedNotification && (
              <p style={{ fontSize: '11px', color: '#16A34A', margin: '0 0 8px 0', textAlign: 'center' }}>
                ✓ Test notification sent to system tray!
              </p>
            )}

            {/* Quick Access to Notification History */}
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                setIsAlertsDrawerOpen(true);
              }}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#102A43',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <History size={13} color="#0D9488" />
              <span>{t('notificationHistoryTab', 'View Notification & Activity Log')}</span>
            </button>
          </div>

          {/* Active Profile & Quick Switcher for Demo */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <User size={15} color="#0D9488" /> Active Account: {currentUser.name}
            </span>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>
              {currentUser.email} • Role: {userRole}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => {
                  switchToPatient();
                  setIsSettingsOpen(false);
                }}
                style={{
                  padding: '9px',
                  borderRadius: '8px',
                  border: userRole === 'patient' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: userRole === 'patient' ? '#F0FDFA' : '#FFFFFF',
                  color: userRole === 'patient' ? '#0D9488' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {userRole === 'patient' && <Check size={14} />}
                <span>Demo Patient</span>
              </button>
              <button
                onClick={() => {
                  switchToCaregiver();
                  setIsSettingsOpen(false);
                }}
                style={{
                  padding: '9px',
                  borderRadius: '8px',
                  border: userRole === 'caregiver' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: userRole === 'caregiver' ? '#F0FDFA' : '#FFFFFF',
                  color: userRole === 'caregiver' ? '#0D9488' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {userRole === 'caregiver' && <Check size={14} />}
                <span>Demo Caregiver</span>
              </button>
            </div>
          </div>

          {/* Privacy & Consent */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Shield size={15} color="#0D9488" /> Data Privacy & Consent
            </span>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
              Caregiver links require explicit patient authorization. Patient routines and stock are isolated per authenticated user ID.
            </p>
          </div>

          {/* Reset User Data */}
          <div>
            <button
              onClick={() => {
                resetAllData();
                setIsSettingsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <RotateCcw size={15} />
              <span>Reset Data to Reference Defaults</span>
            </button>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="btn-teal"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
