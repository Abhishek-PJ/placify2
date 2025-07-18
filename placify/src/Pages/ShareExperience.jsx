import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

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

      // Using environment variable for the API base URL
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/experiences`, payload);

      setStatus('Experience submitted successfully!');
      setFormData({
        company: '',
        role: '',
        description: '',
        file: null,
      });
    } catch (error) {
      console.error('Error uploading or submitting:', error);
      setStatus('Failed to submit experience. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Share Your Interview Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company Name"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Role"
            required
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Your Experience
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your interview experience..."
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload File (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleChange}
            className="w-full mt-1"
          />
          <p className="mt-1 text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? 'Submitting...' : 'Submit Experience'}
        </button>
      </form>

      {status && (
        <div className={`mt-4 p-3 rounded ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ShareExperience;
