import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', hover = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-[var(--color-card-background)]
          rounded-xl
          shadow-[var(--shadow-card)]
          ${paddingStyles[padding]}
          ${hover ? 'transition-shadow hover:shadow-[var(--shadow-md)] cursor-pointer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/* Card Header */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-start justify-between mb-4 ${className}`}
        {...props}
      >
        <div>
          <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)] leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0 ml-4">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/* Card Section - For grouping content within a card */
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  bordered?: boolean;
}

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ title, bordered = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          ${bordered ? 'pt-4 mt-4 border-t border-[var(--color-separator)]' : ''}
          ${className}
        `}
        {...props}
      >
        {title && (
          <h4 className="text-[13px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
            {title}
          </h4>
        )}
        {children}
      </div>
    );
  }
);

CardSection.displayName = 'CardSection';

/* Stat Card - For displaying key metrics */
interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: string; positive: boolean };
  icon?: ReactNode;
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
}

const statColorStyles = {
  default: 'text-[var(--color-text-primary)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  danger: 'text-[var(--color-danger)]',
  info: 'text-[var(--color-info)]',
  primary: 'text-[var(--color-primary)]',
};

const statBgStyles = {
  default: 'bg-[var(--color-background)]',
  success: 'bg-[var(--color-success-light)]',
  warning: 'bg-[var(--color-warning-light)]',
  danger: 'bg-[var(--color-danger-light)]',
  info: 'bg-[var(--color-info-light)]',
  primary: 'bg-[var(--color-primary-light)]',
};

export const StatCard = ({ label, value, trend, icon, color = 'default' }: StatCardProps) => {
  return (
    <div className={`${statBgStyles[color]} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{label}</span>
        {icon && <span className={statColorStyles[color]}>{icon}</span>}
      </div>
      <div className={`text-[24px] font-bold ${statColorStyles[color]} leading-none`}>
        {value}
      </div>
      {trend && (
        <div className={`mt-2 text-[12px] font-medium ${trend.positive ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
};

export default Card;
