import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProfileViews, getLinkClicks, getTopLinks } from '../services/api';

const AnalyticsPage = () => {
  const { token } = useContext(AuthContext);
  const [views, setViews] = useState(null);
  const [clicks, setClicks] = useState(null);
  const [topLinks, setTopLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const [viewsData, clicksData, topLinksData] = await Promise.all([
          getProfileViews(),
          getLinkClicks(),
          getTopLinks(),
        ]);
        setViews(viewsData);
        setClicks(clicksData);
        setTopLinks(topLinksData);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        {/* Profile Views */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Views</h2>
          <p className="text-2xl">{views.totalViews} Total Views</p>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Views Over Time</h3>
            {views.viewsOverTime.length > 0 ? (
              <ul className="space-y-2">
                {views.viewsOverTime.map((view, index) => (
                  <li key={index} className="text-gray-700">
                    {view.date}: {view.count} views
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No view data available.</p>
            )}
          </div>
        </div>

        {/* Link Clicks */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Link Clicks</h2>
          <p className="text-2xl">{clicks.totalClicks} Total Clicks</p>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Clicks Per Link</h3>
            {clicks.clicksPerLink.length > 0 ? (
              <ul className="space-y-2">
                {clicks.clicksPerLink.map((click) => (
                  <li key={click.linkId} className="text-gray-700">
                    {click.title}: {click.clickCount} clicks
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No click data available.</p>
            )}
          </div>
        </div>

        {/* Top Performing Links */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Performing Links</h2>
          {topLinks.length > 0 ? (
            <ul className="space-y-2">
              {topLinks.map((link) => (
                <li key={link.linkId} className="text-gray-700">
                  {link.title}: {link.clickCount} clicks
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No top links available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;