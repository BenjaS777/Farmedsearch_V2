import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { plansData } from '@/lib/plans.jsx';
    import BillingToggle from '@/components/shared/BillingToggle';
    import PlanCard from '@/components/shared/PlanCard';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const PricingSection = () => {
      const navigate = useNavigate();
      const [billingCycle, setBillingCycle] = useState('monthly');
      const plans = plansData[billingCycle];

      const handlePlanSelection = (planId, cycle) => {
        navigate('/registro', { state: { selectedPlanId: planId, billingCycle: cycle } });
      };

      return (
        <section
          id="pricing"
          className="py-20 md:py-28 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading">Planes para cada necesidad</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Desde un acceso rápido a información hasta la gestión completa de tu salud y la de tu familia.</p>
            </motion.div>

            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center max-w-6xl mx-auto pt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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
          </div>
        </section>
      );
    };

    export default PricingSection;