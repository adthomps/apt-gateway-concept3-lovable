export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover';
export type CardType = 'credit' | 'debit' | 'prepaid' | 'commercial';
export type InterchangeLevel = 'L1' | 'L2' | 'L3' | 'downgraded';

export interface CardIntelligence {
  brand: CardBrand;
  type: CardType;
  isCommercial: boolean;
  last4: string;
  issuerCountry: string;
  issuerCountryCode: string;
  bin: string;
  fundingSource: string;
  accountType: string;
  level: InterchangeLevel;
  cedpEnabled: boolean;
  interchangeRate: string;
  estimatedSavings?: string;
  downgradeReason?: string;
}

export interface Level2Data {
  customerCode: string;
  taxAmount: string;
  taxExempt: boolean;
  poNumber?: string;
  destinationZipCode?: string;
  invoiceNumber?: string;
}

export interface LineItem {
  id: string;
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: string;
  unitOfMeasure: string;
  taxAmount: string;
  discountAmount?: string;
  commodityCode?: string;
  total: string;
}

export interface Level3Data {
  lineItems: LineItem[];
  shippingAmount?: string;
  dutyAmount?: string;
  destinationCountryCode?: string;
  shipFromZipCode?: string;
  freightAmount?: string;
  orderDate?: string;
}

export interface EnhancedData {
  level2?: Level2Data;
  level3?: Level3Data;
}

export interface InterchangeQualification {
  currentLevel: InterchangeLevel;
  qualifiedRate: string;
  actualRate: string;
  savings: string;
  missingFields: string[];
  warnings: string[];
}

export interface MerchantInterchangeSettings {
  l3EnforceMode: boolean;
  l2PromptMode: boolean;
  cedpOptimization: boolean;
  autoFillEnabled: boolean;
}
