import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Homepage from './Pages/Homepage.jsx';
import Dashboard from './Pages/Dashboard.jsx';

Amplify.configure(awsExports);

function ProtectedRoute({ children }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  if (authStatus !== 'authenticated') {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Authenticator.Provider>
        <Routes>
          {/* ✅ Public Route - No Authentication Required */}
          <Route path="/" element={<Homepage />} />

          {/* 🔒 Protected Route - Authentication Required */}
          <Route
            path="/dashboard"
            element={
              <Authenticator>
                {({ signOut }) => (
                  <ProtectedRoute>
                    <Dashboard signOut={signOut} />
                  </ProtectedRoute>
                )}
              </Authenticator>
            }
          />
        </Routes>
      </Authenticator.Provider>
    </Router>
  );
}

export default App;
