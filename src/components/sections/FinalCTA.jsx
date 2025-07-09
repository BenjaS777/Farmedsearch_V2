import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Rocket } from 'lucide-react';

const FinalCTA = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
      className="py-16 md:py-24 bg-hero-bg-light"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="inline-block mb-4"
        >
          <Sparkles className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-title mb-6"
        >
          Prueba FarmedSearch gratis, sin registro.
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Obtén la información que necesitas ahora mismo, de forma clara y confiable.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3, type: "spring", stiffness: 150 } }
          }}
        >
          <Button asChild size="lg" className="btn-3d-cta px-10 py-7 text-xl">
            <a href="#inicio">
              <Rocket className="mr-3 h-6 w-6" />
              Comienza ahora
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTA;