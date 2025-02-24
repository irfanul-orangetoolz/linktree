import React, { useState } from 'react';
import { connectSocialMedia } from '../services/api';
import Message from './Message';

const SocialMediaConnect = ({ onConnected }) => {
  const [platform, setPlatform] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const platforms = ['facebook', 'instagram', 'tiktok', 'youtube'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!platform || !accessToken) {
      setError('Please select a platform and enter an access token.');
      setLoading(false);
      return;
    }

    try {
      const response = await connectSocialMedia({ platform, accessToken });
      setSuccess(`Successfully connected ${platform}!`);
      setPlatform('');
      setAccessToken('');
      if (onConnected) onConnected(response);
    } catch (err) {
      setError('Failed to connect social media account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Connect Social Media</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Access Token</label>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your access token"
          />
        </div>
        {error && <Message type="error" message={error} />}
        {success && <Message type="success" message={success} />}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect'}
        </button>
      </form>
    </div>
  );
};

export default SocialMediaConnect;