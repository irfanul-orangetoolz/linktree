import React, { useState } from 'react';

const LinkForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [url, setUrl] = useState(initialData.url || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) {
      setError('Title and URL are required.');
      return;
    }
    setError('');
    onSubmit({ title, url });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        {initialData.linkId ? 'Edit Link' : 'Add Link'}
      </h3>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {initialData.linkId ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LinkForm;