import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const NotificationToast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      zIndex: 300,
      backgroundColor: toast.type === 'danger' ? '#ef4444' : '#15803d',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '13px',
      fontWeight: '600'
    }} className="animate-fade-in">
      <CheckCircle2 size={18} />
      <span>{toast.message}</span>
    </div>
  );
};
