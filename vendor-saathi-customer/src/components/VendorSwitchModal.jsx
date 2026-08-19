import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Trash2, X } from 'lucide-react';

export const VendorSwitchModal = () => {
  const { isVendorSwitchModalOpen, setIsVendorSwitchModalOpen, pendingVendorConflict, clearCartAndAddVendorProduct, setIsCartDrawerOpen } = useApp();

  if (!isVendorSwitchModalOpen || !pendingVendorConflict) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 220, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '10px', borderRadius: '50%' }}>
              <ShieldAlert size={24} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>Single Vendor Order Limit</h3>
          </div>
          <button onClick={() => setIsVendorSwitchModalOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
          ⚠️ Your cart currently contains items from <strong>{pendingVendorConflict.currentVendorName}</strong>.
          <br /><br />
          VendorSaathi enforces <strong>one vendor per order</strong> to ensure fast local village fulfillment. Would you like to clear cart and start order with <strong>{pendingVendorConflict.newVendorName}</strong>?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={clearCartAndAddVendorProduct}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '13px' }}
          >
            Clear Cart & Add from {pendingVendorConflict.newVendorName}
          </button>
          <button
            onClick={() => {
              setIsVendorSwitchModalOpen(false);
              setIsCartDrawerOpen(true);
            }}
            className="btn-secondary"
            style={{ width: '100%', padding: '10px', borderRadius: '12px', fontSize: '13px' }}
          >
            View Current Cart
          </button>
        </div>
      </div>
    </div>
  );
};
