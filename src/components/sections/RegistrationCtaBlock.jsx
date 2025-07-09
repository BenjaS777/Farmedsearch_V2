import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase as BriefcaseMedical, Zap, BellRing } from 'lucide-react';

const RegistrationCtaBlock = () => {
  const benefits = [
    {
      icon: <BriefcaseMedical className="h-7 w-7 text-primary" />,
      text: 'Guarda todos tus medicamentos en tu Botiquín Virtual.',
    },
    {
      icon: <Zap className="h-7 w-7 text-primary" />,
      text: 'Recibe alertas automáticas de interacciones peligrosas.',
    },
    {
      icon: <BellRing className="h-7 w-7 text-primary" />,
      text: 'Configura recordatorios para no olvidar ninguna toma.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-12 md:mt-16"
    >
      <Card className="bg-gradient-to-br from-blue-50 via-background-alt to-teal-50 border-primary/20 shadow-soft-lg overflow-hidden">
        <CardContent className="p-6 md:p-8 text-center">
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold font-heading text-text-title mb-4"
          >
            ¿Tomas este medicamento junto a otros?
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg"
              >
                <div className="mb-3">{benefit.icon}</div>
                <p className="text-muted-foreground font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/registro">
                Crear mi cuenta gratis para guardar y analizar
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistrationCtaBlock;