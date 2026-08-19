import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, User, ArrowLeft, Check } from 'lucide-react';

export const CheckoutView = () => {
  const { user, navigateTo, cart } = useApp();
  const [selectedAddrId, setSelectedAddrId] = useState('addr1');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button
        onClick={() => navigateTo('cart')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Cart
      </button>

      {/* Step Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>1</div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803d' }}>1. Address</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#cbd5e1', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>2</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>2. Payment</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#cbd5e1', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>3</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>3. Confirm</span>
        </div>
      </div>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Select Delivery Address</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {user.addresses.map(addr => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddrId(addr.id)}
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: selectedAddrId === addr.id ? '2px solid #16a34a' : '1px solid #e2e8f0',
                backgroundColor: selectedAddrId === addr.id ? '#f0fdf4' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a' }}>{addr.tag}</strong>
                <strong style={{ fontSize: '13px', color: '#334155', display: 'block', marginTop: '2px' }}>{addr.name}</strong>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{addr.address}</p>
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', marginTop: '2px', display: 'block' }}>+{addr.phone}</span>
              </div>
              {selectedAddrId === addr.id && <Check size={18} color="#16a34a" />}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigateTo('payment')}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }}
        >
          Deliver to This Address • ₹{total}
        </button>
      </div>
    </div>
  );
};
