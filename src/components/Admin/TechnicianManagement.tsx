import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Star, User, Phone, Mail, Award, Clock, Calendar, MapPin } from 'lucide-react';
import { mockTechnicians } from '../../data/mockData';

const TechnicianManagement: React.FC = () => {
  const [technicians, setTechnicians] = useState(mockTechnicians);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'break': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'vacation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'break': return 'On Break';
      case 'offline': return 'Offline';
      case 'vacation': return 'On Vacation';
      default: return status;
    }
  };

  const getWorkloadPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'technician': return 'Technician';
      case 'senior_technician': return 'Senior Technician';
      case 'specialist': return 'Specialist';
      case 'manager': return 'Manager';
      default: return role;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleViewDetails = (technician: any) => {
    setSelectedTechnician(technician);
    setShowModal(true);
  };

  const handleAssignWork = (technicianId: string) => {
    alert(`Assigning work to technician ${technicianId}`);
  };

  const handleUpdateStatus = (technicianId: string, newStatus: string) => {
    setTechnicians(technicians.map(tech => 
      tech.id === technicianId 
        ? { ...tech, status: newStatus as any }
        : tech
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technician Management</h1>
          <p className="text-gray-600 mt-1">Manage technicians, track performance, and assign workloads</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Technician</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Technicians</p>
              <p className="text-2xl font-bold text-gray-900">{technicians.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {technicians.filter(t => t.status === 'available').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Busy</p>
              <p className="text-2xl font-bold text-yellow-600">
                {technicians.filter(t => t.status === 'busy').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-600">
                {(technicians.reduce((sum, t) => sum + t.rating, 0) / technicians.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search technicians by name, email, or specialty..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnicians.map((technician) => {
          const workloadPercentage = getWorkloadPercentage(technician.currentWorkload, technician.maxWorkload);
          
          return (
            <div key={technician.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{technician.name}</h3>
                      <p className="text-sm text-gray-500">{getRoleLabel(technician.role)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(technician.status)}`}>
                    {getStatusLabel(technician.status)}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{technician.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{technician.email}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(technician.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({technician.rating})</span>
                  <span className="text-sm text-gray-400">• {technician.totalRepairs} repairs</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Specialties:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {technician.specialties.slice(0, 3).map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                    {technician.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{technician.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-lg font-bold text-gray-900">{technician.successRate}%</p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-lg font-bold text-gray-900">{Math.round(technician.avgRepairTime / 60)}h</p>
                    <p className="text-xs text-gray-500">Avg Time</p>
                  </div>
                </div>

                {/* Workload */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Workload:</span>
                    <span className="text-sm text-gray-600">
                      {technician.currentWorkload}/{technician.maxWorkload}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getWorkloadColor(workloadPercentage)}`}
                      style={{ width: `${workloadPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {workloadPercentage}% capacity
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewDetails(technician)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleAssignWork(technician.id)}
                    disabled={technician.status !== 'available'}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Assign Work
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technician Details Modal */}
      {showModal && selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Technician Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {selectedTechnician.name}</div>
                    <div><strong>Employee ID:</strong> {selectedTechnician.employeeId}</div>
                    <div><strong>Role:</strong> {getRoleLabel(selectedTechnician.role)}</div>
                    <div><strong>Email:</strong> {selectedTechnician.email}</div>
                    <div><strong>Phone:</strong> {selectedTechnician.phone}</div>
                    <div><strong>Hire Date:</strong> {selectedTechnician.hireDate.toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Skills & Certifications</h3>
                  <div className="space-y-3">
                    <div>
                      <strong>Specialties:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTechnician.specialties.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Certifications:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTechnician.certifications.map((cert, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div><strong>Skill Level:</strong> {selectedTechnician.skillLevel}/10</div>
                  </div>
                </div>
              </div>

              {/* Performance & Schedule */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded">
                      <p className="text-2xl font-bold text-blue-600">{selectedTechnician.rating}</p>
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded">
                      <p className="text-2xl font-bold text-green-600">{selectedTechnician.totalRepairs}</p>
                      <p className="text-sm text-gray-500">Total Repairs</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded">
                      <p className="text-2xl font-bold text-purple-600">{selectedTechnician.successRate}%</p>
                      <p className="text-sm text-gray-500">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded">
                      <p className="text-2xl font-bold text-orange-600">{Math.round(selectedTechnician.avgRepairTime / 60)}h</p>
                      <p className="text-sm text-gray-500">Avg Time</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Work Schedule</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedTechnician.workSchedule).map(([day, schedule]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize font-medium">{day}:</span>
                        <span>
                          {schedule.start === '00:00' && schedule.end === '00:00' 
                            ? 'Off' 
                            : `${schedule.start} - ${schedule.end}`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Current Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTechnician.status)}`}>
                        {getStatusLabel(selectedTechnician.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workload:</span>
                      <span>{selectedTechnician.currentWorkload}/{selectedTechnician.maxWorkload}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span>${selectedTechnician.hourlyRate}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Active:</span>
                      <span>{selectedTechnician.lastActive.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-6 border-t">
              <select
                value={selectedTechnician.status}
                onChange={(e) => handleUpdateStatus(selectedTechnician.id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="break">On Break</option>
                <option value="offline">Offline</option>
                <option value="vacation">On Vacation</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Update Technician
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Technician Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Technician</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="EMP001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="technician@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1-555-0123"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="technician">Technician</option>
                    <option value="senior_technician">Senior Technician</option>
                    <option value="specialist">Specialist</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="iPhone Repair, Android Repair, etc. (comma separated)"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add Technician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianManagement;