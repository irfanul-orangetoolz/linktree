import React, { useState } from 'react';
import { validateMedia } from '../services/api';
import Message from './Message';

const MediaValidator = ({ onValidated }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    if (!url) {
      setError('Please enter a URL.');
      setLoading(false);
      return;
    }

    try {
      const response = await validateMedia(url);
      setResult(response);
      if (onValidated && response.isValid) {
        onValidated(response);
      }
    } catch (err) {
      setError('Failed to validate URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Validate Media URL</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Media URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., https://youtube.com/watch?v=abc123"
          />
        </div>
        {error && <Message type="error" message={error} />}
        {result && (
          <div className="mb-4">
            <Message
              type={result.isValid ? 'success' : 'error'}
              message={result.isValid ? 'Valid URL' : 'Invalid URL'}
            />
            {result.isValid && result.embedCode && (
              <div className="mt-2">
                <p className="text-gray-700">Embed Code:</p>
                <textarea
                  readOnly
                  value={result.embedCode}
                  className="w-full p-2 border rounded bg-gray-100"
                  rows="3"
                />
              </div>
            )}
            {result.isValid && result.metadata && (
              <div className="mt-2">
                <p className="text-gray-700">Metadata:</p>
                <pre className="text-sm text-gray-600">
                  {JSON.stringify(result.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Validating...' : 'Validate'}
        </button>
      </form>
    </div>
  );
};

export default MediaValidator;