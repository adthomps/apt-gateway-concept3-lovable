export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'paused';
  planName: string;
  planId: string;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'quarterly';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
  startDate: Date;
  canceledAt?: Date;
  trialEnd?: Date;
  billingCycles: number;
  totalRevenue: number;
  paymentMethod: string;
  cancelAtPeriodEnd: boolean;
}

export const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB-001',
    customerId: 'CUST-12345',
    customerName: 'Acme Corporation',
    customerEmail: 'billing@acme.corp',
    status: 'active',
    planName: 'Professional Plan',
    planId: 'PLAN-PRO',
    amount: 199.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    startDate: new Date('2023-01-15'),
    billingCycles: 14,
    totalRevenue: 2786.00,
    paymentMethod: 'Visa •••• 4532',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-002',
    customerId: 'CUST-67890',
    customerName: 'Tech Solutions Inc',
    customerEmail: 'payments@techsolutions.io',
    status: 'active',
    planName: 'Enterprise Plan',
    planId: 'PLAN-ENT',
    amount: 499.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    startDate: new Date('2023-06-22'),
    billingCycles: 9,
    totalRevenue: 4491.00,
    paymentMethod: 'Mastercard •••• 8765',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-003',
    customerId: 'CUST-11223',
    customerName: 'Global Enterprises',
    customerEmail: 'ap@globalent.com',
    status: 'active',
    planName: 'Business Plan',
    planId: 'PLAN-BUS',
    amount: 299.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    startDate: new Date('2022-09-10'),
    billingCycles: 18,
    totalRevenue: 5382.00,
    paymentMethod: 'ACH •••• 6789',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-004',
    customerId: 'CUST-44556',
    customerName: 'Startup Labs',
    customerEmail: 'finance@startuplabs.com',
    status: 'trialing',
    planName: 'Starter Plan',
    planId: 'PLAN-START',
    amount: 49.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    startDate: new Date('2024-02-01'),
    trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    billingCycles: 0,
    totalRevenue: 0,
    paymentMethod: 'Visa •••• 1234',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-005',
    customerId: 'CUST-77889',
    customerName: 'Digital Marketing Pro',
    customerEmail: 'billing@digitalmarketingpro.com',
    status: 'past_due',
    planName: 'Professional Plan',
    planId: 'PLAN-PRO',
    amount: 199.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    startDate: new Date('2023-03-20'),
    billingCycles: 12,
    totalRevenue: 2388.00,
    paymentMethod: 'Visa •••• 7890',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-006',
    customerId: 'CORP-555',
    customerName: 'Enterprise Solutions Ltd',
    customerEmail: 'procurement@entsolutions.com',
    status: 'active',
    planName: 'Premium Enterprise',
    planId: 'PLAN-PREM',
    amount: 999.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    startDate: new Date('2021-11-05'),
    billingCycles: 28,
    totalRevenue: 27972.00,
    paymentMethod: 'Amex •••• 5678',
    cancelAtPeriodEnd: false
  },
  {
    id: 'SUB-007',
    customerId: 'CUST-22334',
    customerName: 'E-commerce Store',
    customerEmail: 'orders@ecomstore.com',
    status: 'canceled',
    planName: 'Business Plan',
    planId: 'PLAN-BUS',
    amount: 299.00,
    currency: 'USD',
    interval: 'monthly',
    currentPeriodStart: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    startDate: new Date('2023-05-15'),
    canceledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    billingCycles: 10,
    totalRevenue: 2990.00,
    paymentMethod: 'Mastercard •••• 3456',
    cancelAtPeriodEnd: true
  },
  {
    id: 'SUB-008',
    customerId: 'CUST-55667',
    customerName: 'Premium Client',
    customerEmail: 'accounts@premiumclient.com',
    status: 'active',
    planName: 'Annual Professional',
    planId: 'PLAN-PRO-YEAR',
    amount: 1990.00,
    currency: 'USD',
    interval: 'yearly',
    currentPeriodStart: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    currentPeriodEnd: new Date(Date.now() + 245 * 24 * 60 * 60 * 1000),
    nextBillingDate: new Date(Date.now() + 245 * 24 * 60 * 60 * 1000),
    startDate: new Date('2022-07-30'),
    billingCycles: 2,
    totalRevenue: 3980.00,
    paymentMethod: 'ACH •••• 9876',
    cancelAtPeriodEnd: false
  }
];
