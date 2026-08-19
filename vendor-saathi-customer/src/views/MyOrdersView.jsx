import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Truck, ArrowRight, RotateCcw } from 'lucide-react';

export const MyOrdersView = () => {
  const { orders, navigateTo, addToCart, PRODUCTS, showToast } = useApp();
  const [tab, setTab] = useState('all');

  const filteredOrders = orders.filter(o => {
    if (tab === 'active') return o.status !== 'Delivered' && o.status !== 'Cancelled';
    if (tab === 'past') return o.status === 'Delivered';
    if (tab === 'cancelled') return o.status === 'Cancelled';
    return true;
  });

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id) || PRODUCTS[0];
      addToCart(product, item.quantity);
    });
    showToast(`Reordered items from ${order.vendorName}! 🛒`);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '680px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>My Orders</h1>

      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
        {['all', 'active', 'past', 'cancelled'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px',
              fontWeight: '700',
              fontSize: '13px',
              color: tab === t ? '#16a34a' : '#64748b',
              borderBottom: tab === t ? '3px solid #16a34a' : '3px solid transparent',
              textTransform: 'capitalize'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOrders.map(order => (
          <div key={order.id} className="vs-card" style={{ padding: '20px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '15px', color: '#0f172a' }}>Order #{order.id}</strong>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>{order.vendorName} • {order.date}</span>
              </div>
              <span className="badge badge-success">{order.status}</span>
            </div>

            <div style={{ margin: '12px 0', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '12px' }}>
              {order.items.map((it, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>{it.quantity}x {it.name}</span>
                  <strong>₹{it.price * it.quantity}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <strong style={{ fontSize: '16px', color: '#15803d' }}>Total: ₹{order.total}</strong>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => navigateTo('order-tracking', { orderId: order.id })} className="btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  Track Live
                </button>
                <button onClick={() => handleReorder(order)} className="btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  <RotateCcw size={14} /> Reorder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
