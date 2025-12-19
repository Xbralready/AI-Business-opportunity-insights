import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-primary)] text-white
    hover:bg-[var(--color-primary-hover)]
    active:scale-[0.98]
    disabled:bg-[var(--color-text-tertiary)] disabled:cursor-not-allowed
    shadow-sm
  `,
  secondary: `
    bg-[var(--color-primary-light)] text-[var(--color-primary)]
    hover:bg-[rgba(0,122,255,0.18)]
    active:scale-[0.98]
    disabled:bg-[var(--color-separator)] disabled:text-[var(--color-text-tertiary)] disabled:cursor-not-allowed
  `,
  tertiary: `
    bg-transparent text-[var(--color-primary)]
    hover:bg-[var(--color-primary-light)]
    active:scale-[0.98]
    disabled:text-[var(--color-text-tertiary)] disabled:cursor-not-allowed
  `,
  danger: `
    bg-[var(--color-danger)] text-white
    hover:bg-[#E63329]
    active:scale-[0.98]
    disabled:bg-[var(--color-text-tertiary)] disabled:cursor-not-allowed
  `,
  success: `
    bg-[var(--color-success)] text-white
    hover:bg-[#2DB350]
    active:scale-[0.98]
    disabled:bg-[var(--color-text-tertiary)] disabled:cursor-not-allowed
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-[14px] gap-1.5 rounded-lg',
  md: 'h-11 px-4 text-[15px] gap-2 rounded-[10px]',
  lg: 'h-[52px] px-6 text-[17px] gap-2.5 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center
          font-semibold
          transition-all duration-150 ease-out
          select-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon size={iconSize} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/* Icon Button - For icon-only buttons with tooltip */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string; /* Required for accessibility */
  variant?: 'default' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const iconButtonVariants: Record<string, string> = {
  default: `
    bg-[var(--color-separator)] text-[var(--color-text-primary)]
    hover:bg-[var(--color-background-secondary)]
    active:scale-95
  `,
  primary: `
    bg-[var(--color-primary-light)] text-[var(--color-primary)]
    hover:bg-[rgba(0,122,255,0.18)]
    active:scale-95
  `,
  danger: `
    bg-[var(--color-danger-light)] text-[var(--color-danger)]
    hover:bg-[rgba(255,59,48,0.18)]
    active:scale-95
  `,
};

const iconButtonSizes: Record<string, { button: string; icon: number }> = {
  sm: { button: 'w-8 h-8', icon: 16 },
  md: { button: 'w-10 h-10', icon: 18 },
  lg: { button: 'w-12 h-12', icon: 20 },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const sizeConfig = iconButtonSizes[size];

    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        className={`
          inline-flex items-center justify-center
          rounded-full
          transition-all duration-150 ease-out
          ${iconButtonVariants[variant]}
          ${sizeConfig.button}
          ${className}
        `}
        {...props}
      >
        <Icon size={sizeConfig.icon} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
