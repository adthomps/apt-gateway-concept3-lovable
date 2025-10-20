export interface PayoutTransaction {
  id: string;
  amount: number;
  fee: number;
  net: number;
  description: string;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'in_transit' | 'failed' | 'canceled';
  arrivalDate: Date;
  createdAt: Date;
  paidAt?: Date;
  method: 'standard' | 'instant' | 'next_day';
  destination: string;
  destinationType: 'bank_account' | 'debit_card';
  transactionCount: number;
  transactions: PayoutTransaction[];
  fees: {
    processing: number;
    chargebacks: number;
    refunds: number;
    adjustments: number;
    total: number;
  };
  failureCode?: string;
  failureMessage?: string;
}

export const mockPayouts: Payout[] = [
  {
    id: 'PO-001',
    amount: 12456.78,
    currency: 'USD',
    status: 'paid',
    arrivalDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    method: 'standard',
    destination: 'Bank ••••4532',
    destinationType: 'bank_account',
    transactionCount: 127,
    transactions: [
      { id: 'TXN-001', amount: 245.00, fee: 7.35, net: 237.65, description: 'Payment from Acme Corp' },
      { id: 'TXN-002', amount: 89.99, fee: 2.70, net: 87.29, description: 'Payment from Tech Solutions' }
    ],
    fees: {
      processing: 374.50,
      chargebacks: 50.00,
      refunds: 15.28,
      adjustments: 0,
      total: 439.78
    }
  },
  {
    id: 'PO-002',
    amount: 8934.22,
    currency: 'USD',
    status: 'in_transit',
    arrivalDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    method: 'standard',
    destination: 'Bank ••••4532',
    destinationType: 'bank_account',
    transactionCount: 89,
    transactions: [
      { id: 'TXN-103', amount: 399.99, fee: 12.00, net: 387.99, description: 'Subscription payment' },
      { id: 'TXN-104', amount: 1250.00, fee: 37.50, net: 1212.50, description: 'Enterprise invoice' }
    ],
    fees: {
      processing: 268.15,
      chargebacks: 0,
      refunds: 8.63,
      adjustments: 0,
      total: 276.78
    }
  },
  {
    id: 'PO-003',
    amount: 15234.90,
    currency: 'USD',
    status: 'pending',
    arrivalDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    method: 'standard',
    destination: 'Bank ••••4532',
    destinationType: 'bank_account',
    transactionCount: 156,
    transactions: [],
    fees: {
      processing: 456.78,
      chargebacks: 25.00,
      refunds: 12.32,
      adjustments: 0,
      total: 494.10
    }
  },
  {
    id: 'PO-004',
    amount: 3456.00,
    currency: 'USD',
    status: 'paid',
    arrivalDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    paidAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    method: 'instant',
    destination: 'Debit ••••7890',
    destinationType: 'debit_card',
    transactionCount: 45,
    transactions: [
      { id: 'TXN-201', amount: 549.99, fee: 16.50, net: 533.49, description: 'E-commerce sale' },
      { id: 'TXN-202', amount: 156.75, fee: 4.70, net: 152.05, description: 'Refunded transaction' }
    ],
    fees: {
      processing: 103.68,
      chargebacks: 0,
      refunds: 0,
      adjustments: 34.56,
      total: 138.24
    }
  },
  {
    id: 'PO-005',
    amount: 0,
    currency: 'USD',
    status: 'failed',
    arrivalDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    method: 'standard',
    destination: 'Bank ••••1234',
    destinationType: 'bank_account',
    transactionCount: 67,
    transactions: [],
    fees: {
      processing: 201.45,
      chargebacks: 0,
      refunds: 5.55,
      adjustments: 0,
      total: 207.00
    },
    failureCode: 'account_closed',
    failureMessage: 'The bank account has been closed. Please update your payout settings.'
  },
  {
    id: 'PO-006',
    amount: 9876.54,
    currency: 'USD',
    status: 'paid',
    arrivalDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    method: 'next_day',
    destination: 'Bank ••••4532',
    destinationType: 'bank_account',
    transactionCount: 98,
    transactions: [
      { id: 'TXN-301', amount: 2800.00, fee: 84.00, net: 2716.00, description: 'Enterprise payment' },
      { id: 'TXN-302', amount: 1999.00, fee: 59.97, net: 1939.03, description: 'Large invoice' }
    ],
    fees: {
      processing: 296.30,
      chargebacks: 75.00,
      refunds: 18.70,
      adjustments: 10.00,
      total: 400.00
    }
  }
];
