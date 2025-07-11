import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Fondo y estructura base
        'flex h-10 w-full rounded-md border border-white/20 bg-white/90 backdrop-blur-md px-3 py-2 text-sm',
        // TEXTO OSCURO PARA MÁXIMA VISIBILIDAD
        'text-gray-900 font-medium',
        // PLACEHOLDER OSCURO Y VISIBLE
        'placeholder:text-gray-600 placeholder:font-normal',
        // Focus states con glassmorfismo
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-400 focus-visible:ring-offset-0 focus-visible:border-aqua-400 focus-visible:bg-white/95',
        // Estados adicionales
        'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
        // Hover state
        'hover:bg-white/95 hover:border-aqua-300',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
