import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, ArrowLeft } from 'lucide-react';

export const OffersView = () => {
  const { navigateTo, showToast } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button 
        onClick={() => navigateTo('home')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>🎉 Offers & Coupons</h1>

      <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ fontSize: '16px', color: '#0f172a' }}>Code: SAVE100</strong>
          <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>FLAT 10% OFF on orders above ₹499</span>
        </div>
        <button onClick={() => showToast('Coupon copied!')} className="btn-outline">Apply</button>
      </div>
    </div>
  );
};
