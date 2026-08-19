import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useVendorSync } from '../context/VendorSyncContext';
import { 
  Store, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ShoppingBag, 
  RefreshCw, 
  ShieldCheck, 
  Radio, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Phone, 
  Check, 
  X, 
  Send,
  Navigation,
  Activity,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';
import { playOrderNotificationSound, playStatusUpdateSound, playPopSound } from '../utils/audio';

export const VendorPortalView = () => {
  const { 
    orders, 
    products, 
    updateVendorProduct, 
    vendors, 
    updateVendorStore, 
    activeOrderId, 
    setActiveOrderId, 
    navigateTo, 
    showToast,
    setIsVendorChatOpen,
    activeRiderLocation,
    setActiveRiderLocation
  } = useApp();

  const { updateVendorOrderState, broadcastRiderLocation, broadcastStoreStatus } = useVendorSync();

  // Active vendor selection (Defaults to Ramesh Grocery v1)
  const [selectedVendorId, setSelectedVendorId] = useState('v1');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory' | 'gps' | 'analytics' | 'chat'
  
  // GPS Telemetry Simulation state
  const [isSimulatingGps, setIsSimulatingGps] = useState(false);
  const [gpsProgress, setGpsProgress] = useState(0.5);

  // New Product Modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('kg');
  const [newProdCategory, setNewProdCategory] = useState('vegetables');

  // Vendor chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'customer', text: 'Namaste Ramesh Gowda, please pack fresh crisp tomatoes.', time: '10:38 AM' },
    { sender: 'vendor', text: 'Namaste Bhavana! Handpicked fresh batch from Moodbidri farms. Rider dispatched.', time: '10:40 AM' }
  ]);
  const [vendorReplyInput, setVendorReplyInput] = useState('');

  const currentVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];
  const vendorOrders = orders.filter(o => o.vendorId === selectedVendorId || !o.vendorId);
  const vendorProducts = products.filter(p => p.vendorId === selectedVendorId);

  // Stats calculation
  const totalRevenue = vendorOrders.reduce((sum, o) => o.status !== 'Cancelled' ? sum + (o.total || 0) : sum, 0);
  const pendingOrdersCount = vendorOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const deliveredOrdersCount = vendorOrders.filter(o => o.status === 'Delivered').length;

  // Real-time GPS ride simulation interval
  useEffect(() => {
    let timer;
    if (isSimulatingGps) {
      timer = setInterval(() => {
        setGpsProgress(prev => {
          const next = prev >= 0.98 ? 0.15 : prev + 0.05;
          const coords = {
            lat: 13.0100 + next * 0.0035,
            lng: 74.9820 + next * 0.0040,
            progress: next
          };
          broadcastRiderLocation(selectedVendorId, coords);
          return next;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isSimulatingGps, selectedVendorId]);

  // Order status progression
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    updateVendorOrderState(orderId, newStatus);
    playStatusUpdateSound();
    showToast(`Order #${orderId} status changed to "${newStatus}"! Synced live with customer 🚀`);
  };

  // Toggle store online/offline/busy
  const handleStoreStatusChange = (newStatus) => {
    let label = '🟢 Open Now';
    let isOpen = true;
    if (newStatus === 'busy') {
      label = '🟠 Busy (High Demand)';
      isOpen = true;
    } else if (newStatus === 'offline') {
      label = '🔴 Closed';
      isOpen = false;
    }
    broadcastStoreStatus(selectedVendorId, {
      status: newStatus,
      isOpen,
      statusLabel: label
    });
    playPopSound();
    showToast(`Store status updated: ${label}`);
  };

  // Toggle stock availability
  const handleStockToggle = (product) => {
    const nextStatus = product.stockStatus === 'in-stock' ? 'out-of-stock' : 'in-stock';
    const nextStock = nextStatus === 'in-stock' ? 15 : 0;
    updateVendorProduct(product.id, {
      stockStatus: nextStatus,
      availableStock: nextStock
    });
    showToast(`${product.name} marked as ${nextStatus.toUpperCase()}`);
  };

  // Add new product to catalog
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProd = {
      id: `p_custom_${Date.now()}`,
      name: newProdName,
      shortName: newProdName.split(' ')[0],
      category: newProdCategory,
      price: Number(newProdPrice),
      originalPrice: Math.round(Number(newProdPrice) * 1.25),
      unit: newProdUnit,
      availableStock: 20,
      stockStatus: 'in-stock',
      vendorId: selectedVendorId,
      vendorName: currentVendor.name,
      vendorDistance: currentVendor.distance || '1.5 km',
      rating: 4.8,
      reviewCount: 1,
      isPopular: true,
      isOrganic: true,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
      description: `Locally sourced fresh farm produce from ${currentVendor.name}, Moodbidri.`
    };

    updateVendorProduct(newProd.id, newProd);
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdPrice('');
    showToast(`🎉 Added ${newProd.name} to live store catalog!`);
  };

  // Send reply in vendor chat
  const handleVendorChatReply = (e) => {
    e.preventDefault();
    if (!vendorReplyInput.trim()) return;

    const replyMsg = {
      sender: 'vendor',
      text: vendorReplyInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, replyMsg]);
    setVendorReplyInput('');
    playPopSound();
    showToast('💬 Message sent to customer!');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '28px 0 60px 0', width: '100%' }}>
      {/* Top Banner & Mode Switcher */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 16px 36px -8px rgba(6, 78, 59, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            <Store size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                VendorSaathi Partner Portal
              </h1>
              <span className="badge badge-warning" style={{ backgroundColor: '#f59e0b', color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>
                🟢 LIVE CONNECTED
              </span>
            </div>
            <span style={{ fontSize: '13.5px', color: '#a7f3d0', display: 'block', marginTop: '3px' }}>
              Two-Way Realtime Order Terminal, Stock Manager & Live Delivery Dispatch
            </span>
          </div>
        </div>

        {/* Action Buttons & Customer Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigateTo('home')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '9px 18px',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          >
            <ShoppingBag size={16} color="#6ee7b7" />
            <span>Switch to Customer Website</span>
          </button>
        </div>
      </div>

      {/* Store Selection & Status Bar */}
      <div className="vs-card" style={{
        padding: '18px 24px',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        border: '1.5px solid #e2e8f0'
      }}>
        {/* Select Active Store */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Managing Store:
          </span>
          <select
            value={selectedVendorId}
            onChange={(e) => setSelectedVendorId(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              fontWeight: '800',
              color: '#064e3b',
              backgroundColor: '#f0fdf4',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {vendors.map(v => (
              <option key={v.id} value={v.id}>
                🏪 {v.name} ({v.location})
              </option>
            ))}
          </select>
        </div>

        {/* Store Open / Busy / Closed Toggle Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#64748b' }}>Store Status:</span>
          <button
            onClick={() => handleStoreStatusChange('online')}
            style={{
              padding: '7px 14px',
              borderRadius: '12px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer',
              backgroundColor: currentVendor.status === 'online' ? '#10b981' : '#f1f5f9',
              color: currentVendor.status === 'online' ? '#ffffff' : '#64748b',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            🟢 Open
          </button>
          <button
            onClick={() => handleStoreStatusChange('busy')}
            style={{
              padding: '7px 14px',
              borderRadius: '12px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer',
              backgroundColor: currentVendor.status === 'busy' ? '#f59e0b' : '#f1f5f9',
              color: currentVendor.status === 'busy' ? '#ffffff' : '#64748b',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            🟠 High Demand
          </button>
          <button
            onClick={() => handleStoreStatusChange('offline')}
            style={{
              padding: '7px 14px',
              borderRadius: '12px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer',
              backgroundColor: currentVendor.status === 'offline' ? '#ef4444' : '#f1f5f9',
              color: currentVendor.status === 'offline' ? '#ffffff' : '#64748b',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            🔴 Closed
          </button>
        </div>
      </div>

      {/* Revenue & Operations Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Gross Revenue Today</span>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#059669', marginTop: '4px' }}>₹{totalRevenue}</div>
          <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: '700' }}>↑ 100% direct village payout</span>
        </div>

        <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Active Pending Orders</span>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#f59e0b', marginTop: '4px' }}>{pendingOrdersCount}</div>
          <span style={{ fontSize: '11.5px', color: '#d97706', fontWeight: '700' }}>Requires packing / dispatch</span>
        </div>

        <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Completed Deliveries</span>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#0284c7', marginTop: '4px' }}>{deliveredOrdersCount}</div>
          <span style={{ fontSize: '11.5px', color: '#0369a1', fontWeight: '700' }}>Fulfilled in Mijar / Moodbidri</span>
        </div>

        <div className="vs-card" style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Active Catalog Items</span>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#8b5cf6', marginTop: '4px' }}>{vendorProducts.length} Items</div>
          <span style={{ fontSize: '11.5px', color: '#7c3aed', fontWeight: '700' }}>Live in customer store</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '10px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '12px',
        marginBottom: '24px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'orders', label: `📦 Live Orders (${vendorOrders.length})`, icon: Package },
          { id: 'inventory', label: `🥬 Produce & Stock Manager (${vendorProducts.length})`, icon: Sliders },
          { id: 'gps', label: '🛵 Live Rider GPS Dispatch', icon: Navigation },
          { id: 'chat', label: '💬 Customer Live Chat', icon: MessageSquare }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); playPopSound(); }}
            style={{
              padding: '10px 18px',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              border: activeTab === tab.id ? '2px solid #10b981' : '1px solid #e2e8f0',
              backgroundColor: activeTab === tab.id ? '#ecfdf5' : '#ffffff',
              color: activeTab === tab.id ? '#064e3b' : '#64748b',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================================================
          TAB 1: LIVE ORDERS MANAGEMENT
          ============================================================ */}
      {activeTab === 'orders' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Incoming Customer Orders Queue
            </h2>
            <span style={{ fontSize: '12.5px', color: '#64748b' }}>
              Updates click status in real-time on customer's phone
            </span>
          </div>

          {vendorOrders.length === 0 ? (
            <div className="vs-card" style={{ padding: '48px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '20px' }}>
              <Package size={48} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
              <strong style={{ fontSize: '17px', color: '#334155', display: 'block' }}>No Orders in Queue</strong>
              <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '4px' }}>
                When customers place an order from {currentVendor.name}, it will appear here immediately with an audio chime!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {vendorOrders.map((order) => (
                <div key={order.id} className="vs-card" style={{
                  padding: '24px',
                  borderRadius: '22px',
                  backgroundColor: '#ffffff',
                  border: order.status === 'Placed' ? '2px solid #f59e0b' : '1.5px solid #e2e8f0',
                  boxShadow: '0 6px 18px -4px rgba(15, 23, 42, 0.06)'
                }}>
                  {/* Order Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong style={{ fontSize: '18px', color: '#0f172a', fontWeight: '900' }}>Order #{order.id}</strong>
                        <span className={`badge ${
                          order.status === 'Delivered' ? 'badge-success' :
                          order.status === 'Cancelled' ? 'badge-danger' :
                          order.status === 'Out for Delivery' ? 'badge-info' : 'badge-warning'
                        }`} style={{ fontSize: '12px', padding: '4px 12px' }}>
                          {order.status}
                        </span>
                      </div>
                      <span style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                        🕒 {order.date} • Payment: <strong>{order.paymentMethod}</strong>
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '20px', fontWeight: '900', color: '#059669' }}>₹{order.total}</span>
                      <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block' }}>({order.items.length} items)</span>
                    </div>
                  </div>

                  {/* Customer Info & Address */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    marginBottom: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '12px',
                    fontSize: '13px',
                    color: '#334155'
                  }}>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block' }}>👤 Customer Details:</strong>
                      <span>{order.deliveryAddress?.split(',')[0] || 'Bhavana Bai'}</span><br />
                      <span>📞 {order.deliveryContact || '+91 9876543210'}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block' }}>📍 Delivery Address & GPS Coordinates:</strong>
                      <span>{order.deliveryAddress}</span>
                      {order.customerGPS && (
                        <div style={{ marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '8px', fontSize: '11.5px', color: '#065f46', fontWeight: '700' }}>
                          <span>🛰️ GPS Lock: {order.customerGPS.lat}° N, {order.customerGPS.lng}° E</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ marginBottom: '18px' }}>
                    <strong style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Items to Pack:
                    </strong>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#f1f5f9', fontSize: '13px' }}>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                            {item.quantity}
                          </span>
                          <span style={{ fontWeight: '700', color: '#1e293b', flex: 1 }}>{item.name}</span>
                          <span style={{ color: '#059669', fontWeight: '800' }}>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Transition Action Pipeline */}
                  <div style={{ paddingTop: '14px', borderTop: '1px dashed #cbd5e1' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Advance Order Lifecycle:
                    </span>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleOrderStatusUpdate(order.id, 'Accepted')}
                        disabled={order.status === 'Accepted' || order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered'}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          backgroundColor: order.status === 'Accepted' ? '#047857' : '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: (order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered') ? 0.5 : 1
                        }}
                      >
                        <Check size={16} /> 1. Accept Order
                      </button>

                      <button
                        onClick={() => handleOrderStatusUpdate(order.id, 'Preparing')}
                        disabled={order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered'}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          backgroundColor: order.status === 'Preparing' ? '#b45309' : '#f59e0b',
                          color: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: (order.status === 'Out for Delivery' || order.status === 'Delivered') ? 0.5 : 1
                        }}
                      >
                        <Clock size={16} /> 2. Start Packing
                      </button>

                      <button
                        onClick={() => {
                          handleOrderStatusUpdate(order.id, 'Out for Delivery');
                          setIsSimulatingGps(true);
                        }}
                        disabled={order.status === 'Out for Delivery' || order.status === 'Delivered'}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          backgroundColor: order.status === 'Out for Delivery' ? '#0369a1' : '#0284c7',
                          color: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: order.status === 'Delivered' ? 0.5 : 1
                        }}
                      >
                        <Truck size={16} /> 3. Dispatch with Rider (GPS)
                      </button>

                      <button
                        onClick={() => {
                          handleOrderStatusUpdate(order.id, 'Delivered');
                          setIsSimulatingGps(false);
                        }}
                        disabled={order.status === 'Delivered'}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          backgroundColor: order.status === 'Delivered' ? '#064e3b' : '#059669',
                          color: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CheckCircle2 size={16} /> 4. Mark Delivered
                      </button>

                      <button
                        onClick={() => {
                          setActiveOrderId(order.id);
                          navigateTo('order-tracking', { orderId: order.id });
                        }}
                        style={{
                          padding: '9px 14px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          border: '1px solid #cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={15} /> Customer View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          TAB 2: PRODUCE CATALOG & INVENTORY MANAGER
          ============================================================ */}
      {activeTab === 'inventory' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Store Catalog & Stock Telemetry
              </h2>
              <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                Toggle in-stock/out-of-stock or edit prices. Reflects instantly on customer website!
              </span>
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="btn-primary"
              style={{ padding: '10px 18px', borderRadius: '14px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} /> Add Fresh Harvest Item
            </button>
          </div>

          {/* Add Product Modal */}
          {isAddProductOpen && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #a7f3d0',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <strong style={{ fontSize: '16px', color: '#064e3b' }}>Add New Farm Produce to {currentVendor.name}</strong>
                <button onClick={() => setIsAddProductOpen(false)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>Item Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Fresh Organic Lady Finger"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="40"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>Unit</label>
                  <select
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  >
                    <option value="kg">kg</option>
                    <option value="500 g">500 g</option>
                    <option value="250 g">250 g</option>
                    <option value="bunch">bunch</option>
                    <option value="piece">piece</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grocery">Grocery & Staples</option>
                    <option value="dairy">Dairy & Essentials</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px', borderRadius: '10px', fontSize: '13.5px' }}>
                    Publish to Store 🚀
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {vendorProducts.map(product => (
              <div key={product.id} className="vs-card" style={{
                padding: '16px',
                borderRadius: '18px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                gap: '14px',
                alignItems: 'center'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '70px', height: '70px', borderRadius: '14px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '14.5px', color: '#0f172a', display: 'block' }}>{product.name}</strong>
                  <span style={{ fontSize: '13px', color: '#059669', fontWeight: '900', display: 'block', marginTop: '2px' }}>
                    ₹{product.price} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>/ {product.unit}</span>
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <button
                      onClick={() => handleStockToggle(product)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        backgroundColor: product.stockStatus === 'in-stock' ? '#ecfdf5' : '#fee2e2',
                        color: product.stockStatus === 'in-stock' ? '#065f46' : '#991b1b',
                        border: product.stockStatus === 'in-stock' ? '1px solid #a7f3d0' : '1px solid #fecaca'
                      }}
                    >
                      {product.stockStatus === 'in-stock' ? '🟢 In Stock' : '🔴 Out of Stock'}
                    </button>

                    <button
                      onClick={() => {
                        const newPrice = prompt(`Enter new price for ${product.name} (Current: ₹${product.price}):`, product.price);
                        if (newPrice && !isNaN(newPrice)) {
                          updateVendorProduct(product.id, { price: Number(newPrice) });
                          showToast(`Updated ${product.name} price to ₹${newPrice}`);
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        cursor: 'pointer'
                      }}
                    >
                      Edit Price
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 3: LIVE RIDER GPS DISPATCH
          ============================================================ */}
      {activeTab === 'gps' && (
        <div className="vs-card" style={{ padding: '28px', borderRadius: '24px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Live Delivery Rider GPS Telemetry
              </h2>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Simulate or broadcast live delivery rider movement from {currentVendor.name} store to Mijar / Moodbidri customer homes.
              </span>
            </div>

            <button
              onClick={() => {
                setIsSimulatingGps(!isSimulatingGps);
                playPopSound();
                showToast(isSimulatingGps ? 'GPS Telemetry Paused' : '🛵 Live Rider Ride Activated!');
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '14px',
                fontSize: '13.5px',
                fontWeight: '800',
                cursor: 'pointer',
                backgroundColor: isSimulatingGps ? '#ef4444' : '#10b981',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Radio size={16} className={isSimulatingGps ? 'animate-pulse' : ''} />
              <span>{isSimulatingGps ? 'Stop GPS Broadcast' : 'Start Live GPS Delivery Run'}</span>
            </button>
          </div>

          {/* Interactive GPS Visualizer */}
          <div style={{
            backgroundColor: '#090d16',
            borderRadius: '20px',
            padding: '24px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={18} color="#34d399" />
                <strong style={{ fontSize: '14.5px' }}>Active Route: Mijar Store → Alva’s Campus Gate</strong>
              </div>
              <span className="badge badge-success" style={{ backgroundColor: '#064e3b', color: '#a7f3d0' }}>
                {isSimulatingGps ? '🟢 TRANSMITTING LIVE GPS' : '⏸️ GPS IDLE'}
              </span>
            </div>

            {/* Simulated Road Track */}
            <div style={{ position: 'relative', height: '80px', backgroundColor: '#1e293b', borderRadius: '16px', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '20px', right: '20px', height: '4px', backgroundColor: '#334155', borderRadius: '2px' }}>
                <div style={{ width: `${gpsProgress * 100}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '2px', transition: 'width 0.8s ease' }} />
              </div>

              {/* Start Store Point */}
              <div style={{ position: 'absolute', left: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  🏪
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Store</span>
              </div>

              {/* Moving Rider Marker */}
              <div style={{
                position: 'absolute',
                left: `calc(20px + ${gpsProgress} * (100% - 70px))`,
                transition: 'left 0.8s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#fbbf24',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px #fbbf24',
                  animation: 'pulseGlowRing 1.5s infinite'
                }}>
                  🛵
                </div>
                <span style={{ fontSize: '10px', color: '#fef08a', fontWeight: '800', marginTop: '2px' }}>
                  {Math.round(gpsProgress * 100)}%
                </span>
              </div>

              {/* Destination Point */}
              <div style={{ position: 'absolute', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  🏠
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Customer</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
              <span>Latitude: <strong>{(13.0100 + gpsProgress * 0.0035).toFixed(4)}° N</strong></span>
              <span>Longitude: <strong>{(74.9820 + gpsProgress * 0.0040).toFixed(4)}° E</strong></span>
              <span>Speed: <strong>24 km/h</strong></span>
              <span>ETA: <strong>{Math.max(1, Math.round((1 - gpsProgress) * 15))} mins</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 4: CUSTOMER TWO-WAY CHAT
          ============================================================ */}
      {activeTab === 'chat' && (
        <div className="vs-card" style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>
              B
            </div>
            <div>
              <strong style={{ fontSize: '16px', color: '#0f172a', display: 'block' }}>Bhavana Bai (Customer)</strong>
              <span style={{ fontSize: '12px', color: '#059669' }}>📍 Mijar Village • Active Order #VS10245</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{ minHeight: '260px', maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 0' }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'vendor' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'vendor' ? '#065f46' : '#f1f5f9',
                  color: msg.sender === 'vendor' ? '#ffffff' : '#0f172a',
                  padding: '10px 16px',
                  borderRadius: msg.sender === 'vendor' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '80%',
                  fontSize: '13.5px'
                }}
              >
                <div>{msg.text}</div>
                <span style={{ fontSize: '10px', opacity: 0.8, display: 'block', textAlign: 'right', marginTop: '4px' }}>{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleVendorChatReply} style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
            <input
              type="text"
              placeholder="Reply to customer..."
              value={vendorReplyInput}
              onChange={(e) => setVendorReplyInput(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 18px', borderRadius: '12px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
