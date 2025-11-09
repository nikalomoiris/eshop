'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { orderApi } from '@/lib/api/orders';
import { Order } from '@/lib/types/order';
import { formatPrice, formatDate } from '@/lib/utils/format';

const statusVariant = {
  pending: 'secondary' as const,
  processing: 'secondary' as const,
  shipped: 'default' as const,
  delivered: 'success' as const,
  cancelled: 'destructive' as const,
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError(null);
        const orderData = await orderApi.getOrder(id);
        setOrder(orderData);
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error('Error loading order:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <Container className="py-12">
        <Alert variant="error">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Order not found'}
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="py-12">
      <Container>
        {/* Success Message */}
        <div className="mb-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            Order Confirmed!
          </h1>
          <p className="text-slate-600">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Details</CardTitle>
                  <Badge variant={statusVariant[order.status]}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-600">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Order Date</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h3 className="mb-3 font-semibold">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-8 w-8 text-slate-400" />
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-slate-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-slate-600">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-slate-600">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-slate-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-slate-600">{order.shippingAddress.country}</p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          {item.productName} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href="/products">
                      <Button className="w-full" variant="outline">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
