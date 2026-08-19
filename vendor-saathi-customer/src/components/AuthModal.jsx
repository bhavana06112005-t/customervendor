import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, ShieldCheck, X, Check } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('Bhavana Bai');
  const [otp, setOtp] = useState('123456');

  if (!isAuthModalOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      showToast('Enter valid 10-digit mobile number', 'danger');
      return;
    }
    setStep(2);
    showToast('OTP sent to +91 ' + phone + ' (Use 123456)');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp !== '123456') {
      showToast('Invalid OTP. Use code 123456', 'danger');
      return;
    }

    setUser({
      isLoggedIn: true,
      name: name || 'Bhavana Bai',
      phone: `+91 ${phone}`,
      email: 'bhavana@example.com',
      address: 'Mijar, Moodbidri, Karnataka - 574225',
      addresses: [
        {
          id: 'addr1',
          tag: 'Home',
          name: name || 'Bhavana Bai',
          phone: `+91 ${phone}`,
          address: 'Mijar, Moodbidri, Karnataka - 574225',
          isDefault: true
        }
      ]
    });

    setIsAuthModalOpen(false);
    showToast(`Welcome to VendorSaathi, ${name}! 🎉`);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '28px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Customer Login</h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>OTP Verification for Village Customers</span>
          </div>
          <button onClick={() => setIsAuthModalOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name e.g. Bhavana Bai"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Mobile Number</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '10px 12px', borderRadius: '10px', backgroundColor: '#f1f5f9', fontSize: '13px', fontWeight: '700', color: '#334155' }}>+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '14px', marginTop: '8px' }}>
              Send OTP Verification
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid #bbf7d0', fontSize: '12px', color: '#15803d' }}>
              <strong>OTP Sent!</strong> Verification code sent to +91 {phone}. Demo OTP is <strong>123456</strong>.
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Enter 6-Digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '18px', fontWeight: '800', textAlign: 'center', letterSpacing: '4px' }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '14px', marginTop: '8px' }}>
              Verify OTP & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
