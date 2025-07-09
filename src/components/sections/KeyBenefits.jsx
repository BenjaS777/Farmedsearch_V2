import React from 'react';
    import { motion } from 'framer-motion';
    import { Briefcase as BriefcaseMedical, MessageCircle, MapPin, BrainCircuit, Sparkles } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const newBenefits = [
      {
        icon: <BriefcaseMedical className="h-10 w-10 text-primary" />,
        title: 'Hecho por un Farmacéutico',
        description: 'Información validada por un profesional chileno. No inventamos ni confundimos medicamentos.',
      },
      {
        icon: <MessageCircle className="h-10 w-10 text-secondary" />,
        title: 'Lenguaje que Entiendes',
        description: 'Sin tecnicismos, sin Wikipedia. Explicaciones como si te las contara alguien de confianza.',
      },
      {
        icon: <MapPin className="h-10 w-10 text-primary" />,
        title: 'Adaptado a Chile',
        description: 'Reconoce marcas como Tapsin, Flemex o Xigduo XR. No necesitas saber el principio activo.',
      },
      {
        icon: <BrainCircuit className="h-10 w-10 text-secondary" />,
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
        <section id="cómo-funciona" className="py-16 md:py-24 bg-background-alt">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-title mb-4">
                ¿Por qué FarmedSearch y no cualquier IA?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Sabemos que podrías buscar en otro lado, pero aquí todo está pensado para ti.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {newBenefits.map((benefit, index) => (
                <motion.custom
                  key={benefit.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="h-full"
                >
                  <Card className="text-center h-full bg-card shadow-soft-md hover:shadow-soft-lg transition-all duration-300 rounded-xl overflow-hidden group">
                    <CardHeader className="pt-8 pb-4">
                      <motion.div 
                        className="mx-auto mb-5 p-4 bg-accent/30 rounded-full inline-block transition-colors duration-300 group-hover:bg-accent/50"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {React.cloneElement(benefit.icon, { className: `h-10 w-10 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'} transition-colors duration-300 group-hover:text-white`})}
                      </motion.div>
                      <CardTitle className="text-xl font-heading text-card-foreground">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-8">
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.custom>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default KeyBenefits;