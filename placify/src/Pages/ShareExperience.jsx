import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';

const ShareExperience = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    description: '',
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setStatus('Uploading...');

    try {
      let fileUrl = '';
      if (formData.file) {
        const s3Key = `${user.username}/${Date.now()}_${formData.file.name}`;
        const result = await uploadData({
          key: s3Key,
          data: formData.file,
          options: {
            contentType: formData.file.type,
          },
        }).result;
        fileUrl = result.key;
      }

      const payload = {
        userId: user.username,
        company: formData.company,
        role: formData.role,
        description: formData.description,
        fileKey: fileUrl,
      };

      // ✅ Send payload to your backend
      await axios.post('http://localhost:4000/api/experiences', payload);

      setStatus('Experience submitted successfully!');
      setFormData({
        company: '',
        role: '',
        description: '',
        file: null,
      });
    } catch (error) {
      console.error('Error uploading or submitting:', error);
      setStatus('Failed to submit experience.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Share Your Interview Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          required
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Your Experience..."
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ShareExperience;
