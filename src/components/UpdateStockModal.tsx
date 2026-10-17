import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, RefreshCw, AlertTriangle } from 'lucide-react';

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMedicineId?: string;
}

export const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  isOpen,
  onClose,
  initialMedicineId,
}) => {
  const { medicines, updateStock } = useApp();

  const selectedMed =
    medicines.find((m) => m.id === initialMedicineId) ||
    medicines.find((m) => m.isLowStock) ||
    medicines[0];

  const [medicineId, setMedicineId] = useState(selectedMed?.id || '');
  const currentMed = medicines.find((m) => m.id === medicineId) || selectedMed;

  const [tablets, setTablets] = useState(currentMed ? String(currentMed.tabletsLeft) : '10');

  if (!isOpen || !currentMed) return null;

  const currentCount = parseInt(tablets) || 0;
  const estimatedDays = currentMed.dailyDose > 0 ? Math.floor(currentCount / currentMed.dailyDose) : 0;
  const isLow = currentCount <= 10;
  const isVeryLow = currentCount <= 5;

  const handleQuickAdd = (addCount: number) => {
    const nextVal = Math.max(0, currentCount + addCount);
    setTablets(String(nextVal));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStock(currentMed.id, currentCount);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
          maxWidth: '440px',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#102A43' }}>Update Medicine Stock</h2>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Adjust tablet count after refill or purchase</p>
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

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
              Select Medicine
            </label>
            <select
              value={medicineId}
              onChange={(e) => {
                setMedicineId(e.target.value);
                const target = medicines.find((m) => m.id === e.target.value);
                if (target) setTablets(String(target.tabletsLeft));
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.tabletsLeft} tablets left)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
              Current Count in Bottle / Strip
            </label>
            <input
              type="number"
              min="0"
              value={tablets}
              onChange={(e) => setTablets(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '18px',
                fontWeight: 700,
                color: '#102A43',
              }}
              required
            />
          </div>

          {/* Quick refill buttons */}
          <div>
            <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '6px' }}>
              Quick Add Refill:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleQuickAdd(10)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                +10 tablets
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(20)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                +20 tablets
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(30)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                +30 tablets
              </button>
            </div>
          </div>

          {/* Live calculation preview */}
          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              backgroundColor: isVeryLow ? '#FEF2F2' : isLow ? '#FFF7ED' : '#F0FDFA',
              border: `1px solid ${isVeryLow ? '#FEE2E2' : isLow ? '#FFEDD5' : '#CCFBF1'}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                Estimated Duration:
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#102A43' }}>
                ~ {estimatedDays} days left
              </span>
            </div>
            {isLow && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>
                <AlertTriangle size={14} />
                <span>{isVeryLow ? 'Critically low stock threshold reached' : 'Low stock warning active'}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-teal"
              style={{ flex: 1.5 }}
            >
              <RefreshCw size={15} /> Confirm Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
