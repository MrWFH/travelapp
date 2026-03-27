import { Users, Fuel, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from '@/components/Rating';
import Button from '@/components/Button';

interface CarCardProps {
  id?: number;
  image: string;
  name: string;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  price: number;
  rating: number;
  reviewCount: number;
  className?: string;
}

function CarCard({
  id = 1,
  image,
  name,
  type,
  seats,
  transmission,
  fuel,
  price,
  rating,
  reviewCount,
  className = '',
}: CarCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-6 overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <div className="aspect-[16/10] bg-neutral-7 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-neutral-2">{name}</h3>
            <span className="text-xs text-neutral-4">{type}</span>
          </div>
          <Rating score={rating} count={reviewCount} size="sm" />
        </div>
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-4">
          <span className="flex items-center gap-1">
            <Users size={14} /> {seats}座
          </span>
          <span className="flex items-center gap-1">
            <Settings2 size={14} /> {transmission}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={14} /> {fuel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-1">¥{price}</span>
            <span className="text-sm text-neutral-4"> /天</span>
          </div>
          <Link to={`/car-rentals/${id}`}>
            <Button size="sm">租车</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
