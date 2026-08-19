import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Store, Clock, MapPin, ArrowRight, Smartphone } from 'lucide-react';

export const OrderConfirmationView = () => {
  const { orders, activeOrderId, navigateTo, setIsVendorSimOpen } = useApp();
  const order = orders.find(o => o.id === activeOrderId) || orders[0];

  useEffect(() => {
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  }, []);

  if (!order) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 16px', maxWidth: '640px', textAlign: 'center' }}>
      <div className="vs-card" style={{ padding: '36px 24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', width: '72px', height: '72px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <CheckCircle2 size={48} />
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Order Confirmed! 🎉</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
          Order ID: <strong style={{ color: '#16a34a' }}>#{order.id}</strong> • Estimated Delivery: <strong>20–30 Mins</strong>
        </p>

        {/* Vendor Info Card */}
        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', textAlign: 'left', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>{order.vendorName}</strong>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>📞 {order.vendorPhone} • {order.vendorDistance}</span>
            </div>
            <button onClick={() => navigateTo('nearby-vendors')} className="btn-outline" style={{ fontSize: '11px', padding: '4px 10px' }}>
              <Store size={14} /> View Store
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <button
            onClick={() => navigateTo('order-tracking', { orderId: order.id })}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }}
          >
            Track Order Live 🛵
          </button>
          <button
            onClick={() => setIsVendorSimOpen(true)}
            className="btn-secondary"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '13px', backgroundColor: '#fef3c7', color: '#b45309' }}
          >
            <Smartphone size={16} /> Simulate Vendor Acceptance in Sidecar
          </button>
        </div>
      </div>
    </div>
  );
};
