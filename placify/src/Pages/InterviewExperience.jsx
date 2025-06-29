import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUrl } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

const InterviewExperience = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [experiences, setExperiences] = useState([]);
  const [fileLinks, setFileLinks] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    company: '',
    role: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔄 Fetch all experiences
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experiences`);
        setExperiences(Array.isArray(res.data) ? res.data : []);
        setError('');
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setError('Failed to load experiences.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // 🔗 Fetch signed S3 links
  useEffect(() => {
    const fetchLinks = async () => {
      const links = {};
      for (const exp of experiences) {
        if (exp.file_key) {
          try {
            const { url } = await getUrl({ key: exp.file_key });
            links[exp.id] = url;
          } catch (err) {
            console.error('Error getting file URL:', err);
          }
        }
      }
      setFileLinks(links);
    };

    if (experiences.length) {
      fetchLinks();
    }
  }, [experiences]);

  // 🗑 Delete experience
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/experiences/${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  // ✏️ Start editing
  const handleEdit = (exp) => {
    setEditId(exp.id);
    setEditData({
      company: exp.company,
      role: exp.role,
      description: exp.description,
    });
  };

  // 💾 Save edited experience
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/experiences/${id}`, editData);
      const updated = experiences.map((exp) =>
        exp.id === id ? { ...exp, ...editData } : exp
      );
      setExperiences(updated);
      setEditId(null);
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  // ⌨️ Input change handler
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Interview Experiences</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {Array.isArray(experiences) && experiences.map((exp) => (
        <div key={exp.id} className="bg-white p-4 rounded shadow mb-4">
          {editId === exp.id ? (
            <>
              <input
                name="company"
                value={editData.company}
                onChange={handleEditChange}
                className="w-full p-1 border rounded mb-1"
              />
              <input
                name="role"
                value={editData.role}
                onChange={handleEditChange}
                className="w-full p-1 border rounded mb-1"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                className="w-full p-1 border rounded"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{exp.company} — {exp.role}</h3>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </>
          )}

          <p className="text-sm text-gray-500 mt-1">User ID: {exp.user_id}</p>

          {exp.file_key && fileLinks[exp.id] && (
            <a
              href={fileLinks[exp.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              View Uploaded File
            </a>
          )}

          {exp.user_id === user.username && (
            <div className="flex space-x-2 mt-3">
              {editId === exp.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(exp.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(exp.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterviewExperience;
