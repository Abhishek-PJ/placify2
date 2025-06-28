import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Download, 
  Shield, 
  Calendar, 
  TrendingUp, 
  Cloud, 
  Database, 
  Smartphone, 
  Monitor,
  ChevronRight,
  Play,
  Pause,
  CheckCircle,
  Star,
  ArrowRight,
  FileSpreadsheet,
  FileText,
  Lock,
  Eye,
  Server,
  Globe,
  Zap,
  Award
} from 'lucide-react';

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const coreFeatures = [
    {
      icon: BarChart3,
      title: "Dashboard for Placement Coordinators",
      description: "Real-time insights with interactive charts, comprehensive analytics, and performance tracking for data-driven decisions.",
      color: "from-blue-600 to-blue-800",
      glowColor: "shadow-blue-500/20",
      benefits: ["Real-time statistics", "Interactive charts", "Performance metrics", "Trend analysis"],
      demo: "📊 Live dashboard with 15+ chart types",
      animation: "animate-pulse"
    },
    {
      icon: Users,
      title: "Student Records Management",
      description: "Comprehensive student profile management with placement tracking, skill assessment, and academic record maintenance.",
      color: "from-blue-500 to-indigo-600",
      glowColor: "shadow-indigo-500/20",
      benefits: ["Complete student profiles", "Placement tracking", "Skill assessment", "Academic records"],
      demo: "👤 Manage 1000+ student records efficiently",
      animation: "animate-bounce"
    },
    {
      icon: Download,
      title: "Export Data Option",
      description: "Advanced export capabilities with customizable templates, multiple formats, and automated report generation.",
      color: "from-blue-600 to-cyan-600",
      glowColor: "shadow-cyan-500/20",
      benefits: ["Multiple formats", "Custom templates", "Batch export", "Scheduled reports"],
      demo: "📁 One-click export to Excel/PDF",
      animation: "animate-spin"
    },
    {
      icon: Shield,
      title: "Role-Based Login",
      description: "Enterprise-grade security with AWS Cognito integration, multi-factor authentication, and granular permissions.",
      color: "from-blue-700 to-blue-900",
      glowColor: "shadow-blue-700/20",
      benefits: ["AWS Cognito security", "Multi-factor auth", "Role permissions", "Session management"],
      demo: "🔐 Enterprise-grade security",
      animation: "animate-pulse"
    },
    {
      icon: Calendar,
      title: "Year-Wise Data Viewing",
      description: "Intelligent data organization with historical analysis, future planning capabilities, and advanced filtering options.",
      color: "from-indigo-600 to-blue-700",
      glowColor: "shadow-indigo-500/20",
      benefits: ["Historical data", "Future planning", "Quick filters", "Timeline view"],
      demo: "📅 Access 10+ years of placement data",
      animation: "animate-bounce"
    }
  ];

  const visualizationFeatures = [
    {
      icon: TrendingUp,
      title: "Company-wise Placements",
      description: "Advanced analytics with interactive visualizations showing placement distribution and company performance metrics",
      visual: "📈 Dynamic charts with real-time updates",
      color: "from-blue-500 to-teal-500"
    },
    {
      icon: BarChart3,
      title: "Year-wise Trends",
      description: "Historical trend analysis with predictive insights and comparative performance across multiple academic years",
      visual: "📊 Predictive analytics and forecasting",
      color: "from-blue-600 to-purple-500"
    }
  ];

  const cloudFeatures = [
    {
      icon: Cloud,
      title: "AWS Cloud Hosting",
      description: "Enterprise-grade infrastructure with auto-scaling, load balancing, and global content delivery",
      benefit: "99.99% uptime SLA",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Database,
      title: "AWS S3 Integration",
      description: "Secure, scalable storage with automated backups, versioning, and intelligent data lifecycle management",
      benefit: "Unlimited secure storage",
      color: "from-blue-500 to-blue-700"
    }
  ];

  const responsiveFeatures = [
    {
      icon: Monitor,
      title: "Cross-Platform Web App",
      description: "Optimized performance across all modern browsers with progressive web app capabilities",
      compatibility: ["Chrome", "Firefox", "Safari", "Edge"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Native-like mobile experience with offline capabilities and touch-optimized interface",
      compatibility: ["iOS", "Android", "PWA", "Tablet"],
      color: "from-blue-600 to-cyan-500"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % coreFeatures.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, coreFeatures.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FeatureCard = ({ feature, index, isActive, onClick }) => {
    const Icon = feature.icon;
    return (
      <div
        className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
          isActive 
            ? `bg-white shadow-2xl ${feature.glowColor} scale-105 border border-blue-200` 
            : 'bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-xl'
        } group overflow-hidden`}
        onClick={onClick}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Animation Effect */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full ${isActive ? 'animate-ping' : ''}`}></div>
        
        <div className="relative z-10">
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <Icon className={`h-8 w-8 text-white ${hoveredCard === index ? feature.animation : ''}`} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {feature.description}
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-blue-700 font-semibold bg-blue-50 px-3 py-2 rounded-lg">
            <Zap className="h-4 w-4" />
            <span>{feature.demo}</span>
          </div>
          
          {isActive && (
            <div className="mt-6 pt-6 border-t border-blue-100 animate-fadeIn">
              <div className="grid grid-cols-1 gap-3">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3 animate-slideIn" style={{animationDelay: `${idx * 100}ms`}}>
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-2xl transition-colors duration-300"></div>
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Star className="h-5 w-5 animate-spin" />
            <span>Premium Features</span>
            <Award className="h-5 w-5" />
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Next-Generation
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 animate-gradient">
              Placement Management
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the future of campus placements with AI-powered insights, cloud-native architecture, 
            and enterprise-grade security that scales with your institution's growth.
          </p>
        </div>

        {/* Core Features Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">Core Features</h3>
                <p className="text-gray-600">Comprehensive tools for modern placement management</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span className="font-semibold">{isAutoPlaying ? 'Pause' : 'Play'} Demo</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                isActive={activeFeature === index}
                onClick={() => {
                  setActiveFeature(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="mb-24">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Advanced Analytics</h3>
              <p className="text-gray-600">Powerful data visualization and business intelligence</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visualizationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-6">
                      <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <Icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-200">
                          <div className="flex items-center space-x-2 text-blue-700 font-semibold">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm">{feature.visual}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cloud Integration Section */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24 animate-float"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-12">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Cloud Infrastructure</h3>
                  <p className="text-blue-100">Enterprise-grade AWS integration</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cloudFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                      <div className="flex items-start space-x-4">
                        <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <Icon className="h-6 w-6 text-white group-hover:animate-bounce" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                          <p className="text-blue-100 mb-4 leading-relaxed">{feature.description}</p>
                          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                            <CheckCircle className="h-4 w-4" />
                            <span>{feature.benefit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 text-center">
                <div className="inline-flex items-center space-x-6 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30">
                  <Server className="h-8 w-8 animate-pulse" />
                  <span className="text-xl font-bold">Powered by Amazon Web Services</span>
                  <Globe className="h-8 w-8 animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Design Section */}
        <div className="mb-20">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Universal Compatibility</h3>
              <p className="text-gray-600">Seamless experience across all devices and platforms</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {responsiveFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className="h-8 w-8 text-white group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {feature.compatibility.map((item, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-colors duration-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-blue-100 relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="h-4 w-4" />
                <span>Transform Your Institution</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Revolutionize Your Placement Process?
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join the growing community of educational institutions leveraging Placify's advanced features 
                to maximize student placement success and streamline administrative workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3">
                  <Eye className="h-5 w-5 group-hover:animate-pulse" />
                  <span>Watch Live Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default FeatureShowcase;