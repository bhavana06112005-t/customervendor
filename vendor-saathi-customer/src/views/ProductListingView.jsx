import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { SlidersHorizontal, Search, X, PackageX, Sparkles } from 'lucide-react';

export const ProductListingView = () => {
  const { 
    PRODUCTS, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedVendor, 
    setSelectedVendor,
    navigateTo, 
    t 
  } = useApp();

  const [activeCat, setActiveCat] = useState(selectedCategory || 'all');
  const [activeVendor, setActiveVendor] = useState(selectedVendor?.id || 'all');

  useEffect(() => {
    if (selectedCategory !== undefined && selectedCategory !== null) {
      setActiveCat(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedVendor !== undefined && selectedVendor !== null) {
      setActiveVendor(selectedVendor.id);
    }
  }, [selectedVendor]);

  // Intelligent Search & Category Filtering Logic
  let filtered = PRODUCTS;

  // Filter by vendor
  if (activeVendor !== 'all') {
    filtered = filtered.filter(p => p.vendorId === activeVendor);
  }

  // Filter by search query OR active category (never conflict)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.shortName && p.shortName.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.vendorName.toLowerCase().includes(q)
    );

    // If activeCat is also set, only apply activeCat filter if matching items exist in activeCat
    if (activeCat !== 'all') {
      const catSpecific = filtered.filter(p => p.category === activeCat);
      if (catSpecific.length > 0) {
        filtered = catSpecific;
      }
    }
  } else if (activeCat !== 'all') {
    filtered = filtered.filter(p => p.category === activeCat);
  }

  // Group filtered products by Category
  const categoryGroups = CATEGORIES.map(cat => {
    const items = filtered.filter(p => p.category === cat.id);
    return {
      category: cat,
      items
    };
  }).filter(group => group.items.length > 0);

  const handleCategorySelect = (catId) => {
    setActiveCat(catId);
    setSelectedCategory(catId);
    setSearchQuery(''); // Auto-clear search bar on category click so items display immediately!
  };

  const handleClearFilters = () => {
    setActiveCat('all');
    setSelectedCategory('all');
    setActiveVendor('all');
    setSelectedVendor(null);
    setSearchQuery('');
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === activeCat);

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px' }}>
      
      {/* Header Title & Active Filters Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>
              {activeCat !== 'all' && !searchQuery.trim()
                ? (currentCategoryObj ? `${currentCategoryObj.icon} ${t('cat_' + activeCat.replace('-', '_')) || currentCategoryObj.name}` : t('product_catalog')) 
                : (searchQuery.trim() ? `Search Results for "${searchQuery}"` : t('product_catalog'))}
            </h1>

            {(activeCat !== 'all' || searchQuery.trim() || activeVendor !== 'all') && (
              <button
                onClick={handleClearFilters}
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <X size={14} /> {t('clear_filters')}
              </button>
            )}
          </div>

          <span style={{ fontSize: '13px', color: '#64748b', display: 'block', marginTop: '4px' }}>
            {t('showing_items')} <strong>{filtered.length}</strong> {t('items_near')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigateTo('filter-sort')} className="btn-outline" style={{ borderRadius: '12px', fontSize: '13px' }}>
            <SlidersHorizontal size={16} /> Filter & Sort
          </button>
        </div>
      </div>

      {/* 9 Category Selector Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => handleCategorySelect('all')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
            backgroundColor: activeCat === 'all' && !searchQuery.trim() ? '#15803d' : '#ffffff',
            color: activeCat === 'all' && !searchQuery.trim() ? '#ffffff' : '#334155',
            border: activeCat === 'all' && !searchQuery.trim() ? '1px solid #15803d' : '1px solid #cbd5e1',
            boxShadow: activeCat === 'all' && !searchQuery.trim() ? '0 4px 12px rgba(21, 128, 61, 0.2)' : 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          {t('all_items')}
        </button>

        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              backgroundColor: activeCat === cat.id && !searchQuery.trim() ? '#15803d' : '#ffffff',
              color: activeCat === cat.id && !searchQuery.trim() ? '#ffffff' : '#334155',
              border: activeCat === cat.id && !searchQuery.trim() ? '1px solid #15803d' : '1px solid #cbd5e1',
              boxShadow: activeCat === cat.id && !searchQuery.trim() ? '0 4px 12px rgba(21, 128, 61, 0.2)' : 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {cat.icon} {t('cat_' + cat.id.replace('-', '_')) || cat.name}
          </button>
        ))}
      </div>

      {/* Grouped Product Sections (Vegetables, Fruits, Dry Fruits, Spices, Dairy, Groceries, Snacks separately) */}
      {categoryGroups.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {categoryGroups.map(group => (
            <div 
              key={group.category.id} 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
              }}
            >
              {/* Category Section Header */}
              <div style={{ 
                display: 'flex', 
                justify: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px', 
                paddingBottom: '12px', 
                borderBottom: '2px solid #f1f5f9' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: group.category.bg || '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    border: `1px solid ${group.category.color}33`
                  }}>
                    {group.category.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {t('cat_' + group.category.id.replace('-', '_')) || group.category.name}
                      <span style={{ 
                        backgroundColor: group.category.color || '#16a34a', 
                        color: '#ffffff', 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        padding: '2px 8px', 
                        borderRadius: '12px' 
                      }}>
                        {group.items.length} {group.items.length === 1 ? 'Item' : 'Items'}
                      </span>
                    </h2>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      {group.category.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCategorySelect(group.category.id)}
                  style={{
                    backgroundColor: '#f8fafc',
                    color: '#15803d',
                    border: '1px solid #bbf7d0',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  View Category →
                </button>
              </div>

              {/* Category Items Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px'
              }}>
                {group.items.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          margin: '20px 0'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <PackageX size={32} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            {t('no_products_found')}
          </h3>

          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            {t('no_products_desc')}
          </p>

          <button
            onClick={handleClearFilters}
            className="btn-primary"
            style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '14px' }}
          >
            {t('view_all_products')}
          </button>
        </div>
      )}

    </div>
  );
};
