import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Users,
  Target,
  Award,
  BarChart3 as BarChartIcon,
  Activity,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

// Fake data
const placementData = [
  { month: 'Jan', placements: 45, applications: 120, success_rate: 37.5 },
  { month: 'Feb', placements: 52, applications: 135, success_rate: 38.5 },
  { month: 'Mar', placements: 38, applications: 110, success_rate: 34.5 },
  { month: 'Apr', placements: 65, applications: 150, success_rate: 43.3 },
  { month: 'May', placements: 78, applications: 165, success_rate: 47.3 },
  { month: 'Jun', placements: 82, applications: 170, success_rate: 48.2 },
];

const industryData = [
  { name: 'Technology', value: 35, color: '#3B82F6' },
  { name: 'Finance', value: 25, color: '#60A5FA' },
  { name: 'Healthcare', value: 20, color: '#93C5FD' },
  { name: 'Education', value: 12, color: '#BFDBFE' },
  { name: 'Others', value: 8, color: '#DBEAFE' },
];

const weeklyTrends = [
  { day: 'Mon', interviews: 12, offers: 8, rejections: 4 },
  { day: 'Tue', interviews: 15, offers: 10, rejections: 5 },
  { day: 'Wed', interviews: 18, offers: 12, rejections: 6 },
  { day: 'Thu', interviews: 14, offers: 9, rejections: 5 },
  { day: 'Fri', interviews: 20, offers: 15, rejections: 5 },
  { day: 'Sat', interviews: 8, offers: 5, rejections: 3 },
  { day: 'Sun', interviews: 6, offers: 4, rejections: 2 },
];

const skillDemand = [
  { skill: 'React.js', demand: 85 },
  { skill: 'Python', demand: 78 },
  { skill: 'Java', demand: 72 },
  { skill: 'Node.js', demand: 68 },
  { skill: 'SQL', demand: 65 },
  { skill: 'AWS', demand: 60 },
];

const Dashboard = ({ signOut }) => {
  const [animatedValues, setAnimatedValues] = useState({
    totalPlacements: 0,
    successRate: 0,
    totalApplications: 0,
    avgSalary: 0
  });

  useEffect(() => {
    const targets = {
      totalPlacements: 360,
      successRate: 42.8,
      totalApplications: 850,
      avgSalary: 75000
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedValues({
        totalPlacements: Math.floor(targets.totalPlacements * progress),
        successRate: (targets.successRate * progress).toFixed(1),
        totalApplications: Math.floor(targets.totalApplications * progress),
        avgSalary: Math.floor(targets.avgSalary * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 animate-pulse-slow">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Placements', value: animatedValues.totalPlacements, icon: <Users className="text-blue-600" size={24} />, bg: 'bg-blue-100' },
            { label: 'Success Rate', value: `${animatedValues.successRate}%`, icon: <TrendingUp className="text-green-600" size={24} />, bg: 'bg-green-100' },
            { label: 'Applications', value: animatedValues.totalApplications, icon: <Target className="text-purple-600" size={24} />, bg: 'bg-purple-100' },
            { label: 'Avg Salary', value: ` ₹${animatedValues.avgSalary.toLocaleString()}`, icon: <Award className="text-yellow-600" size={24} />, bg: 'bg-yellow-100' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-blue-800">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 ${metric.bg} rounded-lg flex items-center justify-center`}>
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <LineChartIcon className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Monthly Placement Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #3B82F6', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="placements" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
                <Line type="monotone" dataKey="applications" stroke="#60A5FA" strokeWidth={2} dot={{ fill: '#60A5FA', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <PieChartIcon className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Industry Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {industryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Trends BarChart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <Activity className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Weekly Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #3B82F6', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="interviews" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="offers" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejections" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Demand AreaChart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <BarChartIcon className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Top Skills in Demand</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={skillDemand} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <YAxis type="number" stroke="#6B7280" />
                <XAxis dataKey="skill" type="category" stroke="#6B7280" width={100} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #3B82F6', borderRadius: '8px' }} />
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <Area dataKey="demand" fill="url(#skillGradient)" stroke="#3B82F6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Success Rate AreaChart */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-blue-800">Success Rate Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={placementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #3B82F6', borderRadius: '8px' }} />
                <defs>
                  <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="success_rate" stroke="#10B981" strokeWidth={3} fill="url(#successGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
