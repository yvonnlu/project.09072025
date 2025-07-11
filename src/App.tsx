import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Admin Components
import Dashboard from './components/Admin/Dashboard';
import CustomerManagement from './components/Admin/CustomerManagement';
import ServiceManagement from './components/Admin/ServiceManagement';
import OrderManagement from './components/Admin/OrderManagement';
import TechnicianManagement from './components/Admin/TechnicianManagement';
import InventoryManagement from './components/Admin/InventoryManagement';
import AppointmentScheduler from './components/Admin/AppointmentScheduler';
import ReportsAnalytics from './components/Admin/ReportsAnalytics';

// Customer Components
import Profile from './components/Customer/Profile';
import BookService from './components/Customer/BookService';
import Payment from './components/Customer/Payment';
import TrackOrder from './components/Customer/TrackOrder';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const switchMode = () => {
    setIsAdmin(!isAdmin);
    setActiveTab(isAdmin ? 'profile' : 'dashboard');
  };

  const renderContent = () => {
    if (isAdmin) {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'customers':
          return <CustomerManagement />;
        case 'services':
          return <ServiceManagement />;
        case 'orders':
          return <OrderManagement />;
        case 'technicians':
          return <TechnicianManagement />;
        case 'inventory':
          return <InventoryManagement />;
        case 'appointments':
          return <AppointmentScheduler />;
        case 'reports':
          return <ReportsAnalytics />;
        default:
          return <Dashboard />;
      }
    } else {
      switch (activeTab) {
        case 'profile':
          return <Profile />;
        case 'book-service':
          return <BookService />;
        case 'payment':
          return <Payment />;
        case 'track-order':
          return <TrackOrder />;
        default:
          return <Profile />;
      }
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isAdmin} />
          <div className="ml-64">
            <Header isAdmin={isAdmin} onSwitchMode={switchMode} />
            <main className="pt-24 p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;