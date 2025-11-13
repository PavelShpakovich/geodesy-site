import { Star } from 'lucide-react';
import { ARIA } from '@/lib/constants/text';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = 16, className = '' }: StarRatingProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}
          aria-hidden='true'
        />
      ))}
      <span className='sr-only'>{ARIA.STAR_RATING(rating, maxRating)}</span>
    </div>
  );
}
