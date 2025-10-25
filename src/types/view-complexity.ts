export type ViewComplexity = 'simple' | 'standard' | 'advanced';

export interface ViewPreset {
  name: string;
  description: string;
  columns: string[];
  filters: string[] | 'all';
  features: {
    showAdvancedFilters: boolean;
    showColumnChooser: boolean;
    showBulkActions: boolean;
    showQuickPresets: boolean;
    showExport: boolean;
    showAIInsights?: boolean;
    showRowExpansion?: boolean;
  };
}

export const VIEW_PRESETS: Record<ViewComplexity, ViewPreset> = {
  simple: {
    name: "Simple View",
    description: "Essential information for quick overview",
    columns: ['select', 'time', 'customer', 'amount', 'status'],
    filters: ['dateRange', 'status'],
    features: {
      showAdvancedFilters: false,
      showColumnChooser: false,
      showBulkActions: true,
      showQuickPresets: true,
      showExport: true,
    }
  },
  standard: {
    name: "Standard View",
    description: "Balanced view for daily operations",
    columns: ['select', 'id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway', 'riskScore'],
    filters: ['dateRange', 'status', 'gateway', 'cardBrand', 'amountRange'],
    features: {
      showAdvancedFilters: true,
      showColumnChooser: true,
      showBulkActions: true,
      showQuickPresets: true,
      showExport: true,
    }
  },
  advanced: {
    name: "Advanced View",
    description: "Full feature set for power users",
    columns: ['select', 'id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway', 'cardBrand', 'cardType', 'level', 'cedp', 'riskScore'],
    filters: 'all',
    features: {
      showAdvancedFilters: true,
      showColumnChooser: true,
      showBulkActions: true,
      showQuickPresets: true,
      showExport: true,
      showAIInsights: true,
      showRowExpansion: true,
    }
  }
};
