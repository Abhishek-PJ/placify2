import React from 'react';
import { User, Building2, MapPin, Calendar, DollarSign, TrendingUp, Users, Award, Search, Bell, Menu, X } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Placify</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Streamlining campus placements with intelligent management solutions. 
              Connecting students with opportunities and companies with talent.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Placement Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Company Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Placify. All rights reserved. Built with ❤️ for better placements.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;