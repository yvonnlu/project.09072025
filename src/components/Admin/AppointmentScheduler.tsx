import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Edit, Trash2, User, Phone, 
  CheckCircle, X, AlertCircle, Filter, Search, Bell
} from 'lucide-react';
import { mockAppointments, mockTechnicians } from '../../data/mockData';

const AppointmentScheduler: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day'); // day, week, month
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointmentTypes = [
    { value: 'diagnostic', label: 'Diagnostic', color: 'bg-blue-100 text-blue-800' },
    { value: 'repair', label: 'Repair', color: 'bg-green-100 text-green-800' },
    { value: 'pickup', label: 'Pickup', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivery', label: 'Delivery', color: 'bg-orange-100 text-orange-800' },
    { value: 'consultation', label: 'Consultation', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const typeObj = appointmentTypes.find(t => t.value === type);
    return typeObj ? typeObj.color : 'bg-gray-100 text-gray-800';
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.scheduledDate).toISOString().split('T')[0];
    return appointmentDate === selectedDate;
  });

  const handleStatusUpdate = (appointmentId: string, newStatus: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus as any }
        : appointment
    ));
  };

  const handleSendReminder = (appointmentId: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, reminderSent: true }
        : appointment
    ));
    alert('Reminder sent successfully!');
  };

  const generateTimeSlotGrid = () => {
    const grid = [];
    for (const slot of timeSlots) {
      const appointmentsInSlot = filteredAppointments.filter(appointment => {
        const appointmentTime = new Date(appointment.scheduledDate).toTimeString().slice(0, 5);
        return appointmentTime === slot;
      });

      grid.push({
        time: slot,
        appointments: appointmentsInSlot
      });
    }
    return grid;
  };

  const timeSlotGrid = generateTimeSlotGrid();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Scheduler</h1>
          <p className="text-gray-600 mt-1">Manage appointments and technician schedules</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Month
            </button>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-lg font-semibold text-gray-900">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredAppointments.length} appointments today
            </span>
          </div>
        </div>
      </div>

      {/* Appointment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {appointmentTypes.map(type => {
          const count = filteredAppointments.filter(apt => apt.appointmentType === type.value).length;
          return (
            <div key={type.value} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className={`text-sm font-medium px-2 py-1 rounded-full ${type.color}`}>
                  {type.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Daily Schedule</h2>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            {timeSlotGrid.map((slot, index) => (
              <div key={index} className="flex items-center border-b border-gray-100 pb-2">
                <div className="w-20 text-sm font-medium text-gray-600">
                  {slot.time}
                </div>
                <div className="flex-1 ml-4">
                  {slot.appointments.length === 0 ? (
                    <div className="h-12 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <button className="text-gray-400 hover:text-blue-600 text-sm">
                        + Add appointment
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slot.appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowModal(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-900">
                                  {appointment.customerName}
                                </span>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.appointmentType)}`}>
                                {appointmentTypes.find(t => t.value === appointment.appointmentType)?.label}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                {appointment.status.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {appointment.duration} min
                              </span>
                              {appointment.assignedTechnician && (
                                <span className="text-sm text-blue-600">
                                  {appointment.assignedTechnician}
                                </span>
                              )}
                              {!appointment.reminderSent && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSendReminder(appointment.id);
                                  }}
                                  className="text-orange-600 hover:text-orange-800"
                                >
                                  <Bell className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technician Availability */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Technician Availability</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTechnicians.map((technician) => (
              <div key={technician.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      technician.status === 'available' ? 'bg-green-500' : 
                      technician.status === 'busy' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{technician.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {technician.currentWorkload}/{technician.maxWorkload}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    Specialties: {technician.specialties.slice(0, 2).join(', ')}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        technician.currentWorkload / technician.maxWorkload > 0.8 ? 'bg-red-500' :
                        technician.currentWorkload / technician.maxWorkload > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(technician.currentWorkload / technician.maxWorkload) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedAppointment ? 'Edit Appointment' : 'New Appointment'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedAppointment(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedAppointment?.customerName || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={selectedAppointment?.customerPhone || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    defaultValue={selectedAppointment?.appointmentType || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {appointmentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedAppointment ? 
                      new Date(selectedAppointment.scheduledDate).toISOString().split('T')[0] : 
                      selectedDate
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    defaultValue={selectedAppointment ? 
                      new Date(selectedAppointment.scheduledDate).toTimeString().slice(0, 5) : 
                      ''
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedAppointment?.duration || 30}
                    min="15"
                    step="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Technician
                  </label>
                  <select
                    defaultValue={selectedAppointment?.assignedTechnician || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Auto-assign</option>
                    {mockTechnicians.map(tech => (
                      <option key={tech.id} value={tech.name}>
                        {tech.name} ({tech.status})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  defaultValue={selectedAppointment?.notes || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes or special requirements..."
                />
              </div>

              {selectedAppointment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    defaultValue={selectedAppointment.status}
                    onChange={(e) => handleStatusUpdate(selectedAppointment.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedAppointment(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {selectedAppointment ? 'Update' : 'Create'} Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;