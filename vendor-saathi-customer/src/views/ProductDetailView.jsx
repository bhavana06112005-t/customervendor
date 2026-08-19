import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Star, Heart, ShoppingBag, Plus, Minus, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const ProductDetailView = () => {
  const { selectedProduct, addToCart, toggleWishlist, wishlist, navigateTo, PRODUCTS } = useApp();
  const product = selectedProduct || PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const isWish = wishlist.includes(product.id);

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '800px' }}>
      <button
        onClick={() => navigateTo('product-listing')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <div style={{ position: 'relative' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px' }} />
            <button
              onClick={() => toggleWishlist(product.id)}
              style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#ffffff', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Heart size={20} fill={isWish ? '#ef4444' : 'none'} color={isWish ? '#ef4444' : '#64748b'} />
            </button>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-success">📍 {product.vendorName}</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b45309', display: 'inline-flex', alignItems: 'center', gap: '2px', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '8px' }}>
                <Star size={12} fill="#b45309" /> {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{product.name}</h1>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{product.description}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <strong style={{ fontSize: '26px', color: '#15803d' }}>₹{product.price}</strong>
              <span style={{ fontSize: '14px', color: '#64748b' }}>per {product.unit}</span>
              {product.originalPrice > product.price && (
                <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '8px 16px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ color: '#16a34a' }}><Minus size={16} /></button>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#15803d' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ color: '#16a34a' }}><Plus size={16} /></button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="btn-primary"
                style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', fontSize: '15px' }}
              >
                <ShoppingBag size={18} /> Add {qty} to Cart • ₹{product.price * qty}
              </button>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#475569' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#16a34a" /> Handpicked farm fresh quality guaranteed</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Truck size={16} color="#16a34a" /> Delivered in 20-30 mins by {product.vendorName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
