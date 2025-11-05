'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { productApi } from '@/lib/api/products';
import { inventoryApi } from '@/lib/api/inventory';
import { Product } from '@/lib/types/product';
import { InventoryItem } from '@/lib/types/inventory';
import { formatPrice } from '@/lib/utils/format';
import { Package, AlertCircle } from 'lucide-react';

interface ProductWithInventory extends Product {
  inventory?: InventoryItem;
}

export default function InventoryManagementPage() {
  const [products, setProducts] = useState<ProductWithInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingProduct, setUpdatingProduct] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all products
      const productData = await productApi.getProducts();
      const productsList = productData.products || [];

      // Fetch inventory for each product
      const productsWithInventory = await Promise.all(
        productsList.map(async (product) => {
          if (product.sku) {
            try {
              const inventory = await inventoryApi.getInventoryBySku(product.sku);
              return { ...product, inventory };
            } catch {
              // No inventory record found
              return product;
            }
          }
          return product;
        })
      );

      setProducts(productsWithInventory);

      // Initialize quantities from inventory
      const initialQuantities: Record<string, string> = {};
      for (const product of productsWithInventory) {
        const productWithInv = product as ProductWithInventory;
        if (productWithInv.inventory) {
          initialQuantities[product.id.toString()] = productWithInv.inventory.quantity.toString();
        }
      }
      setQuantities(initialQuantities);
    } catch (err) {
      setError('Failed to load inventory data. Please try again later.');
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string | number, value: string) => {
    setQuantities((prev) => ({ ...prev, [productId.toString()]: value }));
  };

  const handleUpdateQuantity = async (productId: string | number) => {
    const newQuantity = quantities[productId.toString()];
    if (!newQuantity || Number.isNaN(Number.parseInt(newQuantity, 10))) {
      return;
    }

    setUpdatingProduct(typeof productId === 'number' ? productId : Number.parseInt(productId, 10));
    try {
      // Call the inventory API to update quantity
      const response = await fetch(`/api/inventory/${productId}/quantity/${newQuantity}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to update inventory');
      }

      // Reload inventory data to show updated values
      await loadInventoryData();
    } catch (err) {
      console.error('Error updating inventory:', err);
      setError('Failed to update inventory. Please try again.');
    } finally {
      setUpdatingProduct(null);
    }
  };

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (quantity < 10) {
      return <Badge variant="warning">Low Stock</Badge>;
    }
    return <Badge variant="success">In Stock</Badge>;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Inventory Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage stock levels for all products
          </p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {products.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="mb-4 h-12 w-12 text-slate-400 dark:text-slate-600" />
                <p className="text-slate-600 dark:text-slate-400">No products found</p>
              </CardContent>
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr,auto,auto]">
                    {/* Product Info */}
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {product.name}
                      </h3>
                      <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                        SKU: {product.sku || 'N/A'} • {formatPrice(product.price)}
                      </p>
                      {product.inventory ? (
                        <div className="flex items-center gap-2">
                          {getStockBadge(product.inventory.quantity)}
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Available: {product.inventory.quantity}
                            {(product.inventory.reservedQuantity || 0) > 0 && (
                              <> • Reserved: {product.inventory.reservedQuantity}</>
                            )}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline">No Inventory Record</Badge>
                      )}
                    </div>

                    {/* Quantity Input */}
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={quantities[product.id.toString()] || ''}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        placeholder="Quantity"
                        className="w-24"
                        disabled={updatingProduct !== null && updatingProduct === (typeof product.id === 'number' ? product.id : Number.parseInt(product.id.toString(), 10))}
                      />
                    </div>

                    {/* Update Button */}
                    <div className="flex items-center">
                      <Button
                        onClick={() => handleUpdateQuantity(product.id)}
                        disabled={
                          (updatingProduct !== null && updatingProduct === (typeof product.id === 'number' ? product.id : Number.parseInt(product.id.toString(), 10))) ||
                          !quantities[product.id.toString()] ||
                          quantities[product.id.toString()] === product.inventory?.quantity.toString()
                        }
                        size="sm"
                      >
                        {updatingProduct !== null && updatingProduct === (typeof product.id === 'number' ? product.id : Number.parseInt(product.id.toString(), 10)) ? 'Updating...' : 'Update'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
