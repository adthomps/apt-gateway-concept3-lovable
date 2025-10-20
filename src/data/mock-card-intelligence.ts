import { CardIntelligence, EnhancedData } from '@/types/card-intelligence';

export const mockCardIntelligence: Record<string, CardIntelligence> = {
  'TXN-001': {
    brand: 'visa',
    type: 'commercial',
    isCommercial: true,
    last4: '4532',
    issuerCountry: 'United States',
    issuerCountryCode: 'US',
    bin: '411111',
    fundingSource: 'credit',
    accountType: 'Corporate Purchasing Card',
    level: 'L3',
    cedpEnabled: true,
    interchangeRate: '1.85%',
    estimatedSavings: '$2.45'
  },
  'TXN-002': {
    brand: 'mastercard',
    type: 'credit',
    isCommercial: false,
    last4: '8765',
    issuerCountry: 'Canada',
    issuerCountryCode: 'CA',
    bin: '555544',
    fundingSource: 'credit',
    accountType: 'World Elite',
    level: 'L2',
    cedpEnabled: false,
    interchangeRate: '2.30%',
    estimatedSavings: '$0.87'
  },
  'TXN-003': {
    brand: 'visa',
    type: 'debit',
    isCommercial: false,
    last4: '9876',
    issuerCountry: 'United States',
    issuerCountryCode: 'US',
    bin: '400000',
    fundingSource: 'debit',
    accountType: 'Debit with PIN',
    level: 'L1',
    cedpEnabled: false,
    interchangeRate: '2.65%',
    estimatedSavings: '$0.00'
  },
  'TXN-004': {
    brand: 'visa',
    type: 'credit',
    isCommercial: false,
    last4: '1234',
    issuerCountry: 'United States',
    issuerCountryCode: 'US',
    bin: '424242',
    fundingSource: 'credit',
    accountType: 'Rewards',
    level: 'downgraded',
    cedpEnabled: false,
    interchangeRate: '2.95%',
    estimatedSavings: '-$0.75',
    downgradeReason: 'Missing AVS match - downgraded from L2 to L1'
  },
  'TXN-006': {
    brand: 'amex',
    type: 'commercial',
    isCommercial: true,
    last4: '5678',
    issuerCountry: 'United States',
    issuerCountryCode: 'US',
    bin: '378282',
    fundingSource: 'charge',
    accountType: 'Corporate Card',
    level: 'L3',
    cedpEnabled: true,
    interchangeRate: '1.95%',
    estimatedSavings: '$3.20'
  }
};

export const mockEnhancedData: Record<string, EnhancedData> = {
  'TXN-001': {
    level2: {
      customerCode: 'CUST-12345',
      taxAmount: '$19.60',
      taxExempt: false,
      poNumber: 'PO-2024-0315',
      destinationZipCode: '10001',
      invoiceNumber: 'INV-001'
    },
    level3: {
      lineItems: [
        {
          id: '1',
          productCode: 'PROD-001',
          description: 'Professional Services - Consulting',
          quantity: 10,
          unitPrice: '$20.00',
          unitOfMeasure: 'hours',
          taxAmount: '$16.00',
          commodityCode: '82111',
          total: '$200.00'
        },
        {
          id: '2',
          productCode: 'PROD-002',
          description: 'Software License - Annual',
          quantity: 1,
          unitPrice: '$25.00',
          unitOfMeasure: 'license',
          taxAmount: '$2.00',
          commodityCode: '43232',
          total: '$25.00'
        },
        {
          id: '3',
          productCode: 'PROD-003',
          description: 'Cloud Hosting Services',
          quantity: 1,
          unitPrice: '$20.00',
          unitOfMeasure: 'month',
          taxAmount: '$1.60',
          commodityCode: '82111',
          total: '$20.00'
        }
      ],
      shippingAmount: '$0.00',
      dutyAmount: '$0.00',
      destinationCountryCode: 'US',
      shipFromZipCode: '94105',
      orderDate: '2024-03-15'
    }
  },
  'TXN-002': {
    level2: {
      customerCode: 'CUST-67890',
      taxAmount: '$7.20',
      taxExempt: false,
      destinationZipCode: 'M5H 2N2'
    }
  },
  'TXN-006': {
    level2: {
      customerCode: 'CORP-555',
      taxAmount: '$224.00',
      taxExempt: false,
      poNumber: 'CORP-PO-2024-Q1',
      destinationZipCode: '02101'
    },
    level3: {
      lineItems: [
        {
          id: '1',
          productCode: 'ENT-001',
          description: 'Enterprise Software Suite',
          quantity: 50,
          unitPrice: '$50.00',
          unitOfMeasure: 'license',
          taxAmount: '$200.00',
          commodityCode: '43232',
          total: '$2,500.00'
        },
        {
          id: '2',
          productCode: 'SUP-001',
          description: 'Premium Support - Annual',
          quantity: 1,
          unitPrice: '$300.00',
          unitOfMeasure: 'year',
          taxAmount: '$24.00',
          commodityCode: '81112',
          total: '$300.00'
        }
      ],
      shippingAmount: '$0.00',
      destinationCountryCode: 'US',
      shipFromZipCode: '94105',
      orderDate: '2024-03-15'
    }
  }
};
