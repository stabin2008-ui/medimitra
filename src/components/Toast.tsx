import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgColors = {
    success: '#102A43',
    warning: '#9A3412',
    error: '#991B1B',
    info: '#0F766E',
  };

  const icons = {
    success: <CheckCircle2 size={18} color="#34D399" />,
    warning: <AlertTriangle size={18} color="#FDBA74" />,
    error: <AlertCircle size={18} color="#FCA5A5" />,
    info: <Info size={18} color="#5EEAD4" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: bgColors[toast.type],
        color: '#FFFFFF',
        padding: '12px 18px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '420px',
        fontSize: '14px',
        fontWeight: 500,
        animation: 'slideUp 0.25s ease-out',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {icons[toast.type]}
      <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
    </div>
  );
};
