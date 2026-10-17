import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Save, AlertCircle } from 'lucide-react';
import type { Medicine } from '../types';

interface EditMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: Medicine | null;
}

export const EditMedicineModal: React.FC<EditMedicineModalProps> = ({ isOpen, onClose, medicine }) => {
  const { editMedicine, t } = useApp();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [doseTime, setDoseTime] = useState('');
  const [timePeriod, setTimePeriod] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [tabletsLeft, setTabletsLeft] = useState('30');
  const [dailyDose, setDailyDose] = useState('1');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (medicine) {
      setName(medicine.name);
      setDosage(medicine.dosage);
      setInstructions(medicine.instructions);
      setDoseTime(medicine.doseTime);
      setTimePeriod(medicine.timePeriod);
      setTabletsLeft(String(medicine.tabletsLeft));
      setDailyDose(String(medicine.dailyDose));
      setDetails(medicine.details || '');
    }
  }, [medicine]);

  if (!isOpen || !medicine) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a medicine name');
      return;
    }

    const stock = parseInt(tabletsLeft) || 0;
    const dose = parseFloat(dailyDose) || 1;

    editMedicine({
      ...medicine,
      name: name.trim(),
      dosage: dosage.trim() || 'Standard',
      instructions: instructions.trim(),
      doseTime: doseTime.trim(),
      timePeriod,
      tabletsLeft: stock,
      dailyDose: dose,
      details: details.trim() || `Take ${dose} dose with water as instructed.`,
    });

    onClose();
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
        zIndex: 1000,
        padding: '16px',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        className="card-white"
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#102A43' }}>{t('editMedicine')}</h2>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Update dosage instructions prescribed by doctor</p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#64748B',
              backgroundColor: '#F1F5F9',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
              Medicine Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Dosage / Strength
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Time of Day
              </label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Reminder Time
              </label>
              <input
                type="text"
                value={doseTime}
                onChange={(e) => setDoseTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Instructions
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Current Stock (Tablets)
              </label>
              <input
                type="number"
                min="0"
                value={tabletsLeft}
                onChange={(e) => setTabletsLeft(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
                Daily Doses Taken
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={dailyDose}
                onChange={(e) => setDailyDose(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
              Special Notes / Dietary Guidance
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ flex: 1 }}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn-teal"
              style={{ flex: 1.5 }}
            >
              <Save size={16} /> {t('saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
