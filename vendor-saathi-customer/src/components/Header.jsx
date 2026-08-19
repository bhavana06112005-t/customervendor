import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  Globe, 
  HelpCircle, 
  ChevronDown, 
  Mic,
  Store
} from 'lucide-react';

export const Header = () => {
  const { 
    currentView, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    currentLocation, 
    user, 
    cart, 
    language,
    changeLanguage,
    t,
    setIsLocationModalOpen,
    setIsAuthModalOpen,
    setIsCartDrawerOpen,
    setIsVendorSimOpen,
    setIsVoiceSearchOpen
  } = useApp();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('product-listing');
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      {/* Top Banner Announcement Bar */}
      <div style={{ backgroundColor: '#052e16', color: '#ffffff', fontSize: '12px', padding: '6px 16px', fontWeight: '500' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{t('top_announcement')}</span>
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {/* 3-Language Selector: English | ಕನ್ನಡ | हिन्दी */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.12)', padding: '2px 10px', borderRadius: '14px' }}>
              <Globe size={14} color="#4ade80" />
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', fontWeight: '700' }}>
                <button
                  onClick={() => changeLanguage('English')}
                  style={{
                    color: language === 'English' ? '#4ade80' : '#ffffff',
                    borderBottom: language === 'English' ? '2px solid #4ade80' : 'none',
                    paddingBottom: '1px'
                  }}
                >
                  English
                </button>
                <span style={{ opacity: 0.4 }}>|</span>
                <button
                  onClick={() => changeLanguage('ಕನ್ನಡ')}
                  style={{
                    color: language === 'ಕನ್ನಡ' ? '#4ade80' : '#ffffff',
                    borderBottom: language === 'ಕನ್ನಡ' ? '2px solid #4ade80' : 'none',
                    paddingBottom: '1px'
                  }}
                >
                  ಕನ್ನಡ
                </button>
                <span style={{ opacity: 0.4 }}>|</span>
                <button
                  onClick={() => changeLanguage('ಹಿन्दी')}
                  style={{
                    color: language === 'ಹಿन्दी' ? '#4ade80' : '#ffffff',
                    borderBottom: language === 'ಹಿन्दी' ? '2px solid #4ade80' : 'none',
                    paddingBottom: '1px'
                  }}
                >
                  ಹಿन्दी
                </button>
              </div>
            </div>

            <button onClick={() => navigateTo('saved-addresses-support')} style={{ color: '#ffffff', fontSize: '12px' }}>
              {t('help')}
            </button>

            <button 
              onClick={() => setIsVendorSimOpen(true)}
              style={{ 
                backgroundColor: '#15803d', 
                color: '#ffffff', 
                padding: '4px 12px', 
                borderRadius: '12px', 
                fontSize: '11px', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid #22c55e'
              }}
            >
              <Store size={12} /> {t('become_vendor')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="container" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Brand Logo & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => navigateTo('home')} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
          >
            <img 
              src="/logo.jpg" 
              alt="VendorSaathi Logo" 
              style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.2)',
                border: '2px solid #16a34a'
              }} 
            />
            <div>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#15803d', letterSpacing: '-0.5px', lineHeight: 1 }}>
                Vendor<span style={{ color: '#ea580c' }}>Saathi</span>
              </span>
              <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: '700', letterSpacing: '0.3px', marginTop: '2px' }}>
                {t('brand_subtitle')}
              </span>
            </div>
          </div>

          {/* Location Selector Pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              color: '#334155'
            }}
          >
            <MapPin size={16} color="#16a34a" />
            <span style={{ maxWidth: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentLocation.village ? `${currentLocation.village}, ${currentLocation.town}` : currentLocation.name}
            </span>
            <ChevronDown size={14} color="#94a3b8" />
          </button>
        </div>

        {/* Global Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          style={{ flex: 1, maxWidth: '480px', position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (currentView !== 'product-listing') navigateTo('product-listing'); }}
              style={{
                width: '100%',
                padding: '10px 42px 10px 40px',
                borderRadius: '24px 0 0 24px',
                border: '1px solid #cbd5e1',
                borderRight: 'none',
                backgroundColor: '#f8fafc',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />

            <button
              type="button"
              onClick={() => setIsVoiceSearchOpen(true)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#16a34a',
                border: 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Voice Search (Kannada / Hindi / English)"
            >
              <Mic size={18} />
            </button>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#15803d',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '0 24px 24px 0',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Search size={18} />
          </button>
        </form>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <nav style={{ display: 'flex', gap: '18px', fontSize: '14px', fontWeight: '700' }} className="desktop-nav">
            <button onClick={() => navigateTo('home')} style={{ color: currentView === 'home' ? '#16a34a' : '#334155' }}>{t('nav_home')}</button>
            <button onClick={() => navigateTo('categories')} style={{ color: currentView === 'categories' ? '#16a34a' : '#334155' }}>{t('nav_shop')}</button>
            <button onClick={() => navigateTo('nearby-vendors')} style={{ color: currentView === 'nearby-vendors' ? '#16a34a' : '#334155' }}>{t('nav_vendors')}</button>
            <button onClick={() => navigateTo('my-orders')} style={{ color: currentView === 'my-orders' ? '#16a34a' : '#334155' }}>{t('nav_orders')}</button>
          </nav>

          {/* Cart Pill Button */}
          <button 
            onClick={() => setIsCartDrawerOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '8px 16px',
              borderRadius: '24px',
              color: '#15803d',
              fontWeight: '700',
              fontSize: '13px'
            }}
          >
            <ShoppingBag size={18} color="#16a34a" />
            <span>{t('cart')}</span>
            {cartItemCount > 0 && (
              <span style={{ backgroundColor: '#16a34a', color: '#ffffff', fontWeight: '800', padding: '2px 8px', borderRadius: '12px', fontSize: '11px' }}>
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile User Icon */}
          {user.isLoggedIn ? (
            <button onClick={() => navigateTo('profile')} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#15803d', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="#15803d" />
            </button>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className="btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
