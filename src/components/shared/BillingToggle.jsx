import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const BillingToggle = ({ billingCycle, setBillingCycle }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (billingCycle === 'annually' && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const origin = {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            };
            
            confetti({
                particleCount: 100,
                spread: 70,
                origin: origin,
                colors: ['#14b8a6', '#2dd4bf', '#5eead4', '#06b6d4', '#38bdf8']
            });
        }
    }, [billingCycle]);

    const handleToggle = (cycle) => {
        if (cycle !== billingCycle) {
            setBillingCycle(cycle);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 sm:mb-10 md:mb-12 px-2">
             <div
                ref={ref}
                className="billing-toggle w-full sm:w-auto max-w-sm"
            >
                <motion.span 
                    onClick={() => handleToggle('monthly')}
                    className={billingCycle === 'monthly' ? 'active' : ''}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="hidden sm:inline">📅 Pago Mensual</span>
                    <span className="sm:hidden">📅 Mensual</span>
                </motion.span>
                <motion.span 
                    onClick={() => handleToggle('annually')}
                    className={billingCycle === 'annually' ? 'active' : ''}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="hidden sm:inline">💰 Pago Anual</span>
                    <span className="sm:hidden">💰 Anual</span>
                </motion.span>
            </div>
            
            <div className="flex items-center justify-center h-8 sm:h-10 w-full sm:w-auto">
                <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ 
                        opacity: billingCycle === 'annually' ? 1 : 0, 
                        y: billingCycle === 'annually' ? 0 : -10,
                        scale: billingCycle === 'annually' ? 1 : 0.8
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-aqua-400/30"
                >
                    <span className="text-aqua-400 font-bold text-xs sm:text-sm text-center block">
                        <span className="hidden sm:inline">🎉 ¡Ahorra 2 meses!</span>
                        <span className="sm:hidden">🎉 ¡Ahorra!</span>
                    </span>
                </motion.div>
            </div>
        </div>
    )
}

export default BillingToggle;
