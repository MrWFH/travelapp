import type { ReactNode } from 'react';

interface TagProps {
  variant?: 'solid' | 'ghost';
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<TagProps['variant']>, string> = {
  solid: 'bg-primary-4/15 text-primary-4',
  ghost: 'border border-neutral-5 text-neutral-4 bg-transparent',
};

function Tag({ variant = 'solid', children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Tag;
