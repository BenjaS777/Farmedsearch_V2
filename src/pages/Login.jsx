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
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-card rounded-2xl shadow-soft-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-title font-heading">Bienvenido de vuelta</h1>
          <p className="mt-2 text-muted-foreground">Ingresa a tu Botiquín Virtual de FarmedSearch</p>
        </div>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-modern"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-modern"
            />
          </div>
          <div className="flex items-center justify-end">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div>
            <Button type="submit" className="w-full bg-primary" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-medium text-primary hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;