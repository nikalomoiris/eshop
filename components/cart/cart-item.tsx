'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/lib/types/cart';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: Readonly<CartItemProps>) {
  const { updateQuantity, removeItem } = useCartStore();

  const incrementQuantity = () => {
    updateQuantity(String(item.product.id), item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(String(item.product.id), item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(String(item.product.id));
  };

  return (
    <div className="flex gap-4 border-b border-slate-200 py-4">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
        {item.product.imageUrl ? (
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {item.product.description}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {formatPrice(item.product.price)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 border border-slate-300 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button variant="ghost" size="sm" onClick={incrementQuantity}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold text-slate-900">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
