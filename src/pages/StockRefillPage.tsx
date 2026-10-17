import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { UpdateStockModal } from '../components/UpdateStockModal';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Info
} from 'lucide-react';

export const StockRefillPage: React.FC = () => {
  const { medicines, setCurrentPage } = useApp();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState<string | undefined>(undefined);

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F5F8FB',
      }}
    >
      {/* Top Header */}
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

        <button
          onClick={() => setIsUpdateModalOpen(true)}
          style={{
            padding: '6px',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Options"
        >
          <MoreHorizontal size={22} />
        </button>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px 16px 32px 16px', maxWidth: '520px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#102A43' }}>
            Stock & Refill Tracker
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>
            Live estimate based on your daily routine
          </p>
        </div>

        {/* Stock Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {medicines.map((med) => {
            // Calculate progress bar percentage (relative to standard ~30 day supply)
            const percentage = Math.min(100, Math.max(8, (med.tabletsLeft / 30) * 100));
            const isVeryLow = med.tabletsLeft <= 5;
            const isLow = med.tabletsLeft <= 10;

            const barColor = isVeryLow ? '#DC2626' : isLow ? '#EA580C' : '#0D9488';

            return (
              <div
                key={med.id}
                className="card-white"
                style={{
                  padding: '18px 20px',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease',
                }}
                onClick={() => {
                  setSelectedMedId(med.id);
                  setIsUpdateModalOpen(true);
                }}
              >
                {/* Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43' }}>
                    {med.name}
                  </h2>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Tap to update</span>
                </div>

                {/* Numbers row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: isVeryLow ? '#DC2626' : isLow ? '#EA580C' : '#16A34A',
                    }}
                  >
                    {med.tabletsLeft} tablets left
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                    {med.estimatedDaysLeft} days left
                  </span>
                </div>

                {/* Horizontal Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '7px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    marginBottom: isLow ? '12px' : '0',
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: barColor,
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>

                {/* Warning Badge if Low or Very Low */}
                {isVeryLow && (
                  <div>
                    <span
                      style={{
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        border: '1px solid #FEE2E2',
                        display: 'inline-block',
                      }}
                    >
                      Very Low
                    </span>
                  </div>
                )}
                {!isVeryLow && isLow && (
                  <div>
                    <span
                      style={{
                        backgroundColor: '#FFF7ED',
                        color: '#EA580C',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        border: '1px solid #FFEDD5',
                        display: 'inline-block',
                      }}
                    >
                      Low Stock
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Update Stock Button */}
        <button
          onClick={() => {
            setSelectedMedId(undefined);
            setIsUpdateModalOpen(true);
          }}
          className="btn-teal"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '12px',
            marginBottom: '20px',
          }}
        >
          Update Stock
        </button>

        {/* Clinical Disclaimer */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#F0FDFA',
            borderRadius: '10px',
            border: '1px solid #CCFBF1',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <Info size={16} color="#0D9488" style={{ marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '11.5px', color: '#0F766E', lineHeight: 1.4 }}>
            Stock estimates are calculated from your entered quantities. MediMitra CareLoop never automatically purchases or dispenses medicine.
          </p>
        </div>
      </main>

      {/* Modal */}
      <UpdateStockModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        initialMedicineId={selectedMedId}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="patient" />
    </div>
  );

  return content;
};
