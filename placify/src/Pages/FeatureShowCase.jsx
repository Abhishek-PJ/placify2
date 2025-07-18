import React from "react";
import {
  Shield,
  Users,
  FileText,
  Database,
  Cloud,
  Globe,
  Lock,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const FeatureShowcase = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Authentication",
      description:
        "AWS Cognito-powered user authentication with role-based access control for Admins and Students.",
      highlight: "Enterprise Security",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Interview Experience Sharing",
      description:
        "Add, view, edit, and delete interview experiences. Connect with peers and learn from their placement journeys.",
      highlight: "Peer Learning",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Smart File Management",
      description:
        "Upload resources to AWS S3 with secure signed URLs. Share PDFs, documents, and study materials seamlessly.",
      highlight: "Cloud Storage",
    },
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Placement Data Analytics",
      description:
        "Admins can manage placement data while students access comprehensive peer placement insights and statistics.",
      highlight: "Data-Driven",
    },
    {
      icon: <Cloud className="w-8 h-8 text-blue-600" />,
      title: "Scalable Architecture",
      description:
        "RESTful API built with Node.js and Express, MySQL database, and hosted on AWS EC2 for reliable performance.",
      highlight: "Enterprise Grade",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Modern Web Experience",
      description:
        "React + Vite frontend with Tailwind CSS, hosted on Vercel with custom domain and HTTPS security.",
      highlight: "Lightning Fast",
    },
  ];

  const techStack = [
    { category: "Frontend", technologies: ["React", "Tailwind CSS"] },
    { category: "Backend", technologies: ["Node.js", "Express", "MySQL"] },
    {
      category: "Cloud",
      technologies: ["AWS Cognito", "AWS S3", "AWS EC2", "AWS RDS"],
    },
    {
      category: "Security",
      technologies: ["HTTPS", "Let's Encrypt SSL", "Signed URLs"],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
            Placify – Where Technology Meets
            <span className="text-blue-600"> Student Success</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            A comprehensive platform built with enterprise-grade technology to
            connect students, share interview experiences, and accelerate
            placement success through secure, scalable solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-lg mb-4 md:mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                {feature.icon}
              </div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {feature.highlight}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            Built with Modern Technology Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="text-center">
                <h4 className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
                  {stack.category}
                </h4>
                <div className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 md:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0 sm:pr-8 last:border-b-0 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                99.9%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Platform Uptime
              </div>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0 sm:pr-8 last:border-b-0 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                Secure
              </div>
              <div className="text-sm md:text-base text-gray-600">
                AWS-Powered Infrastructure
              </div>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0 sm:pr-8 last:border-b-0 last:border-r-0">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                Fast
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Lightning Quick Response
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Call to Action */}
      <div className="text-center bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Share Your Success Story?
        </h3>
        <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100 px-4">
          Join our secure platform and help fellow students succeed with your
          interview experiences and resources.
        </p>
        <div className="flex justify-center">
          <button className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base">
            <Link to="/share-experience">Share Your Experience</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
