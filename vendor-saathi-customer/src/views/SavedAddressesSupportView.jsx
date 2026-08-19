import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react';

export const SavedAddressesSupportView = () => {
  const { user, navigateTo, showToast, setIsVendorChatOpen } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '680px' }}>
      <button 
        onClick={() => navigateTo('profile')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Profile
      </button>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Saved Addresses</h2>
        {user.addresses.map(addr => (
          <div key={addr.id} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>{addr.tag}</strong>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{addr.address}</p>
          </div>
        ))}
      </div>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Help & Support</h2>
        <button onClick={() => setIsVendorChatOpen(true)} className="btn-primary" style={{ width: '100%', borderRadius: '12px' }}>
          💬 Chat with Customer Support
        </button>
      </div>
    </div>
  );
};
