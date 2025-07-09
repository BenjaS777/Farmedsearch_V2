
import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { User, CreditCard, Loader2 } from 'lucide-react';
import BackButton from '@/components/shared/BackButton';

const MiCuenta = () => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {};
    if (fullName && fullName !== profile?.full_name) {
      updates.full_name = fullName;
    } else if (!fullName) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'El nombre no puede estar vacío.',
      });
      setLoading(false);
      return;
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error al actualizar',
          description: error.message || 'Ocurrió un error.',
        });
      } else {
        toast({
          title: '¡Éxito!',
          description: 'Tu perfil ha sido actualizado correctamente.',
        });
        await refreshProfile();
      }
    } else {
       toast({
        title: 'Sin cambios',
        description: 'No has realizado ninguna modificación.',
      });
    }


    setLoading(false);
  };
  
  const handleNotImplemented = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica aún no está implementada.",
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-bold text-text-title font-heading mb-8">Mi Cuenta</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Mi Perfil</TabsTrigger>
          <TabsTrigger value="subscription"><CreditCard className="mr-2 h-4 w-4" />Suscripción</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>Actualiza tu nombre aquí.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre completo" />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Cambios
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Suscripción y Pagos</CardTitle>
              <CardDescription>Gestiona tu plan y revisa tu historial de pagos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/40">
                <p className="font-medium">Plan Actual</p>
                <p className="text-2xl font-bold text-primary">{profile?.subscription_status || 'FarmedSearch Personal'}</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/40">
                <p className="font-medium">Próxima Renovación</p>
                <p className="text-lg font-semibold">24 de Agosto, 2025</p>
              </div>
              <Button onClick={handleNotImplemented}>
                <CreditCard className="mr-2 h-4 w-4" /> Gestionar Suscripción
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MiCuenta;
