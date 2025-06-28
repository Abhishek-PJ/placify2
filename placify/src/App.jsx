import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Homepage from "./Pages/Homepage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ShareExperience from "./Pages/ShareExperience.jsx";
import InterviewExperience from "./Pages/InterviewExperience.jsx";

Amplify.configure(awsExports);

function ProtectedRoute({ children }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== "authenticated") {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Authenticator.Provider>
        <Routes>
          {/* ✅ Public Route */}
          <Route path="/" element={<Homepage />} />

          {/* 🔒 Protected Routes */}
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

          <Route
            path="/share-experience"
            element={
              <Authenticator>
                {({ signOut }) => (
                  <ProtectedRoute>
                    <ShareExperience signOut={signOut} />
                  </ProtectedRoute>
                )}
              </Authenticator>
            }
          />

          <Route
            path="/interview-experiences"
            element={
              <Authenticator>
                <ProtectedRoute>
                  <InterviewExperience />
                </ProtectedRoute>
              </Authenticator>
            }
          />
        </Routes>
      </Authenticator.Provider>
    </Router>
  );
}

export default App;
