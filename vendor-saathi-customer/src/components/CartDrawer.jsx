import React from 'react';
import { useApp } from '../context/AppContext';
import { CartItem } from './CartItem';
import { ShoppingBag, ArrowRight, X, ShieldAlert } from 'lucide-react';

export const CartDrawer = () => {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, clearCart, navigateTo } = useApp();

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryFee;
  const vendorName = cart.length > 0 ? cart[0].product.vendorName : '';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', height: '100vh', padding: '24px', borderRadius: '0', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Shopping Cart</h3>
            {vendorName && <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700' }}>Store: {vendorName}</span>}
          </div>
          <button onClick={() => setIsCartDrawerOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <ShoppingBag size={54} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Your cart is empty</h4>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Add fresh products from nearby village stores</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {cart.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: '#0f172a', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span>Total Amount</span>
                <strong style={{ color: '#15803d' }}>₹{total}</strong>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('checkout');
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '14px', marginTop: '12px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
