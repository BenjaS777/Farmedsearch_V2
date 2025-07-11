import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { plansData } from '@/lib/plans';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (location.state?.selectedPlanId) {
      const { selectedPlanId, billingCycle } = location.state;
      setSelectedPlanId(selectedPlanId);
      setBillingCycle(billingCycle);
      
      const plan = plansData[billingCycle]?.find(p => p.planId === selectedPlanId);
      setSelectedPlan(plan);
    } else {
      const defaultPlan = plansData.monthly.find(p => p.planId === 1);
      setSelectedPlan(defaultPlan);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, fullName, selectedPlanId, billingCycle);

    if (!error) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="card-float glow-aqua">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white font-heading mb-2">
              Crear una cuenta
            </h1>
            {selectedPlan && (
              <p className="text-gray-300">
                Estás a un paso de activar tu <strong className="text-aqua-400">{selectedPlan.title}</strong>.
              </p>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white font-medium">
                Nombre Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Ej: Juan Pérez"
                className="input-glass"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="input-glass"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength="6"
                className="input-glass"
              />
              <p className="text-xs text-gray-400 mt-1">
                Mínimo 6 caracteres
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="btn-primary w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                '🚀 Registrarse Gratis'
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-center text-gray-300">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/iniciar-sesion" 
                className="font-medium text-aqua-400 hover:text-aqua-300 transition-colors duration-300"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
