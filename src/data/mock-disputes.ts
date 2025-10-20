export interface DisputeEvidence {
  type: 'receipt' | 'tracking' | 'correspondence' | 'refund_policy' | 'tos' | 'other';
  filename: string;
  uploadedAt: Date;
  fileSize: string;
}

export interface Dispute {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'inquiry' | 'chargeback' | 'evidence_submitted' | 'won' | 'lost' | 'accepted';
  reason: string;
  reasonCode: string;
  customerId: string;
  customerName: string;
  createdAt: Date;
  dueDate: Date;
  respondedAt?: Date;
  resolvedAt?: Date;
  evidence: DisputeEvidence[];
  networkReasonCode?: string;
  cardBrand: string;
  last4: string;
  notes?: string;
}

export const mockDisputes: Dispute[] = [
  {
    id: 'DSP-001',
    transactionId: 'TXN-008',
    amount: 89.00,
    currency: 'USD',
    status: 'chargeback',
    reason: 'Product not received',
    reasonCode: 'merchandise_not_received',
    customerId: 'CUST-11999',
    customerName: 'Disputed Customer',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    evidence: [],
    networkReasonCode: '13.1',
    cardBrand: 'Visa',
    last4: '7890',
    notes: 'Customer claims product was not delivered despite tracking showing delivery'
  },
  {
    id: 'DSP-002',
    transactionId: 'TXN-445',
    amount: 245.99,
    currency: 'USD',
    status: 'evidence_submitted',
    reason: 'Fraudulent transaction',
    reasonCode: 'fraudulent',
    customerId: 'CUST-88776',
    customerName: 'Concerned Customer',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    respondedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    evidence: [
      { type: 'receipt', filename: 'receipt-445.pdf', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), fileSize: '245 KB' },
      { type: 'correspondence', filename: 'customer-email.pdf', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), fileSize: '128 KB' }
    ],
    networkReasonCode: '10.4',
    cardBrand: 'Mastercard',
    last4: '3344'
  },
  {
    id: 'DSP-003',
    transactionId: 'TXN-332',
    amount: 1250.00,
    currency: 'USD',
    status: 'won',
    reason: 'Service not as described',
    reasonCode: 'product_not_as_described',
    customerId: 'CUST-55443',
    customerName: 'Business Client',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    respondedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    evidence: [
      { type: 'tos', filename: 'terms-of-service.pdf', uploadedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), fileSize: '512 KB' },
      { type: 'correspondence', filename: 'service-agreement.pdf', uploadedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), fileSize: '389 KB' },
      { type: 'other', filename: 'service-logs.pdf', uploadedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), fileSize: '1.2 MB' }
    ],
    networkReasonCode: '13.3',
    cardBrand: 'Amex',
    last4: '8899',
    notes: 'Won - Provided comprehensive service logs and signed agreement'
  },
  {
    id: 'DSP-004',
    transactionId: 'TXN-556',
    amount: 499.00,
    currency: 'USD',
    status: 'lost',
    reason: 'Duplicate charge',
    reasonCode: 'duplicate',
    customerId: 'CUST-22110',
    customerName: 'Tech Startup',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    respondedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    evidence: [
      { type: 'receipt', filename: 'transaction-receipt.pdf', uploadedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000), fileSize: '156 KB' }
    ],
    networkReasonCode: '12.6',
    cardBrand: 'Visa',
    last4: '5566',
    notes: 'Lost - Customer was indeed charged twice due to processing error'
  },
  {
    id: 'DSP-005',
    transactionId: 'TXN-667',
    amount: 156.50,
    currency: 'USD',
    status: 'inquiry',
    reason: 'Unrecognized charge',
    reasonCode: 'unrecognized',
    customerId: 'CUST-99880',
    customerName: 'Jane Smith',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    evidence: [],
    networkReasonCode: '12.1',
    cardBrand: 'Mastercard',
    last4: '4433',
    notes: 'Customer inquiry - not yet escalated to chargeback'
  },
  {
    id: 'DSP-006',
    transactionId: 'TXN-778',
    amount: 2300.00,
    currency: 'USD',
    status: 'accepted',
    reason: 'Cancelled subscription',
    reasonCode: 'subscription_canceled',
    customerId: 'CUST-77665',
    customerName: 'Enterprise Co',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    respondedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    evidence: [],
    networkReasonCode: '13.2',
    cardBrand: 'Visa',
    last4: '6677',
    notes: 'Accepted - Valid cancellation request was not properly processed'
  }
];
