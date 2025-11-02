import { apiClient } from './client';
import { Review, CreateReviewRequest } from '@/lib/types/review';

// Use Next.js API routes as proxy to avoid CORS issues
const BASE_URL = '/api';

export const reviewApi = {
  /**
   * Get reviews for a product
   */
  async getProductReviews(productId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(`${BASE_URL}/reviews/${productId}`);
  },

  /**
   * Create a new review
   */
  async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    return apiClient.post<Review>(`${BASE_URL}/reviews`, reviewData);
  },

  /**
   * Calculate average rating for a product
   */
  async getAverageRating(productId: string): Promise<number> {
    const reviews = await this.getProductReviews(productId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  },
};
