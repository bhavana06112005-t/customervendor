import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  Heart, 
  Bell, 
  Smartphone, 
  ChevronDown, 
  Menu,
  X,
  Package,
  Mic,
  Sparkles,
  Globe,
  Store,
  Tag,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Radio,
  Layers
} from 'lucide-react';
import { playPopSound } from '../utils/audio';

export const Navbar = () => {
  const { 
    currentView, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    currentLocation, 
    user, 
    cart, 
    wishlist, 
    notifications,
    setIsLocationModalOpen,
    setIsAuthModalOpen,
    setAuthModalInitialTab,
    setIsCartDrawerOpen,
    setIsVendorSimOpen,
    setIsVoiceSearchOpen,
    selectedLanguage,
    changeLanguage,
    setIsVoiceAssistanceOpen,
    setUser,
    showToast
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('product-listing');
    }
  };

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)'
    }}>
      {/* Top Banner Announcement & Live Cloud Status */}
      <div style={{ 
        background: 'linear-gradient(90deg, #064e3b 0%, #047857 50%, #065f46 100%)', 
        color: '#ffffff', 
        fontSize: '12.5px', 
        padding: '7px 16px', 
        fontWeight: '600'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'rgba(255,255,255,0.18)', 
              padding: '2px 8px', 
              borderRadius: '20px',
              fontSize: '11px',
              letterSpacing: '0.3px',
              fontWeight: '800'
            }}>
              ⚡ EXPRESS DELIVERY
            </span>
            <span style={{ fontSize: '12px' }}>
              Connecting local stores & customers in <strong>{currentLocation?.village || currentLocation?.name?.split(',')[0] || user?.village || 'Your Locality'}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Live Firebase Cloud Sync Pill */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fef08a',
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '800'
            }}>
              <Radio size={11} className="animate-pulse" />
              <span>Firebase Cloud Connected</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="container" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            onClick={() => navigateTo('home')} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              color: '#ffffff', 
              width: '42px', 
              height: '42px', 
              borderRadius: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.35)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06) rotate(-3deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              <ShoppingBag size={22} />
            </div>
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '22px', 
                fontWeight: '900', 
                color: '#064e3b', 
                letterSpacing: '-0.5px', 
                lineHeight: 1 
              }}>
                Vendor<span style={{ color: '#f59e0b' }}>Saathi</span>
              </span>
              <span style={{ display: 'block', fontSize: '9.5px', color: '#059669', fontWeight: '800', letterSpacing: '0.6px', marginTop: '2px' }}>
                SMART RURAL GROCERY
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
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #a7f3d0',
              padding: '6px 14px',
              borderRadius: '24px',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontWeight: '700',
              color: '#065f46',
              boxShadow: '0 2px 6px rgba(16, 185, 129, 0.08)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dcfce7';
              e.currentTarget.style.borderColor = '#34d399';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0fdf4';
              e.currentTarget.style.borderColor = '#a7f3d0';
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <MapPin size={15} color="#059669" />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulseGlowRing 2s infinite'
              }}></span>
            </div>
            <span style={{ maxWidth: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentLocation.village ? `${currentLocation.village}, ${currentLocation.town}` : currentLocation.name}
            </span>
            <ChevronDown size={13} color="#059669" />
          </button>

          {/* Language Selector Dropdown */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            backgroundColor: '#ffffff', 
            border: '1px solid #cbd5e1', 
            padding: '4px 10px', 
            borderRadius: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <Globe size={13} color="#059669" />
            <select
              value={selectedLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '12px',
                fontWeight: '700',
                color: '#334155',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="en">🇬🇧 English</option>
              <option value="kn">🇮🇳 ಕನ್ನಡ</option>
              <option value="hi">🇮🇳 हिंदी</option>
            </select>
          </div>
        </div>

        {/* Center Search Bar with Voice Button */}
        <div style={{ flex: '1', maxWidth: '540px', position: 'relative' }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              borderRadius: '24px',
              border: searchFocused ? '2px solid #10b981' : '1.5px solid #e2e8f0',
              padding: '2px 6px 2px 14px',
              boxShadow: searchFocused ? '0 0 0 4px rgba(16, 185, 129, 0.15)' : '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}>
              <Search size={17} color={searchFocused ? '#059669' : '#94a3b8'} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search fresh vegetables, fruits, local kirana..."
                style={{
                  flex: 1,
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: '9px 10px',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#0f172a',
                  fontWeight: '600'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ color: '#94a3b8', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={15} />
                </button>
              )}

              {/* Voice Search Mic Button */}
              <button
                type="button"
                onClick={() => setIsVoiceSearchOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  border: '1px solid #a7f3d0',
                  color: '#059669',
                  padding: '6px 10px',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Search using Voice (Kannada / English)"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Mic size={14} />
                <span>Voice</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Smart AI Voice Assistant Pill */}
          <button
            onClick={() => setIsVoiceAssistanceOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              color: '#ffffff',
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.35)';
            }}
          >
            <Sparkles size={14} color="#fef08a" />
            <span>Voice AI</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('wishlist')}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px',
              borderRadius: '12px',
              color: wishlist.length > 0 ? '#ef4444' : '#64748b',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
          >
            <Heart size={19} fill={wishlist.length > 0 ? '#ef4444' : 'none'} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '800',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Notification Button & Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '8px',
                borderRadius: '12px',
                color: '#64748b',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            >
              <Bell size={19} />
              {unreadNotifs > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadNotifs}
                </span>
              )}
            </button>

            {isNotifDropdownOpen && (
              <div 
                className="animate-fade-scale"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  width: '320px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 16px 36px -4px rgba(15, 23, 42, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  zIndex: 200
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Notifications</strong>
                  <button 
                    onClick={() => { setIsNotifDropdownOpen(false); navigateTo('notifications'); }}
                    style={{ fontSize: '11.5px', color: '#059669', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    View All
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#f8fafc', fontSize: '12px' }}>
                      <p style={{ color: '#1e293b', fontWeight: '600', margin: 0 }}>{n.title}</p>
                      <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', display: 'block' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button with Animated Bounce Badge */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '800',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.35)';
            }}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span style={{
                backgroundColor: '#f59e0b',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '1px 7px',
                fontSize: '11.5px',
                fontWeight: '900',
                animation: 'numberPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Google Profile Button & Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                if (user?.isLoggedIn) {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                } else {
                  setAuthModalInitialTab('google');
                  setIsAuthModalOpen(true);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '5px 12px 5px 6px',
                borderRadius: '24px',
                fontSize: '12.5px',
                fontWeight: '800',
                color: '#0f172a',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
            >
              {user?.isLoggedIn && user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.name || 'User'} 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '800'
                }}>
                  {user?.isLoggedIn ? (user.name ? user.name.charAt(0).toUpperCase() : 'U') : <User size={14} />}
                </div>
              )}
              
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ maxWidth: '90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                  {user?.isLoggedIn ? (user.name ? user.name.split(' ')[0] : 'Account') : 'Sign In'}
                </span>
                {user?.isLoggedIn && (
                  <span style={{ fontSize: '9px', color: '#059669', fontWeight: '800' }}>
                    {user.role === 'vendor' ? '🏪 Vendor' : '🌾 Verified'}
                  </span>
                )}
              </div>
              <ChevronDown size={12} color="#64748b" />
            </button>

            {isProfileMenuOpen && user?.isLoggedIn && (
              <div 
                className="animate-fade-scale"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  width: '240px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  boxShadow: '0 20px 40px -4px rgba(15, 23, 42, 0.18)',
                  border: '1px solid #e2e8f0',
                  padding: '10px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {/* User Quick Info */}
                <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13.5px', color: '#0f172a', display: 'block' }}>{user.name}</strong>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>{user.email}</span>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '800', display: 'block', marginTop: '2px' }}>
                    📍 {user.village || currentLocation?.village || currentLocation?.name?.split(',')[0] || 'Local Area'}
                  </span>
                </div>

                <button
                  onClick={() => { setIsProfileMenuOpen(false); navigateTo('profile'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#334155', fontWeight: '700', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <User size={16} color="#059669" /> My Account & Settings
                </button>

                <button
                  onClick={() => { setIsProfileMenuOpen(false); navigateTo('my-orders'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#334155', fontWeight: '700', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Package size={16} color="#059669" /> My Orders & Live Tracking
                </button>

                <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }} />

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setUser({ isLoggedIn: false, name: '', phone: '', email: '' });
                    localStorage.removeItem('vendorsaathi_current_user');
                    showToast('Logged out successfully');
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#ef4444', fontWeight: '700', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
