import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  X,
  PhoneCall,
  Globe
} from 'lucide-react';
import type { LanguageCode } from '../types';

export const PatientTimelinePage: React.FC = () => {
  const { 
    timeline, 
    medicines, 
    alerts, 
    setCurrentPage, 
    t,
    language,
    setLanguage,
    openEmergencyModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Timeline' | 'Medicines' | 'Stock' | 'Alerts'>('Timeline');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Group events by date
  const todayEvents = timeline.filter((e) => e.dateGroup === 'Today');
  const yesterdayEvents = timeline.filter((e) => e.dateGroup === 'Yesterday');
  const pastEvents = timeline.filter((e) => e.dateGroup !== 'Today' && e.dateGroup !== 'Yesterday');

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F5F8FB',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setCurrentPage('caregiver')}
            style={{
              padding: '6px',
              color: '#102A43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Back to caregiver overview"
          >
            <ArrowLeft size={22} />
          </button>

          <div onClick={() => setCurrentPage('dashboard')} style={{ cursor: 'pointer' }}>
            <Logo variant="navy" size="sm" />
          </div>
        </div>

        {/* Header Actions: Emergency + Language Selector + Profile Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={openEmergencyModal}
            className="btn-danger-emergency"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(220,38,38,0.25)',
            }}
            aria-label="Emergency SOS 112"
          >
            <PhoneCall size={14} />
            <span>112</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '20px' }}>
            <Globe size={13} color="#0D9488" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '12px',
                fontWeight: 600,
                color: '#102A43',
                cursor: 'pointer',
                outline: 'none',
                padding: '2px',
              }}
              aria-label="Select Language"
            >
              <option value="en">EN</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            style={{
              padding: '6px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Patient options"
          >
            <MoreHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px 16px 32px 16px', maxWidth: '520px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Patient Profile Summary Card */}
        <div
          className="card-white"
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '16px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/assets/avatar_ramesh.jpg"
              alt="Ramesh profile"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #0D9488',
              }}
            />
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#102A43', lineHeight: 1.2 }}>
                Ramesh
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                64 yrs, Male
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            className="btn-outline"
            style={{
              padding: '6px 14px',
              fontSize: '12.5px',
              borderRadius: '20px',
              borderColor: '#0D9488',
              color: '#0D9488',
              fontWeight: 600,
            }}
          >
            {t('viewProfile')}
          </button>
        </div>

        {/* Four Tabs: Timeline, Medicines, Stock, Alerts */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px 12px 0 0',
            padding: '0 8px',
          }}
        >
          {(['Timeline', 'Medicines', 'Stock', 'Alerts'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const tabKey = tab === 'Timeline' ? 'tabTimeline' : tab === 'Medicines' ? 'tabMedicines' : tab === 'Stock' ? 'tabStock' : 'tabAlerts';
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '12px 6px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0D9488' : '#64748B',
                  textAlign: 'center',
                  borderBottom: isActive ? '2.5px solid #0D9488' : '2.5px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {t(tabKey, tab)}
              </button>
            );
          })}
        </div>

        {/* Tab Content: Timeline */}
        {activeTab === 'Timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Section: Today */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '12px',
                }}
              >
                {t('todayLabel', 'Today')}
              </span>

              <div
                className="card-white"
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {todayEvents.map((ev, idx) => (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: idx < todayEvents.length - 1 ? '12px' : 0,
                      borderBottom: idx < todayEvents.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          backgroundColor: ev.status === 'Taken' ? '#16A34A' : '#0D9488',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', width: '70px' }}>
                        {ev.time}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                        {ev.medicineName || ev.title}
                      </span>
                    </div>

                    <div>
                      {ev.status === 'Taken' ? (
                        <span style={{ color: '#16A34A', fontSize: '12.5px', fontWeight: 700 }}>
                          {t('doseTaken', 'Taken')}
                        </span>
                      ) : (
                        <span style={{ color: '#EA580C', fontSize: '12.5px', fontWeight: 700 }}>
                          {t('dailyCheckInPending', 'Pending')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Yesterday */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '12px',
                }}
              >
                {t('yesterdayLabel', 'Yesterday')}
              </span>

              <div
                className="card-white"
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                }}
              >
                {yesterdayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          backgroundColor: '#0D9488',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', width: '70px' }}>
                        {ev.time}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                        {ev.medicineName || ev.title}
                      </span>
                    </div>

                    <span style={{ color: '#16A34A', fontSize: '12.5px', fontWeight: 700 }}>
                      Taken
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: 23 May */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '12px',
                }}
              >
                23 May
              </span>

              <div
                className="card-white"
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                }}
              >
                {pastEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        border: '2px solid #0D9488',
                        marginTop: '4px',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#102A43' }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                        {ev.medicineName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Medicines */}
        {activeTab === 'Medicines' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {medicines.map((m) => (
              <div key={m.id} className="card-white" style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#102A43' }}>{m.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{m.instructions} ({m.doseTime})</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: m.isLowStock ? '#DC2626' : '#16A34A' }}>
                  {m.tabletsLeft} tablets left
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Stock */}
        {activeTab === 'Stock' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {medicines.map((m) => (
              <div key={m.id} className="card-white" style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#102A43' }}>{m.name}</span>
                  <span style={{ fontSize: '12.5px', color: '#64748B' }}>~ {m.estimatedDaysLeft} days left</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (m.tabletsLeft / 30) * 100)}%`, height: '100%', backgroundColor: m.isLowStock ? '#DC2626' : '#0D9488' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Alerts */}
        {activeTab === 'Alerts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alerts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>No alert events recorded.</p>
            ) : (
              alerts.map((al) => (
                <div key={al.id} className="card-white" style={{ padding: '14px 16px', borderLeft: '4px solid #DC2626' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#102A43' }}>Urgent Care Alert</span>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{al.time}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569' }}>{al.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Patient Profile Modal */}
      {showProfileModal && (
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
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#102A43' }}>{t('patientHealthProfile', 'Patient Health Profile')}</h2>
              <button onClick={() => setShowProfileModal(false)} style={{ color: '#64748B', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <img
                src="/assets/avatar_ramesh.jpg"
                alt="Ramesh"
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43' }}>Ramesh Kumar</h3>
                <p style={{ fontSize: '13px', color: '#64748B' }}>Age 64 • Male • Blood Group O+</p>
                <p style={{ fontSize: '12px', color: '#0D9488', fontWeight: 600 }}>Emergency Contact: Anitha (Daughter)</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <strong>Prescribing Physician:</strong> Dr. V. Sharma (Internal Medicine)
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <strong>Preferred Pharmacy:</strong> Apollo Meds, Indiranagar
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <strong>Known Allergies:</strong> None reported
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="btn-teal"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {t('closeProfile', 'Close Profile')}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation for Caregiver */}
      <MobileBottomNav role="caregiver" />
    </div>
  );

  return content;
};
