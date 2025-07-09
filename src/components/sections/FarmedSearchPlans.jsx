import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ShieldCheck, CalendarClock, FolderKanban } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FarmedSearchPlans = () => {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica aún no está implementada, ¡pero no te preocupes! Puedes solicitarla en tu próximo mensaje. 🚀",
      variant: "default",
    });
  };

  const benefits = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: 'Duerme tranquilo/a con el Guardián de Mezclas',
      description: '¿Te preocupa si tus remedios chocan entre sí? Nuestro sistema inteligente te alerta al instante sobre combinaciones riesgosas. Es la seguridad que no encuentras en Google.',
    },
    {
      icon: <CalendarClock className="h-10 w-10 text-primary" />,
      title: 'Nunca más una dosis olvidada',
      description: 'Recibe recordatorios claros en tu celular para el remedio correcto, a la hora correcta. Cuidar de ti o de los tuyos nunca fue tan fácil.',
    },
    {
      icon: <FolderKanban className="h-10 w-10 text-primary" />,
      title: 'Toda tu información, clara y en un solo lugar',
      description: 'Se acabaron los papeles y las dudas. Ten tu lista completa de remedios y horarios siempre a mano, lista para compartir con tu médico o un familiar.',
    },
  ];

  const plans = [
    {
      title: 'Plan Personal',
      idealFor: 'Tomar las riendas de tu propio tratamiento.',
      price: '$4.990',
      period: '/ mes',
      specialOffer: '¡Pruébalo GRATIS por 7 días!',
      offerNote: '(se requiere tarjeta)',
      buttonText: 'Comenzar mis 7 días gratis',
      isFeatured: false,
    },
    {
      title: 'Plan Familiar',
      idealFor: 'Cuidar de tus seres queridos con total seguridad.',
      price: '$7.990',
      period: '/ mes',
      additionalText: 'Incluye todo lo del plan personal, pero para gestionar hasta 3 perfiles.',
      buttonText: 'Proteger a mi familia ahora',
      isFeatured: true,
    },
    {
      title: 'Acompañamiento Experto',
      idealFor: 'La máxima tranquilidad con la guía de un profesional.',
      price: '$49.990',
      period: '(Pago único)',
      additionalText: 'Incluye el Plan Familiar + 4 semanas de seguimiento personalizado con un Químico Farmacéutico.',
      buttonText: 'Quiero la guía de un experto',
      isFeatured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 md:py-24 bg-background text-card-foreground"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-title mb-4">
            ¿Tomas más de un remedio?
          </h2>
          <p className="text-xl md:text-2xl text-text-title/90 mb-6">La verdadera tranquilidad no está en entender uno, sino en controlar cómo se llevan TODOS entre sí.</p>
          <p className="text-lg text-muted-foreground">
            Deja atrás el miedo a las mezclas peligrosas y la confusión de los horarios. Con <strong className="font-semibold text-primary">FarmedSearch</strong>, retoma el control de tu salud y la de tu familia. Te presentamos tu guía personal de remedios.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-24"
        >
          {benefits.map((benefit, index) => (
            <motion.div variants={itemVariants} key={index} className="text-center p-6 bg-card rounded-xl shadow-soft transition-transform duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold font-heading text-text-title mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-title">Tenemos un plan para devolverte la paz mental</h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {plans.map((plan, index) => (
            <motion.div variants={itemVariants} key={index} className="h-full">
              <Card className={`flex flex-col h-full rounded-xl shadow-soft-lg transition-all duration-300 ${plan.isFeatured ? 'border-primary border-2 scale-105 bg-background-alt' : 'bg-card'}`}>
                {plan.isFeatured && (
                  <div className="text-center py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-t-lg text-sm">
                    La más elegida por cuidadores
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold font-heading text-text-title">{plan.title}</CardTitle>
                  <CardDescription className="text-muted-foreground h-12">{plan.idealFor}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between text-center px-6 pb-8">
                  <div>
                    <div className="my-6">
                      <span className="text-5xl font-extrabold font-heading text-text-title">{plan.price}</span>
                      <span className="text-lg text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    {plan.specialOffer && (
                        <div className="mb-4 text-secondary font-semibold">
                            <p>{plan.specialOffer}</p>
                            <p className="text-xs text-muted-foreground">{plan.offerNote}</p>
                        </div>
                    )}
                    {plan.additionalText && (
                        <p className="text-muted-foreground mb-6 min-h-[48px]">{plan.additionalText}</p>
                    )}
                  </div>
                  <Button onClick={handleButtonClick} size="lg" className={`w-full text-lg py-6 mt-4 ${plan.isFeatured ? 'bg-primary hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-muted-foreground">Una inversión en tu tranquilidad, respaldada por la confianza de <strong className="text-primary font-semibold">FarmedSearch</strong>.</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FarmedSearchPlans;