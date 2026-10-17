import React from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Bell, Shield, RotateCcw, Check } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    userRole, 
    switchToPatient, 
    switchToCaregiver, 
    resetAllData 
  } = useApp();

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>Account & System Settings</h2>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Preferences, caregiver access, and routine data</p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748B',
              backgroundColor: '#F1F5F9',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Active Profile & Role Switcher */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <User size={15} color="#0D9488" /> Active View & Role
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => {
                  switchToPatient();
                  setIsSettingsOpen(false);
                }}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: userRole === 'patient' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: userRole === 'patient' ? '#F0FDFA' : '#FFFFFF',
                  color: userRole === 'patient' ? '#0D9488' : '#334155',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {userRole === 'patient' && <Check size={14} />}
                <span>Patient (Ramesh)</span>
              </button>
              <button
                onClick={() => {
                  switchToCaregiver();
                  setIsSettingsOpen(false);
                }}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: userRole === 'caregiver' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: userRole === 'caregiver' ? '#F0FDFA' : '#FFFFFF',
                  color: userRole === 'caregiver' ? '#0D9488' : '#334155',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {userRole === 'caregiver' && <Check size={14} />}
                <span>Caregiver (Anitha)</span>
              </button>
            </div>
          </div>

          {/* Notification Reminders */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Bell size={15} color="#0D9488" /> Reminder Preferences
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#0D9488' }} />
                <span>Audio chimes for morning & evening doses</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#0D9488' }} />
                <span>Auto-alert caregiver if dose unconfirmed for 45 mins</span>
              </label>
            </div>
          </div>

          {/* Privacy & Consent */}
          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Shield size={15} color="#0D9488" /> Data Privacy & Consent
            </span>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
              Caregiver Anitha has authorized viewing rights for medication reminders and stock levels. Real prescriptions are never modified automatically.
            </p>
          </div>

          {/* Reset Demo Data */}
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
