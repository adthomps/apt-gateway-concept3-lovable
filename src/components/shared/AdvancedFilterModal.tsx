import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface AdvancedFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Record<string, any>;
  onApply: (filters: Record<string, any>) => void;
  onReset: () => void;
}

export function AdvancedFilterModal({
  open,
  onOpenChange,
  filters,
  onApply,
  onReset,
}: AdvancedFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>(filters);

  const updateFilter = (key: string, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === undefined || value === '' ? undefined : value,
    }));
  };

  const toggleArrayValue = (key: string, value: string) => {
    const current = localFilters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateFilter(key, updated.length > 0 ? updated : undefined);
  };

  const handleApply = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(localFilters).filter(([_, value]) => value !== undefined)
    );
    onApply(cleanedFilters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
    onOpenChange(false);
  };

  const activeFilterCount = Object.keys(localFilters).filter(
    key => localFilters[key] !== undefined
  ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>
            Apply multiple filters to refine your transaction search
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="card">Card Intelligence</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DateRangePicker
                  date={localFilters.dateRange || { from: undefined, to: undefined }}
                  onDateChange={(value) => updateFilter('dateRange', value)}
                />
              </div>

              <Separator />

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['settled', 'pending', 'failed', 'refunded', 'disputed'].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={localFilters.status?.includes(status)}
                        onCheckedChange={() => toggleArrayValue('status', status)}
                      />
                      <label htmlFor={`status-${status}`} className="text-sm capitalize">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Gateway */}
              <div className="space-y-2">
                <Label>Gateway</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Stripe', 'Authorize.net', 'Braintree', 'Square', 'Plaid'].map((gateway) => (
                    <div key={gateway} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gateway-${gateway}`}
                        checked={localFilters.gateway?.includes(gateway)}
                        onCheckedChange={() => toggleArrayValue('gateway', gateway)}
                      />
                      <label htmlFor={`gateway-${gateway}`} className="text-sm">
                        {gateway}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Amount Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Min Amount</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="0.00"
                    value={localFilters.minAmount || ''}
                    onChange={(e) => updateFilter('minAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Max Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="5000.00"
                    value={localFilters.maxAmount || ''}
                    onChange={(e) => updateFilter('maxAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </div>
              </div>

              <Separator />

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={localFilters.currency || ''}
                  onValueChange={(value) => updateFilter('currency', value)}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="card" className="space-y-4 pt-4">
              {/* Card Brand */}
              <div className="space-y-2">
                <Label>Card Brand</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['visa', 'mastercard', 'amex', 'discover'].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={localFilters.cardBrand?.includes(brand)}
                        onCheckedChange={() => toggleArrayValue('cardBrand', brand)}
                      />
                      <label htmlFor={`brand-${brand}`} className="text-sm capitalize">
                        {brand === 'amex' ? 'American Express' : brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Card Type */}
              <div className="space-y-2">
                <Label>Card Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['credit', 'debit', 'prepaid'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={localFilters.cardType?.includes(type)}
                        onCheckedChange={() => toggleArrayValue('cardType', type)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm capitalize">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Interchange Level */}
              <div className="space-y-2">
                <Label>Interchange Level</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['L1', 'L2', 'L3', 'downgraded'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={localFilters.level?.includes(level)}
                        onCheckedChange={() => toggleArrayValue('level', level)}
                      />
                      <label htmlFor={`level-${level}`} className="text-sm">
                        {level === 'downgraded' ? 'Downgraded' : `Level ${level.slice(1)}`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Issuer Country */}
              <div className="space-y-2">
                <Label htmlFor="issuerCountry">Issuer Country</Label>
                <Select
                  value={localFilters.issuerCountry || ''}
                  onValueChange={(value) => updateFilter('issuerCountry', value)}
                >
                  <SelectTrigger id="issuerCountry">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Commercial Card */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCommercial"
                  checked={localFilters.isCommercial === true}
                  onCheckedChange={(checked) => updateFilter('isCommercial', checked ? true : undefined)}
                />
                <label htmlFor="isCommercial" className="text-sm">
                  Commercial Cards Only
                </label>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4">
              {/* CEDP Enabled */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cedpEnabled"
                  checked={localFilters.cedpEnabled === true}
                  onCheckedChange={(checked) => updateFilter('cedpEnabled', checked ? true : undefined)}
                />
                <label htmlFor="cedpEnabled" className="text-sm">
                  CEDP Enabled Only
                </label>
              </div>

              <Separator />

              {/* Risk Score Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minRisk">Min Risk Score</Label>
                  <Input
                    id="minRisk"
                    type="number"
                    placeholder="0"
                    value={localFilters.minRisk || ''}
                    onChange={(e) => updateFilter('minRisk', e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRisk">Max Risk Score</Label>
                  <Input
                    id="maxRisk"
                    type="number"
                    placeholder="100"
                    value={localFilters.maxRisk || ''}
                    onChange={(e) => updateFilter('maxRisk', e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
              </div>

              <Separator />

              {/* Customer Email */}
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="customer@example.com"
                  value={localFilters.customerEmail || ''}
                  onChange={(e) => updateFilter('customerEmail', e.target.value)}
                />
              </div>

              <Separator />

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  placeholder="txn_..."
                  value={localFilters.transactionId || ''}
                  onChange={(e) => updateFilter('transactionId', e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset All
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
