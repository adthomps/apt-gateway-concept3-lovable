import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { EnhancedData } from "@/types/card-intelligence";
import { 
  FileText, 
  Package, 
  DollarSign,
  Hash,
  Ruler,
  Tag
} from "lucide-react";

interface EnhancedDataPanelProps {
  enhancedData?: EnhancedData;
}

export function EnhancedDataPanel({ enhancedData }: EnhancedDataPanelProps) {
  if (!enhancedData || (!enhancedData.level2 && !enhancedData.level3)) {
    return (
      <EmptyState
        icon={FileText}
        title="No Enhanced Data"
        description="This transaction does not have Level 2 or Level 3 enhanced data attached"
        action={{
          label: "Learn About Enhanced Data",
          onClick: () => window.open('https://docs.example.com/enhanced-data', '_blank')
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Level 2 Data */}
      {enhancedData.level2 && (
        <Card className="bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Level 2 Data</span>
              </CardTitle>
              <Badge className="bg-primary/20 text-primary border-primary/30">L2 Qualified</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Code</p>
                <p className="font-medium">{enhancedData.level2.customerCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tax Amount</p>
                <p className="font-medium">{enhancedData.level2.taxAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tax Exempt</p>
                <Badge variant={enhancedData.level2.taxExempt ? "default" : "outline"}>
                  {enhancedData.level2.taxExempt ? "Yes" : "No"}
                </Badge>
              </div>
              {enhancedData.level2.poNumber && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">PO Number</p>
                  <p className="font-medium">{enhancedData.level2.poNumber}</p>
                </div>
              )}
              {enhancedData.level2.destinationZipCode && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Destination ZIP</p>
                  <p className="font-medium">{enhancedData.level2.destinationZipCode}</p>
                </div>
              )}
              {enhancedData.level2.invoiceNumber && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Invoice Number</p>
                  <p className="font-medium">{enhancedData.level2.invoiceNumber}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Level 3 Data */}
      {enhancedData.level3 && enhancedData.level3.lineItems && enhancedData.level3.lineItems.length > 0 && (
        <Card className="bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Package className="h-5 w-5 text-success" />
                <span>Level 3 Line Items</span>
              </CardTitle>
              <Badge className="bg-success/20 text-success border-success/30">L3 Qualified</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {enhancedData.level3.lineItems.map((item) => (
                <div key={item.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">
                          {item.productCode}
                        </Badge>
                        {item.commodityCode && (
                          <Badge variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {item.commodityCode}
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{item.total}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                        <Hash className="h-3 w-3" />
                        <span>Quantity</span>
                      </div>
                      <p className="font-medium">{item.quantity}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                        <DollarSign className="h-3 w-3" />
                        <span>Unit Price</span>
                      </div>
                      <p className="font-medium">{item.unitPrice}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                        <Ruler className="h-3 w-3" />
                        <span>Unit</span>
                      </div>
                      <p className="font-medium capitalize">{item.unitOfMeasure}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                        <DollarSign className="h-3 w-3" />
                        <span>Tax</span>
                      </div>
                      <p className="font-medium">{item.taxAmount}</p>
                    </div>
                  </div>

                  {item.discountAmount && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Discount: </span>
                      <span className="font-medium text-success">{item.discountAmount}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shipping and Summary */}
            {(enhancedData.level3.shippingAmount || enhancedData.level3.dutyAmount) && (
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                {enhancedData.level3.shippingAmount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping Amount</span>
                    <span className="font-medium">{enhancedData.level3.shippingAmount}</span>
                  </div>
                )}
                {enhancedData.level3.dutyAmount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duty Amount</span>
                    <span className="font-medium">{enhancedData.level3.dutyAmount}</span>
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            {(enhancedData.level3.destinationCountryCode || enhancedData.level3.shipFromZipCode) && (
              <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                <p className="text-sm font-medium mb-2">Shipping Information</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {enhancedData.level3.destinationCountryCode && (
                    <div>
                      <span className="text-muted-foreground">Destination: </span>
                      <span className="font-medium">{enhancedData.level3.destinationCountryCode}</span>
                    </div>
                  )}
                  {enhancedData.level3.shipFromZipCode && (
                    <div>
                      <span className="text-muted-foreground">Ship From: </span>
                      <span className="font-medium">{enhancedData.level3.shipFromZipCode}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
