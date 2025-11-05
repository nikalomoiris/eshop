'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { ProductDetail } from '@/components/product/product-detail';
import { ProductEditForm } from '@/components/product/product-edit-form';
import { DeleteConfirmModal } from '@/components/product/delete-confirm-modal';
import { ReviewList } from '@/components/review/review-list';
import { ReviewForm } from '@/components/review/review-form';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
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
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [stockStatus, setStockStatus] = useState<StockStatus>('in-stock');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleReviewSubmitted = async () => {
    // Reload reviews after a new review is submitted
    try {
      const reviewsData = await reviewApi.getProductReviews(id);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Failed to reload reviews:', err);
    }
  };

  const handleVote = async (reviewId: number, type: 'upvote' | 'downvote') => {
    try {
      if (type === 'upvote') {
        await reviewApi.upvoteReview(reviewId);
      } else {
        await reviewApi.downvoteReview(reviewId);
      }
      
      // Reload reviews to show updated counts
      const reviewsData = await reviewApi.getProductReviews(id);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  const handleDeleteProduct = async () => {
    try {
      await productApi.deleteProduct(id);
      // Redirect to products page after deletion
      router.push('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

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
        {/* Edit/Delete Actions */}
        <div className="mb-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>

        <ProductDetail product={product} stockStatus={stockStatus} />

        {/* Reviews Section */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Customer Reviews
            </h2>
            <ReviewList reviews={reviews} onVote={handleVote} />
          </div>

          {/* Review Form */}
          <div>
            <ReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
          </div>
        </div>

        {/* Edit Modal */}
        {product && (
          <ProductEditForm
            product={product}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onProductUpdated={handleProductUpdated}
          />
        )}

        {/* Delete Confirmation Modal */}
        {product && (
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteProduct}
            productName={product.name}
          />
        )}
      </Container>
    </div>
  );
}
