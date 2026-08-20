import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VENDORS } from '../data/vendors';
import { Package, Clock, CheckCircle2, ChevronRight, MessageSquare, Star, ArrowLeft, RefreshCw, XCircle, ShieldAlert, Sparkles, Navigation } from 'lucide-react';

export const MyOrdersView = () => {
  const { orders, navigateTo, setActiveOrderId, cancelOrder, setIsReviewModalOpen, setReviewOrder } = useApp();
  const [tab, setTab] = useState('active'); // all | active | past | cancelled

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = orders.filter(o => o.status === 'Delivered');
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled');

  let currentList = orders;
  if (tab === 'active') currentList = activeOrders;
  if (tab === 'past') currentList = pastOrders;
  if (tab === 'cancelled') currentList = cancelledOrders;

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 0 60px 0', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.025em' }}>
          📦 My Order History & Deliveries
        </h1>
        <p style={{ fontSize: '14.5px', color: '#64748b', marginTop: '4px' }}>
          Track active express village deliveries in real time or reorder past fresh groceries.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1.5px solid #e2e8f0', marginBottom: '28px', overflowX: 'auto' }}>
        {[
          { key: 'active', label: `Active Deliveries (${activeOrders.length})` },
          { key: 'all', label: `All Orders (${orders.length})` },
          { key: 'past', label: `Completed (${pastOrders.length})` },
          { key: 'cancelled', label: `Cancelled (${cancelledOrders.length})` }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '12px 20px',
              fontWeight: '800',
              fontSize: '14.5px',
              color: tab === t.key ? '#059669' : '#64748b',
              borderBottom: tab === t.key ? '3.5px solid #10b981' : '3.5px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders List in Responsive Multi-Column Grid */}
      {currentList.length === 0 ? (
        <div className="vs-card animate-fade-scale" style={{ textAlign: 'center', padding: '60px 20px', borderRadius: '28px', backgroundColor: '#ffffff' }}>
          <Package size={54} color="#cbd5e1" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>No {tab} orders found</h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>You have no orders currently in this category.</p>
          <button
            onClick={() => navigateTo('categories')}
            className="btn-primary"
            style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '14px', fontSize: '14.5px' }}
          >
            Explore Fresh Groceries
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
          {currentList.map(order => {
            const vendor = VENDORS.find(v => v.id === order.vendorId) || VENDORS[0];
            const isDelivered = order.status === 'Delivered';
            const isCancelled = order.status === 'Cancelled';

            return (
              <div key={order.id} className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={vendor.avatar} alt={vendor.name} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #a7f3d0' }} />
                    <div>
                      <strong style={{ fontSize: '17px', color: '#064e3b', fontWeight: '900' }}>#{order.id}</strong>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', display: 'block', marginTop: '1px' }}>{order.vendorName}</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>📅 {order.date}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${isDelivered ? 'badge-success' : isCancelled ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '12.5px', marginBottom: '6px', padding: '6px 14px' }}>
                      {order.status}
                    </span>
                    <strong style={{ fontSize: '20px', color: '#059669', display: 'block', fontWeight: '900' }}>₹{order.total}</strong>
                  </div>
                </div>

                {/* Mini Step Progress Bar */}
                {!isCancelled && order.timeline && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    marginBottom: '18px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      {(order.timeline || []).map((step, sIdx) => (
                        <div key={sIdx} style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: step.completed ? '#10b981' : '#cbd5e1',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 4px auto'
                          }}>
                            {step.completed ? '✓' : sIdx + 1}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: step.completed ? '#059669' : '#94a3b8' }}>
                            {step.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {!isDelivered && !isCancelled && (
                    <>
                      <button
                        onClick={() => {
                          setActiveOrderId(order.id);
                          navigateTo('order-tracking');
                        }}
                        className="btn-primary"
                        style={{ flex: 1, padding: '11px', borderRadius: '14px', fontSize: '14px', fontWeight: '800' }}
                      >
                        <Navigation size={16} />
                        <span>Track Live Order</span>
                      </button>
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="btn-secondary"
                        style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '11px 18px', borderRadius: '14px', fontSize: '14px', fontWeight: '800' }}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {isDelivered && (
                    <>
                      <button
                        onClick={() => {
                          setActiveOrderId(order.id);
                          navigateTo('order-tracking');
                        }}
                        className="btn-primary"
                        style={{ flex: 1, padding: '11px', borderRadius: '14px', fontSize: '14px', fontWeight: '800' }}
                      >
                        <span>View Order Details</span>
                      </button>
                      <button
                        onClick={() => {
                          setReviewOrder(order);
                          setIsReviewModalOpen(true);
                        }}
                        className="btn-secondary"
                        style={{ color: '#d97706', backgroundColor: '#fef3c7', border: '1px solid #fde68a', padding: '11px 16px', borderRadius: '14px', fontSize: '14px', fontWeight: '800' }}
                      >
                        <Star size={16} fill="#f59e0b" color="#f59e0b" />
                        <span>Rate & Review</span>
                      </button>
                    </>
                  )}

                  {isCancelled && (
                    <button
                      onClick={() => navigateTo('categories')}
                      className="btn-secondary"
                      style={{ width: '100%', padding: '11px', borderRadius: '14px', fontSize: '14px', fontWeight: '800' }}
                    >
                      <RefreshCw size={15} />
                      <span>Order Again</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
