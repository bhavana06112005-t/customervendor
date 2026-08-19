import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ThumbsUp, ArrowLeft, MoreVertical } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 'r1',
    vendorName: 'Ramesh Grocery',
    date: '12 May 2026',
    rating: 5.0,
    categories: 'Vegetables, Fruits',
    comment: 'Very fresh vegetables and fruits. On time delivery and very good service!',
    helpfulCount: 2
  }
];

export const MyReviewsView = () => {
  const { navigateTo } = useApp();

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '680px' }}>
      <button 
        onClick={() => navigateTo('profile')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Profile
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>My Reviews</h1>

      <div className="vs-card" style={{ padding: '20px', borderRadius: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <strong style={{ fontSize: '15px', color: '#0f172a' }}>{REVIEWS_DATA[0].vendorName}</strong>
          <span style={{ color: '#15803d', fontWeight: '800' }}>★ {REVIEWS_DATA[0].rating}</span>
        </div>
        <p style={{ fontSize: '13px', color: '#334155' }}>{REVIEWS_DATA[0].comment}</p>
      </div>
    </div>
  );
};
