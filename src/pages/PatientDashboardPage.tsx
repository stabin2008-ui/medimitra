import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/Sidebar';
import { TopHeaderBar } from '../components/TopHeaderBar';
import { 
  Clock, 
  Pill, 
  AlertTriangle, 
  Users
} from 'lucide-react';

export const PatientDashboardPage: React.FC = () => {
  const { medicines, setCurrentPage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const lowStockCount = medicines.filter((m) => m.isLowStock).length;
  const nextReminderMed = medicines.find((m) => m.status === 'Pending') || medicines[0];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F8FB' }}>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div style={{ display: 'none', minHeight: '100vh' }} className="desktop-sidebar-container">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(16,42,67,0.5)',
            display: 'flex',
          }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div style={{ width: '260px', height: '100%' }} onClick={(e) => e.stopPropagation()}>
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopHeaderBar onToggleSidebar={() => setMobileSidebarOpen(true)} />

        <div style={{ padding: '24px 28px', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          {/* Welcome Area */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Good Morning, Ramesh <span role="img" aria-label="wave">👋</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
              Here's your medication summary for today.
            </p>
          </div>

          {/* Four Summary Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {/* Card 1: Next Reminder */}
            <div
              className="card-white"
              style={{ padding: '18px 20px', cursor: 'pointer' }}
              onClick={() => setCurrentPage('reminder')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={19} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Next Reminder</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                {nextReminderMed ? nextReminderMed.doseTime : '08:30 AM'}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Today, 25 May</div>
            </div>

            {/* Card 2: Medicines Today */}
            <div
              className="card-white"
              style={{ padding: '18px 20px', cursor: 'pointer' }}
              onClick={() => setCurrentPage('medicines')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Pill size={19} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Medicines Today</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                {medicines.length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Scheduled</div>
            </div>

            {/* Card 3: Low Stock */}
            <div
              className="card-white"
              style={{ padding: '18px 20px', cursor: 'pointer' }}
              onClick={() => setCurrentPage('stock')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#FFF7ED',
                    color: '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AlertTriangle size={19} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Low Stock</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                {lowStockCount}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Medicines</div>
            </div>

            {/* Card 4: Caregivers */}
            <div
              className="card-white"
              style={{ padding: '18px 20px', cursor: 'pointer' }}
              onClick={() => setCurrentPage('caregiver')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#F0FDF4',
                    color: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={19} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Caregivers</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                1
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Connected</div>
            </div>
          </div>

          {/* Two-Column Main Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.4fr) minmax(280px, 1fr)',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Today's Schedule */}
            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43' }}>Today's Schedule</h2>
                <span style={{ fontSize: '12px', color: '#64748B' }}>5 Reminders</span>
              </div>

              {/* Vertical Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                {medicines.map((med, index) => {
                  const isTaken = med.status === 'Taken';
                  return (
                    <div
                      key={med.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: index < medicines.length - 1 ? '16px' : '0',
                        borderBottom: index < medicines.length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Dot indicator */}
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: isTaken ? '#16A34A' : '#0D9488',
                            boxShadow: isTaken ? '0 0 0 3px #DCFCE7' : '0 0 0 3px #CCFBF1',
                            flexShrink: 0,
                          }}
                        />

                        {/* Time */}
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', width: '70px' }}>
                          {med.doseTime}
                        </span>

                        {/* Medicine Name & Instructions */}
                        <div>
                          <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#102A43' }}>
                            {med.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {med.instructions}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isTaken ? (
                          <span className="badge-taken">Taken</span>
                        ) : (
                          <span className="badge-pending">Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Reminders Action */}
              <button
                onClick={() => setCurrentPage('reminder')}
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                View All Reminders
              </button>
            </div>

            {/* Right Column: Medicine Stock Overview + Recent Activity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Medicine Stock Overview */}
              <div className="card-white" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43' }}>
                    Medicine Stock Overview
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {medicines.slice(0, 3).map((med) => (
                    <div
                      key={med.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13.5px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Pill size={15} color="#64748B" />
                        <span style={{ fontWeight: 600, color: '#102A43' }}>{med.name}</span>
                      </div>
                      <span
                        style={{
                          fontWeight: 600,
                          color: med.isVeryLow ? '#DC2626' : med.isLowStock ? '#EA580C' : '#16A34A',
                        }}
                      >
                        {med.tabletsLeft} tablets left
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage('stock')}
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '13px' }}
                >
                  View Stock & Refills
                </button>
              </div>

              {/* Recent Activity */}
              <div className="card-white" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43' }}>
                    Recent Activity
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {/* Item 1 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#0D9488',
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, color: '#102A43' }}>Medicine taken</span>
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>08:30 AM</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>Metformin 500mg</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#16A34A',
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, color: '#102A43' }}>All medicines taken</span>
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>Yesterday</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>Great job!</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#2563EB',
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, color: '#102A43' }}>Refill updated</span>
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>23 May</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>Telmisartan 40mg</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('timeline')}
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '13px' }}
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-sidebar-container {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
