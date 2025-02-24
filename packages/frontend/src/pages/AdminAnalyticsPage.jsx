import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAdminAnalytics } from '../services/api';

const AdminAnalyticsPage = () => {
  const { token, user } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      setError('Access denied. Admins only.');
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const data = await getAdminAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin: Platform Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl text-blue-600">{analytics.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Total Views</h2>
            <p className="text-3xl text-green-600">{analytics.totalViews}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Total Clicks</h2>
            <p className="text-3xl text-purple-600">{analytics.totalClicks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;