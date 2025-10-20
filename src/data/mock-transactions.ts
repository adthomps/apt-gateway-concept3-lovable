import { CardIntelligence, EnhancedData } from '@/types/card-intelligence';
import { mockCardIntelligence, mockEnhancedData } from './mock-card-intelligence';

export interface Transaction {
  id: string;
  amount: string;
  amountValue: number;
  status: 'settled' | 'pending' | 'failed' | 'refunded' | 'disputed';
  customer: string;
  customerId: string;
  customerEmail: string;
  time: string;
  timestamp: Date;
  paymentMethod: string;
  gateway: string;
  currency: string;
  fee: string;
  net: string;
  description?: string;
  riskScore?: number;
  cardIntelligence?: CardIntelligence;
  enhancedData?: EnhancedData;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    amount: '$245.00',
    amountValue: 245.00,
    status: 'settled',
    customer: 'Acme Corporation',
    customerId: 'CUST-12345',
    customerEmail: 'billing@acme.corp',
    time: '2 min ago',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    paymentMethod: 'Visa •••• 4532',
    gateway: 'Stripe',
    currency: 'USD',
    fee: '$7.35',
    net: '$237.65',
    description: 'Professional Services - March 2024',
    riskScore: 12,
    cardIntelligence: mockCardIntelligence['TXN-001'],
    enhancedData: mockEnhancedData['TXN-001']
  },
  {
    id: 'TXN-002',
    amount: '$89.99',
    amountValue: 89.99,
    status: 'pending',
    customer: 'Tech Solutions Inc',
    customerId: 'CUST-67890',
    customerEmail: 'payments@techsolutions.io',
    time: '5 min ago',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    paymentMethod: 'Mastercard •••• 8765',
    gateway: 'Authorize.net',
    currency: 'USD',
    fee: '$2.70',
    net: '$87.29',
    description: 'Monthly Subscription',
    riskScore: 8,
    cardIntelligence: mockCardIntelligence['TXN-002'],
    enhancedData: mockEnhancedData['TXN-002']
  },
  {
    id: 'TXN-003',
    amount: '$1,250.00',
    amountValue: 1250.00,
    status: 'settled',
    customer: 'Global Enterprises',
    customerId: 'CUST-11223',
    customerEmail: 'ap@globalent.com',
    time: '12 min ago',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    paymentMethod: 'Visa •••• 9876',
    gateway: 'Braintree',
    currency: 'USD',
    fee: '$37.50',
    net: '$1,212.50',
    description: 'Bulk Order - Invoice #2024-0315',
    riskScore: 5,
    cardIntelligence: mockCardIntelligence['TXN-003']
  },
  {
    id: 'TXN-004',
    amount: '$67.50',
    amountValue: 67.50,
    status: 'failed',
    customer: 'Startup Labs',
    customerId: 'CUST-44556',
    customerEmail: 'finance@startuplabs.com',
    time: '18 min ago',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    paymentMethod: 'Visa •••• 1234',
    gateway: 'Stripe',
    currency: 'USD',
    fee: '$0.00',
    net: '$0.00',
    description: 'Service Fee',
    riskScore: 34,
    cardIntelligence: mockCardIntelligence['TXN-004']
  },
  {
    id: 'TXN-005',
    amount: '$399.99',
    amountValue: 399.99,
    status: 'settled',
    customer: 'Digital Marketing Pro',
    customerId: 'CUST-77889',
    customerEmail: 'billing@digitalmarketingpro.com',
    time: '25 min ago',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    paymentMethod: 'ACH •••• 6789',
    gateway: 'Plaid',
    currency: 'USD',
    fee: '$4.00',
    net: '$395.99',
    description: 'Annual License Renewal',
    riskScore: 3
  },
  {
    id: 'TXN-006',
    amount: '$2,800.00',
    amountValue: 2800.00,
    status: 'settled',
    customer: 'Enterprise Solutions Ltd',
    customerId: 'CORP-555',
    customerEmail: 'procurement@entsolutions.com',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    paymentMethod: 'Amex •••• 5678',
    gateway: 'Stripe',
    currency: 'USD',
    fee: '$84.00',
    net: '$2,716.00',
    description: 'Enterprise Software Suite',
    riskScore: 7,
    cardIntelligence: mockCardIntelligence['TXN-006'],
    enhancedData: mockEnhancedData['TXN-006']
  },
  {
    id: 'TXN-007',
    amount: '$156.75',
    amountValue: 156.75,
    status: 'refunded',
    customer: 'Small Biz Co',
    customerId: 'CUST-99887',
    customerEmail: 'owner@smallbizco.com',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    paymentMethod: 'Mastercard •••• 3456',
    gateway: 'Square',
    currency: 'USD',
    fee: '-$4.70',
    net: '$0.00',
    description: 'Product Return',
    riskScore: 15
  },
  {
    id: 'TXN-008',
    amount: '$89.00',
    amountValue: 89.00,
    status: 'disputed',
    customer: 'Disputed Customer',
    customerId: 'CUST-11999',
    customerEmail: 'dispute@example.com',
    time: '3 hours ago',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    paymentMethod: 'Visa •••• 7890',
    gateway: 'Stripe',
    currency: 'USD',
    fee: '$2.67',
    net: '$86.33',
    description: 'Disputed Charge',
    riskScore: 52
  },
  {
    id: 'TXN-009',
    amount: '$549.99',
    amountValue: 549.99,
    status: 'settled',
    customer: 'E-commerce Store',
    customerId: 'CUST-22334',
    customerEmail: 'orders@ecomstore.com',
    time: '4 hours ago',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    paymentMethod: 'Discover •••• 5432',
    gateway: 'Authorize.net',
    currency: 'USD',
    fee: '$16.50',
    net: '$533.49',
    description: 'Online Purchase',
    riskScore: 11
  },
  {
    id: 'TXN-010',
    amount: '$1,999.00',
    amountValue: 1999.00,
    status: 'pending',
    customer: 'Premium Client',
    customerId: 'CUST-55667',
    customerEmail: 'accounts@premiumclient.com',
    time: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    paymentMethod: 'Wire Transfer',
    gateway: 'Manual',
    currency: 'USD',
    fee: '$25.00',
    net: '$1,974.00',
    description: 'Large Invoice Payment',
    riskScore: 4
  }
];
