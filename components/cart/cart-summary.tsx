'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';

export function CartSummary() {
  const router = useRouter();
  const { total, itemCount } = useCartStore();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Items ({itemCount})</span>
          <span className="font-medium">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="font-medium">FREE</span>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={itemCount === 0}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
