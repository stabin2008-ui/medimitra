import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, ShieldAlert, X, AlertTriangle, PhoneForwarded } from 'lucide-react';

interface EmergencyNumber {
  id: string;
  number: string;
  nameKey: string;
  descKey: string;
  color: string;
}

const EMERGENCY_NUMBERS: EmergencyNumber[] = [
  {
    id: '112',
    number: '112',
    nameKey: 'emergency112Label',
    descKey: 'emergency112Desc',
    color: '#DC2626',
  },
  {
    id: '100',
    number: '100',
    nameKey: 'emergency100Label',
    descKey: 'emergency100Desc',
    color: '#0284C7',
  },
  {
    id: '108',
    number: '108',
    nameKey: 'emergency108Label',
    descKey: 'emergency108Desc',
    color: '#0D9488',
  },
];

export const EmergencyCallModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, t } = useApp();
  const [confirmTarget, setConfirmTarget] = useState<EmergencyNumber | null>(null);

  if (!isEmergencyModalOpen) return null;

  const handleSelectNumber = (num: EmergencyNumber) => {
    setConfirmTarget(num);
  };

  const handleExecuteCall = () => {
    if (confirmTarget) {
      // Initiate telephone dialer link
      window.location.href = `tel:${confirmTarget.number}`;
      setConfirmTarget(null);
      setIsEmergencyModalOpen(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 1100,
        backdropFilter: 'blur(4px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-dialog-title"
    >
      <div
        className="card-white"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '24px',
          borderRadius: '18px',
          boxShadow: '0 20px 45px rgba(16, 42, 67, 0.25)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DC2626',
              }}
            >
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 id="emergency-dialog-title" style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>
                {t('emergencyModalTitle', 'Emergency Assistance (India)')}
              </h2>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Official National Helplines
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEmergencyModalOpen(false);
              setConfirmTarget(null);
            }}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close emergency modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Number List */}
        {!confirmTarget ? (
          <div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
              Tap any official service below to connect with Indian emergency response. You will be asked to confirm before the call is placed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {EMERGENCY_NUMBERS.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectNumber(service)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    boxShadow: '0 2px 6px rgba(16,42,67,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = service.color;
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: service.color,
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '16px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {service.number}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                        {t(service.nameKey, service.id === '112' ? 'National Integrated Emergency' : service.id === '100' ? 'Police Emergency' : 'Ambulance & Medical')}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {service.id === '112' ? 'Police, Fire, Medical (All-in-one)' : service.id === '100' ? 'Direct Police Assistance' : 'National Health Mission Ambulance'}
                      </div>
                    </div>
                  </div>
                  <PhoneCall size={18} color={service.color} />
                </button>
              ))}
            </div>

            {/* Desktop explanation */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '11.5px',
                color: '#64748B',
                lineHeight: 1.4,
              }}
            >
              {t('desktopCallingNotice', 'On desktop devices, dialing depends on your default calling software (e.g. Phone Link, Skype, or FaceTime).')}
            </div>
          </div>
        ) : (
          /* Step 2: Confirmation step to prevent accidental calls */
          <div>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FEE2E2',
                marginBottom: '18px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <AlertTriangle size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#991B1B', marginBottom: '4px' }}>
                  {t('confirmCallTitle', 'Confirm Emergency Call')}
                </h3>
                <p style={{ fontSize: '13px', color: '#7F1D1D', lineHeight: 1.4 }}>
                  {t('confirmCallPrompt', `Are you sure you want to call ${confirmTarget.number}? This will initiate a call through your phone.`)}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirmTarget(null)}
                className="btn-outline"
                style={{ flex: 1, padding: '12px' }}
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={handleExecuteCall}
                style={{
                  flex: 1.5,
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: confirmTarget.color,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.25)',
                }}
              >
                <PhoneForwarded size={18} />
                <span>{t('callNowButton', `Call ${confirmTarget.number} Now`)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
