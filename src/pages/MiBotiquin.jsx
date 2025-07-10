
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pill, AlertTriangle, ShieldCheck, FileDown, BellRing, Loader2, Search, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ResultsSection from '@/components/sections/ResultsSection';
import MedicamentoCard from '@/components/botiquin/MedicamentoCard';
import BackButton from '@/components/shared/BackButton';

const pageVariants = { 
  initial: { opacity: 0, y: 20 }, 
  in: { opacity: 1, y: 0 }, 
  out: { opacity: 0, y: -20 } 
};

const MiBotiquin = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medToView, setMedToView] = useState(null);
  const [fichaData, setFichaData] = useState(null);
  const [isFichaLoading, setIsFichaLoading] = useState(false);

  const fetchMedicamentos = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMedicamentos(data || []);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al cargar medicamentos',
        description: 'No se pudieron obtener los datos. Por favor, recarga la página.',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchMedicamentos();
  }, [fetchMedicamentos]);
  
  const handleMedicationDeleted = (deletedId) => {
    setMedicamentos(prevMeds => prevMeds.filter(m => m.id !== deletedId));
  };
  
  const handleMedicationUpdated = () => {
    fetchMedicamentos(); 
  };

  const handleViewFicha = async (medId) => {
    const med = medicamentos.find(m => m.id === medId);
    if (!med) return;

    setIsFichaLoading(true);
    setFichaData(null);
    setMedToView(med);
    
    try {
      if (med.drug_info) {
        setFichaData(med.drug_info);
      } else {
        const { data, error } = await supabase
          .from('medications')
          .select('drug_info')
          .eq('id', medId)
          .single();
        if (error) throw error;
        if (data && data.drug_info) {
          setFichaData(data.drug_info);
          setMedicamentos(prev => prev.map(m => m.id === medId ? {...m, drug_info: data.drug_info} : m));
        } else {
          throw new Error('No se encontró información detallada para este medicamento.');
        }
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al ver la ficha', description: 'No se pudo cargar la información. Inténtalo de nuevo.' });
      setMedToView(null);
    } finally {
      setIsFichaLoading(false);
    }
  };

  const handleNotImplemented = () => {
    toast({
      title: '🚧 ¡Función en desarrollo!',
      description: 'Esta característica aún no está implementada.',
    });
  };

  return (
    <>
      <motion.div 
        initial="initial" 
        animate="in" 
        exit="out" 
        variants={pageVariants} 
        transition={{ duration: 0.5 }} 
        className="container mx-auto px-4 py-8 md:py-12"
      >
        <BackButton />
        <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            Hola, {profile?.full_name || user?.email || 'Usuario'}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Te doy la bienvenida a tu botiquín virtual.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-grow lg:w-2/3">
          <Card className="bg-card border border-border/50 shadow-lg">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold font-heading">Mi Botiquín</CardTitle>
                  <CardDescription>Aquí encontrarás todos tus medicamentos guardados.</CardDescription>
                </div>
                <Button onClick={() => navigate('/')} className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Search className="mr-2 h-4 w-4" /> Buscar y Añadir
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : medicamentos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {medicamentos.map((med, index) => (
                        <MedicamentoCard 
                          key={med.id} 
                          med={med} 
                          index={index}
                          onDeleted={handleMedicationDeleted}
                          onUpdated={handleMedicationUpdated}
                          onViewFicha={handleViewFicha}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
                    <Pill className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium text-text-title">Tu botiquín está vacío</h3>
                    <p className="mt-1 text-sm text-muted-foreground">¡Busca y añade tu primer medicamento para empezar a organizarte!</p>
                    <Button className="mt-6" onClick={() => navigate('/')}><Search className="mr-2 h-4 w-4" /> Buscar mi primer medicamento</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>

          <aside className="lg:w-1/3 space-y-8">
            <Card className="shadow-soft-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-heading">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button variant="outline" onClick={handleNotImplemented}><FileDown className="mr-2 h-4 w-4" />Exportar Botiquín a PDF</Button>
                <Button variant="outline" onClick={handleNotImplemented}><BellRing className="mr-2 h-4 w-4" />Configurar Recordatorios</Button>
              </CardContent>
            </Card>
            <Card className="shadow-soft-lg bg-gradient-to-br from-blue-50 to-background">
              <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <CardTitle className="text-xl font-bold font-heading">Alertas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 px-4 flex flex-col items-center justify-center h-full">
                  <ShieldCheck className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-base text-muted-foreground font-medium">No se han detectado nuevas interacciones. Tu botiquín parece seguro. 👍</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </motion.div>

      <Dialog open={!!medToView} onOpenChange={(isOpen) => !isOpen && setMedToView(null)}>
        <DialogContent className="max-w-4xl w-[95vw] md:w-full h-[90vh] flex flex-col">
          <DialogHeader className="flex-row justify-between items-center pr-6 border-b pb-4">
            <DialogTitle className="text-xl font-bold text-text-title truncate">{medToView?.drug_name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setMedToView(null)} className="rounded-full flex-shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto -mr-6 pr-6 mt-4">
            {isFichaLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {fichaData && <ResultsSection medicationData={fichaData} isLoading={false} error={null} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MiBotiquin;
