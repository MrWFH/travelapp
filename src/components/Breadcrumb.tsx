import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-1.5 text-sm ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} className="text-neutral-5" />}
            {isLast || !item.path ? (
              <span className={isLast ? 'text-neutral-2 font-medium' : 'text-neutral-4'}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-neutral-4 hover:text-primary-1 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
