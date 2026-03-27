import { Plane, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

interface FlightCardProps {
  id?: number;
  airline: string;
  airlineLogo?: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: number;
  price: number;
  className?: string;
}

function FlightCard({
  id = 1,
  airline,
  departureTime,
  arrivalTime,
  departureCity,
  arrivalCity,
  departureCode,
  arrivalCode,
  duration,
  stops,
  price,
  className = '',
}: FlightCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-6 p-5 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 md:w-32">
          <div className="w-10 h-10 rounded-full bg-primary-1/10 flex items-center justify-center">
            <Plane size={18} className="text-primary-1" />
          </div>
          <span className="font-medium text-sm text-neutral-2">{airline}</span>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-neutral-1">{departureTime}</div>
            <div className="text-xs text-neutral-4">{departureCode}</div>
            <div className="text-xs text-neutral-5">{departureCity}</div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 px-4">
            <div className="flex items-center gap-1 text-xs text-neutral-4">
              <Clock size={12} />
              <span>{duration}</span>
            </div>
            <div className="w-full h-px bg-neutral-6 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-1" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-1" />
            </div>
            <div className="text-xs text-neutral-4">
              {stops === 0 ? '直飞' : `${stops} 次中转`}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold text-neutral-1">{arrivalTime}</div>
            <div className="text-xs text-neutral-4">{arrivalCode}</div>
            <div className="text-xs text-neutral-5">{arrivalCity}</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 md:w-36">
          <div>
            <span className="text-2xl font-bold text-primary-1">¥{price}</span>
            <span className="text-xs text-neutral-4">/人</span>
          </div>
          <Link to={`/flights/${id}`}>
            <Button size="sm">选择</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
