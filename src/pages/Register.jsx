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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Crear una cuenta</CardTitle>
                {selectedPlan && (
                    <CardDescription>
                        Estás a un paso de activar tu <strong>{selectedPlan.title}</strong>.
                    </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Ej: Juan Pérez"
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="tu@email.com"
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      minLength="6"
                      className="input-modern"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-3d-cta" disabled={loading}>
                    {loading ? 'Creando cuenta...' : 'Registrarse Gratis'}
                  </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/iniciar-sesion" className="font-medium text-primary hover:underline">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default Register;