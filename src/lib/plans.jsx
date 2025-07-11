import React from 'react';
import { Check, Star, Shield, Users, FileText, Bell, Heart, Crown } from 'lucide-react';

const getIcon = (isFeatured) => {
    return isFeatured 
        ? <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />
        : <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />
}

export const plansData = {
    monthly: [
        {
            planId: 1,
            title: "Plan Gratuito",
            price: 0,
            priceSuffix: "",
            billingText: "Acceso básico para siempre",
            description: "La forma más sencilla de empezar a informarte.",
            buttonText: "Crear cuenta gratis",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Búsquedas ilimitadas de medicamentos" 
                },
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Ficha simplificada y validada" 
                },
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Información básica de medicamentos" 
                },
            ],
            highlight: false,
            buttonVariant: "outline",
        },
        {
            planId: 2,
            title: "Plan Personal",
            price: 4990,
            priceSuffix: "/mes",
            billingText: "Facturado mensualmente",
            tag: "Más Popular",
            description: "Toma el control total de tu tratamiento.",
            buttonText: "Comenzar mis 7 días gratis",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Todo del Plan Gratuito" 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Botiquín Virtual (1 perfil)", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Alertas de Interacción", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Recordatorios de Tomas", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Perfil Exportable a PDF", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Historial de búsquedas", 
                    isFeatured: true 
                },
            ],
            highlight: true,
            buttonVariant: "default",
        },
        {
            planId: 3,
            title: "Plan Familiar",
            price: 7990,
            priceSuffix: "/mes",
            billingText: "Facturado mensualmente",
            description: "Cuida de los tuyos, todo en un solo lugar.",
            buttonText: "Proteger a mi familia ahora",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Todo del Plan Personal" 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Gestión de Múltiples Perfiles (hasta 3)", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Acceso a Comunidad Privada", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Soporte Prioritario", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Alertas familiares compartidas", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Dashboard familiar unificado", 
                    isFeatured: true 
                },
            ],
            highlight: false,
            buttonVariant: "default",
        },
    ],
    annually: [
        {
            planId: 1,
            title: "Plan Gratuito",
            price: 0,
            priceSuffix: "",
            billingText: "Acceso básico para siempre",
            description: "La forma más sencilla de empezar a informarte.",
            buttonText: "Crear cuenta gratis",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Búsquedas ilimitadas de medicamentos" 
                },
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Ficha simplificada y validada" 
                },
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Información básica de medicamentos" 
                },
            ],
            highlight: false,
            buttonVariant: "outline",
        },
        {
            planId: 2,
            title: "Plan Personal",
            price: 49900,
            priceSuffix: "/año",
            billingText: "Facturado anualmente - Ahorra 2 meses",
            tag: "Más Popular",
            description: "Toma el control total de tu tratamiento.",
            buttonText: "Comenzar mis 7 días gratis",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Todo del Plan Gratuito" 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Botiquín Virtual (1 perfil)", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Alertas de Interacción", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Recordatorios de Tomas", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Perfil Exportable a PDF", 
                    isFeatured: true 
                },
                { 
                    icon: <Star className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Historial de búsquedas", 
                    isFeatured: true 
                },
            ],
            highlight: true,
            buttonVariant: "default",
        },
        {
            planId: 3,
            title: "Plan Familiar",
            price: 79900,
            priceSuffix: "/año",
            billingText: "Facturado anualmente - Ahorra 2 meses",
            description: "Cuida de los tuyos, todo en un solo lugar.",
            buttonText: "Proteger a mi familia ahora",
            benefits: [
                { 
                    icon: <Check className="h-5 w-5 text-sky-400 flex-shrink-0" />, 
                    text: "Todo del Plan Personal" 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Gestión de Múltiples Perfiles (hasta 3)", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Acceso a Comunidad Privada", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Soporte Prioritario", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Alertas familiares compartidas", 
                    isFeatured: true 
                },
                { 
                    icon: <Crown className="h-5 w-5 text-aqua-400 flex-shrink-0" />, 
                    text: "Dashboard familiar unificado", 
                    isFeatured: true 
                },
            ],
            highlight: false,
            buttonVariant: "default",
        },
    ],
};
