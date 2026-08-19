import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, Search, ArrowLeft } from 'lucide-react';

export const VoiceSearchView = () => {
  const { navigateTo, setSearchQuery, PRODUCTS, addToCart, showToast } = useApp();
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const p = PRODUCTS[0];
      addToCart(p, 2);
      setSearchQuery('Tomato');
      showToast('Voice matched: Added 2 kg Tomato! 🍅');
      navigateTo('product-listing');
    }, 1500);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '600px', textAlign: 'center' }}>
      <button 
        onClick={() => navigateTo('home')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="vs-card" style={{ padding: '36px', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Kannada Voice Search</h2>
        <div
          onClick={handleMicClick}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#16a34a' : '#15803d',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            cursor: 'pointer'
          }}
        >
          <Mic size={36} />
        </div>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Tap and say <strong>"2 kilo tomato beku"</strong></p>
      </div>
    </div>
  );
};
