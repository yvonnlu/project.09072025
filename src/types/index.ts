export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip' | 'blacklisted';
  customerType: 'individual' | 'business';
  taxId?: string;
  companyName?: string;
  notes: string;
  tags: string[];
  communicationPreference: 'email' | 'sms' | 'phone' | 'whatsapp';
  referralSource?: string;
  loyaltyPoints: number;
  lastVisit?: Date;
}

export interface Device {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  type: 'smartphone' | 'tablet' | 'laptop' | 'desktop' | 'smartwatch' | 'gaming_console' | 'other';
  serialNumber?: string;
  imei?: string;
  color?: string;
  storageCapacity?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  accessories: string[];
  previousRepairs: string[];
  notes: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  deviceTypes: string[];
  basePrice: number;
  laborCost: number;
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  isActive: boolean;
  description: string;
  warranty: number; // in days
  requiredParts: Part[];
  skillsRequired: string[];
  instructions: string;
  videoUrl?: string;
  popularity: number;
}

export interface Part {
  id: string;
  name: string;
  sku: string;
  category: string;
  compatibleDevices: string[];
  cost: number;
  sellingPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  supplier: string;
  supplierPartNumber?: string;
  location: string;
  condition: 'new' | 'refurbished' | 'used';
  warranty: number; // in days
  notes: string;
}

export interface RepairOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceId: string;
  deviceInfo: {
    brand: string;
    model: string;
    type: string;
    serialNumber?: string;
    imei?: string;
    color?: string;
    condition: string;
    accessories: string[];
    passcode?: string;
    backupStatus: 'completed' | 'declined' | 'not_applicable';
  };
  issueDescription: string;
  diagnosticNotes: string;
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
    estimatedTime: number;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  }[];
  partsUsed: {
    partId: string;
    partName: string;
    quantity: number;
    cost: number;
    sellingPrice: number;
  }[];
  assignedTechnician?: string;
  technicianNotes: string[];
  status: 'quote_pending' | 'approved' | 'in_progress' | 'awaiting_parts' | 'quality_check' | 'completed' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  estimatedCompletion: Date;
  actualCompletion?: Date;
  quotedPrice: number;
  finalPrice: number;
  depositPaid: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  paymentMethod?: string;
  deliveryMethod: 'pickup' | 'delivery' | 'shipping';
  deliveryAddress?: string;
  deliveryFee: number;
  warrantyPeriod: number; // in days
  warrantyExpiry?: Date;
  photos: string[];
  documents: string[];
  customerSignature?: string;
  qualityCheckPassed: boolean;
  customerSatisfaction?: number;
  feedback?: string;
  internalNotes: string;
  tags: string[];
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  role: 'technician' | 'senior_technician' | 'specialist' | 'manager';
  specialties: string[];
  certifications: string[];
  skillLevel: number; // 1-10
  hourlyRate: number;
  currentWorkload: number;
  maxWorkload: number;
  status: 'available' | 'busy' | 'break' | 'offline' | 'vacation';
  rating: number;
  totalRepairs: number;
  successRate: number;
  avgRepairTime: number;
  hireDate: Date;
  lastActive: Date;
  workSchedule: {
    monday: { start: string; end: string; };
    tuesday: { start: string; end: string; };
    wednesday: { start: string; end: string; };
    thursday: { start: string; end: string; };
    friday: { start: string; end: string; };
    saturday: { start: string; end: string; };
    sunday: { start: string; end: string; };
  };
  permissions: string[];
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  appointmentType: 'diagnostic' | 'repair' | 'pickup' | 'delivery' | 'consultation';
  scheduledDate: Date;
  duration: number; // in minutes
  assignedTechnician?: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes: string;
  reminderSent: boolean;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  orderId: string;
  customerId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  paymentTerms: string;
  notes: string;
}

export interface Warranty {
  id: string;
  orderId: string;
  customerId: string;
  deviceId: string;
  services: string[];
  parts: string[];
  startDate: Date;
  endDate: Date;
  terms: string;
  status: 'active' | 'expired' | 'voided';
  claimsUsed: number;
  maxClaims: number;
}

export interface Notification {
  id: string;
  type: 'order_update' | 'appointment_reminder' | 'payment_due' | 'warranty_expiry' | 'low_stock' | 'system';
  title: string;
  message: string;
  recipient: string;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  scheduledAt?: Date;
  sentAt?: Date;
  createdAt: Date;
}

export interface Report {
  id: string;
  name: string;
  type: 'revenue' | 'orders' | 'technician_performance' | 'customer_satisfaction' | 'inventory' | 'custom';
  parameters: Record<string, any>;
  generatedAt: Date;
  generatedBy: string;
  data: any;
}

export interface Settings {
  businessInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    taxId: string;
    logo: string;
  };
  operatingHours: {
    monday: { open: string; close: string; isOpen: boolean; };
    tuesday: { open: string; close: string; isOpen: boolean; };
    wednesday: { open: string; close: string; isOpen: boolean; };
    thursday: { open: string; close: string; isOpen: boolean; };
    friday: { open: string; close: string; isOpen: boolean; };
    saturday: { open: string; close: string; isOpen: boolean; };
    sunday: { open: string; close: string; isOpen: boolean; };
  };
  pricing: {
    diagnosticFee: number;
    rushJobMultiplier: number;
    deliveryFee: number;
    cancellationFee: number;
    defaultTaxRate: number;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    appointmentReminders: boolean;
    orderUpdates: boolean;
    paymentReminders: boolean;
  };
  integrations: {
    paymentGateway: string;
    smsProvider: string;
    emailProvider: string;
    accountingSystem: string;
  };
  security: {
    requireTwoFactor: boolean;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSymbols: boolean;
    };
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'technician' | 'receptionist' | 'customer';
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  avatar?: string;
  phone?: string;
  twoFactorEnabled: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, { old: any; new: any; }>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}