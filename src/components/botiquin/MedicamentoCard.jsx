
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Edit, Save, X, Loader2, Eye } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const MedicamentoCard = ({ med, index, onDeleted, onUpdated, onViewFicha }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localMed, setLocalMed] = useState({ dosage: med.dosage || '', frequency: med.frequency || '' });

  const handleEdit = () => {
    setLocalMed({ dosage: med.dosage || '', frequency: med.frequency || '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalMed(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!localMed.dosage && !localMed.frequency) {
      toast({
        variant: 'destructive',
        title: 'Campos vacíos',
        description: 'Debes proporcionar al menos una dosis o frecuencia.',
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('medications')
        .update({ dosage: localMed.dosage, frequency: localMed.frequency })
        .eq('id', med.id);

      if (error) throw error;
      
      onUpdated();
      setIsEditing(false);
      toast({ title: 'Éxito', description: `"${med.drug_name}" ha sido actualizado.` });
    } catch (error) {
      toast({ 
        variant: 'destructive', 
        title: 'Error al actualizar', 
        description: 'No se pudo guardar los cambios. Por favor, inténtalo de nuevo.' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`¿Estás seguro de que quieres eliminar "${med.drug_name}" de tu botiquín? Esta acción no se puede deshacer.`);
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', med.id);

      if (error) throw error;
      
      toast({ title: 'Eliminado', description: `"${med.drug_name}" ha sido eliminado.` });
      onDeleted(med.id);
    } catch (error) {
      toast({ 
        variant: 'destructive', 
        title: 'Error al eliminar', 
        description: 'No se pudo eliminar el medicamento. Inténtalo de nuevo.' 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const hasDetails = med.dosage || med.frequency;

  return (
    <motion.div
      layout
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="overflow-hidden flex flex-col h-full shadow-soft-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-text-title">{med.drug_name}</CardTitle>
          {!isEditing && (
             hasDetails ? (
              <CardDescription>
                {med.dosage && <span>{med.dosage}</span>}
                {med.dosage && med.frequency && <span> - </span>}
                {med.frequency && <span>{med.frequency}</span>}
              </CardDescription>
            ) : <CardDescription className="italic">Dosis y frecuencia no especificadas</CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col justify-between">
          {isEditing ? (
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor={`dosage-${med.id}`} className="text-xs text-muted-foreground">Dosis</Label>
                <Input
                  id={`dosage-${med.id}`}
                  name="dosage"
                  value={localMed.dosage}
                  onChange={handleInputChange}
                  placeholder="Ej: 1 comprimido"
                  className="h-9"
                  disabled={isUpdating}
                />
              </div>
              <div>
                <Label htmlFor={`frequency-${med.id}`} className="text-xs text-muted-foreground">Frecuencia</Label>
                <Input
                  id={`frequency-${med.id}`}
                  name="frequency"
                  value={localMed.frequency}
                  onChange={handleInputChange}
                  placeholder="Ej: Cada 8 horas"
                  className="h-9"
                  disabled={isUpdating}
                />
              </div>
            </div>
          ) : (
            <div className="flex-grow"></div>
          )}

          <div className="flex flex-wrap justify-end gap-2 pt-4">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleUpdate} disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Guardar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => onViewFicha(med.id)}><Eye className="mr-2 h-4 w-4" />Ver Ficha</Button>
                <Button variant="outline" size="sm" onClick={handleEdit}><Edit className="mr-2 h-4 w-4" />Editar</Button>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                  Eliminar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MedicamentoCard;
