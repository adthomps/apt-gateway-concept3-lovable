export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  lifetimeValue: number;
  totalTransactions: number;
  joinedDate: Date;
  lastActivity: Date;
  paymentMethods: number;
  subscriptions: number;
  riskLevel: 'low' | 'medium' | 'high';
  phone?: string;
  company?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  metadata?: Record<string, any>;
}

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-12345',
    name: 'Acme Corporation',
    email: 'billing@acme.corp',
    status: 'active',
    lifetimeValue: 45789.50,
    totalTransactions: 127,
    joinedDate: new Date('2023-01-15'),
    lastActivity: new Date(Date.now() - 2 * 60 * 1000),
    paymentMethods: 3,
    subscriptions: 2,
    riskLevel: 'low',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    address: {
      line1: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'US'
    }
  },
  {
    id: 'CUST-67890',
    name: 'Tech Solutions Inc',
    email: 'payments@techsolutions.io',
    status: 'active',
    lifetimeValue: 12456.99,
    totalTransactions: 43,
    joinedDate: new Date('2023-06-22'),
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    paymentMethods: 2,
    subscriptions: 1,
    riskLevel: 'low',
    phone: '+1 (555) 234-5678',
    company: 'Tech Solutions Inc',
    address: {
      line1: '456 Tech Blvd',
      line2: 'Suite 200',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'US'
    }
  },
  {
    id: 'CUST-11223',
    name: 'Global Enterprises',
    email: 'ap@globalent.com',
    status: 'active',
    lifetimeValue: 89234.75,
    totalTransactions: 234,
    joinedDate: new Date('2022-09-10'),
    lastActivity: new Date(Date.now() - 12 * 60 * 1000),
    paymentMethods: 5,
    subscriptions: 4,
    riskLevel: 'low',
    phone: '+1 (555) 345-6789',
    company: 'Global Enterprises',
    address: {
      line1: '789 Corporate Dr',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US'
    }
  },
  {
    id: 'CUST-44556',
    name: 'Startup Labs',
    email: 'finance@startuplabs.com',
    status: 'active',
    lifetimeValue: 5678.25,
    totalTransactions: 18,
    joinedDate: new Date('2024-02-01'),
    lastActivity: new Date(Date.now() - 18 * 60 * 1000),
    paymentMethods: 1,
    subscriptions: 1,
    riskLevel: 'medium',
    phone: '+1 (555) 456-7890',
    company: 'Startup Labs',
    address: {
      line1: '321 Innovation Way',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'US'
    }
  },
  {
    id: 'CUST-77889',
    name: 'Digital Marketing Pro',
    email: 'billing@digitalmarketingpro.com',
    status: 'active',
    lifetimeValue: 23456.80,
    totalTransactions: 67,
    joinedDate: new Date('2023-03-20'),
    lastActivity: new Date(Date.now() - 25 * 60 * 1000),
    paymentMethods: 2,
    subscriptions: 2,
    riskLevel: 'low',
    phone: '+1 (555) 567-8901',
    company: 'Digital Marketing Pro'
  },
  {
    id: 'CORP-555',
    name: 'Enterprise Solutions Ltd',
    email: 'procurement@entsolutions.com',
    status: 'active',
    lifetimeValue: 156789.00,
    totalTransactions: 389,
    joinedDate: new Date('2021-11-05'),
    lastActivity: new Date(Date.now() - 60 * 60 * 1000),
    paymentMethods: 8,
    subscriptions: 6,
    riskLevel: 'low',
    phone: '+1 (555) 678-9012',
    company: 'Enterprise Solutions Ltd',
    address: {
      line1: '1000 Enterprise Pkwy',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'US'
    }
  },
  {
    id: 'CUST-99887',
    name: 'Small Biz Co',
    email: 'owner@smallbizco.com',
    status: 'active',
    lifetimeValue: 3456.50,
    totalTransactions: 12,
    joinedDate: new Date('2024-01-10'),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    paymentMethods: 1,
    subscriptions: 0,
    riskLevel: 'low',
    phone: '+1 (555) 789-0123'
  },
  {
    id: 'CUST-11999',
    name: 'Disputed Customer',
    email: 'dispute@example.com',
    status: 'suspended',
    lifetimeValue: 1234.00,
    totalTransactions: 8,
    joinedDate: new Date('2023-12-01'),
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
    paymentMethods: 1,
    subscriptions: 0,
    riskLevel: 'high',
    phone: '+1 (555) 890-1234'
  },
  {
    id: 'CUST-22334',
    name: 'E-commerce Store',
    email: 'orders@ecomstore.com',
    status: 'active',
    lifetimeValue: 34567.90,
    totalTransactions: 156,
    joinedDate: new Date('2023-05-15'),
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
    paymentMethods: 3,
    subscriptions: 1,
    riskLevel: 'low',
    phone: '+1 (555) 901-2345',
    company: 'E-commerce Store'
  },
  {
    id: 'CUST-55667',
    name: 'Premium Client',
    email: 'accounts@premiumclient.com',
    status: 'active',
    lifetimeValue: 78900.00,
    totalTransactions: 98,
    joinedDate: new Date('2022-07-30'),
    lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
    paymentMethods: 4,
    subscriptions: 3,
    riskLevel: 'low',
    phone: '+1 (555) 012-3456',
    company: 'Premium Client'
  }
];
