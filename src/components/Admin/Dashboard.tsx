import React, { useState } from 'react';
import { 
  TrendingUp, Users, ShoppingCart, DollarSign, Clock, CheckCircle, 
  AlertTriangle, Package, Calendar, Star, Activity, Zap, Target,
  TrendingDown, ArrowUp, ArrowDown, BarChart3, PieChart
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$24,580', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      description: 'vs last period'
    },
    { 
      title: 'Active Orders', 
      value: '47', 
      change: '+8', 
      trend: 'up',
      icon: ShoppingCart, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      description: 'currently in progress'
    },
    { 
      title: 'Completed Today', 
      value: '23', 
      change: '+15%', 
      trend: 'up',
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      description: 'vs yesterday'
    },
    { 
      title: 'Customer Satisfaction', 
      value: '4.8', 
      change: '+0.2', 
      trend: 'up',
      icon: Star, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      description: 'average rating'
    },
    { 
      title: 'Avg Repair Time', 
      value: '2.4h', 
      change: '-15min', 
      trend: 'up',
      icon: Clock, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      description: 'faster than target'
    },
    { 
      title: 'Parts Inventory', 
      value: '89%', 
      change: '-5%', 
      trend: 'down',
      icon: Package, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      description: 'stock level'
    }
  ];

  const recentOrders = [
    { 
      id: 'RO-2024-047', 
      customer: 'John Smith', 
      device: 'iPhone 14 Pro', 
      issue: 'Screen Replacement',
      status: 'In Progress', 
      technician: 'David Wilson',
      priority: 'High',
      time: '2 hours ago',
      estimatedCompletion: '4:30 PM'
    },
    { 
      id: 'RO-2024-046', 
      customer: 'Sarah Johnson', 
      device: 'Samsung Galaxy S23', 
      issue: 'Battery Replacement',
      status: 'Quality Check', 
      technician: 'Michael Chen',
      priority: 'Normal',
      time: '1 hour ago',
      estimatedCompletion: '3:00 PM'
    },
    { 
      id: 'RO-2024-045', 
      customer: 'TechCorp Solutions', 
      device: 'MacBook Pro 2023', 
      issue: 'Keyboard Repair',
      status: 'Completed', 
      technician: 'Emily Rodriguez',
      priority: 'Normal',
      time: '30 minutes ago',
      estimatedCompletion: 'Completed'
    },
    { 
      id: 'RO-2024-044', 
      customer: 'Mike Davis', 
      device: 'iPad Air', 
      issue: 'Water Damage',
      status: 'Awaiting Parts', 
      technician: 'David Wilson',
      priority: 'Urgent',
      time: '15 minutes ago',
      estimatedCompletion: 'TBD'
    }
  ];

  const technicianPerformance = [
    { name: 'David Wilson', repairs: 23, rating: 4.9, efficiency: 98, status: 'busy' },
    { name: 'Michael Chen', repairs: 18, rating: 4.7, efficiency: 95, status: 'available' },
    { name: 'Emily Rodriguez', repairs: 15, rating: 4.8, efficiency: 97, status: 'available' },
    { name: 'Alex Thompson', repairs: 12, rating: 4.6, efficiency: 92, status: 'break' }
  ];

  const lowStockItems = [
    { name: 'iPhone 14 Screen', current: 3, minimum: 5, urgency: 'high' },
    { name: 'Samsung S23 Battery', current: 2, minimum: 3, urgency: 'medium' },
    { name: 'MacBook Keyboard', current: 1, minimum: 2, urgency: 'high' },
    { name: 'iPad Charging Port', current: 4, minimum: 5, urgency: 'low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'quality check': return 'bg-purple-100 text-purple-800';
      case 'awaiting parts': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-green-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your repair shop.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device & Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ETA
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className={`text-xs font-medium ${getPriorityColor(order.priority)}`}>
                          {order.priority} Priority
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.device}</div>
                      <div className="text-sm text-gray-500">{order.issue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.technician}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.estimatedCompletion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technician Performance */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Technician Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {technicianPerformance.map((tech, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tech.status === 'busy' ? 'bg-red-500' : 
                      tech.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                      <p className="text-xs text-gray-500">{tech.repairs} repairs this week</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{tech.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{tech.efficiency}% efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.current} in stock (min: {item.minimum})
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(item.urgency)}`}>
                    {item.urgency}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Reorder Parts
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">New Order</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                <Users className="w-6 h-6 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">Add Customer</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                <Calendar className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Schedule</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
                <Package className="w-6 h-6 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Inventory</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-gray-600 hover:text-gray-800">Daily</button>
              <button className="text-sm text-blue-600 font-medium">Weekly</button>
              <button className="text-sm text-gray-600 hover:text-gray-800">Monthly</button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;