import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Wallet, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Smartphone,
  QrCode,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { UpiPaymentModal } from '../components/UpiPaymentModal';

export const CheckoutView = () => {
  const { cart, user, placeOrder, navigateTo } = useApp();
  const [selectedAddress, setSelectedAddress] = useState(user?.address || 'Mijar Village, Moodbidri, Karnataka - 574225');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Call before arrival. Leave at front door if away.');
  const [deliverySlot, setDeliverySlot] = useState('instant'); // instant | evening | tomorrow
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI | Cash on Delivery
  const [upiId, setUpiId] = useState('bhavana@okaxis');
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  React.useEffect(() => {
    if (user?.address) {
      setSelectedAddress(user.address);
    }
  }, [user?.address]);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryFee;

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      navigateTo('categories');
      return;
    }

    if (paymentMethod === 'UPI') {
      setIsUpiModalOpen(true);
      return;
    }

    // Cash on Delivery
    placeOrder({
      items: cart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        unit: i.product.unit,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'Cash on Delivery (Doorstep)',
      paymentStatus: 'Pending (Cash on Delivery)',
      deliveryAddress: selectedAddress,
      vendorId: cart[0]?.product.vendorId || 'v1',
      vendorName: cart[0]?.product.vendorName || 'Ramesh Grocery'
    });
  };

  const handleUpiSuccess = (upiResult) => {
    setIsUpiModalOpen(false);
    placeOrder({
      items: cart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        unit: i.product.unit,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: upiResult.paymentMethod || 'UPI (Instant QR)',
      upiRefId: upiResult.upiRefId,
      upiVpa: upiResult.upiVpa,
      upiApp: upiResult.upiApp,
      paymentStatus: upiResult.paymentStatus || `Paid via UPI (UTR #${upiResult.upiRefId})`,
      deliveryAddress: selectedAddress,
      vendorId: cart[0]?.product.vendorId || 'v1',
      vendorName: cart[0]?.product.vendorName || 'Ramesh Grocery'
    });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 0 60px 0', width: '100%' }}>
      <button 
        onClick={() => navigateTo('cart')}
        style={{ 
          fontSize: '13.5px', 
          color: '#059669', 
          fontWeight: '800', 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          marginBottom: '20px',
          backgroundColor: '#ecfdf5',
          padding: '6px 14px',
          borderRadius: '12px',
          border: '1px solid #a7f3d0'
        }}
      >
        <ArrowLeft size={16} /> Back to Cart
      </button>

      {/* Stepper Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-success" style={{ fontSize: '11.5px', padding: '4px 12px' }}>
            <Zap size={13} color="#f59e0b" /> SECURE CHECKOUT
          </span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.025em' }}>
          Order Checkout & Delivery
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
          Choose your delivery destination, time slot, and preferred rural-friendly payment method.
        </p>
      </div>

      <form onSubmit={handlePlaceOrderSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Column: Address, Delivery Slot, Payment Method */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Step 1: Delivery Address */}
          <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                color: '#ffffff', 
                padding: '9px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', lineHeight: 1.1 }}>1. Delivery Address</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Select your saved home or farm address</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {user.addresses.map(addr => (
                <label
                  key={addr.id}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: selectedAddress === addr.address ? '2px solid #10b981' : '1.5px solid #e2e8f0',
                    backgroundColor: selectedAddress === addr.address ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    gap: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedAddress === addr.address ? '0 4px 14px rgba(16, 185, 129, 0.12)' : 'none'
                  }}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === addr.address}
                    onChange={() => setSelectedAddress(addr.address)}
                    style={{ accentColor: '#10b981', marginTop: '3px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '14.5px', color: '#0f172a', fontWeight: '800' }}>
                        {addr.tag} Address ({addr.name})
                      </strong>
                      {selectedAddress === addr.address && (
                        <span className="badge badge-success" style={{ fontSize: '10px' }}>Selected</span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>{addr.address}</p>
                    <span style={{ fontSize: '12px', color: '#059669', fontWeight: '700', display: 'block', marginTop: '4px' }}>
                      📞 {addr.phone}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Delivery Slot Selector */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>
                Delivery Slot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setDeliverySlot('instant')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: deliverySlot === 'instant' ? '2px solid #10b981' : '1px solid #cbd5e1',
                    backgroundColor: deliverySlot === 'instant' ? '#ecfdf5' : '#ffffff',
                    color: deliverySlot === 'instant' ? '#065f46' : '#475569',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ display: 'block', fontWeight: '800', color: deliverySlot === 'instant' ? '#059669' : '#0f172a' }}>
                    ⚡ Instant Express
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>20–30 mins</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySlot('evening')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: deliverySlot === 'evening' ? '2px solid #10b981' : '1px solid #cbd5e1',
                    backgroundColor: deliverySlot === 'evening' ? '#ecfdf5' : '#ffffff',
                    color: deliverySlot === 'evening' ? '#065f46' : '#475569',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ display: 'block', fontWeight: '800', color: deliverySlot === 'evening' ? '#059669' : '#0f172a' }}>
                    🌅 Evening Slot
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>5:00 PM – 7:00 PM</span>
                </button>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Delivery Note for Rider (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before arrival, leave at gate..."
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '11px 14px', 
                  borderRadius: '12px', 
                  border: '1.5px solid #cbd5e1', 
                  fontSize: '13px', 
                  outline: 'none',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                color: '#ffffff', 
                padding: '9px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wallet size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', lineHeight: 1.1 }}>2. Payment Method</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Fast, zero-fee payment options</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* UPI Instant Gateway Option (Primary) */}
              <label style={{
                padding: '18px 20px',
                borderRadius: '20px',
                border: paymentMethod === 'UPI' ? '2.5px solid #059669' : '1.5px solid #e2e8f0',
                backgroundColor: paymentMethod === 'UPI' ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: paymentMethod === 'UPI' ? '0 6px 20px -4px rgba(5, 150, 105, 0.18)' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      style={{ accentColor: '#059669', width: '18px', height: '18px' }}
                    />
                    <div style={{
                      backgroundColor: '#ecfdf5',
                      padding: '10px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669'
                    }}>
                      <Smartphone size={22} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '15.5px', color: '#0f172a', fontWeight: '900', display: 'block' }}>
                        UPI Instant Payment (QR / GPay / PhonePe / Paytm)
                      </strong>
                      <span style={{ display: 'block', fontSize: '12px', color: '#059669', fontWeight: '700', marginTop: '1px' }}>
                        ⚡ 0% Transaction Fee • Dynamic QR & 1-Tap App Payment
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '11px', padding: '3px 9px', fontWeight: '900' }}>
                    Recommended
                  </span>
                </div>

                {paymentMethod === 'UPI' && (
                  <div style={{
                    marginLeft: '36px',
                    padding: '14px 16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1.5px solid #a7f3d0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span className="badge" style={{ backgroundColor: '#e8f0fe', color: '#1a73e8', fontSize: '11px', fontWeight: '800' }}>🔵 Google Pay</span>
                      <span className="badge" style={{ backgroundColor: '#f3e8ff', color: '#5f259f', fontSize: '11px', fontWeight: '800' }}>🟣 PhonePe</span>
                      <span className="badge" style={{ backgroundColor: '#e0f2fe', color: '#00baf2', fontSize: '11px', fontWeight: '800' }}>🔵 Paytm</span>
                      <span className="badge" style={{ backgroundColor: '#e0f2f1', color: '#00796b', fontSize: '11px', fontWeight: '800' }}>🟠 BHIM UPI</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <QrCode size={16} color="#059669" />
                      <span>Clicking below opens the <strong>Live Dynamic QR Code & UPI Apps Modal</strong> to scan & pay instantly.</span>
                    </div>
                  </div>
                )}
              </label>

              {/* Cash on Delivery Option */}
              <label style={{
                padding: '16px 20px',
                borderRadius: '18px',
                border: paymentMethod === 'Cash on Delivery' ? '2px solid #059669' : '1.5px solid #e2e8f0',
                backgroundColor: paymentMethod === 'Cash on Delivery' ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  style={{ accentColor: '#059669', width: '18px', height: '18px' }}
                />
                <div style={{
                  backgroundColor: '#fff7ed',
                  padding: '9px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ea580c'
                }}>
                  <Banknote size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#0f172a', fontWeight: '800', display: 'block' }}>
                    Cash on Delivery (COD)
                  </strong>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    Pay in cash directly to your trusted village vendor on doorstep delivery
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Summary & Action */}
        <div>
          <div className="vs-card" style={{ padding: '26px', borderRadius: '24px', position: 'sticky', top: '90px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
              Order Breakdown ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {cart.map(item => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', color: '#334155' }}>
                  <span>{item.quantity} x {item.product.shortName || item.product.name}</span>
                  <strong style={{ color: '#0f172a' }}>₹{item.product.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13.5px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Fee {subtotal > 300 && '(FREE above ₹300)'}</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '20px', 
                fontWeight: '900', 
                color: '#064e3b', 
                paddingTop: '10px', 
                borderTop: '1px dashed #cbd5e1' 
              }}>
                <span>Payable Total</span>
                <span style={{ color: '#059669' }}>₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '16px', borderRadius: '16px', fontSize: '16px', letterSpacing: '0.01em' }}
            >
              {paymentMethod === 'UPI' ? (
                <>
                  <Zap size={19} />
                  <span>PAY ₹{total} VIA INSTANT UPI</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>CONFIRM & PLACE ORDER (COD)</span>
                </>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11.5px', color: '#64748b', marginTop: '14px' }}>
              <ShieldCheck size={16} color="#059669" />
              <span>100% NPCI Bharat UPI & Fresh Produce Guaranteed</span>
            </div>
          </div>
        </div>
      </form>

      {/* Production UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        amount={total}
        orderDetails={{
          orderId: `VS${Math.floor(10000 + Math.random() * 90000)}`,
          itemsSummary: cart.map(i => `${i.quantity}x ${i.product.shortName || i.product.name}`).join(', '),
          vendorName: cart[0]?.product.vendorName || 'Ramesh Grocery'
        }}
        onPaymentSuccess={handleUpiSuccess}
      />
    </div>
  );
};

