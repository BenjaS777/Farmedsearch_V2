import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck, CalendarClock, FolderKanban } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const plans = [
  {
    title: 'Plan Personal',
    description: 'Tomar las riendas de tu propio tratamiento.',
    price: '$4.990',
    period: '/ mes',
    features: ['Guardián de Mezclas', 'Recordatorios de Dosis', 'Historial Centralizado'],
    specialOffer: '¡Pruébalo GRATIS por 7 días!',
    cta: 'Comenzar mis 7 días gratis',
    highlighted: false,
  },
  {
    title: 'Plan Familiar',
    description: 'Cuidar de tus seres queridos con total seguridad.',
    price: '$7.990',
    period: '/ mes',
    features: ['Todo lo del Plan Personal', 'Gestión de hasta 3 perfiles'],
    cta: 'Proteger a mi familia ahora',
    highlighted: true,
  },
  {
    title: 'Acompañamiento Experto',
    description: 'La máxima tranquilidad con la guía de un profesional.',
    price: '$49.990',
    period: 'Pago único',
    features: ['Incluye Plan Familiar', '4 semanas de seguimiento con un Químico Farmacéutico'],
    cta: 'Quiero la guía de un experto',
    highlighted: false,
  },
];

const benefitItems = [
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: 'Duerme tranquilo/a con el Guardián de Mezclas',
        description: '¿Te preocupa si tus remedios chocan entre sí? Nuestro sistema inteligente te alerta al instante sobre combinaciones riesgosas. Es la seguridad que no encuentras en Google.'
    },
    {
        icon: <CalendarClock className="h-10 w-10 text-primary" />,
        title: 'Nunca más una dosis olvidada',
        description: 'Recibe recordatorios claros en tu celular para el remedio correcto, a la hora correcta. Cuidar de ti o de los tuyos nunca fue tan fácil.'
    },
    {
        icon: <FolderKanban className="h-10 w-10 text-primary" />,
        title: 'Toda tu información, clara y en un solo lugar',
        description: 'Se acabaron los papeles y las dudas. Ten tu lista completa de remedios y horarios siempre a mano, lista para compartir con tu médico o un familiar.'
    }
];

const FarmedSearchPlans = () => {
    const { toast } = useToast();

    const handleCTAClick = () => {
        toast({
            title: "🚧 ¡Función en desarrollo!",
            description: "Esta característica aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
        });
    };

    return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-title font-heading mb-4">¿Tomas más de un remedio? La verdadera tranquilidad no está en entender uno, sino en controlar cómo se llevan TODOS entre sí.</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Deja atrás el miedo a las mezclas peligrosas y la confusión de los horarios. Con <strong className="text-primary">FarmedSearch</strong>, retoma el control de tu salud y la de tu familia. Te presentamos tu guía personal de remedios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {benefitItems.map((item, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-soft-sm">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-text-title mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-title font-heading">Tenemos un plan para devolverte la paz mental</h3>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
                <Card 
                    key={index} 
                    className={`flex flex-col h-full rounded-xl shadow-soft-lg transition-all duration-300 ${plan.highlighted ? 'border-primary scale-105 border-2' : 'border'}`}
                >
                    {plan.highlighted && (
                        <div className="bg-primary text-center py-2 text-sm font-bold text-primary-foreground rounded-t-lg">
                            La más elegida por cuidadores
                        </div>
                    )}
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold font-heading">{plan.title}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="text-center mb-6">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                         {plan.specialOffer && (
                            <p className="text-center font-bold text-primary mt-4">{plan.specialOffer}</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button 
                            onClick={handleCTAClick} 
                            className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                            size="lg"
                        >
                            {plan.cta}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
         <div className="text-center mt-12">
            <p className="text-muted-foreground">Una inversión en tu tranquilidad, respaldada por la confianza de <strong className="text-primary">FarmedSearch</strong>.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default FarmedSearchPlans;