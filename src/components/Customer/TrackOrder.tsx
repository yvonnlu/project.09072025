import React, { useState } from 'react';
import { Package, Clock, CheckCircle, Truck, Star, MessageCircle, Eye, Search } from 'lucide-react';

const TrackOrder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const orders = [
    {
      id: 'ORD001',
      deviceType: 'iPhone 14',
      deviceModel: 'iPhone 14 Pro Max',
      service: 'Thay màn hình',
      status: 'completed',
      createdAt: '2024-11-28',
      estimatedCompletion: '2024-12-01',
      actualCompletion: '2024-12-01',
      technician: 'Phạm Văn Đức',
      totalCost: 1500000,
      progress: [
        { status: 'pending', label: 'Tiếp nhận', time: '2024-11-28 09:00', completed: true },
        { status: 'diagnosing', label: 'Kiểm tra', time: '2024-11-28 10:30', completed: true },
        { status: 'repairing', label: 'Sửa chữa', time: '2024-11-30 14:00', completed: true },
        { status: 'completed', label: 'Hoàn thành', time: '2024-12-01 16:00', completed: true },
        { status: 'delivered', label: 'Giao hàng', time: null, completed: false }
      ],
      canRate: true
    },
    {
      id: 'ORD002',
      deviceType: 'MacBook Pro',
      deviceModel: 'MacBook Pro 2023',
      service: 'Thay pin',
      status: 'repairing',
      createdAt: '2024-12-01',
      estimatedCompletion: '2024-12-03',
      actualCompletion: null,
      technician: 'Vũ Minh Hoàng',
      totalCost: 2500000,
      progress: [
        { status: 'pending', label: 'Tiếp nhận', time: '2024-12-01 09:00', completed: true },
        { status: 'diagnosing', label: 'Kiểm tra', time: '2024-12-01 11:00', completed: true },
        { status: 'repairing', label: 'Sửa chữa', time: '2024-12-02 08:00', completed: true },
        { status: 'completed', label: 'Hoàn thành', time: null, completed: false },
        { status: 'delivered', label: 'Giao hàng', time: null, completed: false }
      ],
      canRate: false
    },
    {
      id: 'ORD003',
      deviceType: 'Samsung Galaxy S23',
      deviceModel: 'Galaxy S23 Ultra',
      service: 'Sửa bo mạch chủ',
      status: 'diagnosing',
      createdAt: '2024-12-02',
      estimatedCompletion: '2024-12-05',
      actualCompletion: null,
      technician: 'Lê Thành Nam',
      totalCost: 800000,
      progress: [
        { status: 'pending', label: 'Tiếp nhận', time: '2024-12-02 10:00', completed: true },
        { status: 'diagnosing', label: 'Kiểm tra', time: '2024-12-02 14:00', completed: true },
        { status: 'repairing', label: 'Sửa chữa', time: null, completed: false },
        { status: 'completed', label: 'Hoàn thành', time: null, completed: false },
        { status: 'delivered', label: 'Giao hàng', time: null, completed: false }
      ],
      canRate: false
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'diagnosing': return 'bg-blue-100 text-blue-800';
      case 'repairing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'diagnosing': return 'Đang kiểm tra';
      case 'repairing': return 'Đang sửa chữa';
      case 'completed': return 'Hoàn thành';
      case 'delivered': return 'Đã giao';
      default: return status;
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
    switch (status) {
      case 'pending': return <Package className="w-6 h-6 text-yellow-600" />;
      case 'diagnosing': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'repairing': return <Clock className="w-6 h-6 text-orange-600" />;
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'delivered': return <Truck className="w-6 h-6 text-purple-600" />;
      default: return <Clock className="w-6 h-6 text-gray-600" />;
    }
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

  const handleRate = (order: any) => {
    setSelectedOrder(order);
    setShowFeedback(true);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { orderId: selectedOrder.id, rating, feedback });
    alert('Cảm ơn bạn đã đánh giá dịch vụ!');
    setShowFeedback(false);
    setRating(5);
    setFeedback('');
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Theo dõi đơn hàng</h1>
        <div className="text-sm text-gray-500">
          Tổng: {orders.length} đơn hàng
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.deviceType} - {order.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Tạo: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Thiết bị</p>
                  <p className="font-medium">{order.deviceModel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kỹ thuật viên</p>
                  <p className="font-medium">{order.technician}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Chi phí</p>
                  <p className="font-medium text-green-600">{formatPrice(order.totalCost)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tiến trình</span>
                  <span className="text-sm text-gray-500">
                    {order.progress.filter(p => p.completed).length}/{order.progress.length} bước
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {order.progress.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col items-center">
                        {getStatusIcon(step.status, step.completed)}
                        <span className={`text-xs mt-1 ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                      {index < order.progress.length - 1 && (
                        <div className={`flex-1 h-0.5 ${step.completed ? 'bg-green-600' : 'bg-gray-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Chi tiết</span>
                  </button>
                  <button className="text-green-600 hover:text-green-800 flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Nhắn tin</span>
                  </button>
                </div>
                {order.canRate && (
                  <button
                    onClick={() => handleRate(order)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                  >
                    <Star className="w-4 h-4" />
                    <span>Đánh giá</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
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
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Thông tin thiết bị</h3>
                  <div className="space-y-2">
                    <div><strong>Loại:</strong> {selectedOrder.deviceType}</div>
                    <div><strong>Model:</strong> {selectedOrder.deviceModel}</div>
                    <div><strong>Dịch vụ:</strong> {selectedOrder.service}</div>
                    <div><strong>Kỹ thuật viên:</strong> {selectedOrder.technician}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Thông tin thanh toán</h3>
                  <div className="space-y-2">
                    <div><strong>Tổng chi phí:</strong> {formatPrice(selectedOrder.totalCost)}</div>
                    <div><strong>Trạng thái:</strong> 
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Lịch sử tiến trình</h3>
                  <div className="space-y-3">
                    {selectedOrder.progress.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {getStatusIcon(step.status, step.completed)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </span>
                            {step.time && (
                              <span className="text-sm text-gray-500">
                                {new Date(step.time).toLocaleString('vi-VN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Thời gian</h3>
                  <div className="space-y-2">
                    <div><strong>Ngày tạo:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString('vi-VN')}</div>
                    <div><strong>Dự kiến hoàn thành:</strong> {new Date(selectedOrder.estimatedCompletion).toLocaleDateString('vi-VN')}</div>
                    {selectedOrder.actualCompletion && (
                      <div><strong>Thực tế hoàn thành:</strong> {new Date(selectedOrder.actualCompletion).toLocaleDateString('vi-VN')}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Đánh giá dịch vụ</h2>
              <button 
                onClick={() => setShowFeedback(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Đánh giá cho đơn hàng #{selectedOrder.id}</p>
                <div className="flex items-center justify-center space-x-1">
                  {renderStars(rating, true)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận xét của bạn
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;