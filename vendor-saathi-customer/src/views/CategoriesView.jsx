import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

export const CategoriesView = () => {
  const { navigateTo } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Product Categories</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Select a category to browse fresh items from nearby local stores</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigateTo('product-listing', { category: cat.id })}
            className="vs-card"
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                fontSize: '28px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cat.icon}
              </span>
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{cat.name}</h3>
                <span className="badge badge-success">{cat.itemCount}+ Items</span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
