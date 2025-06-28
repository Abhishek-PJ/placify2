import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUrl } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

const InterviewExperience = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [experiences, setExperiences] = useState([]);
  const [fileLinks, setFileLinks] = useState({});

  // 🔄 Fetch all experiences from backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/experiences');
        setExperiences(res.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
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

  // 🗑 Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/experiences/${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Interview Experiences</h2>
      {experiences.map((exp) => (
        <div key={exp.id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold">{exp.company} — {exp.role}</h3>
          <p className="text-gray-700 mt-2">{exp.description}</p>
          <p className="text-sm text-gray-500 mt-1">User ID: {exp.user_id}</p>

          {/* 🔗 Show file link if exists */}
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

          {/* ✏️ Show buttons only for the owner */}
          {exp.user_id === user.username && (
            <div className="flex space-x-2 mt-3">
              <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                Edit
              </button>
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
