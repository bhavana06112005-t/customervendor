import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, X, Check } from 'lucide-react';

export const VoiceSearchModal = () => {
  const { isVoiceSearchOpen, setIsVoiceSearchOpen, setSearchQuery, navigateTo, addToCart, PRODUCTS, showToast } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  if (!isVoiceSearchOpen) return null;

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('Listening for Kannada / English voice command...');
    setTimeout(() => {
      setIsListening(false);
      setTranscript('2 kilo tomato beku');
      setTimeout(() => {
        const product = PRODUCTS.find(p => p.shortName === 'Tomato') || PRODUCTS[0];
        addToCart(product, 2);
        setSearchQuery('Tomato');
        setIsVoiceSearchOpen(false);
        showToast('Voice matched: Added 2 kg Tomato! 🍅');
        navigateTo('product-listing');
      }, 1000);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 220, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '28px', borderRadius: '24px', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Kannada Voice Assistant</h3>
          <button onClick={() => setIsVoiceSearchOpen(false)} style={{ color: '#64748b' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          {transcript || 'Tap the microphone and speak in Kannada or English'}
        </p>

        <div
          onClick={handleStartListening}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#16a34a' : '#15803d',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            cursor: 'pointer',
            boxShadow: '0 8px 20px -4px rgba(22, 163, 74, 0.4)'
          }}
        >
          <Mic size={36} />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleStartListening} className="btn-secondary" style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '16px' }}>
            🗣️ "2 kilo tomato beku"
          </button>
          <button onClick={handleStartListening} className="btn-secondary" style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '16px' }}>
            🗣️ "1 kg alugadde"
          </button>
        </div>
      </div>
    </div>
  );
};
