import Link from 'next/link';
import { ShoppingBag, Package, Truck, Shield } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold">
              Welcome to E-Shop
            </h1>
            <p className="mb-8 text-xl text-slate-200">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free shipping.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Shop With Us
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Package className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  Wide Selection
                </h3>
                <p className="text-sm text-slate-600">
                  Thousands of products across multiple categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Truck className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  Free Shipping
                </h3>
                <p className="text-sm text-slate-600">
                  Enjoy free shipping on all orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Shield className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  Secure Payment
                </h3>
                <p className="text-sm text-slate-600">
                  Your transactions are safe and secure
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <ShoppingBag className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  Easy Returns
                </h3>
                <p className="text-sm text-slate-600">
                  Hassle-free returns within 30 days
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Ready to Start Shopping?
            </h2>
            <p className="mb-8 text-slate-600">
              Browse our extensive catalog and find exactly what you need.
            </p>
            <Link href="/products">
              <Button size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

