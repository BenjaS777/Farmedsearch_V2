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
  const plans = plansData[billingCycle] || [];

  const handlePlanSelection = (planId, cycle) => {
    onOpenChange(false);
    navigate('/registro', { state: { selectedPlanId: planId, billingCycle: cycle } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-7xl p-0 bg-transparent border-none shadow-none">
        <div className="glass-card p-8 m-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-3xl font-bold font-heading text-white mb-2">
              ¡Genial! Elige tu plan para crear tu cuenta
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
              Empieza gratis o accede a funciones avanzadas para tomar el control de tu tratamiento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center mb-8">
            <div className="glass-card p-2 inline-block">
              <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch justify-center max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
          >
             {plans.map((plan) => (
              <div key={plan.planId} className={`flex justify-center ${plan.highlight ? 'z-10' : ''}`}>
                 <PlanCard 
                    plan={plan}
                    billingCycle={billingCycle}
                    onSelectPlan={handlePlanSelection}
                    variants={cardVariants}
                  />
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              🔒 <strong className="text-aqua-400">Seguro y confiable.</strong> Cancela cuando quieras. Todos los planes incluyen garantía de satisfacción.
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlansModal;
