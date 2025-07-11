import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Package, AlertTriangle, 
  TrendingDown, TrendingUp, BarChart3, Download, Upload, 
  ShoppingCart, Eye, MapPin, Calendar
} from 'lucide-react';
import { mockParts } from '../../data/mockData';

const InventoryManagement: React.FC = () => {
  const [parts, setParts] = useState(mockParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['all', 'Display', 'Battery', 'Input Device', 'Camera', 'Speaker', 'Charging Port', 'Logic Board'];
  const conditions = ['new', 'refurbished', 'used'];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockParts = parts.filter(part => part.stockQuantity <= part.minStockLevel);
  const totalValue = parts.reduce((sum, part) => sum + (part.stockQuantity * part.cost), 0);
  const totalSellingValue = parts.reduce((sum, part) => sum + (part.stockQuantity * part.sellingPrice), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (current <= minimum) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    if (current <= minimum * 2) return { status: 'Medium Stock', color: 'bg-blue-100 text-blue-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const handleViewDetails = (part: any) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const handleReorder = (partId: string) => {
    alert(`Reorder initiated for part ${partId}`);
  };

  const handleBulkReorder = () => {
    alert(`Bulk reorder initiated for ${lowStockParts.length} items`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage parts, track stock levels, and monitor inventory value</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Part</span>
          </button>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Parts</p>
              <p className="text-2xl font-bold text-gray-900">{parts.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalSellingValue)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">{lowStockParts.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockParts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Low Stock Alert</h3>
            </div>
            <button 
              onClick={handleBulkReorder}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Reorder All</span>
            </button>
          </div>
          <p className="text-red-700 mt-2">
            {lowStockParts.length} items are running low on stock and need to be reordered.
          </p>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts by name, SKU, or supplier..."
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
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selling Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParts.map((part) => {
                const stockStatus = getStockStatus(part.stockQuantity, part.minStockLevel);
                return (
                  <tr key={part.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{part.name}</div>
                        <div className="text-sm text-gray-500">SKU: {part.sku}</div>
                        <div className="text-xs text-gray-400">
                          {part.compatibleDevices.slice(0, 2).join(', ')}
                          {part.compatibleDevices.length > 2 && ` +${part.compatibleDevices.length - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {part.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {part.stockQuantity} units
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                          {stockStatus.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Min: {part.minStockLevel}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(part.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(part.sellingPrice)}
                      </div>
                      <div className="text-xs text-green-600">
                        {Math.round(((part.sellingPrice - part.cost) / part.cost) * 100)}% margin
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{part.supplier}</div>
                      {part.supplierPartNumber && (
                        <div className="text-xs text-gray-500">{part.supplierPartNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 text-sm text-gray-900">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{part.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewDetails(part)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        {part.stockQuantity <= part.minStockLevel && (
                          <button 
                            onClick={() => handleReorder(part.id)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part Details Modal */}
      {showModal && selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Part Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {selectedPart.name}</div>
                    <div><strong>SKU:</strong> {selectedPart.sku}</div>
                    <div><strong>Category:</strong> {selectedPart.category}</div>
                    <div><strong>Condition:</strong> {selectedPart.condition}</div>
                    <div><strong>Location:</strong> {selectedPart.location}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing & Stock</h3>
                  <div className="space-y-2">
                    <div><strong>Cost:</strong> {formatPrice(selectedPart.cost)}</div>
                    <div><strong>Selling Price:</strong> {formatPrice(selectedPart.sellingPrice)}</div>
                    <div><strong>Current Stock:</strong> {selectedPart.stockQuantity} units</div>
                    <div><strong>Minimum Level:</strong> {selectedPart.minStockLevel} units</div>
                    <div><strong>Warranty:</strong> {selectedPart.warranty} days</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Supplier Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div><strong>Supplier:</strong> {selectedPart.supplier}</div>
                    {selectedPart.supplierPartNumber && (
                      <div><strong>Supplier Part #:</strong> {selectedPart.supplierPartNumber}</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Compatible Devices</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPart.compatibleDevices.map((device, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {device}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPart.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedPart.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Part
                </button>
                {selectedPart.stockQuantity <= selectedPart.minStockLevel && (
                  <button 
                    onClick={() => handleReorder(selectedPart.id)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;