import React from 'react';
    import { motion } from 'framer-motion';
    import { Search, FileText, Smile, Mail } from 'lucide-react';

    const HowItWorks = () => {
      const steps = [
        {
          icon: <Search className="h-10 w-10 text-primary" />,
          title: "1. Busca tu medicamento",
          description: "Ingresa el nombre del medicamento que necesitas consultar en nuestro buscador inteligente.",
        },
        {
          icon: <FileText className="h-10 w-10 text-primary" />,
          title: "2. Recibe tu ficha",
          description: "Nuestra IA genera una ficha completa con información clave: para qué sirve, efectos secundarios y más.",
        },
        {
          icon: <Smile className="h-10 w-10 text-primary" />,
          title: "3. Entiende con claridad",
          description: "Accede a información farmacológica confiable, explicada en un lenguaje sencillo y fácil de entender.",
        },
        {
          icon: <Mail className="h-10 w-10 text-primary" />,
          title: "4. Recíbelo en tu correo",
          description: "Guarda una copia de la ficha en tu correo para consultarla cuando la necesites.",
        }
      ];

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      };

      return (
        <section id="cómo-funciona" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-heading font-bold text-text-title"
              >
                Así de fácil es entender tu medicamento
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                En solo cuatro simples pasos, obtén la información que necesitas sobre tu salud.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6 bg-card rounded-xl shadow-soft-lg border border-border"
                >
                  <div className="flex justify-center items-center mb-5">
                    <div className="p-4 bg-accent rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-title mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      );
    };

    export default HowItWorks;