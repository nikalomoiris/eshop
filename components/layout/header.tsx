'use client';

import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-xl font-bold">E-Shop</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-md mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Orders
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
