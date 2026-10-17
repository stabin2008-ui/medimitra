import React from 'react';
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
  ArrowLeftRight
} from 'lucide-react';

export const CaregiverDashboardPage: React.FC = () => {
  const { 
    medicines, 
    alerts, 
    setCurrentPage, 
    switchToPatient,
    setIsAlertsDrawerOpen 
  } = useApp();

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
          padding: '16px 20px',
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
            <Bell size={22} />
            {activeHelpRequests.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
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
                Linked Patients
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
                Unconfirmed
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
                Help Requests
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
                Low Stock
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

        {/* Your Patients Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '14px' }}>
            Your Patients
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src="/assets/avatar_ramesh.jpg"
                  alt="Ramesh profile"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #0D9488',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#102A43' }}>
                    Ramesh (You)
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#EA580C', fontWeight: 500 }}>
                    {unconfirmedReminders} unconfirmed • {lowStockCount} low stock
                  </p>
                </div>
              </div>

              <ChevronRight size={18} color="#94A3B8" />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src="/assets/avatar_lakshmi.jpg"
                  alt="Lakshmi profile"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #E2E8F0',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#102A43' }}>
                    Lakshmi
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#16A34A', fontWeight: 600 }}>
                    All good
                  </p>
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
          style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '12px' }}
        >
          View All Patients
        </button>

        {/* Safety Note */}
        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#F0FDFA', borderRadius: '10px', border: '1px solid #CCFBF1' }}>
          <p style={{ fontSize: '11.5px', color: '#0F766E', lineHeight: 1.4 }}>
            <strong>Consent-Protected:</strong> Caregivers only receive status updates authorized by patients. Unconfirmed reminders indicate pending confirmation, not guaranteed omission.
          </p>
        </div>
      </main>

      {/* Mobile Bottom Navigation for Caregiver */}
      <MobileBottomNav role="caregiver" />
    </div>
  );
};
