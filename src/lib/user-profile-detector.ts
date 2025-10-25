import { ViewComplexity } from "@/types/view-complexity";

export interface UserProfile {
  transactionVolume: 'low' | 'medium' | 'high';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  suggestedView: ViewComplexity;
  confidence: number; // 0-100
}

interface UserMetrics {
  totalTransactions?: number;
  savedViewsCount?: number;
  advancedFilterUsageCount?: number;
  sessionCount?: number;
  daysActive?: number;
}

export function detectUserProfile(metrics: UserMetrics): UserProfile {
  const {
    totalTransactions = 0,
    savedViewsCount = 0,
    advancedFilterUsageCount = 0,
    sessionCount = 0,
    daysActive = 0,
  } = metrics;

  // Score calculation
  let score = 0;
  let confidence = 50;

  // New users → Simple
  if (sessionCount < 3) {
    return {
      transactionVolume: 'low',
      experienceLevel: 'beginner',
      suggestedView: 'simple',
      confidence: 90,
    };
  }

  // Advanced signals
  if (savedViewsCount >= 3) score += 30;
  if (advancedFilterUsageCount >= 10) score += 30;
  if (totalTransactions > 1000) score += 20;
  if (daysActive > 30) score += 20;

  // Determine profile
  let experienceLevel: UserProfile['experienceLevel'];
  let suggestedView: ViewComplexity;
  
  if (score >= 70) {
    experienceLevel = 'advanced';
    suggestedView = 'advanced';
    confidence = 85;
  } else if (score >= 40) {
    experienceLevel = 'intermediate';
    suggestedView = 'standard';
    confidence = 80;
  } else {
    experienceLevel = 'beginner';
    suggestedView = 'simple';
    confidence = 75;
  }

  const transactionVolume: UserProfile['transactionVolume'] =
    totalTransactions > 500 ? 'high' :
    totalTransactions > 100 ? 'medium' : 'low';

  return {
    transactionVolume,
    experienceLevel,
    suggestedView,
    confidence,
  };
}

// Track usage metrics
const USAGE_METRICS_KEY = 'user_usage_metrics';

export interface UsageMetrics {
  sessionCount: number;
  advancedFilterUsageCount: number;
  savedViewsCount: number;
  lastVisit: string;
  firstVisit: string;
  featureUsage: Record<string, number>;
}

export function getUsageMetrics(): UsageMetrics {
  const stored = localStorage.getItem(USAGE_METRICS_KEY);
  if (!stored) {
    const initial: UsageMetrics = {
      sessionCount: 0,
      advancedFilterUsageCount: 0,
      savedViewsCount: 0,
      lastVisit: new Date().toISOString(),
      firstVisit: new Date().toISOString(),
      featureUsage: {},
    };
    localStorage.setItem(USAGE_METRICS_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

export function updateUsageMetrics(updates: Partial<UsageMetrics>): void {
  const current = getUsageMetrics();
  const updated = {
    ...current,
    ...updates,
    lastVisit: new Date().toISOString(),
  };
  localStorage.setItem(USAGE_METRICS_KEY, JSON.stringify(updated));
}

export function trackFeatureUsage(feature: string): void {
  const metrics = getUsageMetrics();
  metrics.featureUsage[feature] = (metrics.featureUsage[feature] || 0) + 1;
  updateUsageMetrics(metrics);
}

export function trackViewChange(
  fromComplexity: ViewComplexity,
  toComplexity: ViewComplexity,
  reason: 'manual' | 'auto' | 'wizard'
): void {
  const metrics = getUsageMetrics();
  
  const eventKey = `view_change_${fromComplexity}_to_${toComplexity}`;
  metrics.featureUsage[eventKey] = (metrics.featureUsage[eventKey] || 0) + 1;
  
  // Track complexity session duration
  const sessionStart = new Date(metrics.lastVisit).getTime();
  const sessionDuration = Date.now() - sessionStart;
  
  const durationKey = `${fromComplexity}_duration`;
  metrics.featureUsage[durationKey] = 
    (metrics.featureUsage[durationKey] || 0) + sessionDuration;
  
  updateUsageMetrics(metrics);
}

export function trackFilterUsage(filterId: string, complexity: ViewComplexity): void {
  const metrics = getUsageMetrics();
  
  const key = `filter_${filterId}_${complexity}`;
  metrics.featureUsage[key] = (metrics.featureUsage[key] || 0) + 1;
  
  if (filterId === 'advanced') {
    metrics.advancedFilterUsageCount += 1;
  }
  
  updateUsageMetrics(metrics);
}
