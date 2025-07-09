import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, XCircle, HelpCircle, ShieldCheck, Activity, 
  FlaskConical, Ruler, Users, AlertOctagon, Info, Loader2
} from 'lucide-react';

import { useAuth } from '@/contexts/SupabaseAuthContext';
import EmailSubscription from '@/components/sections/EmailSubscription';
import AddToBotiquinButton from './results/AddToBotiquinButton';
import ResultCard from './results/ResultCard';
import ResultError from './results/ResultError';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/8ce94647-0fd3-4a0b-9442-b8e987088d2f/bfd5a4a37dc92153195ec4fd25e89832.png";
const FARMEDPLUS_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/8ce94647-0fd3-4a0b-9442-b8e987088d2f/368ddd3ae328602a58de67a8caf94af8.png";

let fichaTemporal = null;

const ResultsSection = ({ medicationData, isLoading, error }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isDoseModalOpen, setIsDoseModalOpen] = useState(false);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  if (isLoading) {
    return null; 
  }

  if (error) {
    return <ResultError error={error} />;
  }

  if (!medicationData || Object.keys(medicationData).length === 0) {
    return null;
  }

  const handleAddToBotiquinClick = () => {
    fichaTemporal = medicationData;
    setIsDoseModalOpen(true);
  };

  const handleConfirmAndAdd = async (e) => {
    e.preventDefault();
    if (!fichaTemporal || !user) return;
    setIsSaving(true);

    const payloadParaGuardar = {
      user_id: user.id,
      drug_name: fichaTemporal.nombreMedicamento,
      dosage: dosage,
      frequency: frequency,
      drug_info: fichaTemporal
    };

    try {
      const { error } = await supabase.from('medications').insert(payloadParaGuardar);
      if (error) throw error;
      
      toast({
        title: '¡Éxito!',
        description: `${fichaTemporal.nombreMedicamento} ha sido añadido a tu botiquín.`,
        className: 'bg-green-600 text-white'
      });
      
      setIsDoseModalOpen(false);
      navigate('/mi-botiquin');

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al añadir',
        description: error.message,
      });
    } finally {
      setIsSaving(false);
      fichaTemporal = null;
      setDosage('');
      setFrequency('');
    }
  };

  const { 
    nombreMedicamento,
    para_que_sirve, 
    efectos_secundarios, 
    precauciones, 
    contraindicaciones,
    advertencias_importantes,
    ficha_tecnica,
  } = medicationData;

  const principio_activo_data = ficha_tecnica?.principio_activo || medicationData?.principio_activo;
  const dosis_habitual = ficha_tecnica?.dosis_habitual || medicationData?.dosis_habitual;
  const interacciones_importantes = ficha_tecnica?.interacciones_importantes || medicationData?.interacciones_importantes;
  const advertencias_especiales = ficha_tecnica?.advertencias_especiales || medicationData?.advertencias_especiales;

  const placeholderText = "Información no disponible";

  const principleActiveSection = { 
    key: 'principio_activo',
    title: 'Principio Activo', 
    content: principio_activo_data, 
    icon: <FlaskConical />, 
    colorClass: 'text-info-text', 
    bgColorClass: 'bg-info-bg',
    borderColorClass: 'border-info-border',
    currentContent: principio_activo_data === "..." || !principio_activo_data ? placeholderText : `Este medicamento contiene como principio activo: ${principio_activo_data}.`,
    isPlaceholder: principio_activo_data === "..." || !principio_activo_data,
  };

  const otherSections = [
    { key: 'para_que_sirve', title: '¿Para qué sirve?', content: para_que_sirve, icon: <HelpCircle />, colorClass: 'text-blue-600', bgColorClass: 'bg-blue-500/10', borderColorClass: 'border-blue-500' },
    { key: 'dosis_habitual', title: 'Dosis Habitual', content: dosis_habitual, icon: <Ruler />, colorClass: 'text-purple-600', bgColorClass: 'bg-purple-500/10', borderColorClass: 'border-purple-500' },
    { key: 'efectos_secundarios', title: 'Efectos Secundarios Importantes', content: efectos_secundarios, icon: <Activity />, colorClass: 'text-orange-600', bgColorClass: 'bg-orange-500/10', borderColorClass: 'border-orange-500' },
    { key: 'precauciones', title: 'Precauciones que Debes Conocer', content: precauciones, icon: <AlertTriangle />, colorClass: 'text-yellow-600', bgColorClass: 'bg-yellow-500/10', borderColorClass: 'border-yellow-500' },
    { key: 'contraindicaciones', title: 'Contraindicaciones', content: contraindicaciones, icon: <XCircle />, colorClass: 'text-red-600', bgColorClass: 'bg-red-500/10', borderColorClass: 'border-red-500' },
    { key: 'interacciones_importantes', title: 'Interacciones Importantes', content: interacciones_importantes, icon: <Users />, colorClass: 'text-indigo-600', bgColorClass: 'bg-indigo-500/10', borderColorClass: 'border-indigo-500' },
    { key: 'advertencias_importantes', title: 'Advertencias Importantes', content: advertencias_importantes, icon: <AlertOctagon />, colorClass: 'text-pink-600', bgColorClass: 'bg-pink-500/10', borderColorClass: 'border-pink-500' },
    { key: 'advertencias_especiales', title: 'Advertencias Especiales', content: advertencias_especiales, icon: <AlertOctagon />, colorClass: 'text-rose-600', bgColorClass: 'bg-rose-500/10', borderColorClass: 'border-rose-500' },
  ].map(section => ({
    ...section,
    currentContent: section.content === "..." || !section.content ? placeholderText : section.content,
    isPlaceholder: section.content === "..." || !section.content,
  })).filter(section => section.content);

  const hasPrincipleActiveContent = principleActiveSection.content && principleActiveSection.content !== placeholderText;
  const hasOtherActualContent = otherSections.some(section => !section.isPlaceholder);

  if (!hasPrincipleActiveContent && !hasOtherActualContent && !nombreMedicamento) {
    return (
      <motion.div
        id="ficha-medicamento" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 py-16 bg-background-alt"
      >
        <Card className="bg-card text-card-foreground shadow-soft-lg rounded-xl border border-border overflow-hidden border-l-4 border-yellow-500 bg-yellow-500/5">
          <CardHeader className="flex flex-row items-center space-x-4 p-5 md:p-6 border-b border-border bg-yellow-500/10">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <Info className="h-7 w-7 md:h-8 md:w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-heading text-text-title text-yellow-700">Datos Incompletos</CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:p-6 text-base md:text-lg leading-relaxed">
            <p className="text-card-foreground">La información para "{nombreMedicamento || 'el medicamento consultado'}" no contiene detalles suficientes o el formato es inesperado.</p>
            <p className="mt-3 text-sm text-muted-foreground">Por favor, verifica la respuesta de tu webhook en Make.com o la estructura de los datos.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const medicationInfoForEmail = {
    para_que_sirve: para_que_sirve || placeholderText,
    efectos_secundarios: efectos_secundarios || placeholderText,
    precauciones: precauciones || placeholderText,
    contraindicaciones: contraindicaciones || placeholderText,
    advertencias_importantes: advertencias_importantes || placeholderText,
    ficha_tecnica: {
      principio_activo: principio_activo_data || placeholderText,
      dosis_habitual: dosis_habitual || placeholderText,
      interacciones_importantes: interacciones_importantes || placeholderText,
      advertencias_especiales: advertencias_especiales || placeholderText
    }
  };

  const isFichaModal = location.state?.isFichaModal;

  return (
    <>
      <AnimatePresence>
        {medicationData && (
          <motion.section
            id="ficha-medicamento"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7, ease: "circOut" }}
            className="py-16 md:py-24 bg-background-alt text-card-foreground"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 md:mb-16">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 150 }}
                >
                  <img  
                    src={LOGO_URL} 
                    alt="Logo FarmedSearch" 
                    className="h-20 w-auto md:h-24 mx-auto mb-6 filter drop-shadow-md" 
                  />
                </motion.div>
                <motion.h2 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-title"
                >
                  Información para: <span className="text-primary">{nombreMedicamento || "Medicamento"}</span>
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  className="text-muted-foreground mt-4 text-lg md:text-xl max-w-3xl mx-auto"
                >
                  Un resumen claro y conciso sobre tu medicamento, validado por fuentes confiables.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {hasPrincipleActiveContent && <ResultCard section={principleActiveSection} isPrincipleActive={true} index={0} />}
                {otherSections.map((section, index) => <ResultCard section={section} key={section.key} index={index + 1} />)}
              </div>
              
              {!isFichaModal && (
                user ? (
                  <AddToBotiquinButton onAddClick={handleAddToBotiquinClick} />
                ) : (
                    <EmailSubscription 
                      medicationInfo={medicationInfoForEmail} 
                      medicationName={nombreMedicamento || "Medicamento Desconocido"} 
                    />
                )
              )}

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="mt-12 md:mt-16 text-center"
              >
                <div className="inline-block bg-card/90 backdrop-blur-sm border border-border p-4 md:p-5 rounded-lg shadow-soft">
                  <p className="text-sm text-muted-foreground flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 text-green-500" />
                    <span>La información es referencial y <strong className="text-orange-500 mx-1">no reemplaza una consulta médica profesional</strong>.</span>
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                className="mt-12 text-center py-6 bg-background-alt rounded-lg"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mb-2 inline-block"
                >
                  <img  
                    src={FARMEDPLUS_LOGO_URL}
                    alt="Logo Farmedplus" 
                    className="h-10 md:h-12 w-auto mx-auto filter drop-shadow-sm" 
                  />
                </motion.div>
                <p className="text-sm text-black max-w-md mx-auto">
                  Impulsado por <strong className="font-medium text-black">Farmedplus</strong>, educación farmacéutica confiable y profesional.
                </p>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Dialog open={isDoseModalOpen} onOpenChange={setIsDoseModalOpen}>
        <DialogContent id="modal-dosis-frecuencia">
          <DialogHeader>
            <DialogTitle className="text-xl">Añadir <span className="text-primary">{fichaTemporal?.nombreMedicamento}</span> a tu Botiquín</DialogTitle>
            <DialogDescription>
              Especifica la dosis y frecuencia para un seguimiento preciso.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConfirmAndAdd}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right">
                  Dosis
                </Label>
                <Input
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="ej: 500 mg, 1 comprimido"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right">
                  Frecuencia
                </Label>
                <Input
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="ej: Cada 8 horas, en ayunas"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDoseModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirmar y Añadir
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsSection;