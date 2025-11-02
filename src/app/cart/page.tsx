'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="mb-4 h-16 w-16 text-slate-300" />
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mb-6 text-slate-600">
              Add some products to get started!
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CartSummary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
