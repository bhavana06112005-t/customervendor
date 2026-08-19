import React, { createContext, useContext, useEffect } from 'react';
import { useApp } from './AppContext';

const VendorSyncContext = createContext();

export const VendorSyncProvider = ({ children }) => {
  const { updateOrderStatus, setNotifications } = useApp();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'vendorsaathi_status_update') {
        try {
          const update = JSON.parse(e.newValue);
          if (update && update.orderId && update.status) {
            updateOrderStatus(update.orderId, update.status);
            setNotifications(prev => [
              {
                id: `n_sync_${Date.now()}`,
                title: `🔔 Order #${update.orderId} Update`,
                body: `Vendor updated your order status to "${update.status}".`,
                time: 'Just now',
                read: false
              },
              ...prev
            ]);
          }
        } catch (err) {
          console.error("Sync parse error", err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateOrderStatus, setNotifications]);

  const updateVendorOrderState = (orderId, newStatus) => {
    localStorage.setItem('vendorsaathi_status_update', JSON.stringify({
      orderId,
      status: newStatus,
      timestamp: Date.now()
    }));
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <VendorSyncContext.Provider value={{ updateVendorOrderState }}>
      {children}
    </VendorSyncContext.Provider>
  );
};

export const useVendorSync = () => useContext(VendorSyncContext);
