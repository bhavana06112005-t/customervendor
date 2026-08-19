import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, X } from 'lucide-react';

export const ReviewModal = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, reviewOrder, showToast } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Thank you for reviewing ' + (reviewOrder?.vendorName || 'the vendor') + '! ⭐');
    setIsReviewModalOpen(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Rate & Review Store</h3>
          <button onClick={() => setIsReviewModalOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
              How was your experience with <strong>{reviewOrder?.vendorName || 'Ramesh Grocery'}</strong>?
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button type="button" key={star} onClick={() => setRating(star)} style={{ color: star <= rating ? '#eab308' : '#cbd5e1' }}>
                  <Star size={32} fill={star <= rating ? '#eab308' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Write a Comment</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about product freshness, packaging, and delivery speed..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px' }}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};
