import { CardIntelligence, Level2Data, Level3Data, InterchangeQualification } from '@/types/card-intelligence';

export function calculateInterchangeQualification(
  cardIntelligence: CardIntelligence,
  level2Data?: Level2Data,
  level3Data?: Level3Data
): InterchangeQualification {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  
  // Base rates by card type and level
  const baseRates = {
    L1: cardIntelligence.isCommercial ? 2.95 : 2.65,
    L2: cardIntelligence.isCommercial ? 2.50 : 2.30,
    L3: cardIntelligence.isCommercial ? 1.95 : 1.80,
  };

  let currentLevel = 'L1';
  let actualRate = baseRates.L1;

  // Check L2 qualification
  if (level2Data) {
    const l2Required = ['customerCode', 'taxAmount'];
    const l2Missing = l2Required.filter(field => !level2Data[field as keyof Level2Data]);
    
    if (l2Missing.length === 0) {
      currentLevel = 'L2';
      actualRate = baseRates.L2;
    } else {
      missingFields.push(...l2Missing.map(f => `L2: ${f}`));
      warnings.push('Missing required L2 fields - will downgrade to L1');
    }
  } else {
    missingFields.push('L2 data not provided');
  }

  // Check L3 qualification
  if (level3Data && level3Data.lineItems && level3Data.lineItems.length > 0) {
    const hasAllLineItemData = level3Data.lineItems.every(item => 
      item.productCode && 
      item.description && 
      item.quantity > 0 &&
      item.unitPrice &&
      item.commodityCode
    );

    if (hasAllLineItemData && currentLevel === 'L2') {
      currentLevel = 'L3';
      actualRate = baseRates.L3;
    } else if (!hasAllLineItemData) {
      missingFields.push('L3: Complete line item details (product code, commodity code)');
      warnings.push('Incomplete L3 line items - will process as L2');
    }
  } else if (currentLevel === 'L2') {
    missingFields.push('L3: Line items with product codes');
  }

  // CEDP discount
  if (cardIntelligence.cedpEnabled) {
    actualRate = actualRate * 0.95; // 5% discount for CEDP
  }

  const qualifiedRate = baseRates.L3;
  const savings = ((baseRates.L1 - actualRate) / baseRates.L1 * 100).toFixed(1);

  return {
    currentLevel: currentLevel as any,
    qualifiedRate: `${qualifiedRate.toFixed(2)}%`,
    actualRate: `${actualRate.toFixed(2)}%`,
    savings: `${savings}%`,
    missingFields,
    warnings,
  };
}

export function calculateSavingsAmount(transactionAmount: number, qualification: InterchangeQualification): string {
  const baseRate = 2.65; // L1 base
  const actualRate = parseFloat(qualification.actualRate.replace('%', ''));
  const savingsPercent = baseRate - actualRate;
  const savingsAmount = (transactionAmount * savingsPercent) / 100;
  return `$${savingsAmount.toFixed(2)}`;
}

export function getRequiredFieldsForLevel(level: 'L2' | 'L3'): string[] {
  if (level === 'L2') {
    return [
      'Customer Code',
      'Tax Amount',
      'Tax Exempt Status',
      'PO Number (optional)',
      'Destination ZIP Code'
    ];
  }
  
  return [
    'Line Items with Product Codes',
    'Commodity Codes',
    'Unit of Measure',
    'Quantities and Unit Prices',
    'Item-level Tax',
    'Shipping and Duty Amounts'
  ];
}

export function getLevelBadgeColor(level: string): string {
  switch (level) {
    case 'L3': return 'bg-success/20 text-success border-success/30';
    case 'L2': return 'bg-primary/20 text-primary border-primary/30';
    case 'L1': return 'bg-muted text-muted-foreground border-border';
    case 'downgraded': return 'bg-destructive/20 text-destructive border-destructive/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
}

export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'US': '🇺🇸',
    'CA': '🇨🇦',
    'GB': '🇬🇧',
    'MX': '🇲🇽',
    'BR': '🇧🇷',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'JP': '🇯🇵',
    'AU': '🇦🇺',
    'IN': '🇮🇳',
  };
  return flags[countryCode] || '🌍';
}
