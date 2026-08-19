import React from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Minus, Star, Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, wishlist, toggleWishlist, navigateTo, t } = useApp();

  const cartItem = cart.find(item => item.product.id === product.id);
  const isWish = wishlist.includes(product.id);

  return (
    <div
      className="vs-card"
      style={{ borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
    >
      <button
        onClick={() => toggleWishlist(product.id)}
        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2, color: isWish ? '#ef4444' : '#94a3b8' }}
      >
        <Heart size={18} fill={isWish ? '#ef4444' : 'none'} />
      </button>

      <div onClick={() => navigateTo('product-detail', { product })} style={{ cursor: 'pointer' }}>
        <div style={{ overflow: 'hidden', borderRadius: '12px', height: '140px', marginBottom: '12px', position: 'relative' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className="badge badge-success" style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '10px' }}>
            {t('stock_left')}: {product.availableStock} {product.unit}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', backgroundColor: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>
            📍 {product.vendorName}
          </span>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#b45309', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Star size={11} fill="#b45309" /> {product.rating}
          </span>
        </div>

        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', lineHeight: 1.3, marginBottom: '6px' }}>
          {product.shortName || product.name}
        </h4>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#15803d' }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}> / {product.unit}</span>
          </div>
          {product.originalPrice > product.price && (
            <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {cartItem ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '6px 12px'
          }}>
            <button onClick={() => updateCartQuantity(product.id, cartItem.quantity - 1)} style={{ color: '#16a34a' }}>
              <Minus size={16} />
            </button>
            <span style={{ fontWeight: '800', color: '#15803d', fontSize: '14px' }}>{cartItem.quantity}</span>
            <button onClick={() => updateCartQuantity(product.id, cartItem.quantity + 1)} style={{ color: '#16a34a' }}>
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="btn-outline"
            style={{ width: '100%', padding: '8px', borderRadius: '10px', fontSize: '13px' }}
          >
            <Plus size={16} /> {t('add_to_cart')}
          </button>
        )}
      </div>
    </div>
  );
};
