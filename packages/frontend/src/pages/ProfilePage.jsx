import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProfile, getSocialAccounts } from '../services/api';
import SocialMediaConnect from '../components/SocialMediaConnect';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [profileData, socialData] = await Promise.all([
          getProfile(),
          getSocialAccounts(),
        ]);
        setProfile(profileData);
        setSocialAccounts(socialData);
      } catch (err) {
        setError('Failed to load profile or social accounts.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleSocialConnected = (newAccount) => {
    setSocialAccounts((prev) => [...prev, newAccount]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Message type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {profile.name || 'Not set'}
          </p>
          <p>
            <span className="font-semibold">Bio:</span> {profile.bio || 'Not set'}
          </p>
          {profile.profile_image_url && (
            <div>
              <span className="font-semibold">Profile Image:</span>
              <img
                src={profile.profile_image_url}
                alt="Profile"
                className="w-32 h-32 rounded-full mt-2"
              />
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/preview')}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Preview Profile
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Connected Social Accounts</h2>
          {socialAccounts.length > 0 ? (
            <ul className="space-y-2">
              {socialAccounts.map((account) => (
                <li
                  key={account.socialId}
                  className="flex justify-between items-center"
                >
                  <span className="capitalize">{account.platform}</span>
                  <span className="text-gray-600">
                    {account.followerCount} followers
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No social accounts connected yet.</p>
          )}
          <div className="mt-4">
            <SocialMediaConnect onConnected={handleSocialConnected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;