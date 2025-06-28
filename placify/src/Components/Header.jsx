import React, { useState } from "react";
import { User, Building2, Bell, Menu, X } from "lucide-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authStatus, signOut } = useAuthenticator((context) => [
    context.authStatus,
  ]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg p-2">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Placify</h1>
              <p className="text-blue-100 text-sm">
                Campus Placement Management
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>

            <Link to="/interview-experiences" className="hover:text-blue-200 transition-colors">
              View Experiences
            </Link>

            {authStatus === "authenticated" && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/share-experience" className="hover:text-blue-200 transition-colors">
                  Share Experience
                </Link>
              </>
            )}

            {authStatus !== "authenticated" && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                  Create Account
                </Link>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                  Login
                </Link>
              </>
            )}

            {authStatus === "authenticated" && (
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <button
                  onClick={signOut}
                  className="ml-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>

              <Link to="/interview-experiences" className="hover:text-blue-200 transition-colors">
                View Experiences
              </Link>

              {authStatus === "authenticated" && (
                <>
                  <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/share-experience" className="hover:text-blue-200 transition-colors">
                    Share Experience
                  </Link>
                </>
              )}

              {authStatus !== "authenticated" && (
                <>
                  <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                    Create Account
                  </Link>
                  <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                    Login
                  </Link>
                </>
              )}

              {authStatus === "authenticated" && (
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
