import React from 'react';
import { useApp } from '../context/AppContext';
import { BellRing, CheckCircle2, Clock, X, Pill } from 'lucide-react';

export const MedicineAlarmModal: React.FC = () => {
  const { 
    activeAlarm, 
    dismissAlarm, 
    markAsTaken, 
    snoozeReminder,
    t 
  } = useApp();

  if (!activeAlarm) return null;

  const handleTake = () => {
    markAsTaken(activeAlarm.id);
    dismissAlarm();
  };

  const handleSnooze = () => {
    snoozeReminder(activeAlarm.id, 10);
    dismissAlarm();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alarm-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '16px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="card-white"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '24px',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(16, 42, 67, 0.35)',
          border: '2px solid #0D9488',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* Header with animated bell */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#F0FDFA',
                border: '1px solid #CCFBF1',
                color: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BellRing size={24} color="#0D9488" />
            </div>
            <div>
              <h2 id="alarm-modal-title" style={{ fontSize: '18px', fontWeight: 800, color: '#102A43', lineHeight: 1.2 }}>
                {t('alarmTriggeredTitle', 'Medicine Alarm Alert')}
              </h2>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {t('alarmTriggeredSubtitle', 'Scheduled reminder time has arrived for:')}
              </span>
            </div>
          </div>

          <button
            onClick={dismissAlarm}
            style={{
              padding: '6px',
              color: '#64748B',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Dismiss alarm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Medicine Detail Card */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#F8FAFC',
            borderRadius: '14px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0D9488',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {activeAlarm.image ? (
              <img
                src={activeAlarm.image}
                alt={activeAlarm.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Pill size={24} color="#0D9488" />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
              {activeAlarm.name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D9488', marginBottom: '2px' }}>
              {activeAlarm.instructions}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Scheduled for: <strong>{activeAlarm.doseTime || activeAlarm.alarmTime}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Primary: Take Medicine Now */}
          <button
            onClick={handleTake}
            className="btn-teal"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 700,
              backgroundColor: '#16A34A',
              borderColor: '#16A34A',
              color: '#FFFFFF',
            }}
          >
            <CheckCircle2 size={18} />
            <span>{t('takeMedicineNow', 'Take Medicine Now')}</span>
          </button>

          {/* Secondary: Snooze 10 min */}
          <button
            onClick={handleSnooze}
            className="btn-outline"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#EA580C',
              borderColor: '#FDBA74',
              backgroundColor: '#FFF7ED',
            }}
          >
            <Clock size={16} />
            <span>{t('snooze10Min', 'Snooze 10 min')}</span>
          </button>

          {/* Tertiary: Dismiss */}
          <button
            onClick={dismissAlarm}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '13px',
              color: '#64748B',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {t('dismissAlarm', 'Dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
};
