import React, { useState } from 'react';
import { 
  Smartphone, Laptop, Tablet, Watch, Plus, ArrowRight, Calendar, Clock, MapPin, Truck, 
  Camera, Battery, Wrench, AlertTriangle, CheckCircle, Star, Shield, Zap, Info,
  DollarSign, Timer, Award, Phone, Mail, User
} from 'lucide-react';
import { mockServices } from '../../data/mockData';

const BookService: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedIssueCategory, setSelectedIssueCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState({
    model: '',
    imei: '',
    issueDescription: '',
    specificIssue: '',
    urgency: 'normal',
    hasWarranty: false,
    previousRepairs: false,
    purchaseDate: '',
    accessories: []
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: 'John Smith',
    phone: '+1-555-0123',
    email: 'john.smith@email.com',
    address: '123 Main Street, New York, NY 10001'
  });
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const deviceTypes = [
    { 
      id: 'iPhone', 
      label: 'iPhone', 
      icon: Smartphone, 
      color: 'bg-blue-500',
      description: 'All iPhone models and generations'
    },
    { 
      id: 'Android', 
      label: 'Android', 
      icon: Smartphone, 
      color: 'bg-green-500',
      description: 'Samsung, Google, OnePlus, etc.'
    },
    { 
      id: 'Laptop', 
      label: 'Laptop', 
      icon: Laptop, 
      color: 'bg-purple-500',
      description: 'MacBook, Windows laptops'
    },
    { 
      id: 'Tablet', 
      label: 'Tablet', 
      icon: Tablet, 
      color: 'bg-orange-500',
      description: 'iPad, Android tablets'
    },
    { 
      id: 'Smartwatch', 
      label: 'Smartwatch', 
      icon: Watch, 
      color: 'bg-pink-500',
      description: 'Apple Watch, Samsung Galaxy Watch'
    },
  ];

  const timeSlots = [
    '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  // Device-specific issue categories with detailed information
  const deviceIssues = {
    iPhone: [
      { 
        id: 'screen', 
        label: 'Screen Issues', 
        icon: Smartphone, 
        color: 'text-red-600',
        issues: ['Cracked screen', 'Black screen', 'Touch not working', 'Dead pixels', 'Screen flickering'],
        commonCauses: ['Dropped device', 'Impact damage', 'Manufacturing defect'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'battery', 
        label: 'Battery Problems', 
        icon: Battery, 
        color: 'text-green-600',
        issues: ['Fast drain', 'Not charging', 'Overheating', 'Swollen battery', 'Random shutdowns'],
        commonCauses: ['Battery age', 'Charging habits', 'Software issues'],
        avgRepairTime: '30-60 minutes',
        difficulty: 'Easy'
      },
      { 
        id: 'camera', 
        label: 'Camera Issues', 
        icon: Camera, 
        color: 'text-purple-600',
        issues: ['Blurry photos', 'Camera not working', 'Flash not working', 'Front camera issues', 'Lens cracked'],
        commonCauses: ['Physical damage', 'Software glitch', 'Dust/moisture'],
        avgRepairTime: '45-90 minutes',
        difficulty: 'Medium'
      },
      { 
        id: 'audio', 
        label: 'Audio Problems', 
        icon: Wrench, 
        color: 'text-blue-600',
        issues: ['No sound', 'Microphone not working', 'Speaker issues', 'Headphone jack problems'],
        commonCauses: ['Water damage', 'Dust accumulation', 'Component failure'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'other', 
        label: 'Other Issues', 
        icon: AlertTriangle, 
        color: 'text-orange-600',
        issues: ['Water damage', 'Won\'t turn on', 'Software issues', 'Charging port problems', 'Button not working'],
        commonCauses: ['Various factors', 'Liquid exposure', 'Wear and tear'],
        avgRepairTime: '2-4 hours',
        difficulty: 'Hard'
      }
    ],
    Android: [
      { 
        id: 'screen', 
        label: 'Screen Issues', 
        icon: Smartphone, 
        color: 'text-red-600',
        issues: ['Cracked screen', 'Display not working', 'Touch sensitivity', 'Screen flickering', 'Color distortion'],
        commonCauses: ['Physical impact', 'Manufacturing defect', 'Age'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'battery', 
        label: 'Battery Problems', 
        icon: Battery, 
        color: 'text-green-600',
        issues: ['Quick discharge', 'Charging issues', 'Battery swelling', 'Overheating', 'Slow charging'],
        commonCauses: ['Battery degradation', 'Charging port issues', 'Software problems'],
        avgRepairTime: '45-90 minutes',
        difficulty: 'Easy'
      },
      { 
        id: 'camera', 
        label: 'Camera Issues', 
        icon: Camera, 
        color: 'text-purple-600',
        issues: ['Camera app crashes', 'Blurry images', 'Flash malfunction', 'Lens damage', 'Focus problems'],
        commonCauses: ['Software bugs', 'Hardware damage', 'Dust/debris'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'performance', 
        label: 'Performance Issues', 
        icon: Wrench, 
        color: 'text-blue-600',
        issues: ['Slow performance', 'App crashes', 'Storage full', 'System updates failing', 'Freezing'],
        commonCauses: ['Software issues', 'Insufficient storage', 'Malware'],
        avgRepairTime: '1-3 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'other', 
        label: 'Other Issues', 
        icon: AlertTriangle, 
        color: 'text-orange-600',
        issues: ['Water damage', 'Boot loop', 'Network issues', 'Hardware failure', 'Sensor problems'],
        commonCauses: ['Various factors', 'Liquid damage', 'Component failure'],
        avgRepairTime: '2-5 hours',
        difficulty: 'Hard'
      }
    ],
    Laptop: [
      { 
        id: 'screen', 
        label: 'Display Issues', 
        icon: Laptop, 
        color: 'text-red-600',
        issues: ['Cracked screen', 'No display', 'Flickering', 'Dead pixels', 'Backlight issues', 'Lines on screen'],
        commonCauses: ['Physical damage', 'Cable issues', 'Graphics card problems'],
        avgRepairTime: '2-4 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'keyboard', 
        label: 'Keyboard/Trackpad', 
        icon: Wrench, 
        color: 'text-blue-600',
        issues: ['Keys not working', 'Trackpad issues', 'Sticky keys', 'Backlight problems', 'Key replacement'],
        commonCauses: ['Liquid spills', 'Wear and tear', 'Dust accumulation'],
        avgRepairTime: '1-3 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'battery', 
        label: 'Power Issues', 
        icon: Battery, 
        color: 'text-green-600',
        issues: ['Won\'t charge', 'Battery drain', 'Power button issues', 'Adapter problems', 'Random shutdowns'],
        commonCauses: ['Battery age', 'Charging circuit failure', 'Power adapter issues'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Easy'
      },
      { 
        id: 'performance', 
        label: 'Performance Issues', 
        icon: Zap, 
        color: 'text-purple-600',
        issues: ['Slow startup', 'Overheating', 'Fan noise', 'Blue screen', 'Virus removal', 'Memory issues'],
        commonCauses: ['Software problems', 'Hardware failure', 'Dust buildup'],
        avgRepairTime: '2-6 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'hardware', 
        label: 'Hardware Issues', 
        icon: AlertTriangle, 
        color: 'text-orange-600',
        issues: ['Hard drive failure', 'RAM issues', 'Motherboard problems', 'Ports not working', 'Audio issues'],
        commonCauses: ['Component failure', 'Age', 'Physical damage'],
        avgRepairTime: '3-8 hours',
        difficulty: 'Hard'
      }
    ],
    Tablet: [
      { 
        id: 'screen', 
        label: 'Screen Issues', 
        icon: Tablet, 
        color: 'text-red-600',
        issues: ['Cracked screen', 'Touch not responsive', 'Display lines', 'Screen rotation issues', 'Dead zones'],
        commonCauses: ['Dropped device', 'Pressure damage', 'Manufacturing defect'],
        avgRepairTime: '1-3 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'battery', 
        label: 'Battery Issues', 
        icon: Battery, 
        color: 'text-green-600',
        issues: ['Fast battery drain', 'Not charging', 'Charging port loose', 'Battery swelling', 'Overheating'],
        commonCauses: ['Battery age', 'Charging habits', 'Port damage'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'software', 
        label: 'Software Issues', 
        icon: Wrench, 
        color: 'text-blue-600',
        issues: ['App crashes', 'System freezing', 'Update problems', 'Factory reset needed', 'Performance issues'],
        commonCauses: ['Software bugs', 'Corrupted files', 'Insufficient storage'],
        avgRepairTime: '1-4 hours',
        difficulty: 'Easy'
      },
      { 
        id: 'audio', 
        label: 'Audio/Camera', 
        icon: Camera, 
        color: 'text-purple-600',
        issues: ['No sound', 'Camera not working', 'Microphone issues', 'Speaker problems', 'Video recording issues'],
        commonCauses: ['Hardware failure', 'Software glitch', 'Physical damage'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'other', 
        label: 'Other Issues', 
        icon: AlertTriangle, 
        color: 'text-orange-600',
        issues: ['Water damage', 'Won\'t turn on', 'WiFi issues', 'Bluetooth problems', 'Button not working'],
        commonCauses: ['Various factors', 'Connectivity issues', 'Hardware failure'],
        avgRepairTime: '2-5 hours',
        difficulty: 'Hard'
      }
    ],
    Smartwatch: [
      { 
        id: 'screen', 
        label: 'Display Issues', 
        icon: Watch, 
        color: 'text-red-600',
        issues: ['Cracked screen', 'Screen not turning on', 'Touch not working', 'Display dim', 'Dead pixels'],
        commonCauses: ['Impact damage', 'Water exposure', 'Manufacturing defect'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Hard'
      },
      { 
        id: 'battery', 
        label: 'Battery Problems', 
        icon: Battery, 
        color: 'text-green-600',
        issues: ['Battery drain', 'Not charging', 'Charging dock issues', 'Battery swelling', 'Random shutdowns'],
        commonCauses: ['Battery age', 'Charging dock damage', 'Software issues'],
        avgRepairTime: '1-2 hours',
        difficulty: 'Hard'
      },
      { 
        id: 'sensors', 
        label: 'Sensors/Features', 
        icon: Wrench, 
        color: 'text-blue-600',
        issues: ['Heart rate not working', 'GPS issues', 'Step counter problems', 'Water resistance lost', 'Fitness tracking'],
        commonCauses: ['Sensor failure', 'Software bugs', 'Physical damage'],
        avgRepairTime: '2-3 hours',
        difficulty: 'Hard'
      },
      { 
        id: 'connectivity', 
        label: 'Connectivity Issues', 
        icon: AlertTriangle, 
        color: 'text-purple-600',
        issues: ['Bluetooth issues', 'WiFi problems', 'Phone sync issues', 'App crashes', 'Notification problems'],
        commonCauses: ['Software issues', 'Connectivity problems', 'App conflicts'],
        avgRepairTime: '1-3 hours',
        difficulty: 'Medium'
      },
      { 
        id: 'physical', 
        label: 'Physical Damage', 
        icon: AlertTriangle, 
        color: 'text-orange-600',
        issues: ['Water damage', 'Crown not working', 'Band issues', 'Button problems', 'Case damage'],
        commonCauses: ['Physical impact', 'Water exposure', 'Wear and tear'],
        avgRepairTime: '2-4 hours',
        difficulty: 'Hard'
      }
    ]
  };

  // Enhanced service data with more details
  const enhancedServices = [
    {
      id: '1',
      name: 'Screen Replacement',
      category: 'Display Repair',
      deviceType: selectedDeviceType,
      price: selectedDeviceType === 'iPhone' ? 199 : selectedDeviceType === 'Android' ? 149 : selectedDeviceType === 'Laptop' ? 299 : selectedDeviceType === 'Tablet' ? 179 : 249,
      originalPrice: selectedDeviceType === 'iPhone' ? 249 : selectedDeviceType === 'Android' ? 199 : selectedDeviceType === 'Laptop' ? 399 : selectedDeviceType === 'Tablet' ? 229 : 299,
      estimatedTime: selectedDeviceType === 'Laptop' ? '2-4 hours' : '1-2 hours',
      difficulty: 'Medium',
      isActive: true,
      description: 'Complete screen assembly replacement with high-quality parts. Includes LCD/OLED display and digitizer.',
      warranty: 90,
      features: ['High-quality parts', 'Professional installation', '90-day warranty', 'Quality testing'],
      includes: ['Screen assembly', 'Installation', 'Quality check', 'Warranty'],
      popularity: 95,
      rating: 4.8,
      reviews: 1247
    },
    {
      id: '2',
      name: 'Battery Replacement',
      category: 'Power System',
      deviceType: selectedDeviceType,
      price: selectedDeviceType === 'iPhone' ? 89 : selectedDeviceType === 'Android' ? 79 : selectedDeviceType === 'Laptop' ? 129 : selectedDeviceType === 'Tablet' ? 99 : 119,
      originalPrice: selectedDeviceType === 'iPhone' ? 119 : selectedDeviceType === 'Android' ? 109 : selectedDeviceType === 'Laptop' ? 179 : selectedDeviceType === 'Tablet' ? 139 : 159,
      estimatedTime: selectedDeviceType === 'Laptop' ? '1-2 hours' : '30-60 minutes',
      difficulty: 'Easy',
      isActive: true,
      description: 'Replace worn-out battery with genuine or high-quality compatible battery. Restore your device\'s battery life.',
      warranty: 180,
      features: ['Genuine/OEM quality', 'Fast service', '6-month warranty', 'Battery calibration'],
      includes: ['New battery', 'Installation', 'Battery calibration', 'Disposal of old battery'],
      popularity: 88,
      rating: 4.9,
      reviews: 892
    },
    {
      id: '3',
      name: 'Water Damage Restoration',
      category: 'Liquid Damage',
      deviceType: selectedDeviceType,
      price: selectedDeviceType === 'iPhone' ? 149 : selectedDeviceType === 'Android' ? 129 : selectedDeviceType === 'Laptop' ? 199 : selectedDeviceType === 'Tablet' ? 139 : 169,
      originalPrice: selectedDeviceType === 'iPhone' ? 199 : selectedDeviceType === 'Android' ? 179 : selectedDeviceType === 'Laptop' ? 279 : selectedDeviceType === 'Tablet' ? 189 : 229,
      estimatedTime: '4-8 hours',
      difficulty: 'Hard',
      isActive: true,
      description: 'Complete liquid damage assessment and restoration service. Professional cleaning and component repair.',
      warranty: 30,
      features: ['Ultrasonic cleaning', 'Component inspection', 'Corrosion removal', 'Data recovery attempt'],
      includes: ['Diagnostic', 'Cleaning service', 'Component repair', 'Testing'],
      popularity: 65,
      rating: 4.6,
      reviews: 324
    },
    {
      id: '4',
      name: 'Camera Repair',
      category: 'Camera System',
      deviceType: selectedDeviceType,
      price: selectedDeviceType === 'iPhone' ? 119 : selectedDeviceType === 'Android' ? 99 : selectedDeviceType === 'Laptop' ? 89 : selectedDeviceType === 'Tablet' ? 109 : 139,
      originalPrice: selectedDeviceType === 'iPhone' ? 159 : selectedDeviceType === 'Android' ? 139 : selectedDeviceType === 'Laptop' ? 129 : selectedDeviceType === 'Tablet' ? 149 : 179,
      estimatedTime: '1-3 hours',
      difficulty: 'Medium',
      isActive: true,
      description: 'Fix camera issues including blurry photos, camera not working, flash problems, and lens replacement.',
      warranty: 90,
      features: ['Camera testing', 'Lens replacement', 'Software calibration', 'Quality assurance'],
      includes: ['Camera repair', 'Lens cleaning', 'Software fix', 'Testing'],
      popularity: 72,
      rating: 4.7,
      reviews: 456
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTotalCost = () => {
    let total = selectedService ? selectedService.price : 0;
    if (deliveryMethod === 'delivery') {
      total += 25; // Delivery fee
    }
    if (deviceDetails.urgency === 'urgent') {
      total *= 1.5; // Rush job multiplier
    }
    return total;
  };

  const getStepsForDevice = () => {
    return ['Device Type', 'Issue Category', 'Device Details', 'Service Selection', 'Confirmation'];
  };

  const handleSubmit = () => {
    const serviceRequest = {
      deviceType: selectedDeviceType,
      issueCategory: selectedIssueCategory,
      deviceDetails,
      service: selectedService,
      customerInfo,
      deliveryMethod,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      totalCost: getTotalCost()
    };
    
    console.log('Service request:', serviceRequest);
    alert('Service booking successful! We will contact you shortly.');
    
    // Reset form
    setStep(1);
    setSelectedDeviceType('');
    setSelectedIssueCategory('');
    setSelectedService(null);
    setDeviceDetails({ 
      model: '', 
      imei: '', 
      issueDescription: '', 
      specificIssue: '', 
      urgency: 'normal',
      hasWarranty: false,
      previousRepairs: false,
      purchaseDate: '',
      accessories: []
    });
    setDeliveryMethod('pickup');
    setSelectedDate('');
    setSelectedTime('');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Repair Service</h1>
          <p className="text-gray-600 mt-1">Professional device repair with warranty and quality guarantee</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {getStepsForDevice().map((stepName, index) => (
            <React.Fragment key={index}>
              <span className={`px-3 py-1 rounded-full font-medium ${
                step > index + 1 ? 'bg-green-100 text-green-800' : 
                step === index + 1 ? 'bg-blue-600 text-white' : 
                'bg-gray-100 text-gray-500'
              }`}>
                {step > index + 1 ? <CheckCircle className="w-4 h-4 inline mr-1" /> : `${index + 1}.`} {stepName}
              </span>
              {index < getStepsForDevice().length - 1 && <ArrowRight className="w-4 h-4 text-gray-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        {/* Step 1: Device Type Selection */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Device Type</h2>
              <p className="text-gray-600">Choose the type of device you need repaired</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {deviceTypes.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDeviceType(device.id)}
                    className={`group p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                      selectedDeviceType === device.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-16 h-16 ${device.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{device.label}</h3>
                    <p className="text-sm text-gray-600">{device.description}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!selectedDeviceType}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Issue Category Selection */}
        {step === 2 && selectedDeviceType && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">What's wrong with your {selectedDeviceType}?</h2>
                <p className="text-gray-600">Select the category that best describes your issue</p>
              </div>
              <button onClick={prevStep} className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deviceIssues[selectedDeviceType]?.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedIssueCategory(category.id)}
                    className={`group p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedIssueCategory === category.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
                    </div>
                    <div className="space-y-2 mb-4">
                      {category.issues.slice(0, 3).map((issue, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {issue}
                        </p>
                      ))}
                      {category.issues.length > 3 && (
                        <p className="text-sm text-blue-600 font-medium">+{category.issues.length - 3} more issues</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {category.avgRepairTime}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        category.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        category.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {category.difficulty}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!selectedIssueCategory}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Device Details */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Device Information</h2>
                <p className="text-gray-600">Please provide details about your {selectedDeviceType}</p>
              </div>
              <button onClick={prevStep} className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Device Model *
                  </label>
                  <input
                    type="text"
                    value={deviceDetails.model}
                    onChange={(e) => setDeviceDetails({...deviceDetails, model: e.target.value})}
                    placeholder={`e.g., ${
                      selectedDeviceType === 'iPhone' ? 'iPhone 14 Pro Max' : 
                      selectedDeviceType === 'Android' ? 'Samsung Galaxy S23 Ultra' : 
                      selectedDeviceType === 'Laptop' ? 'MacBook Pro 2023 13"' : 
                      selectedDeviceType === 'Tablet' ? 'iPad Air 5th Gen' : 
                      'Apple Watch Series 8'
                    }`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedDeviceType === 'Laptop' ? 'Serial Number' : 'IMEI/Serial Number'}
                  </label>
                  <input
                    type="text"
                    value={deviceDetails.imei}
                    onChange={(e) => setDeviceDetails({...deviceDetails, imei: e.target.value})}
                    placeholder="Enter IMEI or serial number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={deviceDetails.purchaseDate}
                    onChange={(e) => setDeviceDetails({...deviceDetails, purchaseDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Issue Description *
                  </label>
                  <textarea
                    value={deviceDetails.issueDescription}
                    onChange={(e) => setDeviceDetails({...deviceDetails, issueDescription: e.target.value})}
                    rows={6}
                    placeholder="Please describe the problem in detail. When did it start? What were you doing when it happened? Any error messages or unusual behavior?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={deviceDetails.urgency}
                      onChange={(e) => setDeviceDetails({...deviceDetails, urgency: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="normal">Normal (2-3 days)</option>
                      <option value="urgent">Urgent (+50% fee, same day)</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deviceDetails.hasWarranty}
                        onChange={(e) => setDeviceDetails({...deviceDetails, hasWarranty: e.target.checked})}
                        className="text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Still under warranty</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deviceDetails.previousRepairs}
                        onChange={(e) => setDeviceDetails({...deviceDetails, previousRepairs: e.target.checked})}
                        className="text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Previous repairs</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!deviceDetails.model || !deviceDetails.issueDescription}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Service Selection - ENHANCED UI */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Repair Service</h2>
                <p className="text-gray-600">Choose the repair service that matches your device issue</p>
              </div>
              <button onClick={prevStep} className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back
              </button>
            </div>

            {/* Service Filter/Info Bar */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Showing services for {selectedDeviceType} - {deviceIssues[selectedDeviceType]?.find(cat => cat.id === selectedIssueCategory)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>All services include warranty</span>
                </div>
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enhancedServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedService?.id === service.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Popular Badge */}
                  {service.popularity > 80 && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(service.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {service.rating} ({service.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(service.originalPrice)}
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save {formatPrice(service.originalPrice - service.price)}
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>{service.warranty} days warranty</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        service.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {service.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Quality tested</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">What's included:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.includes.map((item, index) => (
                        <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rush Job Pricing */}
                  {deviceDetails.urgency === 'urgent' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">Rush Job Pricing</span>
                      </div>
                      <div className="text-sm text-orange-700">
                        Same-day service: <span className="font-bold">{formatPrice(service.price * 1.5)}</span>
                        <span className="text-xs ml-1">(+50% rush fee)</span>
                      </div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {selectedService?.id === service.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 fill-current" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Service Comparison */}
            {enhancedServices.length > 1 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Service</th>
                        <th className="text-center py-2">Price</th>
                        <th className="text-center py-2">Time</th>
                        <th className="text-center py-2">Warranty</th>
                        <th className="text-center py-2">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enhancedServices.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="py-2 font-medium">{service.name}</td>
                          <td className="text-center py-2">{formatPrice(service.price)}</td>
                          <td className="text-center py-2">{service.estimatedTime}</td>
                          <td className="text-center py-2">{service.warranty} days</td>
                          <td className="text-center py-2">{service.rating}/5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!selectedService}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Confirm Your Service Booking</h2>
                <p className="text-gray-600">Review your booking details and schedule your appointment</p>
              </div>
              <button onClick={prevStep} className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Service Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Device:</span>
                      <span className="font-medium">{selectedDeviceType} {deviceDetails.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issue Category:</span>
                      <span className="font-medium">
                        {deviceIssues[selectedDeviceType]?.find(cat => cat.id === selectedIssueCategory)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="font-medium">{selectedService?.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-medium">{selectedService?.warranty} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgency:</span>
                      <span className={`font-medium ${deviceDetails.urgency === 'urgent' ? 'text-orange-600' : 'text-green-600'}`}>
                        {deviceDetails.urgency === 'urgent' ? 'Urgent (Same Day)' : 'Normal (2-3 Days)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="font-medium">Bring to store</span>
                          <p className="text-sm text-gray-600">Drop off and pick up at our location</p>
                        </div>
                      </div>
                      <span className="ml-auto text-green-600 font-medium">Free</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="font-medium">Pickup & delivery service</span>
                          <p className="text-sm text-gray-600">We collect and return your device</p>
                        </div>
                      </div>
                      <span className="ml-auto text-blue-600 font-medium">+$25</span>
                    </label>
                  </div>
                </div>

                {/* Schedule */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info & Total */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium">{customerInfo.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium">{customerInfo.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium">{customerInfo.email}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{customerInfo.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base service price:</span>
                      <span className="font-medium">{formatPrice(selectedService?.price || 0)}</span>
                    </div>
                    {deviceDetails.urgency === 'urgent' && (
                      <div className="flex justify-between text-orange-600">
                        <span>Rush fee (50%):</span>
                        <span className="font-medium">+{formatPrice((selectedService?.price || 0) * 0.5)}</span>
                      </div>
                    )}
                    {deliveryMethod === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Pickup & delivery:</span>
                        <span className="font-medium">+{formatPrice(25)}</span>
                      </div>
                    )}
                    <div className="border-t border-blue-200 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">{formatPrice(getTotalCost())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warranty Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Warranty Included</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your repair comes with a {selectedService?.warranty}-day warranty covering parts and labor.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  Confirm Service Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookService;