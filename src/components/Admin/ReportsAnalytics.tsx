import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Clock, Star,
  Download, Calendar, Filter, PieChart, Activity, Target,
  ArrowUp, ArrowDown, FileText, Mail, Printer
} from 'lucide-react';

const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Business Overview', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue Analysis', icon: DollarSign },
    { id: 'technician', name: 'Technician Performance', icon: Users },
    { id: 'customer', name: 'Customer Analytics', icon: Star },
    { id: 'inventory', name: 'Inventory Reports', icon: Activity },
    { id: 'operational', name: 'Operational Metrics', icon: Target }
  ];

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Mock data for different metrics
  const overviewMetrics = [
    {
      title: 'Total Revenue',
      value: '$47,580',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Orders Completed',
      value: '234',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Avg Repair Time',
      value: '2.4 hrs',
      change: '-15%',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  const revenueData = [
    { period: 'Week 1', revenue: 8500, orders: 45, avgOrder: 189 },
    { period: 'Week 2', revenue: 12300, orders: 62, avgOrder: 198 },
    { period: 'Week 3', revenue: 9800, orders: 51, avgOrder: 192 },
    { period: 'Week 4', revenue: 16980, orders: 76, avgOrder: 223 }
  ];

  const technicianPerformance = [
    {
      name: 'David Wilson',
      completedOrders: 45,
      avgTime: 2.1,
      customerRating: 4.9,
      efficiency: 98,
      revenue: 12500
    },
    {
      name: 'Michael Chen',
      completedOrders: 38,
      avgTime: 2.3,
      customerRating: 4.7,
      efficiency: 95,
      revenue: 9800
    },
    {
      name: 'Emily Rodriguez',
      completedOrders: 32,
      avgTime: 2.8,
      customerRating: 4.8,
      efficiency: 97,
      revenue: 11200
    }
  ];

  const topServices = [
    { service: 'Screen Replacement', count: 89, revenue: 18900, percentage: 35 },
    { service: 'Battery Replacement', count: 67, revenue: 8950, percentage: 26 },
    { service: 'Water Damage Repair', count: 34, revenue: 9800, percentage: 13 },
    { service: 'Charging Port Repair', count: 28, revenue: 4200, percentage: 11 },
    { service: 'Camera Repair', count: 23, revenue: 5750, percentage: 9 },
    { service: 'Other', count: 15, revenue: 2980, percentage: 6 }
  ];

  const customerMetrics = [
    { metric: 'New Customers', value: 45, change: '+23%', trend: 'up' },
    { metric: 'Returning Customers', value: 78, change: '+15%', trend: 'up' },
    { metric: 'Customer Lifetime Value', value: '$485', change: '+8%', trend: 'up' },
    { metric: 'Churn Rate', value: '2.3%', change: '-0.5%', trend: 'up' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const exportReport = (format: string) => {
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Period</th>
                  <th className="text-right py-2">Revenue</th>
                  <th className="text-right py-2">Orders</th>
                  <th className="text-right py-2">Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{row.period}</td>
                    <td className="py-3 text-right font-semibold text-green-600">
                      {formatCurrency(row.revenue)}
                    </td>
                    <td className="py-3 text-right">{row.orders}</td>
                    <td className="py-3 text-right">{formatCurrency(row.avgOrder)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Services</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{service.service}</span>
                    <span className="text-sm text-gray-500">{service.count} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(service.revenue)}
                  </div>
                  <div className="text-xs text-gray-500">{service.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTechnicianReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Technician Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Repair Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Generated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technicianPerformance.map((tech, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tech.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tech.completedOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tech.avgTime} hrs</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-900">{tech.customerRating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tech.efficiency}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      {formatCurrency(tech.revenue)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'technician':
        return renderTechnicianReport();
      case 'customer':
        return renderCustomerReport();
      case 'revenue':
        return renderOverviewReport(); // Simplified for demo
      case 'inventory':
        return renderOverviewReport(); // Simplified for demo
      case 'operational':
        return renderOverviewReport(); // Simplified for demo
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => exportReport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button 
              onClick={() => exportReport('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Excel</span>
            </button>
            <button 
              onClick={() => exportReport('email')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium text-center">{report.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderReportContent()}

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Schedule New Report
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Weekly Business Summary</h4>
                <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Monthly Financial Report</h4>
                <p className="text-sm text-gray-600">First day of each month at 8:00 AM</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;