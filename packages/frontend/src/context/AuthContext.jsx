import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const userData = await getProfile();
      setUser({
        userId: userData.user_id,
        email: userData.email,
        name: userData.name,
        role: userData.role || 'user', // Assuming role comes from backend
      });
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, authToken) => {
    setUser({
      userId: userData.userId,
      role: userData.role || 'user', // Default to 'user' if not provided
    });
    setToken(authToken);
    localStorage.setItem('token', authToken);
    fetchUserData(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};