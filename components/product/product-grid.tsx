import { Product } from '@/lib/types/product';
import { ProductCard } from './product-card';
import { StockStatus } from '@/lib/types/inventory';

interface ProductGridProps {
  products: Product[];
  stockInfo?: Record<string, StockStatus>;
}

export function ProductGrid({ products, stockInfo }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-slate-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          stockStatus={stockInfo?.[product.id]}
        />
      ))}
    </div>
  );
}
