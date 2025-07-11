import React from 'react';
import { 
  Users, Settings, ShoppingCart, UserCheck, BarChart3, Home, 
  User, Package, CreditCard, Clock, Calendar, Archive
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'technicians', label: 'Technicians', icon: UserCheck },
    { id: 'inventory', label: 'Inventory', icon: Archive },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
  ];

  const customerMenuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'book-service', label: 'Book Service', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'track-order', label: 'Track Orders', icon: Clock },
  ];

  const menuItems = isAdmin ? adminMenuItems : customerMenuItems;

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-30 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">RepairPro</h1>
            <p className="text-sm text-gray-600">
              {isAdmin ? 'Admin Panel' : 'Customer Portal'}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-3 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">RepairPro v2.0</p>
          <p className="text-xs text-gray-400">Professional Repair Management</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;