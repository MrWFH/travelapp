import { Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from '@/components/Rating';
import Tag from '@/components/Tag';

interface PropertyCardProps {
  id?: number;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  isFavorite?: boolean;
  onToggleLike?: () => void;
  className?: string;
}

function PropertyCard({
  id = 1,
  image,
  title,
  location,
  price,
  rating,
  reviewCount,
  tag,
  isFavorite = false,
  onToggleLike,
  className = '',
}: PropertyCardProps) {
  return (
    <div className={`group rounded-2xl bg-white border border-neutral-6 overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <Link to={`/stays/${id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {tag && (
          <div className="absolute top-3 left-3">
            <Tag>{tag}</Tag>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleLike?.();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-4'}
          />
        </button>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-neutral-2 line-clamp-1">{title}</h3>
          <Rating score={rating} size="sm" />
        </div>
        <div className="flex items-center gap-1 text-sm text-neutral-4 mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-1">¥{price}</span>
            <span className="text-sm text-neutral-4"> /晚</span>
          </div>
          <span className="text-xs text-neutral-4">{reviewCount} 条评价</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
