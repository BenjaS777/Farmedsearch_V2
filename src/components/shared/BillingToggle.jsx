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
                    colors: ['#004080', '#7AE6D1', '#FFFFFF']
                });
            }
        }, [billingCycle]);

        return (
            <div className="flex justify-center items-center gap-4 mb-12">
                 <div
                    ref={ref}
                    className="flex items-center p-1 rounded-full bg-background-alt cursor-pointer"
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
                >
                    <motion.span 
                        className={`px-4 py-2 text-sm font-semibold rounded-full ${billingCycle === 'monthly' ? 'bg-background shadow-md' : 'text-muted-foreground'}`}
                        layout
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        Pago Mensual
                    </motion.span>
                    <motion.span 
                        className={`px-4 py-2 text-sm font-semibold rounded-full ${billingCycle === 'annually' ? 'bg-background shadow-md' : 'text-muted-foreground'}`}
                        layout
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        Pago Anual
                    </motion.span>
                </div>
                <div className="flex items-center h-10">
                    <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: billingCycle === 'annually' ? 1 : 0, y: billingCycle === 'annually' ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 font-bold text-sm"
                    >
                        ¡Ahorra 2 meses!
                    </motion.div>
                </div>
            </div>
        )
    }

    export default BillingToggle;