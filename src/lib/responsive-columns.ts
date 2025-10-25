import { useState, useEffect } from "react";
import { ViewComplexity } from "@/types/view-complexity";

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveColumnConfig {
  mobile: string[];
  tablet: string[];
  desktop: string[];
}

export const RESPONSIVE_COLUMNS: Record<ViewComplexity, ResponsiveColumnConfig> = {
  simple: {
    mobile: ['customer', 'amount', 'status'],
    tablet: ['time', 'customer', 'amount', 'status'],
    desktop: ['time', 'customer', 'amount', 'status', 'paymentMethod'],
  },
  standard: {
    mobile: ['time', 'customer', 'amount', 'status'],
    tablet: ['id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway'],
    desktop: ['id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway', 'riskScore'],
  },
  advanced: {
    mobile: ['time', 'customer', 'amount', 'status', 'gateway'],
    tablet: ['id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway', 'level'],
    desktop: ['id', 'time', 'customer', 'amount', 'status', 'paymentMethod', 'gateway', 'cardBrand', 'level', 'riskScore'],
  },
};

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

export function getResponsiveColumns(
  complexity: ViewComplexity,
  screenSize: ScreenSize,
  userSelectedColumns: string[]
): string[] {
  const config = RESPONSIVE_COLUMNS[complexity];
  
  // On desktop, use user's selected columns
  if (screenSize === 'desktop') {
    return userSelectedColumns;
  }
  
  // On mobile/tablet, use responsive preset
  return config[screenSize];
}
