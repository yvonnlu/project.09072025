import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode, FileText, Download, Eye, Calendar } from 'lucide-react';

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const pendingPayments = [
    {
      id: 'PAY001',
      orderId: 'ORD001',
      deviceType: 'iPhone 14',
      service: 'Thay màn hình',
      amount: 1500000,
      dueDate: '2024-12-05',
      status: 'pending'
    },
    {
      id: 'PAY002',
      orderId: 'ORD002',
      deviceType: 'MacBook Pro',
      service: 'Thay pin',
      amount: 2500000,
      dueDate: '2024-12-10',
      status: 'pending'
    }
  ];

  const paymentHistory = [
    {
      id: 'PAY003',
      orderId: 'ORD003',
      deviceType: 'iPad Air',
      service: 'Sửa cổng sạc',
      amount: 800000,
      paidDate: '2024-11-15',
      method: 'Chuyển khoản',
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: 'PAY004',
      orderId: 'ORD004',
      deviceType: 'iPhone 13',
      service: 'Thay camera',
      amount: 1200000,
      paidDate: '2024-11-10',
      method: 'Tiền mặt',
      status: 'paid',
      invoiceUrl: '#'
    }
  ];

  const paymentMethods = [
    {
      id: 'cash',
      label: 'Tiền mặt',
      icon: '💵',
      description: 'Thanh toán trực tiếp tại cửa hàng'
    },
    {
      id: 'bank',
      label: 'Chuyển khoản',
      icon: '🏦',
      description: 'Chuyển khoản qua ngân hàng'
    },
    {
      id: 'momo',
      label: 'MoMo',
      icon: '📱',
      description: 'Thanh toán qua ví MoMo'
    },
    {
      id: 'vnpay',
      label: 'VNPay',
      icon: '💳',
      description: 'Thanh toán qua VNPay'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ thanh toán';
      case 'paid': return 'Đã thanh toán';
      case 'overdue': return 'Quá hạn';
      default: return status;
    }
  };

  const handlePayment = (paymentId: string) => {
    alert(`Thanh toán ${paymentId} bằng ${paymentMethods.find(m => m.id === selectedMethod)?.label}`);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Tải hóa đơn ${invoiceId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
        <div className="text-sm text-gray-500">
          Tổng cần thanh toán: {formatPrice(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <div className="text-3xl mb-2">{method.icon}</div>
              <h3 className="font-medium text-gray-900">{method.label}</h3>
              <p className="text-sm text-gray-500 text-center mt-1">{method.description}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Pending Payments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Thanh toán đang chờ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hạn thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.orderId}</div>
                    <div className="text-sm text-gray-500">{payment.deviceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.dueDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusLabel(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handlePayment(payment.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Thanh toán
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Lịch sử thanh toán</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hóa đơn
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.orderId}</div>
                    <div className="text-sm text-gray-500">{payment.deviceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.paidDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewInvoice(payment)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(payment.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Transfer Info */}
      {selectedMethod === 'bank' && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chuyển khoản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ngân hàng</p>
              <p className="font-medium">Techcombank</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Số tài khoản</p>
              <p className="font-medium">12345678901234</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chủ tài khoản</p>
              <p className="font-medium">CÔNG TY SỬA CHỮA ĐIỆN THOẠI</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nội dung chuyển khoản</p>
              <p className="font-medium">Thanh toán [Mã đơn hàng]</p>
            </div>
          </div>
        </div>
      )}

      {/* QR Code for MoMo/VNPay */}
      {(selectedMethod === 'momo' || selectedMethod === 'vnpay') && (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quét mã QR để thanh toán
          </h3>
          <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
            <QrCode className="w-24 h-24 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Sử dụng ứng dụng {selectedMethod === 'momo' ? 'MoMo' : 'VNPay'} để quét mã QR
          </p>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Hóa đơn điện tử</h2>
              <button 
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-bold">CÔNG TY SỬA CHỮA ĐIỆN THOẠI</h3>
                <p className="text-sm text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
                <p className="text-sm text-gray-600">Điện thoại: 0901234567</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Mã hóa đơn</p>
                  <p className="font-medium">{selectedInvoice.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày thanh toán</p>
                  <p className="font-medium">{new Date(selectedInvoice.paidDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phương thức</p>
                  <p className="font-medium">{selectedInvoice.method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusLabel(selectedInvoice.status)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Chi tiết dịch vụ</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Thiết bị:</span>
                    <span>{selectedInvoice.deviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dịch vụ:</span>
                    <span>{selectedInvoice.service}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(selectedInvoice.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tải hóa đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;