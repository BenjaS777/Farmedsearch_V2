import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Send, Loader2, User, RefreshCw } from 'lucide-react';
import FeedbackSection from '@/components/sections/FeedbackSection';

const EMAIL_WEBHOOK_URL = 'https://hook.us2.make.com/v0gmswq6bfy16qo8r92t69ogbeave2rq';

const EmailSubscription = ({ medicationInfo, medicationName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmittedSuccessfully, setEmailSubmittedSuccessfully] = useState(false);
  const [submittedEmailForFeedback, setSubmittedEmailForFeedback] = useState('');
  const [submittedNameForFeedback, setSubmittedNameForFeedback] = useState('');
  const { toast } = useToast();

  const validateEmail = (emailToValidate) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(emailToValidate).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast({
        title: 'Nombre Requerido',
        description: 'Por favor, ingresa tu nombre para continuar.',
        variant: 'destructive',
      });
      return;
    }
    const trimmedEmail = email.trim();
    if (!validateEmail(trimmedEmail)) {
      toast({
        title: 'Correo Electrónico Inválido',
        description: 'Por favor, ingresa una dirección de correo electrónico válida.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(EMAIL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: trimmedName,
          email: trimmedEmail,
          ...medicationInfo
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 409 || (errorData && (errorData.includes('already exists') || errorData.includes('ya existe')))) {
          toast({
            title: '¡Ya estás suscrito!',
            description: `El correo ${trimmedEmail} ya está registrado. Te enviaremos la información igualmente.`,
            variant: 'default',
            className: 'bg-blue-600 text-white'
          });
          setEmailSubmittedSuccessfully(true);
          setSubmittedEmailForFeedback(trimmedEmail);
          setSubmittedNameForFeedback(trimmedName);
        } else {
          throw new Error(`Error del servidor (${response.status}): ${errorData || 'No se pudo procesar la solicitud.'}`);
        }
      } else {
        toast({
          title: '¡Información Enviada!',
          description: `La ficha del medicamento ha sido enviada a ${trimmedEmail}. ¡Gracias por usar FarmedSearch!`,
          variant: 'default',
          className: 'bg-green-600 text-white'
        });
        setEmailSubmittedSuccessfully(true);
        setSubmittedEmailForFeedback(trimmedEmail);
        setSubmittedNameForFeedback(trimmedName);
      }
    } catch (error) {
      console.error('Error al enviar correo:', error);
      setEmailSubmittedSuccessfully(false);
      toast({
        title: 'Error al Enviar',
        description: 'Hubo un problema al enviar la información. ¿Deseas intentarlo de nuevo?',
        variant: 'destructive',
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.preventDefault(); 
              handleSubmit(e); 
            }}
            className="btn-secondary"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "circOut" }}
        className="mt-10 md:mt-12"
      >
        <div className="card-float max-w-2xl mx-auto">
          <div className="container mx-auto px-6 md:px-8 text-center">
            {!emailSubmittedSuccessfully && (
              <>
                <div className="p-4 rounded-full bg-aqua-500/20 inline-block mb-6">
                  <Mail className="h-12 w-12 md:h-16 md:w-16 text-aqua-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
                  ¿Te gustaría recibir esta información en tu correo?
                </h3>
                <p className="text-gray-300 mb-8">
                  Te enviaremos la ficha completa del medicamento y te suscribirás a nuestro boletín semanal.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <Input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input-glass pl-12 pr-4 py-3.5 text-base md:text-lg"
                      aria-label="Nombre"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-glass pl-12 pr-4 py-3.5 text-base md:text-lg"
                      aria-label="Correo electrónico"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn-primary w-full text-base md:text-lg py-3.5"
                    size="lg"
                  >
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    📧 Enviar por Correo y Suscribirme
                  </Button>
                </form>
                <p className="text-xs md:text-sm text-gray-400 mt-6 px-2 leading-relaxed">
                  🔒 <strong className="text-aqua-400">Privacidad garantizada.</strong> Al ingresar tus datos, recibirás la ficha consultada y te suscribirás a nuestro boletín semanal con información farmacéutica validada por profesionales.
                </p>
              </>
            )}
             {emailSubmittedSuccessfully && (
               <div className="text-center py-8">
                  <div className="p-4 rounded-full bg-green-500/20 inline-block mb-6">
                    <Mail className="h-12 w-12 text-green-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-4">
                      ¡Información de <span className="text-aqua-400">{medicationName || 'medicamento'}</span> enviada!
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                      Hemos enviado los detalles a <strong className="text-aqua-400">{submittedEmailForFeedback}</strong>.
                  </p>
              </div>
             )}
          </div>
        </div>
      </motion.div>
      {emailSubmittedSuccessfully && (
        <FeedbackSection 
          medicationName={medicationName || "Medicamento Desconocido"} 
          userEmail={submittedEmailForFeedback}
          userName={submittedNameForFeedback}
        />
      )}
    </>
  );
};

export default EmailSubscription;
