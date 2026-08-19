import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Star, Clock, Store } from 'lucide-react';

export const VendorCard = ({ vendor }) => {
  const { navigateTo, t } = useApp();

  return (
    <div
      className="vs-card"
      style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className="badge badge-success" style={{ position: 'absolute', top: '12px', left: '12px' }}>
            {t('verified_vendor')}
          </span>
          <span style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: '#ffffff',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Clock size={12} /> {vendor.deliveryTime}
          </span>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{vendor.name}</h3>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                📍 {vendor.distance} away • {vendor.location}
              </span>
            </div>
            <div style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={12} fill="#b45309" /> {vendor.rating}
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
            <strong>{t('owner_label')}:</strong> {vendor.owner} • <strong>{t('contact_label')}:</strong> {vendor.phone}
          </p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {vendor.categories.map((c, i) => (
              <span key={i} style={{ backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '6px' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 16px 16px' }}>
        <button
          onClick={() => navigateTo('product-listing', { vendor })}
          className="btn-primary"
          style={{ width: '100%', padding: '10px', borderRadius: '12px', fontSize: '13px' }}
        >
          <Store size={16} /> {t('view_store')}
        </button>
      </div>
    </div>
  );
};
