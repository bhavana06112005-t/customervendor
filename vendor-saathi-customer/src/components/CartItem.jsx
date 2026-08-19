import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useApp();
  const { product, quantity } = item;

  return (
    <div
      className="vs-card"
      style={{ padding: '12px', borderRadius: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}
    >
      <img src={product.image} alt={product.name} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{product.shortName || product.name}</h4>
            <button onClick={() => removeFromCart(product.id)} style={{ color: '#ef4444' }}>
              <Trash2 size={15} />
            </button>
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>₹{product.price} / {product.unit} • {product.vendorName}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <strong style={{ fontSize: '15px', color: '#15803d' }}>₹{product.price * quantity}</strong>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '2px 6px' }}>
            <button onClick={() => updateCartQuantity(product.id, quantity - 1)} style={{ color: '#16a34a' }}>
              <Minus size={14} />
            </button>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#15803d', minWidth: '16px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button onClick={() => updateCartQuantity(product.id, quantity + 1)} style={{ color: '#16a34a' }}>
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
