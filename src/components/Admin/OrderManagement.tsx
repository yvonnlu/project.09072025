import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, User, Phone, Calendar, Clock, AlertCircle } from 'lucide-react';
import { mockRepairOrders } from '../../data/mockData';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState(mockRepairOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statuses = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'diagnosing', label: 'Đang kiểm tra' },
    { value: 'repairing', label: 'Đang sửa chữa' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'delivered', label: 'Đã giao' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm) ||
                         order.id.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'diagnosing': return 'bg-blue-100 text-blue-800';
      case 'repairing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ xử lý',
      'diagnosing': 'Đang kiểm tra',
      'repairing': 'Đang sửa chữa',
      'in_progress': 'Đang sửa chữa',
      'completed': 'Hoàn thành',
      'delivered': 'Đã giao'
    };
    return statusMap[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      case 'normal': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any, updatedAt: new Date() }
        : order
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Tạo đơn hàng
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, SĐT, mã đơn..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Lọc thêm</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thiết bị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ưu tiên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kỹ thuật viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">{order.createdAt.toLocaleDateString('vi-VN')}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.deviceInfo.brand} {order.deviceInfo.model}</div>
                    <div className="text-sm text-gray-500">{order.deviceInfo.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertCircle className={`w-4 h-4 ${getPriorityColor(order.priority)}`} />
                      <span className={`ml-1 text-sm font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'high' ? 'Cao' : order.priority === 'medium' ? 'Trung bình' : order.priority === 'normal' ? 'Bình thường' : 'Thấp'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.assignedTechnician || 'Chưa phân công'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(order.finalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin khách hàng</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin thiết bị</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div><strong>Loại:</strong> {selectedOrder.deviceInfo.brand} {selectedOrder.deviceInfo.model}</div>
                    <div><strong>Màu:</strong> {selectedOrder.deviceInfo.color}</div>
                    <div><strong>IMEI:</strong> {selectedOrder.deviceInfo.imei}</div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin dịch vụ</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div><strong>Dịch vụ:</strong> {selectedOrder.services.map(s => s.serviceName).join(', ')}</div>
                    <div><strong>Mô tả lỗi:</strong> {selectedOrder.issueDescription}</div>
                    <div><strong>Kỹ thuật viên:</strong> {selectedOrder.assignedTechnician || 'Chưa phân công'}</div>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Trạng thái đơn hàng</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Tạo: {selectedOrder.createdAt.toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Dự kiến hoàn thành: {selectedOrder.estimatedCompletion.toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div><strong>Tổng chi phí:</strong> {formatPrice(selectedOrder.finalPrice)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ghi chú</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedOrder.diagnosticNotes}</p>
              </div>
            </div>

            {/* Status Update */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Cập nhật trạng thái:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.filter(s => s.value !== 'all').map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;