import { Search, MapPin, Calendar, Users } from 'lucide-react';
import Button from '@/components/Button';

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  onSearch?: (params: SearchParams) => void;
  className?: string;
}

function SearchBar({ variant = 'hero', onSearch, className = '' }: SearchBarProps) {
  const handleSearch = () => {
    onSearch?.({
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
    });
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 bg-white rounded-full border border-neutral-6 px-4 py-2 shadow-sm ${className}`}>
        <Search size={18} className="text-neutral-4" />
        <input
          type="text"
          placeholder="搜索目的地、住宿..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-5"
        />
        <Button size="sm" onClick={handleSearch}>搜索</Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-3 ${className}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-7 transition-colors cursor-pointer">
          <MapPin size={20} className="text-primary-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-neutral-4 font-medium">目的地</div>
            <input
              type="text"
              placeholder="你想去哪里？"
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-neutral-5"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-neutral-6" />

        {/* Check-in */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-7 transition-colors cursor-pointer">
          <Calendar size={20} className="text-primary-1 shrink-0" />
          <div>
            <div className="text-xs text-neutral-4 font-medium">入住</div>
            <div className="text-sm font-medium text-neutral-5">选择日期</div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-neutral-6" />

        {/* Check-out */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-7 transition-colors cursor-pointer">
          <Calendar size={20} className="text-primary-1 shrink-0" />
          <div>
            <div className="text-xs text-neutral-4 font-medium">退房</div>
            <div className="text-sm font-medium text-neutral-5">选择日期</div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-neutral-6" />

        {/* Guests */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-7 transition-colors cursor-pointer">
          <Users size={20} className="text-primary-1 shrink-0" />
          <div>
            <div className="text-xs text-neutral-4 font-medium">旅客</div>
            <div className="text-sm font-medium text-neutral-5">添加旅客</div>
          </div>
        </div>

        <Button size="lg" leftIcon={<Search size={18} />} onClick={handleSearch}>
          搜索
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
