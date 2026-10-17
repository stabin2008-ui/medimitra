import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { UpdateStockModal } from '../components/UpdateStockModal';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Info,
  Pill,
  Plus,
  PhoneCall,
  Globe
} from 'lucide-react';

export const StockRefillPage: React.FC = () => {
  const { 
    medicines, 
    setCurrentPage, 
    setIsEmergencyModalOpen,
    language,
    setLanguage,
    t 
  } = useApp();
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
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px 16px 32px 16px', maxWidth: '520px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#102A43' }}>
            {t('stockTrackerTitle', 'Stock & Refill Tracker')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '3px' }}>
            {t('liveEstimateSub', 'Live estimate based on your daily routine')}
          </p>
        </div>

        {medicines.length === 0 ? (
          <div className="card-white" style={{ padding: '36px 20px', textAlign: 'center', marginBottom: '24px' }}>
            <Pill size={36} color="#94A3B8" style={{ marginBottom: '12px' }} />
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
              No Medicines in Stock Tracker
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
          /* Stock Cards List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {medicines.map((med) => {
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
                      {med.tabletsLeft} {t('tabletsLeft', 'tablets left')}
                    </span>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                      {med.estimatedDaysLeft} {t('daysLeft', 'days left')}
                    </span>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#E2E8F0',
                      overflow: 'hidden',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: barColor,
                        borderRadius: '4px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Badges & Warning Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {isVeryLow ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#FEE2E2',
                            color: '#DC2626',
                          }}
                        >
                          {t('veryLowBadge', 'Very Low Stock')}
                        </span>
                      ) : isLow ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#FFEDD5',
                            color: '#EA580C',
                          }}
                        >
                          {t('lowStockBadge', 'Low Stock Warning')}
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
                          ✓ Sufficient supply
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMedId(med.id);
                        setIsUpdateModalOpen(true);
                      }}
                      style={{
                        fontSize: '12.5px',
                        color: '#0D9488',
                        fontWeight: 600,
                        backgroundColor: '#F0FDFA',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CCFBF1',
                      }}
                    >
                      {t('updateStock', 'Update Stock')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Update Stock Button */}
        <button
          onClick={() => {
            setSelectedMedId(undefined);
            setIsUpdateModalOpen(true);
          }}
          className="btn-teal"
          style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, marginBottom: '24px' }}
        >
          {t('updateStock', 'Update Stock Quantities')}
        </button>

        {/* Informational Disclaimer Card */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            backgroundColor: '#F0FDFA',
            border: '1px solid #CCFBF1',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Info size={16} color="#0D9488" style={{ marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '11.5px', color: '#0F766E', lineHeight: 1.4 }}>
            {t('stockDisclaimer', 'Stock estimates are calculated from your entered quantities. MediMitra CareLoop never automatically purchases or dispenses medicine.')}
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
