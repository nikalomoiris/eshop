import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className,
}: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            index < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-slate-200 text-slate-200'
          )}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm text-slate-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
