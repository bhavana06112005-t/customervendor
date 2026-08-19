import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Grid, ShoppingBag, Package, User } from 'lucide-react';

export const BottomNav = () => {
  const { currentView, navigateTo, cart } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'my-orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      zIndex: 90
    }} className="mobile-bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive ? '#16a34a' : '#64748b',
              fontSize: '11px',
              fontWeight: isActive ? '700' : '500',
              position: 'relative'
            }}
          >
            <Icon size={20} />
            <span style={{ marginTop: '2px' }}>{tab.label}</span>
            {tab.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '10px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '800',
                borderRadius: '10px',
                padding: '2px 6px'
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
