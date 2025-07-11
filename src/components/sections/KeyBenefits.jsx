import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase as BriefcaseMedical, MessageCircle, MapPin, BrainCircuit, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const newBenefits = [
  {
    icon: <BriefcaseMedical className="h-10 w-10" />,
    title: 'Hecho por un Farmacéutico',
    description: 'Información validada por un profesional chileno. No inventamos ni confundimos medicamentos.',
  },
  {
    icon: <MessageCircle className="h-10 w-10" />,
    title: 'Lenguaje que Entiendes',
    description: 'Sin tecnicismos, sin Wikipedia. Explicaciones como si te las contara alguien de confianza.',
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: 'Adaptado a Chile',
    description: 'Reconoce marcas como Tapsin, Flemex o Xigduo XR. No necesitas saber el principio activo.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10" />,
    title: 'IA Optimizada para Medicamentos',
    description: 'No es cualquier ChatGPT. Esta IA está entrenada para responder sobre remedios de forma segura y directa.',
  },
];

const KeyBenefits = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  return (
    <section id="cómo-funciona" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="card-float">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              ¿Por qué FarmedSearch y no cualquier IA?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Sabemos que podrías buscar en otro lado, pero aquí todo está pensado para ti.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="glass-card text-center h-full hover:shadow-float-hover transition-all duration-500 group hover:scale-105">
                  <CardHeader className="pt-8 pb-4">
                    <motion.div 
                      className={`mx-auto mb-5 p-4 rounded-full inline-block transition-all duration-300 ${
                        index % 2 === 0 
                          ? 'bg-aqua-500/20 group-hover:bg-aqua-500/30' 
                          : 'bg-sky-500/20 group-hover:bg-sky-500/30'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {React.cloneElement(benefit.icon, { 
                        className: `h-10 w-10 transition-colors duration-300 ${
                          index % 2 === 0 
                            ? 'text-aqua-400 group-hover:text-aqua-300' 
                            : 'text-sky-400 group-hover:text-sky-300'
                        }`
                      })}
                    </motion.div>
                    <CardTitle className="text-xl font-heading text-white group-hover:text-aqua-300 transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
