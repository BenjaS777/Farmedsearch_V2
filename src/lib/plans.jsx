import React from 'react';
    import { Check, Star } from 'lucide-react';

    const basePlans = {
        monthly: [
          {
            planId: 1,
            title: 'Plan Gratuito',
            price: 0,
            priceSuffix: '',
            billingText: 'Acceso básico para siempre',
            description: 'La forma más sencilla de empezar a informarte.',
            buttonText: 'Crear cuenta gratis',
            benefits: [
              { text: 'Búsqueda ilimitada de medicamentos' },
              { text: 'Ficha simplificada y validada' },
            ],
            highlight: false,
            buttonVariant: 'outline',
          },
          {
            planId: 2,
            title: 'Plan Personal',
            price: 4990,
            priceSuffix: '/ mes',
            billingText: 'facturado mensualmente',
            tag: 'Más Popular',
            description: 'Toma el control total de tu tratamiento.',
            buttonText: 'Comenzar mis 7 días gratis',
            benefits: [
                { text: 'Botiquín Virtual (1 perfil)', isFeatured: true },
                { text: 'Alertas de Interacción', isFeatured: true },
                { text: 'Recordatorios de Tomas', isFeatured: true },
                { text: 'Perfil Exportable a PDF', isFeatured: true },
            ],
            highlight: true,
            buttonVariant: 'default',
            buttonColor: 'bg-primary text-primary-foreground hover:bg-primary/90',
          },
          {
            planId: 3,
            title: 'Plan Familiar',
            price: 7990,
            priceSuffix: '/ mes',
            billingText: 'facturado mensualmente',
            description: 'Cuida de los tuyos, todo en un solo lugar.',
            buttonText: 'Proteger a mi familia ahora',
            benefits: [
                { text: 'Todo lo del Plan Personal', isFeatured: true },
                { text: 'Gestión de Múltiples Perfiles (hasta 3)', isFeatured: true },
                { text: 'Acceso a Comunidad Privada', isFeatured: true },
                { text: 'Soporte Prioritario', isFeatured: true },
            ],
            highlight: false,
            buttonVariant: 'default',
            buttonColor: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
          },
        ],
        annually: [
            {
                planId: 1,
                title: 'Plan Gratuito',
                price: 0,
                priceSuffix: '',
                billingText: 'Acceso básico para siempre',
                description: 'La forma más sencilla de empezar a informarte.',
                buttonText: 'Crear cuenta gratis',
                benefits: [
                    { text: 'Búsqueda ilimitada de medicamentos' },
                    { text: 'Ficha simplificada y validada' },
                ],
                highlight: false,
                buttonVariant: 'outline',
            },
            {
                planId: 4,
                title: 'Plan Personal',
                price: 49900,
                priceSuffix: '/ año',
                billingText: 'facturado anualmente',
                tag: 'Más Popular',
                description: 'Toma el control total de tu tratamiento.',
                buttonText: 'Comenzar mis 7 días gratis',
                benefits: [
                    { text: 'Botiquín Virtual (1 perfil)', isFeatured: true },
                    { text: 'Alertas de Interacción', isFeatured: true },
                    { text: 'Recordatorios de Tomas', isFeatured: true },
                    { text: 'Perfil Exportable a PDF', isFeatured: true },
                ],
                highlight: true,
                buttonVariant: 'default',
                buttonColor: 'bg-primary text-primary-foreground hover:bg-primary/90',
            },
            {
                planId: 5,
                title: 'Plan Familiar',
                price: 79900,
                priceSuffix: '/ año',
                billingText: 'facturado anualmente',
                description: 'Cuida de los tuyos, todo en un solo lugar.',
                buttonText: 'Proteger a mi familia ahora',
                benefits: [
                    { text: 'Todo lo del Plan Personal', isFeatured: true },
                    { text: 'Gestión de Múltiples Perfiles (hasta 3)', isFeatured: true },
                    { text: 'Acceso a Comunidad Privada', isFeatured: true },
                    { text: 'Soporte Prioritario', isFeatured: true },
                ],
                highlight: false,
                buttonVariant: 'default',
                buttonColor: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
            },
        ],
    };

    const getIcon = (isFeatured) => {
        return isFeatured 
            ? <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            : <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
    }

    export const plansData = {
        monthly: basePlans.monthly.map(plan => ({
            ...plan,
            benefits: plan.benefits.map(b => ({ ...b, icon: getIcon(b.isFeatured) }))
        })),
        annually: basePlans.annually.map(plan => ({
            ...plan,
            benefits: plan.benefits.map(b => ({ ...b, icon: getIcon(b.isFeatured) }))
        }))
    }