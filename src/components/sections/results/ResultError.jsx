import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Info } from 'lucide-react';

const ResultError = ({ error }) => {
  const commonCardClass = "bg-card text-card-foreground shadow-soft-lg rounded-xl border border-border overflow-hidden";
  const commonHeaderClass = "flex flex-row items-center space-x-4 p-5 md:p-6 border-b border-border";
  const commonTitleClass = "text-xl md:text-2xl font-heading text-text-title";
  const commonIconWrapperClass = "p-3 rounded-full";
  const commonIconClass = "h-7 w-7 md:h-8 md:w-8";
  const commonContentClass = "p-5 md:p-6 text-base md:text-lg leading-relaxed";

  const isNetworkError = error.toLowerCase().includes('network') || error.toLowerCase().includes('conexión');
  const isNotFound = error.toLowerCase().includes('no encontrado') || error.toLowerCase().includes('not found');
  
  let title = "Error en la Consulta";
  let description = error;
  let suggestion = "Por favor, verifica tu conexión e inténtalo nuevamente.";

  if (isNetworkError) {
    title = "Problema de Conexión";
    description = "No pudimos conectarnos para obtener la información.";
  } else if (isNotFound) {
    title = "Medicamento no Encontrado";
    description = `No pudimos encontrar información para el medicamento que consultaste.`;
    suggestion = "¿Quieres sugerirnos que lo agreguemos? (Próximamente podrás hacerlo aquí)";
  } else {
     suggestion = "Por favor, intenta nuevamente o verifica el nombre del medicamento.";
  }

  return (
    <motion.div
      id="ficha-medicamento" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-16 bg-background-alt"
    >
      <Card className={`${commonCardClass} border-l-4 ${isNotFound ? 'border-yellow-500 bg-yellow-500/5' : 'border-destructive bg-destructive/5'}`}>
        <CardHeader className={`${commonHeaderClass} ${isNotFound ? 'bg-yellow-500/10' : 'bg-destructive/10'}`}>
          <div className={`${commonIconWrapperClass} ${isNotFound ? 'bg-yellow-500/20' : 'bg-destructive/20'}`}>
            {isNotFound ? <Info className={`${commonIconClass} text-yellow-600`} /> : <AlertCircle className={`${commonIconClass} text-destructive`} />}
          </div>
          <CardTitle className={`${commonTitleClass} ${isNotFound ? 'text-yellow-700' : 'text-destructive'}`}>{title}</CardTitle>
        </CardHeader>
        <CardContent className={commonContentClass}>
          <p className={`${isNotFound ? 'text-yellow-800' : 'text-destructive-foreground'}`}>{description}</p>
          <p className="mt-3 text-sm text-muted-foreground">{suggestion}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultError;