import { Review } from '@/lib/types/review';
import { Rating } from '@/components/ui/rating';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: Readonly<ReviewCardProps>) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Rating rating={review.rating} size="sm" />
            </div>
            <p className="text-sm text-slate-600">{review.comment}</p>
            {(review.upvotes || review.downvotes) && (
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                {review.upvotes !== undefined && (
                  <span>👍 {review.upvotes}</span>
                )}
                {review.downvotes !== undefined && (
                  <span>👎 {review.downvotes}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
