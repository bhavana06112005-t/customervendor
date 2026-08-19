import React from 'react';
import { useApp } from '../context/AppContext';
import { VENDORS } from '../data/vendors';
import { VendorCard } from '../components/VendorCard';
import { MapPin, Navigation } from 'lucide-react';

export const NearbyVendorsView = () => {
  const { currentLocation, setIsLocationModalOpen } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Nearby Vendor Stores</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Connected kirana stores near <strong>{currentLocation.name}</strong></p>
        </div>

        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="btn-outline"
          style={{ borderRadius: '12px', fontSize: '13px' }}
        >
          <MapPin size={16} /> Change Location
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {VENDORS.map(vendor => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};
