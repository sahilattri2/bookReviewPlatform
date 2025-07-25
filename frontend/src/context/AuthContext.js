import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    const syncLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 