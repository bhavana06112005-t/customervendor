import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, t } = useApp();

  return (
    <footer style={{ backgroundColor: '#052e16', color: '#ffffff', paddingTop: '48px', paddingBottom: '32px', borderTop: '4px solid #16a34a', marginTop: '60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img 
                src="/logo.jpg" 
                alt="VendorSaathi Emblem" 
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #4ade80' }} 
              />
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
                Vendor<span style={{ color: '#f97316' }}>Saathi</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '16px' }}>
              {t('footer_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#4ade80', marginBottom: '16px' }}>{t('quick_links')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
              <li><button onClick={() => navigateTo('home')} style={{ color: '#cbd5e1' }}>{t('nav_home')}</button></li>
              <li><button onClick={() => navigateTo('categories')} style={{ color: '#cbd5e1' }}>{t('shop_by_categories')}</button></li>
              <li><button onClick={() => navigateTo('nearby-vendors')} style={{ color: '#cbd5e1' }}>{t('top_nearby_vendors')}</button></li>
              <li><button onClick={() => navigateTo('my-orders')} style={{ color: '#cbd5e1' }}>{t('nav_orders')}</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#4ade80', marginBottom: '16px' }}>{t('contact_support')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#4ade80" />
                <span>{t('location_mijarmoodbidri')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#4ade80" />
                <span>+91 98765 43210 (Helpline)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#4ade80" />
                <span>support@vendorsaathi.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
          <div>
            © {new Date().getFullYear()} VendorSaathi. {t('all_rights_reserved')}.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built for Rural India with <Heart size={14} color="#ef4444" fill="#ef4444" />
          </div>
        </div>
      </div>
    </footer>
  );
};
