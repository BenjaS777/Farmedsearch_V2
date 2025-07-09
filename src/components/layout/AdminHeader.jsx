
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LOGO_URL_LIGHT = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/8ce94647-0fd3-4a0b-9442-b8e987088d2f/bfd5a4a37dc92153195ec4fd25e89832.png';

const AdminHeader = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
      navigate('/');
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/admin" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5, transition: { duration: 0.2 } }}
          >
            <img
              src={LOGO_URL_LIGHT}
              alt="FarmedSearch Logo"
              className="h-10"
            />
          </motion.div>
          <span className="text-2xl font-bold font-heading text-primary-foreground hidden sm:inline">FarmedSearch</span>
          <span className="ml-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">ADMIN</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/20 hover:text-white" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Volver a la App
          </Button>
          <Button variant="destructive" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
