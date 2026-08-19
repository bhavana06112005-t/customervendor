import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Search, Check, X } from 'lucide-react';

const POPULAR_LOCATIONS = [
  { name: 'Mijar, Moodbidri', village: 'Mijar', town: 'Moodbidri', district: 'Dakshina Kannada', pincode: '574225', lat: 13.0125, lng: 74.9850 },
  { name: 'Moodbidri Town Center', village: 'Moodbidri', town: 'Moodbidri', district: 'Dakshina Kannada', pincode: '574227', lat: 13.0694, lng: 74.9961 },
  { name: 'Kallamundkur Junction', village: 'Kallamundkur', town: 'Belvai', district: 'Dakshina Kannada', pincode: '574213', lat: 13.0450, lng: 74.9520 },
  { name: 'Belvai Village', village: 'Belvai', town: 'Moodbidri', district: 'Dakshina Kannada', pincode: '574213', lat: 13.0800, lng: 74.9600 },
  { name: 'Mulki Market Road', village: 'Mulki', town: 'Mangaluru North', district: 'Dakshina Kannada', pincode: '574154', lat: 13.0844, lng: 74.7836 }
];

export const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, currentLocation, setCurrentLocation, showToast } = useApp();
  const [search, setSearch] = useState('');

  if (!isLocationModalOpen) return null;

  const handleSelectLocation = (loc) => {
    setCurrentLocation(loc);
    setIsLocationModalOpen(false);
    showToast(`Delivering to ${loc.name} 📍`);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={22} color="#16a34a" />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Select Delivery Location</h3>
          </div>
          <button onClick={() => setIsLocationModalOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        <button
          onClick={() => handleSelectLocation(POPULAR_LOCATIONS[0])}
          className="btn-primary"
          style={{ width: '100%', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '13px' }}
        >
          <Navigation size={18} /> Use Current GPS Location (Mijar)
        </button>

        <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase' }}>Nearby Villages & Towns</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {POPULAR_LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectLocation(loc)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: currentLocation.name === loc.name ? '2px solid #16a34a' : '1px solid #e2e8f0',
                backgroundColor: currentLocation.name === loc.name ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{loc.name}</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Pincode: {loc.pincode} • {loc.district}</span>
              </div>
              {currentLocation.name === loc.name && <Check size={18} color="#16a34a" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
