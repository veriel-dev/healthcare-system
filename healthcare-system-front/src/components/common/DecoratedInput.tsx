import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface DecoratedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  containerClassName?: string;
  iconClassName?: string;
  autocomplete: string;
  message: string | undefined;
}

export const DecoratedInput = React.forwardRef<HTMLInputElement, DecoratedInputProps>(
  (
    { icon: Icon, containerClassName, iconClassName, className, autocomplete, message, ...props },
    ref,
  ) => (
    <>
      <div className={cn('relative group', containerClassName)}>
        <Input
          ref={ref}
          autoComplete={autocomplete}
          className={cn(
            'pl-12 py-6',
            'bg-zinc-900 border-zinc-700',
            'text-white placeholder:text-zinc-500',
            message
              ? 'focus:border-red-500 border-red-500 focus:ring-red-500'
              : 'focus:border-teal-500 focus:ring-teal-500',
            className,
          )}
          {...props}
        />

        <Icon
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2',
            'w-5 h-5',
            iconClassName,
            message ? 'text-red-500' : 'text-teal-500',
          )}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-teal-500 stroke-[0.5px]" />
            <circle
              cx="12"
              cy="12"
              r="6"
              className="fill-none stroke-teal-500 stroke-[0.5px] animate-ping"
            />
          </svg>
        </div>
      </div>
      {/* Errors */}
      {message && (
        <div style={{ marginTop: '5px' }} className="text-red-500">
          {message}
        </div>
      )}
    </>
  ),
);
