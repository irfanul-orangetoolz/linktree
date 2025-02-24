import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  getLinks,
  addLink,
  updateLink,
  deleteLink,
  setLinkPriority,
  archiveLink,
} from '../services/api';
import LinkForm from '../components/LinkForm';
import MediaValidator from '../components/MediaValidator';
import Modal from '../components/Modal';

const LinkManagementPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editLink, setEditLink] = useState(null);
  const [validatedUrl, setValidatedUrl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchLinks();
  }, [token, navigate]);

  const fetchLinks = async () => {
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      setError('Failed to load links.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (data) => {
    try {
      await addLink(data);
      fetchLinks();
      setEditLink(null);
      setValidatedUrl(null);
    } catch (err) {
      setError('Failed to add link.');
    }
  };

  const handleEditLink = async (data) => {
    try {
      await updateLink(editLink.linkId, data);
      fetchLinks();
      setEditLink(null);
      setValidatedUrl(null);
    } catch (err) {
      setError('Failed to update link.');
    }
  };

  const handleDeleteLink = (linkId) => {
    setLinkToDelete(linkId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLink(linkToDelete);
      fetchLinks();
    } catch (err) {
      setError('Failed to delete link.');
    } finally {
      setShowDeleteModal(false);
      setLinkToDelete(null);
    }
  };

  const handleSetPriority = async (linkId, priority) => {
    try {
      await setLinkPriority(linkId, priority);
      fetchLinks();
    } catch (err) {
      setError('Failed to update priority.');
    }
  };

  const handleArchiveLink = async (linkId, isArchived) => {
    try {
      await archiveLink(linkId, !isArchived);
      fetchLinks();
    } catch (err) {
      setError('Failed to archive/unarchive link.');
    }
  };

  const handleValidated = (result) => {
    setValidatedUrl(result);
    setEditLink({ title: result.metadata?.title || 'New Link', url: result.url });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Links</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={() => setEditLink({})}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Link
        </button>

        <div className="mb-6">
          <MediaValidator onValidated={handleValidated} />
        </div>

        {editLink && (
          <div className="mb-6">
            <LinkForm
              onSubmit={editLink.linkId ? handleEditLink : handleAddLink}
              initialData={editLink}
              onCancel={() => {
                setEditLink(null);
                setValidatedUrl(null);
              }}
            />
          </div>
        )}

        <div className="space-y-4">
          {links.length === 0 ? (
            <p className="text-gray-600">No links added yet.</p>
          ) : (
            links.map((link) => (
              <div
                key={link.linkId}
                className={`p-4 bg-white rounded-lg shadow-md flex items-center justify-between ${
                  link.isArchived ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <p className="font-semibold">{link.title}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditLink(link)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.linkId)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleSetPriority(link.linkId, link.priority + 1)}
                    className="text-green-500 hover:underline"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleSetPriority(link.linkId, link.priority - 1)}
                    className="text-green-500 hover:underline"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleArchiveLink(link.linkId, link.isArchived)}
                    className="text-gray-500 hover:underline"
                  >
                    {link.isArchived ? 'Unarchive' : 'Archive'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this link? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default LinkManagementPage;