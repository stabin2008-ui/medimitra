import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, AlertTriangle, AlertCircle, Check } from 'lucide-react';

export const AlertsDrawer: React.FC = () => {
  const { 
    isAlertsDrawerOpen, 
    setIsAlertsDrawerOpen, 
    alerts, 
    acknowledgeAlert,
    medicines,
    timeline,
    setCurrentPage,
    t
  } = useApp();

  const [drawerTab, setDrawerTab] = useState<'alerts' | 'history'>('alerts');

  if (!isAlertsDrawerOpen) return null;

  const lowStockMeds = medicines.filter((m) => m.isLowStock);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1000,
        backdropFilter: 'blur(2px)',
      }}
      onClick={() => setIsAlertsDrawerOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-4px 0 25px rgba(16,42,67,0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#0D9488" />
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#102A43' }}>Notifications & Alerts</h2>
          </div>
          <button
            onClick={() => setIsAlertsDrawerOpen(false)}
            style={{ padding: '6px', color: '#64748B', borderRadius: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector: Alerts vs History */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <button
            onClick={() => setDrawerTab('alerts')}
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: '12.5px',
              fontWeight: drawerTab === 'alerts' ? 700 : 500,
              color: drawerTab === 'alerts' ? '#0D9488' : '#64748B',
              borderBottom: drawerTab === 'alerts' ? '2px solid #0D9488' : '2px solid transparent',
              backgroundColor: drawerTab === 'alerts' ? '#FFFFFF' : 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            Urgent Alerts ({alerts.filter((a) => !a.acknowledged).length + lowStockMeds.length})
          </button>
          <button
            onClick={() => setDrawerTab('history')}
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: '12.5px',
              fontWeight: drawerTab === 'history' ? 700 : 500,
              color: drawerTab === 'history' ? '#0D9488' : '#64748B',
              borderBottom: drawerTab === 'history' ? '2px solid #0D9488' : '2px solid transparent',
              backgroundColor: drawerTab === 'history' ? '#FFFFFF' : 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            History & Log ({timeline.length})
          </button>
        </div>

        {/* Content list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {drawerTab === 'history' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                System Reminders & Event History
              </div>
              {timeline.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '13px', padding: '20px' }}>No activity logged.</p>
              ) : (
                timeline.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <strong style={{ color: '#102A43' }}>{ev.title}</strong>
                      <span style={{ color: '#94A3B8', fontSize: '11px' }}>{ev.dateGroup} • {ev.time}</span>
                    </div>
                    <p style={{ color: '#64748B', margin: 0, lineHeight: 1.35 }}>
                      {ev.description || ev.medicineName}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : (
            <>
              {/* Section: Urgent Help Requests */}
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Urgent Patient Care Requests
              </div>

          {alerts.length === 0 ? (
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '12.5px', color: '#64748B' }}>
              No emergency assistance requests recorded.
            </div>
          ) : (
            alerts.map((al) => (
              <div
                key={al.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: al.acknowledged ? '#F8FAFC' : '#FEF2F2',
                  border: al.acknowledged ? '1px solid #E2E8F0' : '1px solid #FCA5A5',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={15} color={al.acknowledged ? '#64748B' : '#DC2626'} />
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#102A43' }}>
                      {al.patientName} (Help Request)
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{al.time}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#475569', marginBottom: '8px', lineHeight: 1.4 }}>
                  {al.message}
                </p>
                {!al.acknowledged ? (
                  <button
                    onClick={() => acknowledgeAlert(al.id)}
                    className="btn-teal"
                    style={{ padding: '5px 12px', fontSize: '11.5px', borderRadius: '6px' }}
                  >
                    <Check size={13} /> {t('acknowledge')}
                  </button>
                ) : (
                  <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
                    ✓ Acknowledged by caregiver
                  </span>
                )}
              </div>
            ))
          )}

          {/* Section: Low Stock Warnings */}
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '12px' }}>
            Inventory & Refill Alerts
          </div>

          {lowStockMeds.map((med) => (
            <div
              key={med.id}
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: med.isVeryLow ? '#FEF2F2' : '#FFF7ED',
                border: med.isVeryLow ? '1px solid #FEE2E2' : '1px solid #FFEDD5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} color={med.isVeryLow ? '#DC2626' : '#EA580C'} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#102A43' }}>
                    {med.name}
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px', display: 'block' }}>
                  {med.tabletsLeft} tablets remaining (~{med.estimatedDaysLeft} days left)
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('stock');
                  setIsAlertsDrawerOpen(false);
                }}
                className="btn-outline"
                style={{ padding: '5px 10px', fontSize: '11.5px', borderRadius: '6px' }}
              >
                Refill
              </button>
            </div>
          ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
