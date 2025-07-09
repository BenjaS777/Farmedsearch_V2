/** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: ['class'],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
      ],
      theme: {
        container: {
          center: true,
          padding: '2rem',
          screens: {
            '2xl': '1400px',
          },
        },
        extend: {
          fontFamily: {
            heading: ['Montserrat', 'sans-serif'],
            text: ['Open Sans', 'sans-serif'],
          },
          colors: {
            border: 'hsl(var(--border))',
            input: {
              DEFAULT: 'hsl(var(--input))',
              foreground: 'hsl(var(--input-foreground))'
            },
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            
            primary: { /* Azul oscuro médico */
              DEFAULT: 'hsl(var(--primary))', 
              foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: { /* Verde agua CTA */
              DEFAULT: 'hsl(var(--secondary))',
              foreground: 'hsl(var(--secondary-foreground))',
            },
            
            'hero-bg-light': 'hsl(var(--hero-bg-light))',
            'header-bg': 'hsl(var(--header-bg))',
            'text-title': 'hsl(var(--text-title))',
            'accent-green': 'hsl(var(--accent-green))',
            'background-alt': 'hsl(var(--background-alt))',

            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: { /* Celeste suave para acentos */
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: { /* Blanco para tarjetas */
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
          },
          borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
          keyframes: {
            'accordion-down': {
              from: { height: 0 },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: 0 },
            },
            'float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            }
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'float': 'float 3s ease-in-out infinite',
          },
          boxShadow: {
            'soft': '0 4px 15px rgba(0, 0, 0, 0.07)',
            'soft-md': '0 6px 20px rgba(0, 0, 0, 0.09)',
            'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.1)',
            'cta-3d': '0px 4px 0px 0px hsl(var(--secondary) / 0.6)',
            'cta-3d-hover': '0px 5px 0px 0px hsl(var(--secondary) / 0.7)',
          }
        },
      },
      plugins: [require('tailwindcss-animate')],
    };