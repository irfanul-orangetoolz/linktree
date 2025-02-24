import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getSettings, updateSettings } from '../services/api';

const SettingsPage = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    theme: 'light',
    backgroundColor: '#FFFFFF',
    buttonStyle: 'rounded',
    showBranding: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch current settings on mount
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setFormData({
          theme: data.theme || 'light',
          backgroundColor: data.backgroundColor || '#FFFFFF',
          buttonStyle: data.buttonStyle || 'rounded',
          showBranding: data.showBranding !== undefined ? data.showBranding : true,
        });
      } catch (err) {
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateSettings(formData);
      setSuccess('Settings updated successfully!');
      setTimeout(() => navigate('/profile'), 1500); // Redirect after 1.5s
    } catch (err) {
      setError('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Theme</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Background Color</label>
          <input
            type="color"
            name="backgroundColor"
            value={formData.backgroundColor}
            onChange={handleChange}
            className="w-full h-10 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Button Style</label>
          <select
            name="buttonStyle"
            value={formData.buttonStyle}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            name="showBranding"
            checked={formData.showBranding}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Show Platform Branding</label>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;