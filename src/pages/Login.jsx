import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "¡Bienvenido/a de vuelta!",
        description: "Has iniciado sesión exitosamente.",
        variant: "success",
      });
      navigate('/');
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "La recuperación de contraseña aún no está implementada. ¡Vuelve pronto!",
      variant: "default",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="card-float glow-aqua">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white font-heading mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-300">
              Ingresa a tu Botiquín Virtual de FarmedSearch
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-glass"
              />
            </div>
            
            <div className="flex items-center justify-end">
              <a
                href="#"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-aqua-400 hover:text-aqua-300 transition-colors duration-300"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="btn-primary w-full" 
                size="lg" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  '🔐 Ingresar'
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-center text-gray-300">
              ¿No tienes una cuenta?{' '}
              <Link 
                to="/registro" 
                className="font-medium text-aqua-400 hover:text-aqua-300 transition-colors duration-300"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
