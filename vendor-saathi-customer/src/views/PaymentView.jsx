import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Banknote, Smartphone, ArrowLeft } from 'lucide-react';

export const PaymentView = () => {
  const { cart, placeOrder, navigateTo, user } = useApp();
  const [method, setMethod] = useState('Cash on Delivery');
  const [upiId, setUpiId] = useState('bhavana@okaxis');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryFee;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    placeOrder({
      items: cart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        unit: i.product.unit,
        quantity: i.quantity
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: method === 'UPI' ? `UPI (${upiId})` : method,
      deliveryAddress: user.address,
      vendorId: cart[0]?.product.vendorId || 'v1',
      vendorName: cart[0]?.product.vendorName || 'Ramesh Grocery'
    });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button 
        onClick={() => navigateTo('checkout')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Delivery Address
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>✓</div>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#16a34a' }}>1. Address</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>2</div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803d' }}>2. Payment</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#cbd5e1', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>3</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>3. Confirm</span>
        </div>
      </div>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Select Payment Method</h2>

        <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{
            padding: '16px',
            borderRadius: '14px',
            border: method === 'UPI' ? '2px solid #16a34a' : '1px solid #e2e8f0',
            backgroundColor: method === 'UPI' ? '#f0fdf4' : '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="radio" name="pay" value="UPI" checked={method === 'UPI'} onChange={() => setMethod('UPI')} style={{ accentColor: '#16a34a' }} />
              <Smartphone size={20} color="#16a34a" />
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>UPI</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Pay using any UPI app (GPay, PhonePe, Paytm)</span>
              </div>
            </div>
          </label>

          <label style={{
            padding: '16px',
            borderRadius: '14px',
            border: method === 'Cash on Delivery' ? '2px solid #16a34a' : '1px solid #e2e8f0',
            backgroundColor: method === 'Cash on Delivery' ? '#f0fdf4' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}>
            <input type="radio" name="pay" value="Cash on Delivery" checked={method === 'Cash on Delivery'} onChange={() => setMethod('Cash on Delivery')} style={{ accentColor: '#16a34a' }} />
            <Banknote size={20} color="#ea580c" />
            <div>
              <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>Cash on Delivery</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Pay when you receive products from vendor</span>
            </div>
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '14px', color: '#475569' }}>Payable Amount</span>
            <strong style={{ fontSize: '22px', color: '#15803d' }}>₹{total}</strong>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '16px', marginTop: '12px' }}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};
