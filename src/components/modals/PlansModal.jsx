import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
    import { plansData } from '@/lib/plans.jsx';
    import BillingToggle from '@/components/shared/BillingToggle';
    import PlanCard from '@/components/shared/PlanCard';
    import { motion } from 'framer-motion';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const PlansModal = ({ isOpen, onOpenChange }) => {
      const navigate = useNavigate();
      const [billingCycle, setBillingCycle] = useState('monthly');
      const plans = plansData[billingCycle];

      const handlePlanSelection = (planId, cycle) => {
        onOpenChange(false);
        navigate('/registro', { state: { selectedPlanId: planId, billingCycle: cycle } });
      };

      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-6xl p-8 bg-white">
            <DialogHeader className="text-center mb-4">
              <DialogTitle className="text-3xl font-bold font-heading text-primary">¡Genial! Elige tu plan para crear tu cuenta</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Empieza gratis o accede a funciones avanzadas para tomar el control de tu tratamiento.
              </DialogDescription>
            </DialogHeader>
            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center max-w-6xl mx-auto pt-8"
              variants={containerVariants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
            >
               {plans.map((plan) => (
                <div key={plan.planId} className={`flex justify-center ${plan.highlight ? 'z-10 lg:scale-110' : ''}`}>
                   <PlanCard 
                      plan={plan}
                      billingCycle={billingCycle}
                      onSelectPlan={handlePlanSelection}
                      variants={cardVariants}
                    />
                </div>
              ))}
            </motion.div>
          </DialogContent>
        </Dialog>
      );
    };

    export default PlansModal;