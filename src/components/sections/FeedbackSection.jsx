import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ThumbsUp, ThumbsDown, Loader2, CheckCircle } from 'lucide-react';

const FEEDBACK_WEBHOOK_URL = 'https://hook.us2.make.com/3ymlrx036iuu4r7gx7xrc4befo35odj9';

const FeedbackSection = ({ medicationName, userEmail, userName }) => {
  const [feedbackSent, setFeedbackSent] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFeedbackSubmit = async (useful) => {
    if (!medicationName) {
      toast({
        title: 'Error',
        description: 'No se pudo identificar el medicamento para enviar el feedback.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedbackSent(useful ? 'yes' : 'no');

    try {
      const response = await fetch(FEEDBACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail || null,
          nombre: userName || null,
          nombre_medicamento: medicationName,
          respuesta: useful ? 'sí' : 'no',
          fecha: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        throw new Error('No se pudo enviar el feedback. Inténtalo de nuevo.');
      }

      toast({
        title: '¡Gracias por tu respuesta!',
        description: 'Tu opinión nos ayuda a mejorar.',
        variant: 'default',
        className: 'bg-green-600 text-white',
      });
    } catch (error) {
      console.error('Error al enviar feedback:', error);
      toast({
        title: 'Error al enviar feedback',
        description: error.message || 'Hubo un problema al procesar tu opinión. Por favor, inténtalo más tarde.',
        variant: 'destructive',
      });
      setFeedbackSent(null); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mt-10 md:mt-12 py-8 md:py-10 bg-card rounded-xl shadow-soft-lg border border-border"
    >
      <div className="container mx-auto px-6 md:px-8 text-center max-w-xl">
        {!feedbackSent ? (
          <>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-text-title mb-6">
              ¿Esta información te fue útil?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => handleFeedbackSubmit(true)}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white text-base px-6 py-3"
                size="lg"
              >
                {isSubmitting && feedbackSent === 'yes' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ThumbsUp className="mr-2 h-5 w-5" />}
                Sí, me ayudó
              </Button>
              <Button
                onClick={() => handleFeedbackSubmit(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-base px-6 py-3"
                size="lg"
              >
                {isSubmitting && feedbackSent === 'no' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ThumbsDown className="mr-2 h-5 w-5" />}
                No, necesito más
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg md:text-xl text-text-title font-medium">
              ¡Gracias por tu respuesta!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeedbackSection;