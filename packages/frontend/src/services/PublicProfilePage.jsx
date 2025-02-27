import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../services/api';

const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const data = await getPublicProfile(username);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile. User may not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

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
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">{profile.name || 'Unnamed'}</h1>

        {/* Profile Header */}
        <div className="text-center mb-6">
          {profile.profileImageUrl && (
            <img
              src={profile.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          {profile.bio && <p className="text-gray-600 mt-2">{profile.bio}</p>}
        </div>

        {/* Links */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">Links</h3>
          {profile.links && profile.links.length > 0 ? (
            <div className="space-y-4">
              {profile.links.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                >
                  {link.title}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No links available.</p>
          )}
        </div>

        {/* Social Accounts */}
        <div>
          <h3 className="text-xl font-medium mb-4">Social Media</h3>
          {profile.socialAccounts && profile.socialAccounts.length > 0 ? (
            <div className="space-y-2">
              {profile.socialAccounts.map((account) => (
                <div
                  key={account.platform}
                  className="flex justify-between items-center"
                >
                  <span className="capitalize">{account.platform}</span>
                  <span className="text-gray-600">
                    {account.followerCount} followers
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No social accounts connected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;