export interface Review {
  id: number; // Backend returns Long
  productId: number; // Backend returns Long
  rating: number;
  comment: string;
  upvotes?: number; // Backend field
  downvotes?: number; // Backend field
  // Note: Backend doesn't have authorName or createdAt
}

export interface CreateReviewRequest {
  productId: number;
  rating: number;
  comment: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
