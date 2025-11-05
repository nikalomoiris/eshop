'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Review } from '@/lib/types/review';
import { Rating } from '@/components/ui/rating';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReviewCardProps {
  review: Review;
  onVote?: (reviewId: number, type: 'upvote' | 'downvote') => void;
}

export function ReviewCard({ review, onVote }: Readonly<ReviewCardProps>) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: 'upvote' | 'downvote') => {
    if (isVoting || !onVote) return;
    
    setIsVoting(true);
    try {
      await onVote(review.id, type);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Rating rating={review.rating} size="sm" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('upvote')}
                disabled={isVoting}
                className="gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">{review.upvotes || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('downvote')}
                disabled={isVoting}
                className="gap-1"
              >
                <ThumbsDown className="h-4 w-4" />
                <span className="text-xs">{review.downvotes || 0}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
