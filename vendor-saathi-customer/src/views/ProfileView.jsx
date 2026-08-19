import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, MapPin, Heart, CreditCard, Bell, HelpCircle, LogOut, Star, Tag, ChevronRight, User } from 'lucide-react';

export const ProfileView = () => {
  const { user, setUser, wishlist, notifications, navigateTo, showToast, setIsVendorSimOpen } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: '800'
            }}>
              {user.name ? user.name.charAt(0) : 'B'}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{user.name}</h2>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>{user.email}</span>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>{user.phone}</span>
            </div>
          </div>

          <button onClick={() => showToast('Edit Profile modal')} className="btn-outline" style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '10px' }}>
            Edit Profile
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          backgroundColor: '#f8fafc',
          padding: '12px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Total Orders</span>
            <strong style={{ fontSize: '16px', color: '#0f172a' }}>18</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Total Spent</span>
            <strong style={{ fontSize: '16px', color: '#15803d' }}>₹2,630</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Member Since</span>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>May 2025</strong>
          </div>
        </div>
      </div>

      <div className="vs-card" style={{ padding: '12px', borderRadius: '24px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {[
          { label: 'My Orders', icon: Package, view: 'my-orders' },
          { label: 'Saved Addresses', icon: MapPin, view: 'saved-addresses-support' },
          { label: 'Payment Methods', icon: CreditCard, view: 'payment' },
          { label: `Wishlist (${wishlist.length})`, icon: Heart, view: 'wishlist' },
          { label: 'My Reviews', icon: Star, view: 'my-reviews' },
          { label: 'Offers & Coupons', icon: Tag, view: 'offers' },
          { label: `Notifications (${notifications.length})`, icon: Bell, view: 'notifications' },
          { label: 'Help & Support', icon: HelpCircle, view: 'saved-addresses-support' },
          { label: 'Vendor App Simulator', icon: User, action: () => setIsVendorSimOpen(true) }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action || (() => navigateTo(item.view))}
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#334155',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color="#16a34a" />
                <span>{item.label}</span>
              </div>
              <ChevronRight size={18} color="#cbd5e1" />
            </button>
          );
        })}

        <button
          onClick={() => {
            setUser({ isLoggedIn: false, name: '', phone: '' });
            showToast('Logged out');
            navigateTo('home');
          }}
          style={{
            padding: '14px 16px',
            borderRadius: '14px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};
