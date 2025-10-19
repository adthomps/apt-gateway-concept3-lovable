import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { 
  Package, 
  Plus, 
  DollarSign,
  Tag
} from "lucide-react";

export function CatalogSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catalog</h1>
          <p className="text-muted-foreground">Manage products and pricing for your services</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Add Price
          </Button>
          <Button className="bg-gradient-primary shadow-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="prices">Prices</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="mt-6">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Package}
                title="No products yet"
                description="Create products that you can use in invoices, payment links, and subscriptions"
                action={{
                  label: "Add Product",
                  onClick: () => console.log("Add product")
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prices" className="mt-6">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle>Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Tag}
                title="No prices yet"
                description="Create pricing options for your products including one-time, recurring, and usage-based pricing"
                action={{
                  label: "Add Price",
                  onClick: () => console.log("Add price")
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
