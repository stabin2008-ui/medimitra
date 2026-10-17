import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { 
  ArrowLeft, 
  Bell, 
  Users, 
  Clock, 
  HelpCircle, 
  AlertTriangle, 
  ChevronRight, 
  ArrowLeftRight,
  PhoneCall,
  Globe,
  ShieldCheck,
  Bot,
  Send,
  PhoneForwarded
} from 'lucide-react';

export const CaregiverDashboardPage: React.FC = () => {
  const { 
    medicines, 
    alerts, 
    setCurrentPage, 
    switchToPatient,
    setIsAlertsDrawerOpen,
    setIsEmergencyModalOpen,
    language,
    setLanguage,
    t,
    openAiVoiceModal,
    sendCaregiverNudge
  } = useApp();

  const [directCallConfirm, setDirectCallConfirm] = useState(false);

  const unconfirmedReminders = medicines.filter((m) => m.status === 'Pending').length;
  const lowStockCount = medicines.filter((m) => m.isLowStock).length;
  const activeHelpRequests = alerts.filter((a) => !a.acknowledged);

  return (
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
        }}
      >
        <button
          onClick={() => setCurrentPage('dashboard')}
          style={{
            padding: '6px',
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
          {/* Emergency SOS */}
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

          {/* Language Toggle */}
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
            onClick={() => setIsAlertsDrawerOpen(true)}
            style={{
              position: 'relative',
              padding: '6px',
              color: '#102A43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="View caregiver alerts"
          >
            <Bell size={20} />
            {activeHelpRequests.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#DC2626',
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF',
                }}
              />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px 16px 32px 16px', maxWidth: '580px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Welcome Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Good Morning, Anitha <span role="img" aria-label="wave">👋</span>
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
              Here's your care overview.
            </p>
          </div>

          <button
            onClick={switchToPatient}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ArrowLeftRight size={13} color="#0D9488" />
            <span>Patient View</span>
          </button>
        </div>

        {/* 2x2 Summary Stat Cards Grid matching reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {/* Card 1: Linked Patients */}
          <div
            className="card-white"
            style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
            onClick={() => setCurrentPage('timeline')}
          >
            <div style={{ color: '#2563EB' }}>
              <Users size={20} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', fontWeight: 500 }}>
                {t('linkedPatientsTitle', 'Linked Patients')}
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginTop: '2px' }}>
                2
              </div>
            </div>
          </div>

          {/* Card 2: Unconfirmed */}
          <div
            className="card-white"
            style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
            onClick={() => setCurrentPage('timeline')}
          >
            <div style={{ color: '#EA580C' }}>
              <Clock size={20} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', fontWeight: 500 }}>
                {t('unconfirmedRemindersTitle', 'Unconfirmed')}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#102A43' }}>
                  {unconfirmedReminders}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Reminders</span>
              </div>
            </div>
          </div>

          {/* Card 3: Help Requests */}
          <div
            className="card-white"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              cursor: 'pointer',
              borderColor: activeHelpRequests.length > 0 ? '#FCA5A5' : '#E2E8F0',
              backgroundColor: activeHelpRequests.length > 0 ? '#FFF5F5' : '#FFFFFF',
            }}
            onClick={() => setIsAlertsDrawerOpen(true)}
          >
            <div style={{ color: activeHelpRequests.length > 0 ? '#DC2626' : '#0D9488' }}>
              <HelpCircle size={20} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', fontWeight: 500 }}>
                {t('helpRequestsTitle', 'Help Requests')}
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: activeHelpRequests.length > 0 ? '#DC2626' : '#102A43', marginTop: '2px' }}>
                {activeHelpRequests.length}
              </div>
            </div>
          </div>

          {/* Card 4: Low Stock */}
          <div
            className="card-white"
            style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
            onClick={() => setCurrentPage('stock')}
          >
            <div style={{ color: '#DC2626' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', fontWeight: 500 }}>
                {t('lowStockAlertsTitle', 'Low Stock')}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#102A43' }}>
                  {lowStockCount}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* CareLoop Active Follow-Up Workflow Section (Hackathon 90+ Improvement) */}
        {unconfirmedReminders > 0 && (
          <div
            className="card-white"
            style={{
              padding: '16px 18px',
              borderRadius: '16px',
              border: '1.5px solid #FED7AA',
              backgroundColor: '#FFFBF5',
              marginBottom: '24px',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.08)',
            }}
          >
            {/* Header with Title and Verified Patient Consent Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#FFEDD5',
                    color: '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={16} />
                </div>
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#9A3412', margin: 0 }}>
                    {t('careloopFollowUpTitle', 'CareLoop Follow-Up Required')}
                  </h2>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: '1px solid #BBF7D0',
                }}
                title="Authorized caregiver link established under security rules"
              >
                <ShieldCheck size={12} />
                <span>CL-AUTH-7821</span>
              </span>
            </div>

            <p style={{ fontSize: '12.5px', color: '#7C2D12', margin: '0 0 12px 0', lineHeight: 1.45 }}>
              <strong>Ramesh Kumar</strong> has 1 unconfirmed morning dose (<strong>Metformin 500mg</strong> - 8:00 AM). Scheduled dose time is past adherence window with no confirmation logged.
            </p>

            {/* 3 Explicit Caregiver Follow-Up Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              <button
                onClick={() => sendCaregiverNudge('Ramesh Kumar', 'Metformin 500mg')}
                className="btn-outline"
                style={{
                  padding: '8px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  borderColor: '#EA580C',
                  color: '#EA580C',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
                title="Send immediate reminder alert to patient's app"
              >
                <Send size={13} />
                <span>{t('sendInAppPing', 'Send Nudge')}</span>
              </button>

              <button
                onClick={() => openAiVoiceModal({
                  patientName: 'Ramesh Kumar',
                  medicineName: 'Metformin 500mg',
                  doseTime: '08:00 AM',
                  patientPhone: '+91 98765 43210',
                  medicineId: 'med-1'
                })}
                className="btn-teal"
                style={{
                  padding: '8px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
                title="Open interactive AI Voice Assistant Demo"
              >
                <Bot size={14} />
                <span>{t('aiVoiceDemoBtn', 'AI Voice Call (Demo)')}</span>
              </button>

              <button
                onClick={() => setDirectCallConfirm(true)}
                className="btn-outline"
                style={{
                  padding: '8px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  borderColor: '#CBD5E1',
                  color: '#102A43',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
                title="Call Ramesh Kumar's phone directly with confirmation"
              >
                <PhoneCall size={13} color="#0D9488" />
                <span>{t('directCallBtn', 'Direct Call')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Your Patients Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '14px' }}>
            {t('linkedPatientsTitle', 'Your Patients')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Patient Card 1: Ramesh */}
            <div
              className="card-white"
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onClick={() => setCurrentPage('timeline')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="/assets/avatar_ramesh.jpg"
                  alt="Ramesh Kumar Avatar"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#102A43' }}>
                    Ramesh Kumar (Father)
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                    {unconfirmedReminders > 0 ? `${unconfirmedReminders} unconfirmed` : 'All taken'} • {lowStockCount > 0 ? `${lowStockCount} low stock` : 'Good stock'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeHelpRequests.length > 0 && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#FEE2E2',
                      color: '#DC2626',
                      padding: '3px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    Help Needed
                  </span>
                )}
                <ChevronRight size={18} color="#94A3B8" />
              </div>
            </div>

            {/* Patient Card 2: Lakshmi */}
            <div
              className="card-white"
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '14px',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentPage('timeline')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="/assets/avatar_lakshmi.jpg"
                  alt="Lakshmi Devi Avatar"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#102A43' }}>
                    Lakshmi Devi (Mother)
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>
                    {t('allGood', 'All good')} • Morning doses complete
                  </div>
                </div>
              </div>

              <ChevronRight size={18} color="#94A3B8" />
            </div>
          </div>
        </div>

        {/* View All Patients Button */}
        <button
          onClick={() => setCurrentPage('timeline')}
          className="btn-outline"
          style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}
        >
          {t('viewAll', 'View Detailed Patient History')}
        </button>
      </main>

      {/* Direct Phone Call Safety Confirmation Modal */}
      {directCallConfirm && (
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
            backdropFilter: 'blur(3px)',
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card-white"
            style={{
              maxWidth: '400px',
              width: '100%',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#F0FDFA',
                color: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <PhoneForwarded size={22} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#102A43', marginBottom: '8px' }}>
              Confirm Phone Call to Ramesh Kumar
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '18px', lineHeight: 1.4 }}>
              Are you sure you want to dial <strong>+91 98765 43210</strong> to follow up regarding the pending Metformin dose?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => setDirectCallConfirm(false)}
                className="btn-outline"
                style={{ padding: '10px', justifyContent: 'center', fontSize: '13px' }}
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={() => {
                  window.location.href = 'tel:+919876543210';
                  setDirectCallConfirm(false);
                }}
                className="btn-teal"
                style={{ padding: '10px', justifyContent: 'center', fontSize: '13px' }}
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation for Caregiver */}
      <MobileBottomNav role="caregiver" />
    </div>
  );
};
