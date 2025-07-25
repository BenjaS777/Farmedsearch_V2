import { cn } from '@/lib/utils';
    import { Slot } from '@radix-ui/react-slot';
    import { cva } from 'class-variance-authority';
    import React from 'react';
    import { motion } from 'framer-motion';

    const buttonVariants = cva(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        variants: {
          variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive:
              'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline:
              'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
            secondary:
              'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-12 rounded-lg px-8 text-base', // Aumentado el padding y tamaño de texto para lg
            icon: 'h-10 w-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      },
    );

    const Button = React.forwardRef(({ className, variant, size, asChild = false, children, ...props }, ref) => {
      const Comp = asChild ? Slot : motion.button;
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
          whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
          {...props}
        >
          {children}
        </Comp>
      );
    });
    Button.displayName = 'Button';

    export { Button, buttonVariants };