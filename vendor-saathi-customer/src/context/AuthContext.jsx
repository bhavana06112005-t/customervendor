import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);

  const login = (userData) => {
    setUser({ isLoggedIn: true, ...userData });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '', phone: '' });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
