import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/Sidebar';
import { TopHeaderBar } from '../components/TopHeaderBar';
import { 
  Clock, 
  Pill, 
  AlertTriangle, 
  Users,
  Heart,
  CheckCircle2,
  AlertCircle,
  Plus,
  BellRing,
  BellOff
} from 'lucide-react';
import { time12To24 } from '../utils/alarmUtils';

export const PatientDashboardPage: React.FC = () => {
  const { 
    medicines, 
    setCurrentPage, 
    currentUser, 
    healthCheck, 
    completeHealthCheck, 
    snoozeHealthCheck,
    updateMedicineAlarm,
    t 
  } = useApp();
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
              {t('goodMorning', 'Good Morning')}, {currentUser.name.split(' ')[0]} <span role="img" aria-label="wave">👋</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
              {currentUser.isDemoUser 
                ? "Here's your medication summary for today."
                : `Welcome to your personal MediMitra routine, ${currentUser.name}.`}
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                  {t('nextReminderCard', 'Next Reminder')}
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                {nextReminderMed ? nextReminderMed.doseTime : '08:30 AM'}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Today</div>
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                  {t('medicinesTodayCard', 'Medicines Today')}
                </span>
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                  {t('lowStockCard', 'Low Stock')}
                </span>
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                  {t('caregiversCard', 'Caregivers')}
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginBottom: '2px' }}>
                1
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Connected</div>
            </div>
          </div>

          {/* Daily Health Check-Up Widget (Issue 4) */}
          {healthCheck.enabled && (
            <div
              className="card-white"
              style={{
                padding: '20px 24px',
                marginBottom: '24px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #CCFBF1',
                boxShadow: '0 4px 15px rgba(13, 148, 136, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#F0FDFA',
                      color: '#0D9488',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Heart size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#102A43' }}>
                      {t('dailyHealthCheckupTitle', 'Daily Health Check-up')}
                    </h2>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      {t('scheduledFor', 'Scheduled for')} {healthCheck.reminderTime}
                    </span>
                  </div>
                </div>

                {healthCheck.status === 'completed' ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#DCFCE7',
                      color: '#16A34A',
                      fontSize: '12.5px',
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{t('dailyCheckInCompleted', 'Completed for today')} ({healthCheck.completedAt})</span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#FFF7ED',
                      color: '#EA580C',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    <AlertCircle size={15} />
                    <span>{t('dailyCheckInPending', 'Daily wellness check pending')}</span>
                  </div>
                )}
              </div>

              {healthCheck.status !== 'completed' ? (
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#102A43', marginBottom: '12px' }}>
                    {t('howAreYouFeeling', 'How are you feeling today?')}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => completeHealthCheck('great')}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        backgroundColor: '#F0FDF4',
                        border: '1.5px solid #BBF7D0',
                        color: '#16A34A',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {t('feelingGood', '😊 Feeling Good')}
                    </button>

                    <button
                      onClick={() => completeHealthCheck('okay')}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1.5px solid #CBD5E1',
                        color: '#334155',
                        fontWeight: 600,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {t('feelingOkay', '😐 Okay')}
                    </button>

                    <button
                      onClick={() => completeHealthCheck('need_help')}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        backgroundColor: '#FEF2F2',
                        border: '1.5px solid #FECACA',
                        color: '#DC2626',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {t('needAssistance', '⚠️ Need Assistance')}
                    </button>

                    <button
                      onClick={snoozeHealthCheck}
                      style={{
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        color: '#64748B',
                        cursor: 'pointer',
                        marginLeft: 'auto',
                      }}
                    >
                      {t('postponeCheckIn', 'Remind Later')}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>
                    Status recorded: <strong>{healthCheck.feeling === 'great' ? 'Feeling Good' : healthCheck.feeling === 'okay' ? 'Feeling Okay' : 'Requested Help'}</strong>
                  </span>
                  <span style={{ color: '#94A3B8' }}>•</span>
                  <span style={{ color: '#64748B', fontSize: '12px' }}>
                    Will automatically reset tomorrow morning.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Two-Column Main Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.4fr) minmax(280px, 1fr)',
              gap: '24px',
              alignItems: 'start',
            }}
            className="dashboard-two-col-grid"
          >
            {/* Left Column: Today's Schedule */}
            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43' }}>
                  {t('todaysScheduleTitle', "Today's Schedule")}
                </h2>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  {medicines.length} {t('sidebarReminders', 'Reminders')}
                </span>
              </div>

              {medicines.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
                  <Pill size={32} color="#94A3B8" style={{ marginBottom: '10px' }} />
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '14px' }}>
                    {t('noMedicinesYet', 'No medicines added yet. Add your first prescription to start your routine.')}
                  </p>
                  <button
                    onClick={() => setCurrentPage('medicines')}
                    className="btn-teal"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <Plus size={16} />
                    <span>{t('addNewMedicine', 'Add Medicine')}</span>
                  </button>
                </div>
              ) : (
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
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', width: '70px' }}>
                            {med.doseTime}
                          </span>
                          <div>
                            <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#102A43' }}>
                              {med.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              {med.instructions}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => {
                              const curTime = med.alarmTime || time12To24(med.doseTime || '08:30 AM');
                              updateMedicineAlarm(med.id, !med.alarmEnabled, curTime);
                            }}
                            title={med.alarmEnabled ? 'Alarm active. Click to toggle.' : 'Alarm off. Click to enable.'}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              backgroundColor: med.alarmEnabled ? '#F0FDFA' : '#F1F5F9',
                              color: med.alarmEnabled ? '#0D9488' : '#94A3B8',
                              border: `1px solid ${med.alarmEnabled ? '#99F6E4' : '#E2E8F0'}`,
                              cursor: 'pointer',
                            }}
                          >
                            {med.alarmEnabled ? <BellRing size={12} /> : <BellOff size={12} />}
                            <span>{med.alarmEnabled ? t('alarmOn', 'Alarm Active') : t('alarmOff', 'Alarm Off')}</span>
                          </button>

                          {isTaken ? (
                            <span className="badge-taken">{t('doseTakenRecorded', 'Taken')}</span>
                          ) : (
                            <span className="badge-pending">{t('sidebarReminders', 'Pending')}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => setCurrentPage('reminder')}
                className="btn-teal"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {t('nextReminderCard', "Open Today's Reminders")}
              </button>
            </div>

            {/* Right Column: Stock Overview & Activity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Medicine Stock Overview Card */}
              <div className="card-white" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43' }}>
                    {t('stockOverviewTitle', 'Medicine Stock Overview')}
                  </h2>
                  <button
                    onClick={() => setCurrentPage('stock')}
                    style={{ fontSize: '12.5px', color: '#0D9488', fontWeight: 600 }}
                  >
                    {t('viewAll', 'View All')}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {medicines.slice(0, 3).map((med) => (
                    <div
                      key={med.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                          {med.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          {med.estimatedDaysLeft} {t('daysLeft', 'days left')}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: med.isLowStock ? '#EA580C' : '#0D9488',
                        }}
                      >
                        {med.tabletsLeft} {t('tabletsLeft', 'tablets')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="card-white" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43' }}>
                    {t('recentActivityTitle', 'Recent Activity')}
                  </h2>
                  <button
                    onClick={() => setCurrentPage('timeline')}
                    style={{ fontSize: '12.5px', color: '#0D9488', fontWeight: 600 }}
                  >
                    {t('viewAll', 'View All')}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 600, color: '#102A43' }}>Metformin 500mg confirmed</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>08:32 AM • Taken after breakfast</div>
                  </div>
                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 600, color: '#102A43' }}>Caregiver sync active</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>Connected with Anitha Sharma</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
