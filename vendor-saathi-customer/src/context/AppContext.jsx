import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { VENDORS } from '../data/vendors';
import { CATEGORIES } from '../data/categories';
import { TRANSLATIONS } from '../data/translations';

const AppContext = createContext();

const INITIAL_LOCATION = {
  name: 'Mijar, Moodbidri',
  village: 'Mijar',
  town: 'Moodbidri',
  district: 'Dakshina Kannada',
  pincode: '574225',
  lat: 13.0125,
  lng: 74.9850
};

const INITIAL_USER = {
  isLoggedIn: true,
  name: 'Bhavana Bai',
  phone: '+91 9876543210',
  email: 'bhavana@example.com',
  address: 'Mijar, Moodbidri, Karnataka - 574225',
  addresses: [
    {
      id: 'addr1',
      tag: 'Home',
      name: 'Bhavana Bai',
      phone: '+91 9876543210',
      address: 'Mijar, Moodbidri, Karnataka - 574225',
      isDefault: true
    },
    {
      id: 'addr2',
      tag: 'Work',
      name: 'Bhavana Bai',
      phone: '+91 9876543210',
      address: 'Main Market Road, Moodbidri - 574227',
      isDefault: false
    }
  ]
};

const INITIAL_CART = [
  { product: PRODUCTS[0], quantity: 2 },
  { product: PRODUCTS[1], quantity: 1 },
  { product: PRODUCTS[3], quantity: 1 }
];

const INITIAL_ORDERS = [
  {
    id: 'VS10245',
    date: '12 May 2026, 10:30 AM',
    vendorId: 'v1',
    vendorName: 'Ramesh Grocery',
    vendorPhone: '+91 98451 23456',
    vendorDistance: '1.8 km',
    items: [
      { id: 'p1', name: 'Fresh Farm Red Tomatoes', price: 25, unit: 'kg', quantity: 2, image: PRODUCTS[0].image },
      { id: 'p2', name: 'Fresh Local Potatoes', price: 30, unit: 'kg', quantity: 1, image: PRODUCTS[1].image },
      { id: 'p4', name: 'Spicy Green Chillies', price: 40, unit: '250 g', quantity: 1, image: PRODUCTS[3].image }
    ],
    subtotal: 120,
    deliveryFee: 20,
    discount: 0,
    total: 140,
    paymentMethod: 'Cash on Delivery',
    status: 'Out for Delivery',
    deliveryAddress: 'Bhavana Bai, Mijar, Moodbidri, Karnataka - 574225',
    estimatedDelivery: '20–30 min',
    timeline: [
      { status: 'Placed', label: 'Order Placed', time: '10:30 AM', completed: true },
      { status: 'Accepted', label: 'Vendor Accepted', time: '10:35 AM', completed: true },
      { status: 'Preparing', label: 'Preparing Your Order', time: '10:45 AM', completed: true },
      { status: 'Out for Delivery', label: 'Out for Delivery', time: '11:00 AM', completed: true },
      { status: 'Delivered', label: 'Delivered', time: 'Expected by 11:30 AM', completed: false }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', title: '🚚 Order Out for Delivery', body: 'Your order #VS10245 is out for delivery with Ramesh Grocery.', time: '5 mins ago', read: false }
];

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persisted 3-Language System: English, ಕನ್ನಡ, हिन्दी
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('vs_language');
    if (saved === 'ಕನ್ನಡ' || saved === 'ಹಿन्दी' || saved === 'English') {
      return saved;
    }
    return 'English';
  });

  const changeLanguage = (newLang) => {
    if (['English', 'ಕನ್ನಡ', 'ಹಿन्दी'].includes(newLang)) {
      setLanguage(newLang);
      localStorage.setItem('vs_language', newLang);
      const msg = newLang === 'ಕನ್ನಡ' ? 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ 🌐' : newLang === 'ಹಿन्दी' ? 'भाषा को हिन्दी में सेट किया गया है 🌐' : 'Language set to English 🌐';
      showToast(msg);
    }
  };

  const t = (key) => {
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    if (TRANSLATIONS['English'] && TRANSLATIONS['English'][key]) {
      return TRANSLATIONS['English'][key];
    }
    return key;
  };

  const [currentLocation, setCurrentLocation] = useState(INITIAL_LOCATION);
  const [user, setUser] = useState(INITIAL_USER);
  const [cart, setCart] = useState(INITIAL_CART);
  const [wishlist, setWishlist] = useState(['p1', 'p5']);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState('VS10245');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isVendorSimOpen, setIsVendorSimOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isVendorChatOpen, setIsVendorChatOpen] = useState(false);
  const [isVendorSwitchModalOpen, setIsVendorSwitchModalOpen] = useState(false);
  const [pendingVendorConflict, setPendingVendorConflict] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const navigateTo = (view, params = {}) => {
    if (params.category !== undefined) setSelectedCategory(params.category);
    if (params.vendor !== undefined) setSelectedVendor(params.vendor);
    if (params.product !== undefined) setSelectedProduct(params.product);
    if (params.orderId !== undefined) setActiveOrderId(params.orderId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1) => {
    if (cart.length > 0) {
      const currentCartVendorId = cart[0].product.vendorId;
      if (currentCartVendorId !== product.vendorId) {
        setPendingVendorConflict({
          currentVendorName: cart[0].product.vendorName,
          newVendorName: product.vendorName,
          newProduct: product,
          newQuantity: quantity
        });
        setIsVendorSwitchModalOpen(true);
        return;
      }
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity} ${product.unit} of ${product.shortName || product.name} to cart 🛒`);
  };

  const clearCartAndAddVendorProduct = () => {
    if (!pendingVendorConflict) return;
    const { newProduct, newQuantity } = pendingVendorConflict;
    setCart([{ product: newProduct, quantity: newQuantity }]);
    setIsVendorSwitchModalOpen(false);
    setPendingVendorConflict(null);
    showToast(`Cleared cart & added ${newProduct.shortName} from ${newProduct.vendorName} 🎉`);
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const placeOrder = (orderData) => {
    const newOrderId = `VS${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${timeString}`;

    const newOrder = {
      id: newOrderId,
      date: dateString,
      vendorId: orderData.vendorId || 'v1',
      vendorName: orderData.vendorName || 'Ramesh Grocery',
      vendorPhone: '+91 98451 23456',
      vendorDistance: '1.8 km',
      items: orderData.items,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      discount: orderData.discount || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      status: 'Placed',
      deliveryAddress: orderData.deliveryAddress,
      estimatedDelivery: '20–30 min',
      timeline: [
        { status: 'Placed', label: 'Order Placed', time: timeString, completed: true },
        { status: 'Accepted', label: 'Vendor Accepted', time: 'Pending', completed: false },
        { status: 'Preparing', label: 'Preparing Your Order', time: 'Pending', completed: false },
        { status: 'Out for Delivery', label: 'Out for Delivery', time: 'Pending', completed: false },
        { status: 'Delivered', label: 'Delivered', time: 'Pending', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrderId);
    clearCart();

    const existingSync = JSON.parse(localStorage.getItem('vendorsaathi_sync_orders') || '[]');
    localStorage.setItem('vendorsaathi_sync_orders', JSON.stringify([newOrder, ...existingSync]));
    window.dispatchEvent(new Event('storage'));

    showToast(`Order #${newOrderId} placed successfully! 🎉`);
    navigateTo('order-confirmation', { orderId: newOrderId });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const statuses = ['Placed', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'];
      const currentIdx = statuses.indexOf(newStatus);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const updatedTimeline = order.timeline.map((step, idx) => {
        if (idx <= currentIdx) {
          return { ...step, completed: true, time: step.time === 'Pending' ? now : step.time };
        }
        return step;
      });

      return {
        ...order,
        status: newStatus,
        timeline: updatedTimeline
      };
    }));

    showToast(`Order #${orderId} status: ${newStatus}`, 'info');
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return { ...order, status: 'Cancelled' };
    }));
    showToast(`Order #${orderId} has been cancelled`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        language,
        changeLanguage,
        t,
        selectedCategory,
        setSelectedCategory,
        selectedVendor,
        setSelectedVendor,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        currentLocation,
        setCurrentLocation,
        user,
        setUser,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        activeOrderId,
        setActiveOrderId,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        notifications,
        setNotifications,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isVendorSimOpen,
        setIsVendorSimOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isVoiceSearchOpen,
        setIsVoiceSearchOpen,
        isVendorChatOpen,
        setIsVendorChatOpen,
        isVendorSwitchModalOpen,
        setIsVendorSwitchModalOpen,
        pendingVendorConflict,
        clearCartAndAddVendorProduct,
        reviewOrder,
        setReviewOrder,
        toast,
        showToast,
        PRODUCTS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
