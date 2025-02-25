import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProfilePreview } from '../services/api';

const ProfilePreviewPage = () => {
  const { token } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchPreview = async () => {
      try {
        const data = await getProfilePreview();
        setPreview(data);
      } catch (err) {
        setError('Failed to load profile preview.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [token, navigate]);

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
				<h1 className="text-3xl font-bold text-center mb-6">
					Profile Preview
				</h1>

				{/* Profile Header */}
				<div className="text-center mb-6">
					{preview.profileImageUrl && (
						<img
							src={preview.profileImageUrl}
							alt="Profile"
							className="w-24 h-24 rounded-full mx-auto mb-4"
						/>
					)}
					<h2 className="text-2xl font-semibold">
						{preview.name || "Unnamed"}
					</h2>
					{preview.bio && (
						<p className="text-gray-600 mt-2">{preview.bio}</p>
					)}
				</div>

				{/* Links */}
				<div className="mb-6">
					<h3 className="text-xl font-medium mb-4">Links</h3>
					{preview.Links && preview.Links.length > 0 ? (
						<div className="space-y-4">
							{preview.Links.map((link) => (
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
						<p className="text-gray-600">No links added yet.</p>
					)}
				</div>

				{/* Social Accounts */}
				<div>
					<h3 className="text-xl font-medium mb-4">Social Media</h3>
					{preview.SocialMediaAccounts &&
					preview.SocialMediaAccounts.length > 0 ? (
						<div className="space-y-2">
							{preview.SocialMediaAccounts.map((account) => (
								<div
									key={account.platform}
									className="flex justify-between items-center"
								>
									<span className="capitalize">
										{account.platform}
									</span>
									<span className="text-gray-600">
										{account.followerCount} followers
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-600">
							No social accounts connected.
						</p>
					)}
				</div>

				<button
					onClick={() => navigate("/profile")}
					className="mt-6 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
				>
					Back to Profile
				</button>
			</div>
		</div>
  )
};

export default ProfilePreviewPage;