import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary-1 text-white hover:bg-primary-1/90',
  outline: 'border border-neutral-5 text-neutral-2 hover:border-primary-1 hover:text-primary-1 bg-transparent',
  ghost: 'text-neutral-4 hover:text-neutral-2 hover:bg-neutral-7 bg-transparent',
  neutral: 'bg-neutral-2 text-white hover:bg-neutral-3',
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

export default Button;
