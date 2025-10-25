import { UsageMetrics } from "./user-profile-detector";
import { ViewComplexity } from "@/types/view-complexity";

export interface ViewRecommendation {
  type: 'upgrade' | 'downgrade' | 'feature';
  currentLevel: ViewComplexity;
  suggestedLevel?: ViewComplexity;
  message: string;
  confidence: number;
  reason: string;
  actionable: boolean;
}

export function generateRecommendations(
  metrics: UsageMetrics,
  currentComplexity: ViewComplexity
): ViewRecommendation[] {
  const recommendations: ViewRecommendation[] = [];
  
  const sessionCount = metrics.sessionCount;
  const featureUsage = metrics.featureUsage;
  
  // Check for underutilization
  if (currentComplexity === 'advanced' && sessionCount >= 10) {
    const advancedFeatureUsage = 
      (featureUsage['advancedFilters'] || 0) +
      (featureUsage['columnChooser'] || 0) +
      (featureUsage['bulkActions_advanced'] || 0);
    
    if (advancedFeatureUsage < 5) {
      recommendations.push({
        type: 'downgrade',
        currentLevel: 'advanced',
        suggestedLevel: 'standard',
        message: "Simplify your view?",
        confidence: 85,
        reason: "You rarely use advanced features. Standard view might be cleaner for your needs.",
        actionable: true,
      });
    }
  }
  
  // Check for feature hunger
  if (currentComplexity === 'simple' && sessionCount >= 5) {
    const filterAttempts = Object.keys(featureUsage)
      .filter(k => k.startsWith('filter_'))
      .reduce((sum, k) => sum + featureUsage[k], 0);
    
    if (filterAttempts > 20) {
      recommendations.push({
        type: 'upgrade',
        currentLevel: 'simple',
        suggestedLevel: 'standard',
        message: "Ready for more control?",
        confidence: 80,
        reason: "You frequently filter transactions. Standard view offers more filter options.",
        actionable: true,
      });
    }
  }
  
  // Check for specific feature recommendations
  const cardTypeSearches = featureUsage['search_card'] || 0;
  if (cardTypeSearches > 10 && currentComplexity === 'simple') {
    recommendations.push({
      type: 'feature',
      currentLevel: 'simple',
      suggestedLevel: 'standard',
      message: "Card filters available",
      confidence: 90,
      reason: "You often search for card types. Standard view has dedicated card filters.",
      actionable: true,
    });
  }
  
  return recommendations;
}
