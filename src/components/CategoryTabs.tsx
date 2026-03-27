import { useState } from 'react';
import {
  Building2,
  Plane,
  Car,
  Ticket,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Category {
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: Category[] = [
  { label: '住宿', icon: Building2 },
  { label: '航班', icon: Plane },
  { label: '汽车租赁', icon: Car },
  { label: '景点门票', icon: Ticket },
  { label: '活动', icon: Sparkles },
];

interface CategoryTabsProps {
  activeIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

function CategoryTabs({ activeIndex, onChange, className = '' }: CategoryTabsProps) {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeIndex ?? internalActive;

  const handleClick = (index: number) => {
    if (onChange) {
      onChange(index);
    } else {
      setInternalActive(index);
    }
  };

  return (
    <div className={`flex items-center gap-6 overflow-x-auto pb-1 scrollbar-hide ${className}`}>
      {CATEGORIES.map((cat, i) => {
        const Icon = cat.icon;
        const isActive = i === active;
        return (
          <button
            key={cat.label}
            onClick={() => handleClick(i)}
            className={`relative flex items-center gap-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? 'text-primary-1'
                : 'text-neutral-4 hover:text-neutral-2'
            }`}
          >
            <Icon size={18} />
            <span>{cat.label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-1" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
