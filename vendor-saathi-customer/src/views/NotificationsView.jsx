import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ArrowLeft } from 'lucide-react';

export const NotificationsView = () => {
  const { notifications, navigateTo } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button 
        onClick={() => navigateTo('profile')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Profile
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>🔔 Notifications</h1>

      {notifications.map(n => (
        <div key={n.id} className="vs-card" style={{ padding: '16px', borderRadius: '16px', marginBottom: '12px' }}>
          <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{n.title}</strong>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{n.body}</span>
        </div>
      ))}
    </div>
  );
};
