import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { VENDORS } from '../data/vendors';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { VendorCard } from '../components/VendorCard';
import { 
  Sparkles, 
  ArrowRight, 
  Store, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Navigation, 
  TrendingUp, 
  CreditCard, 
  RefreshCw, 
  Mic, 
  Sun, 
  WifiOff, 
  BarChart3,
  Globe,
  HelpCircle,
  X,
  Users,
  Bell,
  Lock,
  ChevronRight
} from 'lucide-react';

export const Home = () => {
  const { navigateTo, PRODUCTS, showToast, setIsVoiceSearchOpen, language, changeLanguage, t } = useApp();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const popularProducts = PRODUCTS.filter(p => p.isPopular);

  const SMART_FEATURES = [
    {
      id: 'coordination',
      title: t('feat_coordination_title'),
      desc: t('feat_coordination_desc'),
      icon: Users,
      color: '#15803d',
      bg: '#f0fdf4',
      details: 'Groups nearby rural vendors onto shared transport routes to lower logistics costs for small village stores.'
    },
    {
      id: 'route',
      title: t('feat_route_title'),
      desc: t('feat_route_desc'),
      icon: Navigation,
      color: '#0284c7',
      bg: '#f0f9ff',
      details: 'AI calculates Dijkstra optimal delivery routes, reducing travel time by up to 35% across Mijar & Moodbidri.'
    },
    {
      id: 'demand',
      title: t('feat_demand_title'),
      desc: t('feat_demand_desc'),
      icon: TrendingUp,
      color: '#7e22ce',
      bg: '#f3e8ff',
      details: 'Analyzes historical village purchase trends to recommend exact inventory levels before weekly market days.'
    },
    {
      id: 'updates',
      title: t('feat_updates_title'),
      desc: t('feat_updates_desc'),
      icon: Bell,
      color: '#ea580c',
      bg: '#fff7ed',
      details: 'WebSocket sync pushes instant order acceptance and delivery rider movement directly to the customer app.'
    },
    {
      id: 'offline',
      title: t('feat_offline_title'),
      desc: t('feat_offline_desc'),
      icon: WifiOff,
      color: '#0284c7',
      bg: '#e0f2fe',
      details: 'PWA local database queues transactions offline during weak network coverage in remote farmland.'
    },
    {
      id: 'voice',
      title: t('feat_voice_title'),
      desc: t('feat_voice_desc'),
      icon: Mic,
      color: '#9333ea',
      bg: '#f3e8ff',
      details: 'Web Speech API converts spoken Kannada & Hindi audio directly into product items and quantities in the cart.'
    },
    {
      id: 'digital',
      title: t('feat_digital_title'),
      desc: t('feat_digital_desc'),
      icon: CreditCard,
      color: '#15803d',
      bg: '#f0fdf4',
      details: 'Combines instant UPI QR payments with digital Khata credit tracking for village customer relationships.'
    },
    {
      id: 'weather',
      title: t('feat_weather_title'),
      desc: t('feat_weather_desc'),
      icon: Sun,
      color: '#d97706',
      bg: '#fffbeb',
      details: 'Live monsoon weather telemetry alerts vendors to cover vegetable carts before heavy rain hits.'
    },
    {
      id: 'analytics',
      title: t('feat_analytics_title'),
      desc: t('feat_analytics_desc'),
      icon: BarChart3,
      color: '#059669',
      bg: '#ecfdf5',
      details: 'Visual dashboard reports daily earnings, fast-moving items, and customer retention metrics.'
    }
  ];

  const EXTENDED_CATEGORIES = [
    { id: 'vegetables', key: 'cat_vegetables', name: t('cat_vegetables'), icon: '🥦', bg: '#f0fdf4' },
    { id: 'fruits', key: 'cat_fruits', name: t('cat_fruits'), icon: '🍎', bg: '#fff7ed' },
    { id: 'dry-fruits', key: 'cat_dry_fruits', name: t('cat_dry_fruits'), icon: '🥜', bg: '#fffbeb' },
    { id: 'spices', key: 'cat_spices', name: t('cat_spices'), icon: '🌶️', bg: '#fef2f2' },
    { id: 'grocery', key: 'cat_grocery', name: t('cat_grocery'), icon: '🧂', bg: '#f0f9ff' },
    { id: 'dairy-products', key: 'cat_dairy_products', name: t('cat_dairy_products'), icon: '🥛', bg: '#eff6ff' },
    { id: 'snacks', key: 'cat_snacks', name: t('cat_snacks'), icon: '🍿', bg: '#fffbeb' },
    { id: 'beverages', key: 'cat_beverages', name: t('cat_beverages'), icon: '🥤', bg: '#ecfdf5' },
    { id: 'daily-essentials', key: 'cat_daily_essentials', name: t('cat_daily_essentials'), icon: '🧼', bg: '#f5f3ff' }
  ];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
      
      {/* Hero Section with Official VendorSaathi Circular Emblem in Right Side */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '24px 0 20px 0',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            backgroundColor: '#f0fdf4',
            borderRadius: '28px',
            padding: '36px',
            border: '1px solid #bbf7d0',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Left Content Pane */}
            <div style={{ zIndex: 2 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #bbf7d0',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#15803d',
                marginBottom: '16px'
              }}>
                {t('fresh_badge')}
              </div>

              <h1 style={{
                fontSize: '42px',
                fontWeight: '800',
                lineHeight: 1.12,
                marginBottom: '16px',
                color: '#0f172a',
                letterSpacing: '-0.8px'
              }}>
                {t('hero_title_1')} <br />
                <span style={{ color: '#16a34a' }}>{t('hero_title_2')}</span>
              </h1>

              <p style={{
                fontSize: '15px',
                color: '#475569',
                marginBottom: '24px',
                lineHeight: 1.6,
                maxWidth: '480px'
              }}>
                {t('hero_subtitle')}
              </p>

              {/* Trust Indicators Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '28px',
                maxWidth: '480px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <Truck size={18} color="#16a34a" />
                  <div>
                    <strong style={{ fontSize: '12px', display: 'block', color: '#0f172a' }}>{t('fast_delivery')}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{t('in_20_mins')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <ShieldCheck size={18} color="#16a34a" />
                  <div>
                    <strong style={{ fontSize: '12px', display: 'block', color: '#0f172a' }}>{t('best_quality')}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{t('daily_fresh')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <Store size={18} color="#16a34a" />
                  <div>
                    <strong style={{ fontSize: '12px', display: 'block', color: '#0f172a' }}>{t('support_local')}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{t('empower_vendors')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <Lock size={18} color="#16a34a" />
                  <div>
                    <strong style={{ fontSize: '12px', display: 'block', color: '#0f172a' }}>{t('secure_payment')}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{t('safe_100')}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigateTo('categories')}
                  className="btn-primary"
                  style={{ backgroundColor: '#15803d', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: '700' }}
                >
                  <span>{t('start_shopping')}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigateTo('nearby-vendors')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <MapPin size={18} color="#16a34a" />
                  <span>{t('find_vendors')}</span>
                </button>
              </div>
            </div>

            {/* Right Side Empty Space: Filled with Official VendorSaathi Circular Emblem Illustration */}
            <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '32px',
                padding: '16px',
                boxShadow: '0 16px 40px rgba(22, 163, 74, 0.15)',
                border: '2px solid #bbf7d0',
                display: 'inline-block'
              }}>
                <img
                  src="/hero-vendor-emblem.png"
                  alt="VendorSaathi Smart Rural Grocery Assistant Emblem"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    borderRadius: '24px'
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Shop by Categories Section */}
      <section style={{ padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🍃</span>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{t('shop_by_categories')}</h2>
            </div>
            <button
              onClick={() => navigateTo('categories')}
              style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {t('view_all_categories')} <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '14px'
          }}>
            {EXTENDED_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => navigateTo('product-listing', { category: cat.id })}
                style={{
                  backgroundColor: cat.bg,
                  borderRadius: '16px',
                  padding: '16px 10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease'
                }}
                className="vs-card"
              >
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>{cat.icon}</div>
                <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', lineHeight: 1.2 }}>{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VendorSaathi Smart Features Section */}
      <section style={{ padding: '36px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {t('rural_innovation')}
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
              ✨ {t('smart_features')}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              {t('click_feature_info')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {SMART_FEATURES.map(feat => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat)}
                  style={{
                    backgroundColor: feat.bg,
                    border: '1px solid #e2e8f0',
                    borderRadius: '18px',
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="vs-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ backgroundColor: '#ffffff', color: feat.color, padding: '10px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                      <Icon size={20} />
                    </div>
                    <strong style={{ fontSize: '14px', color: '#0f172a', lineHeight: 1.2 }}>{feat.title}</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Language Support Banner with ONLY 3 Language Options */}
      <section style={{ padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* Multi-Language Card (English | ಕನ್ನಡ | हिन्दी) */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Globe size={22} color="#16a34a" />
                  <strong style={{ fontSize: '16px', color: '#0f172a' }}>{t('multi_lang_title')}</strong>
                </div>
                <p style={{ fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                  {t('multi_lang_desc')}
                </p>

                {/* EXACT 3 LANGUAGE BUTTONS ONLY */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { code: 'English', label: 'English' },
                    { code: 'ಕನ್ನಡ', label: 'ಕನ್ನಡ (Kannada)' },
                    { code: 'ಹಿन्दी', label: 'हिन्दी (Hindi)' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: language === lang.code ? '#15803d' : '#ffffff',
                        color: language === lang.code ? '#ffffff' : '#334155',
                        border: language === lang.code ? '1px solid #15803d' : '1px solid #cbd5e1',
                        boxShadow: language === lang.code ? '0 4px 12px rgba(21, 128, 61, 0.25)' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Guidance Info Card */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ backgroundColor: '#15803d', color: '#ffffff', padding: '14px', borderRadius: '50%', flexShrink: 0 }}>
                  <HelpCircle size={28} />
                </div>
                <div>
                  <strong style={{ fontSize: '16px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                    {t('feature_guidance_title')}
                  </strong>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                    {t('feature_guidance_desc')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFeature(SMART_FEATURES[0])}
                className="btn-primary"
                style={{ backgroundColor: '#ffffff', color: '#15803d', border: '1px solid #cbd5e1', fontSize: '13px', padding: '10px 16px', borderRadius: '12px', whiteSpace: 'nowrap' }}
              >
                {t('how_it_works_btn')}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Top Nearby Vendors Section */}
      <section style={{ padding: '36px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{t('top_nearby_vendors')}</h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{t('delivering_to_you')}</p>
            </div>
            <button onClick={() => navigateTo('nearby-vendors')} style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {t('view_all_stores')} <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {VENDORS.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products / Fresh Today Section */}
      <section style={{ padding: '36px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{t('popular_products')}</h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{t('fastest_selling')}</p>
            </div>
            <button onClick={() => navigateTo('product-listing')} style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {t('view_full_catalog')} <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Guidance Modal */}
      {selectedFeature && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 220, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '28px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ backgroundColor: selectedFeature.bg, color: selectedFeature.color, padding: '10px', borderRadius: '12px' }}>
                  {React.createElement(selectedFeature.icon, { size: 24 })}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{selectedFeature.title}</h3>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700' }}>{t('feature_guidance_title')}</span>
                </div>
              </div>
              <button onClick={() => setSelectedFeature(null)} style={{ color: '#64748b' }}><X size={20} /></button>
            </div>

            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
              {selectedFeature.desc}
            </p>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', fontSize: '12px', color: '#475569', marginBottom: '20px' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>🎓 {t('academic_impl')}:</strong>
              {selectedFeature.details}
            </div>

            <button
              onClick={() => setSelectedFeature(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '12px' }}
            >
              {t('got_it_close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
