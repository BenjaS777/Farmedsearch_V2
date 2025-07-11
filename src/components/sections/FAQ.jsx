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
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="card-float max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-white"
          >
            Preguntas Frecuentes
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 md:p-8"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  value={`item-${index}`} 
                  key={index} 
                  className="glass-card border border-white/10 rounded-lg px-6 py-2 hover:shadow-float transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-lg font-semibold text-white hover:text-aqua-300 py-5 text-left transition-colors duration-300 group-hover:text-aqua-400">
                    <span className="flex items-center gap-3">
                      <span className="text-aqua-400 group-hover:text-aqua-300 transition-colors duration-300">
                        ❓
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4 pt-2 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    <div className="pl-8 border-l-2 border-aqua-400/30 ml-1">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              🤔 <strong className="text-aqua-400">¿Tienes más preguntas?</strong> Nuestro equipo está aquí para ayudarte. Contáctanos y resolveremos todas tus dudas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
