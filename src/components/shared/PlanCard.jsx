import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AnimatedCounter = ({ value }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-block"
            >
                {value.toLocaleString('es-CL')}
            </motion.span>
        </AnimatePresence>
    );
}

const PlanCard = ({ plan, onSelectPlan, billingCycle, variants }) => {
  const isHighlighted = plan?.highlight || false;
  
  // PROTECCIÓN CONTRA DATOS UNDEFINED
  const benefits = plan?.benefits || [];
  
  // Verificación adicional de seguridad
  if (!plan) {
    return (
      <div className="glass-card p-4 sm:p-6 text-center">
        <p className="text-gray-400 text-sm">Plan no disponible</p>
      </div>
    );
  }

  return (
    <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.3 } }}
        className="relative w-full h-full"
    >
        {isHighlighted && (
            <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-aqua text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-aqua-glow z-10 border border-aqua-400/30">
                ✨ {plan.tag}
            </div>
        )}
        
        <Card className={`glass-card flex flex-col h-full transition-all duration-500 w-full hover:shadow-float-hover group overflow-hidden ${
            isHighlighted 
                ? 'border-aqua-400/50 shadow-aqua-glow' 
                : 'border-white/10'
        }`}>
            <CardHeader className="text-center pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className={`text-lg sm:text-xl font-bold font-heading transition-colors duration-300 leading-tight ${
                    isHighlighted 
                        ? 'text-aqua-400 group-hover:text-aqua-300' 
                        : 'text-white group-hover:text-aqua-400'
                }`}>
                    {plan.title || 'Plan Sin Título'}
                </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow flex flex-col justify-between p-4 sm:p-6 pt-0">
                <div className="flex-grow">
                    <div className="text-center mb-4 sm:mb-6">
                        <div className={`text-3xl sm:text-4xl font-bold transition-colors duration-300 leading-none ${
                            isHighlighted 
                                ? 'text-white group-hover:text-aqua-200' 
                                : 'text-white group-hover:text-aqua-300'
                        }`}>
                            {plan.price === 0 ? 'Gratis' : (
                                <>
                                    $<AnimatedCounter value={plan.price || 0} />
                                </>
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mt-1">
                            {plan.priceSuffix || ''}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 mt-1 transition-colors duration-300 leading-tight">
                            {plan.billingText || ''}
                        </div>
                    </div>
                    
                    <ul className="space-y-2 sm:space-y-3 text-left mb-4 sm:mb-6 min-h-[120px] sm:min-h-[160px]">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3 group/item">
                                <span className="mt-0.5 flex-shrink-0 text-sm">
                                    {benefit?.icon || <span className="text-sky-400">•</span>}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed break-words">
                                    {benefit?.text || 'Beneficio no especificado'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto">
                    <Button 
                        onClick={() => onSelectPlan && onSelectPlan(plan.planId, billingCycle)}
                        className={`w-full transition-all duration-300 text-sm sm:text-base py-2.5 sm:py-3 px-4 ${
                            isHighlighted 
                                ? 'btn-primary' 
                                : 'btn-secondary hover:btn-primary'
                        }`}
                        size="lg"
                    >
                        <span className="flex items-center justify-center gap-1 sm:gap-2">
                            <span>{isHighlighted ? '🚀' : '📋'}</span>
                            <span className="truncate">
                                {plan.buttonText || 'Seleccionar Plan'}
                            </span>
                        </span>
                    </Button>
                    
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 text-center mt-2 sm:mt-3 transition-colors duration-300 leading-relaxed px-1 break-words">
                        {plan.description || ''}
                    </p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
  );
};

export default PlanCard;
