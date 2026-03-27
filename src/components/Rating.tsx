import { Star } from 'lucide-react';

interface RatingProps {
  score: number;
  count?: number;
  maxStars?: number;
  size?: 'sm' | 'md';
  className?: string;
}

function Rating({ score, count, maxStars = 5, size = 'md', className = '' }: RatingProps) {
  const starSize = size === 'sm' ? 14 : 16;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const filled = i < Math.round(score);
          return (
            <Star
              key={i}
              size={starSize}
              className={
                filled
                  ? 'fill-secondary-3 text-secondary-3'
                  : 'fill-none text-neutral-5'
              }
            />
          );
        })}
      </div>
      <span className={`font-semibold text-neutral-2 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {score.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={`text-neutral-4 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({count})
        </span>
      )}
    </div>
  );
}

export default Rating;
