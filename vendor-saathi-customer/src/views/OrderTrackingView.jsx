import React from 'react';
import { useApp } from '../context/AppContext';
import { Truck, Phone, MessageSquare, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';

export const OrderTrackingView = () => {
  const { orders, activeOrderId, navigateTo, setIsVendorChatOpen } = useApp();
  const order = orders.find(o => o.id === activeOrderId) || orders[0];

  if (!order) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button 
        onClick={() => navigateTo('my-orders')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to My Orders
      </button>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Live Order Tracking</h1>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Order #{order.id} • {order.vendorName}</span>
          </div>
          <span className="badge badge-success" style={{ fontSize: '12px' }}>{order.status}</span>
        </div>

        {/* Live Vector Map Simulation */}
        <div style={{ position: 'relative', height: '200px', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0', overflow: 'hidden', marginBottom: '24px' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <path d="M 60 160 Q 180 60, 320 140" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="6 6" />
          </svg>
          <div style={{ position: 'absolute', top: '140px', left: '40px', backgroundColor: '#15803d', color: '#ffffff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
            🏪 {order.vendorName}
          </div>
          <div style={{ position: 'absolute', top: '120px', right: '40px', backgroundColor: '#d97706', color: '#ffffff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
            🏡 Your Home (Mijar)
          </div>
        </div>

        {/* Timeline Status Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {order.timeline.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: step.completed ? '#16a34a' : '#e2e8f0',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                flexShrink: 0
              }}>
                {step.completed ? '✓' : idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '14px', color: step.completed ? '#0f172a' : '#94a3b8' }}>{step.label}</strong>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>{step.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={`tel:${order.vendorPhone}`} className="btn-outline" style={{ flex: 1, padding: '10px', borderRadius: '12px', fontSize: '13px' }}>
            <Phone size={16} /> Call Vendor
          </a>
          <button onClick={() => setIsVendorChatOpen(true)} className="btn-primary" style={{ flex: 1, padding: '10px', borderRadius: '12px', fontSize: '13px' }}>
            <MessageSquare size={16} /> Chat with Vendor
          </button>
        </div>
      </div>
    </div>
  );
};
