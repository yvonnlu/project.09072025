import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Tag, Clock } from 'lucide-react';
import { mockServices } from '../../data/mockData';

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Sửa chữa', 'Thay thế', 'Bảo dưỡng'];
  const deviceTypes = ['iPhone', 'Android', 'Laptop', 'Tablet', 'Smartwatch'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.deviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Thêm dịch vụ</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Tất cả danh mục' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{service.category}</span>
                </div>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`${service.isActive ? 'text-green-600' : 'text-gray-400'} hover:scale-110 transition-transform`}
                >
                  {service.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Thiết bị:</span>
                  <span className="text-sm font-medium">{service.deviceType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Giá:</span>
                  <span className="text-sm font-medium text-green-600">{formatPrice(service.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Thời gian:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{service.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Categories Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan theo danh mục</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.filter(cat => cat !== 'all').map(category => {
            const categoryServices = services.filter(s => s.category === category);
            const activeServices = categoryServices.filter(s => s.isActive);
            return (
              <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{category}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{categoryServices.length}</p>
                <p className="text-sm text-gray-500">
                  {activeServices.length} hoạt động
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;