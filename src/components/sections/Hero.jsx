import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Search, Pill, PlusCircle, Activity, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const WEBHOOK_URL = 'https://hook.us2.make.com/jf11jlzptaudgh25g52c7yzubwzl96bv';
const FARMEDPLUS_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/8ce94647-0fd3-4a0b-9442-b8e987088d2f/368ddd3ae328602a58de67a8caf94af8.png";

const FloatingIcon = ({ icon, className, delay }) => (
    <motion.div className={`absolute text-accent/50 ${className}`} initial={{ opacity: 0, scale: 0.5, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay, duration: 0.8, type: 'spring', stiffness: 50 }} style={{ zIndex: 0 }}>
        <motion.div animate={{ y: ["0px", "-15px", "0px"] }} transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}>
            {icon}
        </motion.div>
    </motion.div>
);

const LoadingDots = () => (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex">
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0 }} className="mx-0.5">.</motion.span>
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }} className="mx-0.5">.</motion.span>
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.4 }} className="mx-0.5">.</motion.span>
    </motion.span>
);

const Hero = ({ onConsultationStart, onConsultationSuccess, onConsultationError, isLoading }) => {
    const [nombreMedicamento, setNombreMedicamento] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const { user, profile, refreshProfile } = useAuth();

    // Función unificada para registrar la búsqueda e incrementar el contador
    const logAndIncrementSearch = async (query) => {
        if (!user || !profile) { // Si no hay usuario, no hacemos nada más
            return;
        }

        console.log("DIAGNÓSTICO: Registrando búsqueda para el usuario:", user.id); // Mensaje de diagnóstico

        try {
            // Llamamos a ambas operaciones en paralelo para más eficiencia
            await Promise.all([
                supabase.from('search_logs').insert({ query_text: query, user_id: user.id }),
                supabase.rpc('increment_search_count')
            ]);
            // Si todo fue bien, refrescamos el perfil localmente
            await refreshProfile();
        } catch (error) {
            console.error("Error al registrar búsqueda o incrementar contador:", error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!nombreMedicamento) {
            toast({ title: 'Campo incompleto', description: 'Por favor, ingresa el nombre del medicamento.', variant: 'destructive' });
            return;
        }

        // VERIFICACIÓN DEL LÍMITE ANTES de hacer la llamada
        if (profile && profile.plan_id === 1 && profile.search_count >= 3) {
            toast({
                variant: 'destructive',
                title: 'Límite de Búsquedas Alcanzado',
                description: `Has utilizado tus 3 búsquedas gratuitas. ¡Actualiza a FarmedPlus para continuar!`,
            });
            return;
        }

        setIsSubmitting(true);
        onConsultationStart();

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreMedicamento })
            });

            // (El resto de la lógica para procesar la respuesta del webhook permanece igual)
            let resultData;
            const responseText = await response.text();
             if (!response.ok) {
              let errorMessage = `Error HTTP: ${response.status}`;
              try {
                const errorJson = JSON.parse(responseText);
                errorMessage = errorJson.message || errorJson.error || errorMessage;
              } catch (parseError) {
                errorMessage = "Error desconocido del servidor.";
              }
              throw new Error(errorMessage);
            }
            resultData = { nombreMedicamento, ...JSON.parse(JSON.parse(responseText).respuesta_json) };

            toast({ title: 'Consulta Exitosa', description: 'Resultados a continuación.', variant: 'default', className: 'bg-green-600 text-white' });
            onConsultationSuccess(resultData);
            
            // LLAMADA A LA FUNCIÓN UNIFICADA
            await logAndIncrementSearch(nombreMedicamento);

            setNombreMedicamento('');
            setTimeout(() => {
                const resultsSection = document.getElementById('ficha-medicamento');
                if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);

        } catch (error) {
            console.error('Error al enviar consulta:', error);
            toast({ title: 'Error en la Consulta', description: error.message || 'No se pudo conectar.', variant: 'destructive' });
            onConsultationError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="inicio" className="relative text-text-title bg-hero-bg-light py-16 md:py-24 min-h-[calc(75vh-80px)] flex items-center justify-center overflow-hidden">
            <FloatingIcon icon={<Pill size={60} />} className="top-1/4 left-1/4 md:left-1/5 opacity-60" delay={0.2} />
            <FloatingIcon icon={<PlusCircle size={40} />} className="bottom-1/4 right-1/4 md:right-1/5 opacity-50" delay={0.4} />
            <FloatingIcon icon={<Activity size={50} />} className="top-1/3 right-1/6 md:right-1/4 opacity-50" delay={0.6} />
            <FloatingIcon icon={<Pill size={30} />} className="bottom-1/3 left-1/6 md:left-1/4 opacity-60" delay={0.8} />

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 100 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 text-text-title">Entiende tus medicamentos al instante</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground">
                    Tu guía farmacéutica de confianza, explicada en un lenguaje sencillo.
                </motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} className="max-w-xl mx-auto bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-soft-lg border border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="hero-medicamento" className="sr-only">Nombre del medicamento</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="hero-medicamento" type="text" placeholder="Ej: Panadol, Flemex, Xigduo XR…" value={nombreMedicamento} onChange={e => setNombreMedicamento(e.target.value)} required className="w-full input-modern pl-12 pr-4 py-3.5 text-lg" />
                            </div>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                            <Button type="submit" disabled={isSubmitting || isLoading} className="w-full btn-3d-cta" size="lg">
                                {isSubmitting || isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                                Consultar ahora
                            </Button>
                        </motion.div>
                    </form>
                    {isLoading && <div className="mt-8 text-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-10 text-sm md:text-base text-muted-foreground">
                    Impulsado por IA Especializada | Validado por Fuentes Oficiales
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="mt-8 py-6 bg-hero-bg-light rounded-lg">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="mb-2 inline-block">
                        <img src={FARMEDPLUS_LOGO_URL} alt="Logo Farmedplus" className="h-10 md:h-12 w-auto mx-auto filter drop-shadow-sm" />
                    </motion.div>
                    <p className="text-sm text-black max-w-md mx-auto">
                        Impulsado por <strong className="font-medium text-black">Farmedplus</strong>, educación farmacéutica confiable y profesional.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
export default Hero;