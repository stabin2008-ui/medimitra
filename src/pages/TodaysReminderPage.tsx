import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Clock, 
  RotateCw, 
  CheckCircle2, 
  PhoneCall, 
  AlertCircle,
  Globe,
  Plus,
  Pill,
  BellRing,
  BellOff,
  Check
} from 'lucide-react';
import { time12To24, time24To12 } from '../utils/alarmUtils';

export const TodaysReminderPage: React.FC = () => {
  const { 
    medicines, 
    markAsTaken, 
    snoozeReminder, 
    sendHelpRequest, 
    setCurrentPage,
    setIsEmergencyModalOpen,
    language,
    setLanguage,
    t,
    updateMedicineAlarm,
    notificationPermission,
    requestNotificationPermission
  } = useApp();

  const currentMed = medicines.find((m) => m.name.includes('Metformin')) || medicines[0];
  const isTaken = currentMed?.status === 'Taken';

  const [selectedSnooze, setSelectedSnooze] = useState<number | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpReason, setHelpReason] = useState('Having difficulty with dosage instructions');
  const [isEditingAlarm, setIsEditingAlarm] = useState(false);
  const [pickerTime, setPickerTime] = useState(() => {
    return currentMed?.alarmTime || (currentMed?.doseTime ? time12To24(currentMed.doseTime) : '08:30');
  });

  useEffect(() => {
    if (currentMed) {
      setPickerTime(currentMed.alarmTime || time12To24(currentMed.doseTime || '08:30 AM'));
    }
  }, [currentMed]);

  const handleTaken = () => {
    if (currentMed) {
      markAsTaken(currentMed.id);
    }
  };

  const handleSnooze = (minutes: number) => {
    setSelectedSnooze(minutes);
    if (currentMed) {
      snoozeReminder(currentMed.id, minutes);
    }
  };

  const handleConfirmHelp = () => {
    if (currentMed) {
      sendHelpRequest(currentMed.id, helpReason);
    }
    setShowHelpModal(false);
  };

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F5F8FB',
      }}
    >
      {/* Top Navigation */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <button
          onClick={() => setCurrentPage('dashboard')}
          style={{
            padding: '6px',
            borderRadius: '50%',
            color: '#102A43',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={22} />
        </button>

        <div onClick={() => setCurrentPage('dashboard')} style={{ cursor: 'pointer' }}>
          <Logo variant="navy" size="sm" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Emergency SOS button */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            style={{
              padding: '6px 10px',
              borderRadius: '16px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              border: '1px solid #FECACA',
              fontWeight: 700,
              fontSize: '11.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            aria-label="Emergency 112"
          >
            <PhoneCall size={12} />
            <span>112</span>
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            style={{
              padding: '6px 10px',
              borderRadius: '16px',
              backgroundColor: '#F8FAFC',
              color: '#102A43',
              border: '1px solid #E2E8F0',
              fontWeight: 600,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            aria-label="Toggle language"
          >
            <Globe size={12} color="#0D9488" />
            <span>{language === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
          </button>

          <button
            onClick={() => setCurrentPage('medicines')}
            style={{
              padding: '6px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* Main Reminder Card */}
      <main style={{ flex: 1, padding: '20px 16px', maxWidth: '520px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {!currentMed ? (
          <div className="card-white" style={{ padding: '36px 20px', textAlign: 'center' }}>
            <Pill size={36} color="#94A3B8" style={{ marginBottom: '12px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
              No Pending Reminders
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
              {t('noMedicinesYet', 'No medicines added yet. Tap below to add your first prescription.')}
            </p>
            <button
              onClick={() => setCurrentPage('medicines')}
              className="btn-teal"
              style={{ padding: '10px 20px', margin: '0 auto' }}
            >
              <Plus size={16} />
              <span>{t('addNewMedicine', 'Add Medicine')}</span>
            </button>
          </div>
        ) : (
          <>
            <div
              className="card-white"
              style={{
                padding: '24px 20px',
                marginBottom: '20px',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(16,42,67,0.06)',
              }}
            >
              {/* Header Row: Next Reminder & Timer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '14px',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {t('nextReminderAt', 'Next Reminder')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Clock size={20} color="#0D9488" />
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#102A43' }}>
                      {currentMed.doseTime || '08:30 AM'}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#F0FDFA',
                    border: '1px solid #CCFBF1',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#0D9488',
                  }}
                >
                  <span>10 min</span>
                  <RotateCw size={14} />
                </div>
              </div>

              {/* Medicine Details & Realistic 3D Pill Render */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '28px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h1
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#102A43',
                      marginBottom: '4px',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {currentMed.name}
                  </h1>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0D9488',
                      marginBottom: '8px',
                    }}
                  >
                    {currentMed.instructions || 'After Breakfast'}
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.4 }}>
                    {currentMed.details || 'Take 1 tablet with water'}
                  </p>
                </div>

                {/* Realistic Pill Thumbnail */}
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 6px 18px rgba(16,42,67,0.1)',
                    border: '2px solid #FFFFFF',
                    backgroundColor: '#F8FAFC',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={currentMed.image || '/assets/pill_metformin.jpg'}
                    alt={currentMed.name || 'Medicine Pill'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Medicine Alarm Section (Requirement 2) */}
              <div
                style={{
                  padding: '14px 16px',
                  backgroundColor: currentMed.alarmEnabled ? '#F0FDFA' : '#F8FAFC',
                  border: currentMed.alarmEnabled ? '1.5px solid #99F6E4' : '1px solid #E2E8F0',
                  borderRadius: '14px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: currentMed.alarmEnabled ? '#CCFBF1' : '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {currentMed.alarmEnabled ? (
                        <BellRing size={20} color="#0D9488" />
                      ) : (
                        <BellOff size={20} color="#64748B" />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                        {currentMed.alarmEnabled ? t('alarmOn', 'Alarm Active') : t('alarmOff', 'Alarm Off')}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {currentMed.alarmEnabled
                          ? `${t('alarmTime', 'Alarm Time')}: ${currentMed.doseTime || time24To12(currentMed.alarmTime || '08:30')}`
                          : t('enableAlarmForMedicine', 'Enable Alarm for this reminder')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setIsEditingAlarm(!isEditingAlarm)}
                      className="btn-outline"
                      style={{
                        padding: '6px 12px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        borderColor: '#0D9488',
                        color: '#0D9488',
                      }}
                    >
                      {isEditingAlarm ? t('cancel', 'Cancel') : currentMed.alarmEnabled ? t('editAlarm', 'Edit Alarm') : t('setAlarm', 'Set Alarm')}
                    </button>

                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '6px', userSelect: 'none' }}>
                      <input
                        type="checkbox"
                        checked={!!currentMed.alarmEnabled}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const curTime = currentMed.alarmTime || time12To24(currentMed.doseTime || '08:30 AM');
                          updateMedicineAlarm(currentMed.id, checked, curTime);
                        }}
                        style={{ width: '18px', height: '18px', accentColor: '#0D9488', cursor: 'pointer' }}
                        aria-label="Toggle Alarm"
                      />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: currentMed.alarmEnabled ? '#0D9488' : '#64748B' }}>
                        {currentMed.alarmEnabled ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Alarm Time Picker Row (when editing or setting alarm) */}
                {isEditingAlarm && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#102A43' }}>
                        {t('alarmTime', 'Alarm Time')}:
                      </label>
                      <input
                        type="time"
                        value={pickerTime}
                        onChange={(e) => setPickerTime(e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1.5px solid #0D9488',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#102A43',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        onClick={() => {
                          updateMedicineAlarm(currentMed.id, true, pickerTime);
                          setIsEditingAlarm(false);
                        }}
                        className="btn-teal"
                        style={{ padding: '6px 14px', fontSize: '12.5px' }}
                      >
                        <Check size={14} /> {t('save', 'Save')}
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', flexWrap: 'wrap', gap: '6px' }}>
                      <span>{t('alarmOpenBrowserNotice', 'Alarms trigger while this tab or browser is open.')}</span>
                      {notificationPermission !== 'granted' ? (
                        <button
                          onClick={requestNotificationPermission}
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#0D9488',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {t('enableBrowserNotifications', 'Enable Browser Notifications')}
                        </button>
                      ) : (
                        <span style={{ color: '#16A34A', fontWeight: 600 }}>
                          ✓ {t('notificationsActive', 'Browser notifications active')}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Three Large Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Taken Button - Green */}
                <button
                  onClick={handleTaken}
                  disabled={isTaken}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: isTaken ? '#15803D' : '#16A34A',
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
                    cursor: isTaken ? 'default' : 'pointer',
                    opacity: isTaken ? 0.9 : 1,
                  }}
                >
                  <CheckCircle2 size={24} />
                  <span>{isTaken ? t('doseTakenRecorded', 'Taken (Recorded)') : t('doseTaken', 'Taken')}</span>
                </button>

                {/* Remind Me Later - Orange */}
                <button
                  onClick={() => handleSnooze(15)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: '#EA580C',
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(234,88,12,0.25)',
                  }}
                >
                  <Clock size={24} />
                  <span>{t('remindMeLater', 'Remind Me Later')}</span>
                </button>

                {/* Need Help - Red */}
                <button
                  onClick={() => setShowHelpModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(220,38,38,0.25)',
                  }}
                >
                  <PhoneCall size={24} />
                  <span>{t('needHelp', 'Need Help')}</span>
                </button>
              </div>
            </div>

            {/* Snooze Options Card */}
            <div
              className="card-white"
              style={{
                padding: '18px 20px',
                borderRadius: '16px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#102A43',
                  marginBottom: '12px',
                }}
              >
                {t('snoozeOptions', 'Snooze Options')}
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { label: t('min15', '15 min'), val: 15 },
                  { label: t('min30', '30 min'), val: 30 },
                  { label: t('hour1', '1 hour'), val: 60 },
                ].map((opt) => {
                  const isSelected = selectedSnooze === opt.val;
                  return (
                    <button
                      key={opt.val}
                      onClick={() => handleSnooze(opt.val)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        textAlign: 'center',
                        border: isSelected ? '2px solid #0D9488' : '1px solid #CBD5E1',
                        backgroundColor: isSelected ? '#F0FDFA' : '#FFFFFF',
                        color: isSelected ? '#0D9488' : '#334155',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Help Confirmation Modal */}
      {showHelpModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16,42,67,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 1000,
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            className="card-white"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', marginBottom: '14px' }}>
              <AlertCircle size={24} />
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>Request Immediate Caregiver Help</h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
              This will send an instant urgent notification to your designated primary caregiver.
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Select or write reason:
              </label>
              <select
                value={helpReason}
                onChange={(e) => setHelpReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                <option value="Having difficulty with dosage instructions">Having difficulty with dosage instructions</option>
                <option value="Feeling unwell / dizziness after medication">Feeling unwell / dizziness after medication</option>
                <option value="Medicine ran out / cannot find bottle">Medicine ran out / cannot find bottle</option>
                <option value="Accidental double dose or skipped dose question">Accidental double dose question</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowHelpModal(false)}
                className="btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHelp}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Alert Caregiver Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="patient" />
    </div>
  );

  return content;
};
