import React from 'react';
    import { motion } from 'framer-motion';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

    const faqs = [
      {
        question: '¿Qué medicamentos puedo buscar?',
        answer: 'Puedes buscar una amplia gama de medicamentos comerciales disponibles en Chile. Nuestra IA está entrenada para reconocerlos y proporcionar información relevante.',
      },
      {
        question: '¿La información está validada?',
        answer: 'Sí, toda la información es procesada por nuestra IA y validada cruzando datos de fuentes oficiales como la FDA (Administración de Alimentos y Medicamentos de EE. UU.) y MedlinePlus.',
      },
      {
        question: '¿Qué hace la IA?',
        answer: 'Nuestra Inteligencia Artificial personalizada analiza tu consulta, busca en bases de datos farmacológicas y simplifica la información técnica para que sea fácil de entender por cualquier persona.',
      },
      {
        question: '¿Cuáles son las fuentes de los datos?',
        answer: 'Utilizamos principalmente información de la FDA, MedlinePlus y otras agencias reguladoras de medicamentos reconocidas internacionalmente, adaptándola al contexto chileno cuando es posible.',
      },
    ];

    const FAQ = () => {
      return (
        <section id="faq" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-text-title"
            >
              Preguntas Frecuentes
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-xl shadow-soft-lg border border-border"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-b-border/70">
                    <AccordionTrigger className="text-lg font-semibold text-card-foreground hover:text-primary py-5 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 pt-2 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      );
    };

    export default FAQ;