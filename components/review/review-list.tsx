import { Review } from '@/lib/types/review';
import { ReviewCard } from './review-card';

interface ReviewListProps {
  reviews: Review[];
  onVote?: (reviewId: number, type: 'upvote' | 'downvote') => void;
}

export function ReviewList({ reviews, onVote }: Readonly<ReviewListProps>) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onVote={onVote} />
      ))}
    </div>
  );
}
