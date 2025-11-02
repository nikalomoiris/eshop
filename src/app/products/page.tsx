'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/product/product-grid';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { productApi } from '@/lib/api/products';
import { inventoryApi } from '@/lib/api/inventory';
import { Product } from '@/lib/types/product';
import { StockStatus } from '@/lib/types/inventory';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockInfo, setStockInfo] = useState<Record<string, StockStatus>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products
        const response = await productApi.getProducts({ pageSize: 20 });
        setProducts(response.products);

        // Fetch stock info for all products using SKU
        const productsWithSku = response.products.map((p) => ({ 
          id: p.id, 
          sku: p.sku 
        }));
        const stock = await inventoryApi.checkStockByProducts(productsWithSku);
        
        const stockMap: Record<string, StockStatus> = {};
        for (const [id, info] of Object.entries(stock)) {
          stockMap[id] = info.status;
        }
        setStockInfo(stockMap);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">All Products</h1>
          <p className="mt-2 text-slate-600">
            Browse our complete collection of products
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <Alert variant="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <ProductGrid products={products} stockInfo={stockInfo} />
        )}
      </Container>
    </div>
  );
}
