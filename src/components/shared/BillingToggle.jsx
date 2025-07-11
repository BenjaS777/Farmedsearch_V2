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

    return (
        <div className="flex justify-center items-center gap-6 mb-12">
             <div
                ref={ref}
                className="glass-card flex items-center p-1 rounded-full cursor-pointer hover:shadow-aqua-glow transition-all duration-300 border border-white/20"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
            >
                <motion.span 
                    className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                        billingCycle === 'monthly' 
                            ? 'bg-gradient-aqua text-white shadow-aqua-glow' 
                            : 'text-gray-300 hover:text-white'
                    }`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    📅 Pago Mensual
                </motion.span>
                <motion.span 
                    className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                        billingCycle === 'annually' 
                            ? 'bg-gradient-aqua text-white shadow-aqua-glow' 
                            : 'text-gray-300 hover:text-white'
                    }`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    💰 Pago Anual
                </motion.span>
            </div>
            
            <div className="flex items-center h-10">
                <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ 
                        opacity: billingCycle === 'annually' ? 1 : 0, 
                        y: billingCycle === 'annually' ? 0 : -10,
                        scale: billingCycle === 'annually' ? 1 : 0.8
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass-card px-4 py-2 rounded-full border border-aqua-400/30"
                >
                    <span className="text-aqua-400 font-bold text-sm">
                        🎉 ¡Ahorra 2 meses!
                    </span>
                </motion.div>
            </div>
        </div>
    )
}

export default BillingToggle;
