export interface SavedView {
  id: string;
  name: string;
  filters: Record<string, any>;
  columns: string[];
  sortBy?: { key: string; direction: 'asc' | 'desc' };
  isDefault: boolean;
  isPinned: boolean;
  createdAt: Date;
}

const STORAGE_KEY_PREFIX = 'saved_views_';

export class ViewsManager {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private getStorageKey(): string {
    return `${STORAGE_KEY_PREFIX}${this.context}`;
  }

  getViews(): SavedView[] {
    const stored = localStorage.getItem(this.getStorageKey());
    if (!stored) return [];
    
    try {
      const views = JSON.parse(stored);
      return views.map((v: any) => ({
        ...v,
        createdAt: new Date(v.createdAt),
      }));
    } catch {
      return [];
    }
  }

  saveView(view: Omit<SavedView, 'id' | 'createdAt'>): SavedView {
    const views = this.getViews();
    const newView: SavedView = {
      ...view,
      id: `view_${Date.now()}`,
      createdAt: new Date(),
    };

    // If this is set as default, unset other defaults
    if (newView.isDefault) {
      views.forEach(v => v.isDefault = false);
    }

    views.push(newView);
    localStorage.setItem(this.getStorageKey(), JSON.stringify(views));
    return newView;
  }

  updateView(id: string, updates: Partial<SavedView>): void {
    const views = this.getViews();
    const index = views.findIndex(v => v.id === id);
    
    if (index === -1) return;

    // If setting as default, unset other defaults
    if (updates.isDefault) {
      views.forEach(v => v.isDefault = false);
    }

    views[index] = { ...views[index], ...updates };
    localStorage.setItem(this.getStorageKey(), JSON.stringify(views));
  }

  deleteView(id: string): void {
    const views = this.getViews().filter(v => v.id !== id);
    localStorage.setItem(this.getStorageKey(), JSON.stringify(views));
  }

  getDefaultView(): SavedView | null {
    return this.getViews().find(v => v.isDefault) || null;
  }

  getPinnedViews(): SavedView[] {
    return this.getViews().filter(v => v.isPinned);
  }
}

export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        const stringValue = value?.toString() || '';
        return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}
