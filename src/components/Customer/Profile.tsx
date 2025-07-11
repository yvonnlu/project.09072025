import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Edit, Save, X, History, Award } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    email: 'nguyenvanan@email.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    joinDate: '2024-01-15',
    totalOrders: 5,
    completedOrders: 4,
    rating: 4.8
  });

  const recentOrders = [
    { id: '001', device: 'iPhone 14', service: 'Thay màn hình', status: 'Hoàn thành', date: '2024-11-15', cost: 1500000 },
    { id: '002', device: 'MacBook Pro', service: 'Thay pin', status: 'Hoàn thành', date: '2024-10-20', cost: 2500000 },
    { id: '003', device: 'iPad Air', service: 'Sửa cổng sạc', status: 'Hoàn thành', date: '2024-09-10', cost: 800000 },
    { id: '004', device: 'iPhone 13', service: 'Thay camera', status: 'Hoàn thành', date: '2024-08-05', cost: 1200000 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Đang xử lý': return 'bg-blue-100 text-blue-800';
      case 'Chờ xử lý': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Hủy</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">Khách hàng từ {new Date(profile.joinDate).toLocaleDateString('vi-VN')}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Khách hàng VIP</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    {isEditing ? (
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{profile.totalOrders}</p>
                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{profile.completedOrders}</p>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{profile.rating}</p>
                <p className="text-sm text-gray-600">Đánh giá trung bình</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ưu đãi</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Giảm 10% cho đơn hàng tiếp theo</p>
                <p className="text-xs text-purple-600">Áp dụng đến 31/12/2024</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Miễn phí vận chuyển</p>
                <p className="text-xs text-blue-600">Cho khách hàng VIP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Lịch sử đơn hàng</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Xem tất cả
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thiết bị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi phí
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(order.cost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;