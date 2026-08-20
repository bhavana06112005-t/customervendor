import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Grid, ShoppingBag, Package, User, Mic, Sparkles } from 'lucide-react';

export const BottomNav = () => {
  const { currentView, navigateTo, cart, setIsVoiceAssistanceOpen } = useApp();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={{
      position: 'fixed',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 24px)',
      maxWidth: '520px',
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '28px',
      zIndex: 90,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 12px',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05)'
    }}>
      <button
        onClick={() => navigateTo('home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: currentView === 'home' ? '#059669' : '#64748b',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderRadius: '16px',
          backgroundColor: currentView === 'home' ? '#ecfdf5' : 'transparent',
          transition: 'all 0.2s ease'
        }}
      >
        <Home size={19} />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigateTo('categories')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: currentView === 'categories' ? '#059669' : '#64748b',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderRadius: '16px',
          backgroundColor: currentView === 'categories' ? '#ecfdf5' : 'transparent',
          transition: 'all 0.2s ease'
        }}
      >
        <Grid size={19} />
        <span>Categories</span>
      </button>

      {/* Floating Center Voice AI Button */}
      <button
        onClick={() => setIsVoiceAssistanceOpen(true)}
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
          color: '#ffffff',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(16, 185, 129, 0.45)',
          marginTop: '-18px',
          border: '3px solid #ffffff',
          position: 'relative',
          transition: 'transform 0.2s ease'
        }}
        title="Smart Voice Assistant"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Sparkles size={20} color="#fef08a" />
      </button>

      <button
        onClick={() => navigateTo('cart')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: currentView === 'cart' ? '#059669' : '#64748b',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderRadius: '16px',
          backgroundColor: currentView === 'cart' ? '#ecfdf5' : 'transparent',
          position: 'relative',
          transition: 'all 0.2s ease'
        }}
      >
        <ShoppingBag size={19} />
        <span>Cart</span>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '8px',
            backgroundColor: '#f59e0b',
            color: '#ffffff',
            fontSize: '9.5px',
            fontWeight: '800',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={() => navigateTo('my-orders')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: (currentView === 'my-orders' || currentView === 'order-tracking' || currentView === 'order-confirmation') ? '#059669' : '#64748b',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderRadius: '16px',
          backgroundColor: (currentView === 'my-orders' || currentView === 'order-tracking' || currentView === 'order-confirmation') ? '#ecfdf5' : 'transparent',
          transition: 'all 0.2s ease'
        }}
      >
        <Package size={19} />
        <span>Orders</span>
      </button>
    </div>
  );
};
