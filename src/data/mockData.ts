import { Customer, Service, RepairOrder, Technician, Part, Device, Appointment, Invoice } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1-555-0123',
    email: 'john.smith@email.com',
    address: '123 Main Street, New York, NY 10001',
    createdAt: new Date('2024-01-15'),
    totalOrders: 8,
    totalSpent: 2450.00,
    status: 'vip',
    customerType: 'individual',
    notes: 'Preferred customer, always pays on time',
    tags: ['VIP', 'Repeat Customer'],
    communicationPreference: 'email',
    referralSource: 'Google Search',
    loyaltyPoints: 245,
    lastVisit: new Date('2024-11-20')
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1-555-0124',
    email: 'sarah.johnson@email.com',
    address: '456 Oak Avenue, Los Angeles, CA 90210',
    createdAt: new Date('2024-02-20'),
    totalOrders: 3,
    totalSpent: 890.00,
    status: 'active',
    customerType: 'individual',
    notes: 'Prefers text message updates',
    tags: ['Student Discount'],
    communicationPreference: 'sms',
    referralSource: 'Friend Referral',
    loyaltyPoints: 89,
    lastVisit: new Date('2024-11-15')
  },
  {
    id: '3',
    name: 'TechCorp Solutions',
    phone: '+1-555-0125',
    email: 'procurement@techcorp.com',
    address: '789 Business Blvd, Chicago, IL 60601',
    createdAt: new Date('2024-03-10'),
    totalOrders: 15,
    totalSpent: 12500.00,
    status: 'vip',
    customerType: 'business',
    companyName: 'TechCorp Solutions Inc.',
    taxId: 'TC123456789',
    notes: 'Corporate account with volume discount',
    tags: ['Corporate', 'Volume Discount', 'Priority'],
    communicationPreference: 'email',
    referralSource: 'Business Directory',
    loyaltyPoints: 1250,
    lastVisit: new Date('2024-12-01')
  }
];

export const mockDevices: Device[] = [
  {
    id: '1',
    customerId: '1',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    type: 'smartphone',
    serialNumber: 'F2LLD0XHQD',
    imei: '123456789012345',
    color: 'Deep Purple',
    storageCapacity: '256GB',
    purchaseDate: new Date('2023-09-16'),
    warrantyExpiry: new Date('2024-09-16'),
    condition: 'good',
    accessories: ['Lightning Cable', 'Case', 'Screen Protector'],
    previousRepairs: ['Screen Replacement (2024-06-15)'],
    notes: 'Customer very careful with device'
  },
  {
    id: '2',
    customerId: '2',
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    type: 'smartphone',
    serialNumber: 'R58NC0ABCDE',
    imei: '987654321098765',
    color: 'Phantom Black',
    storageCapacity: '512GB',
    purchaseDate: new Date('2023-02-17'),
    condition: 'excellent',
    accessories: ['S Pen', 'Wireless Charger', 'Case'],
    previousRepairs: [],
    notes: 'Still under manufacturer warranty'
  }
];

export const mockParts: Part[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max Screen Assembly',
    sku: 'IP14PM-SCR-001',
    category: 'Display',
    compatibleDevices: ['iPhone 14 Pro Max'],
    cost: 180.00,
    sellingPrice: 280.00,
    stockQuantity: 15,
    minStockLevel: 5,
    supplier: 'Premium Parts Co.',
    supplierPartNumber: 'PPC-IP14PM-OLED',
    location: 'Shelf A-3',
    condition: 'new',
    warranty: 90,
    notes: 'High quality OLED replacement'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra Battery',
    sku: 'SGS23U-BAT-001',
    category: 'Battery',
    compatibleDevices: ['Galaxy S23 Ultra'],
    cost: 45.00,
    sellingPrice: 85.00,
    stockQuantity: 8,
    minStockLevel: 3,
    supplier: 'Mobile Parts Direct',
    supplierPartNumber: 'MPD-S23U-5000',
    location: 'Shelf B-1',
    condition: 'new',
    warranty: 180,
    notes: '5000mAh capacity'
  },
  {
    id: '3',
    name: 'MacBook Pro 13" 2023 Keyboard',
    sku: 'MBP13-KB-001',
    category: 'Input Device',
    compatibleDevices: ['MacBook Pro 13" 2023'],
    cost: 120.00,
    sellingPrice: 200.00,
    stockQuantity: 3,
    minStockLevel: 2,
    supplier: 'Apple Authorized Parts',
    supplierPartNumber: 'AAP-MBP13-KB-US',
    location: 'Shelf C-2',
    condition: 'new',
    warranty: 365,
    notes: 'US layout, backlit'
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Screen Replacement',
    category: 'Display Repair',
    deviceTypes: ['smartphone', 'tablet'],
    basePrice: 150.00,
    laborCost: 50.00,
    estimatedTime: 120, // 2 hours
    difficulty: 'medium',
    isActive: true,
    description: 'Complete screen assembly replacement including LCD/OLED and digitizer',
    warranty: 90,
    requiredParts: [],
    skillsRequired: ['Micro Soldering', 'Component Replacement'],
    instructions: 'Follow standard screen replacement procedure. Test touch and display functionality.',
    videoUrl: 'https://example.com/screen-replacement-guide',
    popularity: 95
  },
  {
    id: '2',
    name: 'Battery Replacement',
    category: 'Power System',
    deviceTypes: ['smartphone', 'tablet', 'laptop'],
    basePrice: 80.00,
    laborCost: 30.00,
    estimatedTime: 60, // 1 hour
    difficulty: 'easy',
    isActive: true,
    description: 'Replace worn-out battery with genuine or high-quality compatible battery',
    warranty: 180,
    requiredParts: [],
    skillsRequired: ['Basic Repair'],
    instructions: 'Discharge battery to 25% before replacement. Calibrate after installation.',
    popularity: 88
  },
  {
    id: '3',
    name: 'Water Damage Restoration',
    category: 'Liquid Damage',
    deviceTypes: ['smartphone', 'tablet', 'laptop'],
    basePrice: 120.00,
    laborCost: 80.00,
    estimatedTime: 240, // 4 hours
    difficulty: 'hard',
    isActive: true,
    description: 'Complete liquid damage assessment and restoration service',
    warranty: 30,
    requiredParts: [],
    skillsRequired: ['Micro Soldering', 'Board Level Repair', 'Ultrasonic Cleaning'],
    instructions: 'Immediate disassembly required. Clean with isopropyl alcohol and ultrasonic bath.',
    popularity: 65
  },
  {
    id: '4',
    name: 'Motherboard Repair',
    category: 'Logic Board',
    deviceTypes: ['smartphone', 'tablet', 'laptop'],
    basePrice: 200.00,
    laborCost: 150.00,
    estimatedTime: 480, // 8 hours
    difficulty: 'expert',
    isActive: true,
    description: 'Advanced motherboard component-level repair and reballing',
    warranty: 60,
    requiredParts: [],
    skillsRequired: ['Micro Soldering', 'BGA Reballing', 'Component Level Repair'],
    instructions: 'Requires advanced diagnostic equipment. Document all findings.',
    popularity: 25
  }
];

export const mockRepairOrders: RepairOrder[] = [
  {
    id: 'RO-2024-001',
    customerId: '1',
    customerName: 'John Smith',
    customerPhone: '+1-555-0123',
    customerEmail: 'john.smith@email.com',
    deviceId: '1',
    deviceInfo: {
      brand: 'Apple',
      model: 'iPhone 14 Pro Max',
      type: 'smartphone',
      serialNumber: 'F2LLD0XHQD',
      imei: '123456789012345',
      color: 'Deep Purple',
      condition: 'good',
      accessories: ['Lightning Cable', 'Case'],
      passcode: '****',
      backupStatus: 'completed'
    },
    issueDescription: 'Cracked screen, touch not responding in bottom right corner',
    diagnosticNotes: 'LCD intact, digitizer damaged. No internal damage visible.',
    services: [
      {
        serviceId: '1',
        serviceName: 'Screen Replacement',
        price: 280.00,
        estimatedTime: 120,
        status: 'completed'
      }
    ],
    partsUsed: [
      {
        partId: '1',
        partName: 'iPhone 14 Pro Max Screen Assembly',
        quantity: 1,
        cost: 180.00,
        sellingPrice: 280.00
      }
    ],
    assignedTechnician: 'David Wilson',
    technicianNotes: [
      'Screen replacement completed successfully',
      'All functions tested and working',
      'Applied new screen protector'
    ],
    status: 'completed',
    priority: 'normal',
    createdAt: new Date('2024-12-01T09:00:00'),
    updatedAt: new Date('2024-12-01T14:30:00'),
    estimatedCompletion: new Date('2024-12-01T16:00:00'),
    actualCompletion: new Date('2024-12-01T14:30:00'),
    quotedPrice: 330.00,
    finalPrice: 330.00,
    depositPaid: 100.00,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    deliveryMethod: 'pickup',
    deliveryFee: 0,
    warrantyPeriod: 90,
    warrantyExpiry: new Date('2025-03-01'),
    photos: ['before_repair.jpg', 'after_repair.jpg'],
    documents: ['repair_invoice.pdf'],
    customerSignature: 'signed_digitally',
    qualityCheckPassed: true,
    customerSatisfaction: 5,
    feedback: 'Excellent service, very professional',
    internalNotes: 'Customer very satisfied, potential for future business',
    tags: ['Screen Repair', 'iPhone', 'Completed']
  },
  {
    id: 'RO-2024-002',
    customerId: '2',
    customerName: 'Sarah Johnson',
    customerPhone: '+1-555-0124',
    customerEmail: 'sarah.johnson@email.com',
    deviceId: '2',
    deviceInfo: {
      brand: 'Samsung',
      model: 'Galaxy S23 Ultra',
      type: 'smartphone',
      serialNumber: 'R58NC0ABCDE',
      imei: '987654321098765',
      color: 'Phantom Black',
      condition: 'excellent',
      accessories: ['S Pen', 'Case'],
      backupStatus: 'declined'
    },
    issueDescription: 'Battery drains very quickly, phone gets hot during charging',
    diagnosticNotes: 'Battery health at 68%, showing signs of degradation. No other issues found.',
    services: [
      {
        serviceId: '2',
        serviceName: 'Battery Replacement',
        price: 110.00,
        estimatedTime: 60,
        status: 'in_progress'
      }
    ],
    partsUsed: [
      {
        partId: '2',
        partName: 'Samsung Galaxy S23 Ultra Battery',
        quantity: 1,
        cost: 45.00,
        sellingPrice: 85.00
      }
    ],
    assignedTechnician: 'Michael Chen',
    technicianNotes: [
      'Battery replacement in progress',
      'Old battery safely disposed'
    ],
    status: 'in_progress',
    priority: 'normal',
    createdAt: new Date('2024-12-02T10:30:00'),
    updatedAt: new Date('2024-12-02T11:45:00'),
    estimatedCompletion: new Date('2024-12-02T15:00:00'),
    quotedPrice: 135.00,
    finalPrice: 135.00,
    depositPaid: 50.00,
    paymentStatus: 'partial',
    deliveryMethod: 'pickup',
    deliveryFee: 0,
    warrantyPeriod: 180,
    photos: ['diagnostic_report.jpg'],
    documents: [],
    qualityCheckPassed: false,
    internalNotes: 'Customer prefers text updates',
    tags: ['Battery', 'Samsung', 'In Progress']
  }
];

export const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'David Wilson',
    email: 'david.wilson@repairshop.com',
    phone: '+1-555-0201',
    employeeId: 'EMP001',
    role: 'senior_technician',
    specialties: ['iPhone Repair', 'iPad Repair', 'MacBook Repair'],
    certifications: ['Apple Certified Technician', 'IPC Soldering Certification'],
    skillLevel: 9,
    hourlyRate: 35.00,
    currentWorkload: 3,
    maxWorkload: 5,
    status: 'busy',
    rating: 4.9,
    totalRepairs: 1247,
    successRate: 98.5,
    avgRepairTime: 145, // minutes
    hireDate: new Date('2022-03-15'),
    lastActive: new Date('2024-12-02T11:30:00'),
    workSchedule: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: { start: '09:00', end: '15:00' },
      sunday: { start: '00:00', end: '00:00' }
    },
    permissions: ['repair_devices', 'update_orders', 'access_parts']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@repairshop.com',
    phone: '+1-555-0202',
    employeeId: 'EMP002',
    role: 'technician',
    specialties: ['Android Repair', 'Samsung Repair', 'Google Pixel Repair'],
    certifications: ['Samsung Certified Technician'],
    skillLevel: 7,
    hourlyRate: 28.00,
    currentWorkload: 2,
    maxWorkload: 4,
    status: 'available',
    rating: 4.7,
    totalRepairs: 856,
    successRate: 96.8,
    avgRepairTime: 165,
    hireDate: new Date('2023-01-20'),
    lastActive: new Date('2024-12-02T12:00:00'),
    workSchedule: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '00:00', end: '00:00' },
      sunday: { start: '00:00', end: '00:00' }
    },
    permissions: ['repair_devices', 'update_orders']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@repairshop.com',
    phone: '+1-555-0203',
    employeeId: 'EMP003',
    role: 'specialist',
    specialties: ['Laptop Repair', 'Gaming Console Repair', 'Data Recovery'],
    certifications: ['CompTIA A+', 'Data Recovery Specialist'],
    skillLevel: 8,
    hourlyRate: 32.00,
    currentWorkload: 1,
    maxWorkload: 3,
    status: 'available',
    rating: 4.8,
    totalRepairs: 634,
    successRate: 97.2,
    avgRepairTime: 285,
    hireDate: new Date('2023-06-10'),
    lastActive: new Date('2024-12-02T10:15:00'),
    workSchedule: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { start: '00:00', end: '00:00' }
    },
    permissions: ['repair_devices', 'update_orders', 'access_parts', 'data_recovery']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Smith',
    customerPhone: '+1-555-0123',
    appointmentType: 'diagnostic',
    scheduledDate: new Date('2024-12-03T14:00:00'),
    duration: 30,
    assignedTechnician: 'David Wilson',
    status: 'confirmed',
    notes: 'Customer reports intermittent charging issues',
    reminderSent: true,
    createdAt: new Date('2024-12-01T09:00:00')
  },
  {
    id: '2',
    customerId: '3',
    customerName: 'TechCorp Solutions',
    customerPhone: '+1-555-0125',
    appointmentType: 'pickup',
    scheduledDate: new Date('2024-12-03T16:00:00'),
    duration: 15,
    status: 'scheduled',
    notes: 'Bulk pickup of 5 laptops for repair',
    reminderSent: false,
    createdAt: new Date('2024-12-02T11:30:00')
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    orderId: 'RO-2024-001',
    customerId: '1',
    invoiceNumber: 'INV-2024-001',
    issueDate: new Date('2024-12-01'),
    dueDate: new Date('2024-12-15'),
    items: [
      {
        description: 'iPhone 14 Pro Max Screen Replacement',
        quantity: 1,
        unitPrice: 280.00,
        total: 280.00
      },
      {
        description: 'Labor - Screen Installation',
        quantity: 1,
        unitPrice: 50.00,
        total: 50.00
      }
    ],
    subtotal: 330.00,
    taxRate: 8.25,
    taxAmount: 27.23,
    discountAmount: 0,
    totalAmount: 357.23,
    paidAmount: 357.23,
    balanceAmount: 0,
    paymentStatus: 'paid',
    paymentTerms: 'Due upon completion',
    notes: 'Thank you for your business!'
  }
];