import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export const WishlistView = () => {
  const { wishlist, PRODUCTS, navigateTo } = useApp();
  const wishProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px' }}>
      <button 
        onClick={() => navigateTo('profile')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Profile
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>My Wishlist ({wishProducts.length})</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {wishProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
