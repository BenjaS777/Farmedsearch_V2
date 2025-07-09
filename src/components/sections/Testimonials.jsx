import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonialsData = [
  {
    name: "Carolina V.",
    role: "Paciente Crónico",
    testimonial: "¡Increíble! Por fin una herramienta que me explica mis medicamentos sin términos complicados. Me da mucha más seguridad en mi tratamiento.",
    rating: 5,
  },
  {
    name: "Javier R.",
    role: "Cuidador",
    testimonial: "Uso FarmedSearch para entender los medicamentos de mi madre. La sección de interacciones es súper útil y fácil de entender. ¡Recomendadísimo!",
    rating: 5,
  },
  {
    name: "Sofía M.",
    role: "Estudiante de Enfermería",
    testimonial: "Es una guía de consulta rápida excelente. La información está bien estructurada y es confiable. Me ha salvado en más de una ocasión.",
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'
        }`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
  };

  return (
    <section className="py-16 md:py-24 bg-background-alt">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-title">
            Confianza respaldada por nuestros usuarios
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre por qué pacientes, cuidadores y profesionales de la salud eligen FarmedSearch.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card rounded-xl shadow-soft-lg border border-border flex flex-col hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <StarRating rating={testimonial.rating} />
                    <p className="mt-4 text-card-foreground italic">
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="p-3 bg-accent rounded-full mr-4">
                        <User className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-title">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;