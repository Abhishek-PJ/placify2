// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getUrl } from 'aws-amplify/storage';
// import { useAuthenticator } from '@aws-amplify/ui-react';

// const InterviewExperience = () => {
//   const { user } = useAuthenticator((context) => [context.user]);
//   const [experiences, setExperiences] = useState([]);
//   const [fileLinks, setFileLinks] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     company: '',
//     role: '',
//     description: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // 🔄 Fetch all experiences
//   useEffect(() => {
//     const fetchAll = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experiences`);
//         setExperiences(Array.isArray(res.data) ? res.data : []);
//         setError('');
//       } catch (error) {
//         console.error('Error fetching experiences:', error);
//         setError('Failed to load experiences.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   // 🔗 Fetch signed S3 links
//   useEffect(() => {
//     const fetchLinks = async () => {
//       const links = {};
//       for (const exp of experiences) {
//         if (exp.file_key) {
//           try {
//             const { url } = await getUrl({ key: exp.file_key });
//             links[exp.id] = url;
//           } catch (err) {
//             console.error('Error getting file URL:', err);
//           }
//         }
//       }
//       setFileLinks(links);
//     };

//     if (experiences.length) {
//       fetchLinks();
//     }
//   }, [experiences]);

//   // 🗑 Delete experience
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/experiences/${id}`);
//       setExperiences((prev) => prev.filter((exp) => exp.id !== id));
//     } catch (error) {
//       console.error('Failed to delete:', error);
//     }
//   };

//   // ✏️ Start editing
//   const handleEdit = (exp) => {
//     setEditId(exp.id);
//     setEditData({
//       company: exp.company,
//       role: exp.role,
//       description: exp.description,
//     });
//   };

//   // 💾 Save edited experience
//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/experiences/${id}`, editData);
//       const updated = experiences.map((exp) =>
//         exp.id === id ? { ...exp, ...editData } : exp
//       );
//       setExperiences(updated);
//       setEditId(null);
//     } catch (error) {
//       console.error('Failed to update:', error);
//     }
//   };

//   // ⌨️ Input change handler
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">Interview Experiences</h2>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-center text-red-600">{error}</p>}

//       {Array.isArray(experiences) && experiences.map((exp) => (
//         <div key={exp.id} className="bg-white p-4 rounded shadow mb-4">
//           {editId === exp.id ? (
//             <>
//               <input
//                 name="company"
//                 value={editData.company}
//                 onChange={handleEditChange}
//                 className="w-full p-1 border rounded mb-1"
//               />
//               <input
//                 name="role"
//                 value={editData.role}
//                 onChange={handleEditChange}
//                 className="w-full p-1 border rounded mb-1"
//               />
//               <textarea
//                 name="description"
//                 value={editData.description}
//                 onChange={handleEditChange}
//                 className="w-full p-1 border rounded"
//               />
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold">{exp.company} — {exp.role}</h3>
//               <p className="text-gray-700 mt-2">{exp.description}</p>
//             </>
//           )}

//           <p className="text-sm text-gray-500 mt-1">User ID: {exp.user_id}</p>

//           {exp.file_key && fileLinks[exp.id] && (
//             <a
//               href={fileLinks[exp.id]}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline mt-2 block"
//             >
//               View Uploaded File
//             </a>
//           )}

//           {exp.user_id === user.username && (
//             <div className="flex space-x-2 mt-3">
//               {editId === exp.id ? (
//                 <>
//                   <button
//                     onClick={() => handleUpdate(exp.id)}
//                     className="px-3 py-1 bg-green-600 text-white rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditId(null)}
//                     className="px-3 py-1 bg-gray-500 text-white rounded"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => handleEdit(exp)}
//                   className="px-3 py-1 bg-yellow-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//               )}
//               <button
//                 onClick={() => handleDelete(exp.id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InterviewExperience;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUrl } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

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
         console.log('Fetched experiences:', res.data);
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
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Experiences</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share and explore interview experiences from the community
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500 text-lg">Loading experiences...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Experience Cards */}
        <div className="space-y-6">
          {Array.isArray(experiences) && experiences.map((exp) => (
            <div key={exp.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                {editId === exp.id ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input
                          name="company"
                          value={editData.company}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                          name="role"
                          value={editData.role}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter role/position"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                        placeholder="Share your interview experience..."
                      />
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="mb-2 sm:mb-0">
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {exp.company}
                        </h2>
                        <div className="flex items-center mt-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {exp.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        User: {exp.user_id}
                      </div>
                    </div>
                    
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* File Link */}
                {exp.file_key && fileLinks[exp.id] && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <a
                        href={fileLinks[exp.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        View Attached File
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {exp.user_id === user.username && (
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                    {editId === exp.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(exp.id)}
                          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium rounded-xl hover:from-gray-500 hover:to-gray-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(exp)}
                          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && Array.isArray(experiences) && experiences.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No experiences yet</h3>
            <p className="text-gray-500 text-lg">Be the first to share your interview experience!</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
        </>

  );
};

export default InterviewExperience;