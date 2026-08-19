import React from 'react';
import { useApp } from '../context/AppContext';
import { useVendorSync } from '../context/VendorSyncContext';
import { Smartphone, CheckCircle, Package, Truck, Check, X } from 'lucide-react';

export const VendorSimulatorDrawer = () => {
  const { isVendorSimOpen, setIsVendorSimOpen, orders, activeOrderId } = useApp();
  const { updateVendorOrderState } = useVendorSync();

  if (!isVendorSimOpen) return null;

  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-start' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '380px', height: '100vh', padding: '24px', borderRadius: '0', display: 'flex', flexDirection: 'column', backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={22} color="#f59e0b" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>Vendor Android App Simulator</h3>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>Ramesh Grocery Control Sidecar</span>
            </div>
          </div>
          <button onClick={() => setIsVendorSimOpen(false)} style={{ color: '#cbd5e1' }}><X size={20} /></button>
        </div>

        {currentOrder ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '14px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '14px', color: '#f59e0b' }}>Order #{currentOrder.id}</strong>
                <span className="badge badge-success">{currentOrder.status}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#cbd5e1', display: 'block' }}>Customer: {currentOrder.deliveryAddress}</span>
              <strong style={{ fontSize: '14px', color: '#ffffff', display: 'block', marginTop: '6px' }}>Total Amount: ₹{currentOrder.total}</strong>
            </div>

            <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Update Order Status (Simulate Vendor Action)</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { status: 'Accepted', label: '1. Accept Order', color: '#16a34a', icon: CheckCircle },
                { status: 'Preparing', label: '2. Start Preparing', color: '#2563eb', icon: Package },
                { status: 'Out for Delivery', label: '3. Out for Delivery', color: '#d97706', icon: Truck },
                { status: 'Delivered', label: '4. Mark Delivered', color: '#15803d', icon: Check }
              ].map(btn => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.status}
                    onClick={() => updateVendorOrderState(currentOrder.id, btn.status)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: currentOrder.status === btn.status ? btn.color : '#1e293b',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #334155'
                    }}
                  >
                    <Icon size={16} />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>No active orders available to simulate.</p>
        )}
      </div>
    </div>
  );
};
