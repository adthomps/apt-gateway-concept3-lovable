import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Filter, X } from "lucide-react";

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'daterange' | 'text';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

interface FilterPanelProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
  availableFiltersCount?: number;
}

export function FilterPanel({ 
  filters, 
  values, 
  onValuesChange,
  availableFiltersCount 
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = Object.values(values).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object' && v !== null) return Object.keys(v).length > 0;
    return v !== null && v !== undefined && v !== '';
  }).length;

  const handleClearAll = () => {
    onValuesChange({});
  };

  const handleRemoveFilter = (filterId: string) => {
    const newValues = { ...values };
    delete newValues[filterId];
    onValuesChange(newValues);
  };

  const updateFilter = (filterId: string, value: any) => {
    onValuesChange({ ...values, [filterId]: value });
  };

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </CollapsibleTrigger>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
        </div>

        <CollapsibleContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={filter.id} className="text-sm font-medium">
                    {filter.label}
                  </Label>
                  {values[filter.id] && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveFilter(filter.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {filter.type === 'select' && (
                  <Select
                    value={values[filter.id] || ''}
                    onValueChange={(value) => updateFilter(filter.id, value)}
                  >
                    <SelectTrigger id={filter.id}>
                      <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {filter.type === 'multiselect' && (
                  <div className="space-y-2">
                    {filter.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${filter.id}-${option.value}`}
                          checked={values[filter.id]?.includes(option.value) || false}
                          onCheckedChange={(checked) => {
                            const current = values[filter.id] || [];
                            const updated = checked
                              ? [...current, option.value]
                              : current.filter((v: string) => v !== option.value);
                            updateFilter(filter.id, updated.length > 0 ? updated : undefined);
                          }}
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {filter.type === 'text' && (
                  <Input
                    id={filter.id}
                    placeholder={`Enter ${filter.label.toLowerCase()}`}
                    value={values[filter.id] || ''}
                    onChange={(e) => updateFilter(filter.id, e.target.value)}
                  />
                )}

                {filter.type === 'range' && (
                  <div className="space-y-2">
                    <Slider
                      value={[values[filter.id]?.[0] || filter.min || 0, values[filter.id]?.[1] || filter.max || 100]}
                      min={filter.min || 0}
                      max={filter.max || 100}
                      step={1}
                      onValueChange={(value) => updateFilter(filter.id, value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${values[filter.id]?.[0] || filter.min || 0}</span>
                      <span>${values[filter.id]?.[1] || filter.max || 100}</span>
                    </div>
                  </div>
                )}

                {filter.type === 'daterange' && (
                  <DateRangePicker
                    date={values[filter.id] || { from: undefined, to: undefined }}
                    onDateChange={(value) => updateFilter(filter.id, value)}
                  />
                )}
              </div>
            ))}
          </div>

          {availableFiltersCount && filters.length < availableFiltersCount && (
            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-4 p-2 bg-muted/30 rounded">
              <Info className="h-3 w-3" />
              <span>{availableFiltersCount - filters.length} more filters available in Standard/Advanced view</span>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(values).map(([key, value]) => {
            const filter = filters.find(f => f.id === key);
            if (!filter || !value) return null;

            let displayValue = '';
            if (filter.type === 'multiselect' && Array.isArray(value)) {
              const labels = value.map(v => filter.options?.find(o => o.value === v)?.label || v);
              displayValue = labels.join(', ');
            } else if (filter.type === 'range' && Array.isArray(value)) {
              displayValue = `${value[0]} - ${value[1]}`;
            } else if (typeof value === 'object') {
              displayValue = 'Custom range';
            } else {
              const option = filter.options?.find(o => o.value === value);
              displayValue = option?.label || value;
            }

            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {filter.label}: {displayValue}
                <button
                  onClick={() => handleRemoveFilter(key)}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
