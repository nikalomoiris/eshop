'use client';

import Image from 'next/image';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';
import { StockStatus } from '@/lib/types/inventory';

interface ProductDetailProps {
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

export function ProductDetail({ product, stockStatus = 'in-stock' }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Product Image */}
      <Card>
        <CardContent className="p-6">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <span className="text-lg">No Image Available</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
            <Badge variant={stockBadgeVariant[stockStatus]}>
              {stockLabel[stockStatus]}
            </Badge>
          </div>
          {product.category && (
            <p className="text-sm text-slate-500">{product.category}</p>
          )}
        </div>

        <div className="text-3xl font-bold text-slate-900">
          {formatPrice(product.price)}
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Description</h2>
          <p className="text-slate-600">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={stockStatus === 'out-of-stock'}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
