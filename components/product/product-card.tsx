'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';
import { StockStatus } from '@/lib/types/inventory';

interface ProductCardProps {
  product: Product;
  stockStatus?: StockStatus;
}

const stockBadgeVariant = {
  'in-stock': 'success' as const,
  'low-stock': 'warning' as const,
  'out-of-stock': 'destructive' as const,
};

const stockLabel = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
};

export function ProductCard({ product, stockStatus = 'in-stock' }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md dark:hover:shadow-slate-700">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                No Image
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                {product.name}
              </h3>
              <Badge variant={stockBadgeVariant[stockStatus]}>
                {stockLabel[stockStatus]}
              </Badge>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {formatPrice(product.price)}
              </span>
              {product.category && (
                <span className="text-xs text-slate-500 dark:text-slate-400">{product.category}</span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={stockStatus === 'out-of-stock'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
