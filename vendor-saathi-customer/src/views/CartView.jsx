import React from 'react';
import { useApp } from '../context/AppContext';
import { CartItem } from '../components/CartItem';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export const CartView = () => {
  const { cart, navigateTo } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button
        onClick={() => navigateTo('home')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Continue Shopping
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>My Cart</h1>

      {cart.length === 0 ? (
        <div className="vs-card" style={{ padding: '48px', textAlign: 'center', borderRadius: '20px' }}>
          <ShoppingBag size={54} color="#cbd5e1" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Your cart is empty</h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Add fresh products from nearby stores</p>
          <button onClick={() => navigateTo('categories')} className="btn-primary" style={{ marginTop: '20px', borderRadius: '12px' }}>
            Browse Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cart.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${deliveryFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: '#0f172a', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
              <span>Total Amount</span>
              <strong style={{ color: '#15803d' }}>₹{total}</strong>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '15px', marginTop: '10px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
