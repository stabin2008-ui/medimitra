import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { AddMedicineModal } from '../components/AddMedicineModal';
import { EditMedicineModal } from '../components/EditMedicineModal';
import { UpdateStockModal } from '../components/UpdateStockModal';
import type { Medicine } from '../types';
import { 
  ArrowLeft, 
  Plus, 
  MoreVertical, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  Edit,
  AlertCircle
} from 'lucide-react';

export const MyMedicinesPage: React.FC = () => {
  const { 
    medicines, 
    deleteMedicine, 
    setCurrentPage 
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [selectedStockMedId, setSelectedStockMedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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

        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0D9488',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(13,148,136,0.3)',
          }}
          aria-label="Add new medicine"
          title="Add New Medicine"
        >
          <Plus size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px 16px', maxWidth: '580px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#102A43' }}>
              My Medicines
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
              Active doctor prescriptions and daily reminders
            </p>
          </div>
          <span
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#0D9488',
              backgroundColor: '#F0FDFA',
              padding: '4px 10px',
              borderRadius: '20px',
              border: '1px solid #CCFBF1',
            }}
          >
            {medicines.length} Prescribed
          </span>
        </div>

        {/* Medicines List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {medicines.map((med) => {
            const isLow = med.tabletsLeft <= 10;
            const isMenuOpen = activeMenuId === med.id;

            return (
              <div
                key={med.id}
                className="card-white"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  position: 'relative',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                {/* Left: Thumbnail & Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  {/* Medicine Thumbnail */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={med.image}
                      alt={med.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Name and timing */}
                  <div>
                    <h2 style={{ fontSize: '15.5px', fontWeight: 700, color: '#102A43', marginBottom: '3px' }}>
                      {med.name}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748B' }}>
                      {med.instructions} • <span style={{ color: '#0D9488', fontWeight: 600 }}>{med.doseTime}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Remaining count and 3-dots menu */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isLow ? '#DC2626' : '#16A34A',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {med.tabletsLeft} tablets left
                  </span>

                  <button
                    onClick={() => setActiveMenuId(isMenuOpen ? null : med.id)}
                    style={{
                      padding: '6px',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Actions menu"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '16px',
                      marginTop: '4px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(16,42,67,0.15)',
                      border: '1px solid #E2E8F0',
                      padding: '6px',
                      zIndex: 30,
                      minWidth: '170px',
                    }}
                  >
                    <button
                      onClick={() => {
                        setEditingMedicine(med);
                        setActiveMenuId(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#334155',
                        borderRadius: '6px',
                        textAlign: 'left',
                      }}
                    >
                      <Edit size={14} color="#0D9488" />
                      <span>Edit Routine</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedStockMedId(med.id);
                        setActiveMenuId(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#334155',
                        borderRadius: '6px',
                        textAlign: 'left',
                      }}
                    >
                      <RefreshCw size={14} color="#0D9488" />
                      <span>Update Stock</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage('reminder');
                        setActiveMenuId(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#334155',
                        borderRadius: '6px',
                        textAlign: 'left',
                      }}
                    >
                      <ExternalLink size={14} color="#2563EB" />
                      <span>View Reminder</span>
                    </button>

                    <button
                      onClick={() => {
                        setDeleteConfirmId(med.id);
                        setActiveMenuId(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#DC2626',
                        borderRadius: '6px',
                        textAlign: 'left',
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Demo Disclaimer */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: '#F0FDFA',
            borderRadius: '12px',
            border: '1px solid #CCFBF1',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <AlertCircle size={17} color="#0D9488" style={{ marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '12px', color: '#0F766E', lineHeight: 1.45 }}>
            <strong>Healthcare Advisory:</strong> Sample medications are shown for demonstration. Never alter prescribed routines without consulting your doctor or pharmacist.
          </p>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
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
              maxWidth: '380px',
              width: '100%',
              padding: '24px',
              borderRadius: '16px',
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#102A43', marginBottom: '8px' }}>
              Confirm Removal
            </h3>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '18px' }}>
              Are you sure you want to remove this medication from your daily routine?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-outline"
                style={{ flex: 1 }}
              >
                Keep
              </button>
              <button
                onClick={() => {
                  deleteMedicine(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      <AddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Edit Medicine Modal */}
      <EditMedicineModal
        isOpen={!!editingMedicine}
        medicine={editingMedicine}
        onClose={() => setEditingMedicine(null)}
      />

      {/* Update Stock Modal */}
      {selectedStockMedId && (
        <UpdateStockModal
          isOpen={!!selectedStockMedId}
          onClose={() => setSelectedStockMedId(null)}
          initialMedicineId={selectedStockMedId}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="patient" />
    </div>
  );
};
