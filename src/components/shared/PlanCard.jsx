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
      const isHighlighted = plan.highlight;

      return (
        <motion.div
            variants={variants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`relative w-full h-full`}
        >
            {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    {plan.tag}
                </div>
            )}
            <Card className={`flex flex-col h-full rounded-2xl transition-all duration-300 w-full shadow-lg hover:shadow-2xl ${isHighlighted ? 'border-primary border-2' : 'border'}`}>
                <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl font-bold font-heading text-primary">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                    <div>
                        <div className="text-center mb-4 h-20">
                            <div className="text-5xl font-bold text-gray-900">
                                {plan.price === 0 ? 'Gratis' : (
                                    <>
                                        $<AnimatedCounter value={plan.price} />
                                    </>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">{plan.priceSuffix}</div>
                            <div className="text-xs text-muted-foreground mt-1">{plan.billingText}</div>
                        </div>
                        
                        <ul className="space-y-3 text-left mb-8 flex-grow">
                            {plan.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {benefit.icon}
                                    <span className="text-sm text-foreground">{benefit.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto">
                      <Button 
                        onClick={() => onSelectPlan(plan.planId, billingCycle)}
                        className={`w-full ${plan.buttonColor || ''}`}
                        variant={plan.buttonVariant || 'default'}
                        size="lg"
                      >
                          {plan.buttonText}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-3 h-8">{plan.description}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
      );
    };

    export default PlanCard;