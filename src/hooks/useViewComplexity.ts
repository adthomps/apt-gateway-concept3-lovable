import { useState, useEffect } from "react";
import { ViewComplexity } from "@/types/view-complexity";

const STORAGE_KEY = 'view_complexity_transactions';

export function useViewComplexity(defaultLevel: ViewComplexity = 'standard') {
  const [complexity, setComplexity] = useState<ViewComplexity>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ViewComplexity) || defaultLevel;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, complexity);
  }, [complexity]);

  return {
    complexity,
    setComplexity,
  };
}
