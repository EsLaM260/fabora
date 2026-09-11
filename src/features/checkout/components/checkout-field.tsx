import { forwardRef, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children?: ReactNode;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };
type SelectProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { as: 'select' };

export const CheckoutInput = forwardRef<HTMLInputElement, InputProps>(function CheckoutInput({ label, error, hint, className = '', ...props }, ref) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 mb-2">
        <span className="text-[10px] uppercase tracking-[.16em] font-medium">{label}</span>
        {hint && <span className="text-[10px] text-muted normal-case tracking-normal">{hint}</span>}
      </span>
      <input
        ref={ref}
        {...props}
        className={`w-full h-12 border bg-white px-4 text-sm outline-none transition-colors ${error ? 'border-red-400 focus:border-red-500' : 'thin-border focus:border-ink'} ${className}`}
      />
      {error && <span className="block text-[11px] text-red-600 mt-1.5">{error}</span>}
    </label>
  );
});

export const CheckoutSelect = forwardRef<HTMLSelectElement, SelectProps>(function CheckoutSelect({ label, error, hint, className = '', children, ...props }, ref) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 mb-2">
        <span className="text-[10px] uppercase tracking-[.16em] font-medium">{label}</span>
        {hint && <span className="text-[10px] text-muted normal-case tracking-normal">{hint}</span>}
      </span>
      <select
        ref={ref}
        {...props}
        className={`w-full h-12 border bg-white px-4 text-sm outline-none transition-colors ${error ? 'border-red-400 focus:border-red-500' : 'thin-border focus:border-ink'} ${className}`}
      >
        {children}
      </select>
      {error && <span className="block text-[11px] text-red-600 mt-1.5">{error}</span>}
    </label>
  );
});
