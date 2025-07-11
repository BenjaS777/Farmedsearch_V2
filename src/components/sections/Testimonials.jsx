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
  <div className="flex items-center mb-3 sm:mb-4">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${
          i < rating ? 'text-aqua-400 fill-current' : 'text-gray-500/30'
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
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-float">
          <motion.div 
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4 px-2">
              Confianza respaldada por nuestros usuarios
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
              Descubre por qué pacientes, cuidadores y profesionales de la salud eligen FarmedSearch.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {testimonialsData.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="glass-card h-full flex flex-col hover:shadow-float-hover hover:scale-105 transition-all duration-500 group overflow-hidden">
                  <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <StarRating rating={testimonial.rating} />
                      <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed group-hover:text-gray-200 transition-colors duration-300 break-words">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-6 flex items-center pt-3 sm:pt-4 border-t border-white/10">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-aqua-500/20 to-sky-500/20 rounded-full mr-3 sm:mr-4 group-hover:from-aqua-400/30 group-hover:to-sky-400/30 transition-all duration-300 flex-shrink-0">
                          <User className="h-5 w-5 sm:h-6 sm:w-6 text-aqua-400 group-hover:text-aqua-300 transition-colors duration-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base text-white group-hover:text-aqua-300 transition-colors duration-300 truncate">
                          {testimonial.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          >
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto px-4 leading-relaxed">
              🔒 <strong className="text-aqua-400">Testimonios auténticos</strong> de usuarios reales que han probado FarmedSearch durante nuestro período de desarrollo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
