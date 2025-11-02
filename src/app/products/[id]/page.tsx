'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { Container } from '@/components/layout/container';
import { ProductDetail } from '@/components/product/product-detail';
import { ReviewList } from '@/components/review/review-list';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { productApi } from '@/lib/api/products';
import { inventoryApi } from '@/lib/api/inventory';
import { reviewApi } from '@/lib/api/reviews';
import { Product } from '@/lib/types/product';
import { StockStatus } from '@/lib/types/inventory';
import { Review } from '@/lib/types/review';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [stockStatus, setStockStatus] = useState<StockStatus>('in-stock');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProductDetails() {
      try {
        setLoading(true);
        setError(null);

        // Fetch product, stock, and reviews in parallel
        const [productData, reviewsData] = await Promise.all([
          productApi.getProduct(id),
          reviewApi.getProductReviews(id).catch(() => []), // Reviews optional
        ]);

        setProduct(productData);
        
        // Fetch stock using SKU
        if (productData.sku) {
          const stockData = await inventoryApi.getStockStatusBySku(productData.sku, productData.id);
          setStockStatus(stockData.status);
        }
        
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-12">
        <Alert variant="error">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Product not found'}
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <ProductDetail product={product} stockStatus={stockStatus} />

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Customer Reviews
          </h2>
          <ReviewList reviews={reviews} />
        </div>
      </Container>
    </div>
  );
}
