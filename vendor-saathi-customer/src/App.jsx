import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { VendorSyncProvider } from './context/VendorSyncContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

import { LocationModal } from './components/LocationModal';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { VendorSimulatorDrawer } from './components/VendorSimulatorDrawer';
import { ReviewModal } from './components/ReviewModal';
import { VendorSwitchModal } from './components/VendorSwitchModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { VendorChatModal } from './components/VendorChatModal';
import { NotificationToast } from './components/NotificationToast';

import { Home } from './pages/Home';
import { CategoriesView } from './views/CategoriesView';
import { ProductListingView } from './views/ProductListingView';
import { ProductDetailView } from './views/ProductDetailView';
import { NearbyVendorsView } from './views/NearbyVendorsView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { PaymentView } from './views/PaymentView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { MyOrdersView } from './views/MyOrdersView';
import { ProfileView } from './views/ProfileView';
import { MyReviewsView } from './views/MyReviewsView';
import { SavedAddressesSupportView } from './views/SavedAddressesSupportView';
import { WishlistView } from './views/WishlistView';
import { OffersView } from './views/OffersView';
import { NotificationsView } from './views/NotificationsView';
import { VoiceSearchView } from './views/VoiceSearchView';
import { FilterSortView } from './views/FilterSortView';
import { VendorChatView } from './views/VendorChatView';

const MainContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
      case 'landing':
        return <Home />;
      case 'categories':
        return <CategoriesView />;
      case 'nearby-vendors':
        return <NearbyVendorsView />;
      case 'product-listing':
        return <ProductListingView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'payment':
        return <PaymentView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'my-orders':
        return <MyOrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'my-reviews':
        return <MyReviewsView />;
      case 'saved-addresses-support':
        return <SavedAddressesSupportView />;
      case 'wishlist':
        return <WishlistView />;
      case 'offers':
        return <OffersView />;
      case 'notifications':
        return <NotificationsView />;
      case 'voice-search':
        return <VoiceSearchView />;
      case 'filter-sort':
        return <FilterSortView />;
      case 'vendor-chat':
        return <VendorChatView />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '60px' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {renderView()}
      </main>
      <Footer />
      <BottomNav />

      {/* Global Overlays & Modals */}
      <LocationModal />
      <AuthModal />
      <CartDrawer />
      <VendorSimulatorDrawer />
      <ReviewModal />
      <VendorSwitchModal />
      <VoiceSearchModal />
      <VendorChatModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <VendorSyncProvider>
          <MainContent />
        </VendorSyncProvider>
      </AppProvider>
    </AuthProvider>
  );
}
