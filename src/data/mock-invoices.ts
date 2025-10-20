export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxable: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void' | 'partially_paid';
  amount: number;
  currency: string;
  dueDate: Date;
  issueDate: Date;
  paidDate?: Date;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  paymentTerms: 'due_on_receipt' | 'net_15' | 'net_30' | 'net_60';
  memo?: string;
  notes?: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-0001',
    customerId: 'CUST-12345',
    customerName: 'Acme Corporation',
    customerEmail: 'billing@acme.corp',
    status: 'paid',
    amount: 1250.00,
    currency: 'USD',
    dueDate: new Date('2024-03-15'),
    issueDate: new Date('2024-03-01'),
    paidDate: new Date('2024-03-10'),
    lineItems: [
      { id: '1', description: 'Professional Services - Consulting', quantity: 10, unitPrice: 100, amount: 1000, taxable: true },
      { id: '2', description: 'Software License - Annual', quantity: 1, unitPrice: 250, amount: 250, taxable: true }
    ],
    subtotal: 1250.00,
    tax: 0,
    discount: 0,
    total: 1250.00,
    amountPaid: 1250.00,
    amountDue: 0,
    paymentTerms: 'net_15',
    memo: 'March 2024 Services'
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-0002',
    customerId: 'CUST-67890',
    customerName: 'Tech Solutions Inc',
    customerEmail: 'payments@techsolutions.io',
    status: 'sent',
    amount: 499.99,
    currency: 'USD',
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    issueDate: new Date(),
    lineItems: [
      { id: '1', description: 'Monthly Subscription - Pro Plan', quantity: 1, unitPrice: 499.99, amount: 499.99, taxable: false }
    ],
    subtotal: 499.99,
    tax: 0,
    discount: 0,
    total: 499.99,
    amountPaid: 0,
    amountDue: 499.99,
    paymentTerms: 'net_30',
    notes: 'Payment due within 30 days'
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-0003',
    customerId: 'CUST-11223',
    customerName: 'Global Enterprises',
    customerEmail: 'ap@globalent.com',
    status: 'overdue',
    amount: 3750.00,
    currency: 'USD',
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    issueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    lineItems: [
      { id: '1', description: 'Enterprise License - Q1 2024', quantity: 5, unitPrice: 750, amount: 3750, taxable: true }
    ],
    subtotal: 3750.00,
    tax: 0,
    discount: 0,
    total: 3750.00,
    amountPaid: 0,
    amountDue: 3750.00,
    paymentTerms: 'net_30',
    memo: 'OVERDUE - Please remit payment'
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2024-0004',
    customerId: 'CORP-555',
    customerName: 'Enterprise Solutions Ltd',
    customerEmail: 'procurement@entsolutions.com',
    status: 'paid',
    amount: 12500.00,
    currency: 'USD',
    dueDate: new Date('2024-02-28'),
    issueDate: new Date('2024-02-01'),
    paidDate: new Date('2024-02-25'),
    lineItems: [
      { id: '1', description: 'Enterprise Software Suite', quantity: 50, unitPrice: 200, amount: 10000, taxable: true },
      { id: '2', description: 'Premium Support Package', quantity: 1, unitPrice: 2500, amount: 2500, taxable: true }
    ],
    subtotal: 12500.00,
    tax: 0,
    discount: 0,
    total: 12500.00,
    amountPaid: 12500.00,
    amountDue: 0,
    paymentTerms: 'net_30'
  },
  {
    id: 'INV-005',
    invoiceNumber: 'INV-2024-0005',
    customerId: 'CUST-77889',
    customerName: 'Digital Marketing Pro',
    customerEmail: 'billing@digitalmarketingpro.com',
    status: 'partially_paid',
    amount: 1000.00,
    currency: 'USD',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    issueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lineItems: [
      { id: '1', description: 'Marketing Campaign Setup', quantity: 1, unitPrice: 500, amount: 500, taxable: true },
      { id: '2', description: 'Monthly Management Fee', quantity: 1, unitPrice: 500, amount: 500, taxable: true }
    ],
    subtotal: 1000.00,
    tax: 0,
    discount: 0,
    total: 1000.00,
    amountPaid: 500.00,
    amountDue: 500.00,
    paymentTerms: 'net_15',
    notes: 'Partial payment received'
  },
  {
    id: 'INV-006',
    invoiceNumber: 'INV-2024-0006',
    customerId: 'CUST-22334',
    customerName: 'E-commerce Store',
    customerEmail: 'orders@ecomstore.com',
    status: 'draft',
    amount: 875.50,
    currency: 'USD',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    issueDate: new Date(),
    lineItems: [
      { id: '1', description: 'Product Design Services', quantity: 7, unitPrice: 125.07, amount: 875.50, taxable: false }
    ],
    subtotal: 875.50,
    tax: 0,
    discount: 0,
    total: 875.50,
    amountPaid: 0,
    amountDue: 875.50,
    paymentTerms: 'net_30',
    memo: 'Draft - Awaiting approval'
  }
];
