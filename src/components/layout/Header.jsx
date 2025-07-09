
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Bell, Users, ChevronDown, Menu, Shield, Home } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import PlansModal from '@/components/modals/PlansModal';

const LOGO_URL_LIGHT = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/8ce94647-0fd3-4a0b-9442-b8e987088d2f/bfd5a4a37dc92153195ec4fd25e89832.png';

const NavLink = ({ to, onClick, children, className }) => (
  <Link to={to} onClick={onClick} className={className}>
    {children}
  </Link>
);

const Header = () => {
  const { user, profile, signOut } = useAuth();
  console.log("DIAGNÓSTICO 2 - Usuario recibido en Header:", user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };
  
  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica aún no está implementada. ¡Vuelve pronto!",
      variant: "default",
    });
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    setIsPlansModalOpen(true);
  };

  const getInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const closeMenuAndNavigate = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const commonMobileLinkClass = "text-lg font-medium text-foreground hover:text-primary transition-colors py-2 block";

  const MobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-white/20">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background text-foreground">
        <SheetHeader>
          <SheetTitle>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src={LOGO_URL_LIGHT} alt="FarmedSearch Logo" className="h-8" />
              <span className="text-xl font-bold font-heading text-primary">FarmedSearch</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-full">
          <nav className="flex flex-col gap-4">
            {user ? (
              <>
                <NavLink to="/mi-botiquin" onClick={() => closeMenuAndNavigate('/mi-botiquin')} className={commonMobileLinkClass}>Mi Botiquín</NavLink>
                <NavLink to="#" onClick={handleNotImplemented} className={commonMobileLinkClass}>Registro de Síntomas</NavLink>
                <NavLink to="#" onClick={handleNotImplemented} className={commonMobileLinkClass}>Comunidad</NavLink>
                <hr className="my-4" />
                <NavLink to="/mi-cuenta" onClick={() => closeMenuAndNavigate('/mi-cuenta')} className={commonMobileLinkClass}>Mi Perfil</NavLink>
                {profile?.is_admin && (
                  <NavLink to="/admin" onClick={() => closeMenuAndNavigate('/admin')} className={commonMobileLinkClass}>Panel de Admin</NavLink>
                )}
                <button onClick={handleSignOut} className={`${commonMobileLinkClass} text-left`}>Cerrar Sesión</button>
              </>
            ) : (
              <>
                <NavLink to="/" onClick={() => closeMenuAndNavigate('/')} className={commonMobileLinkClass}>Inicio</NavLink>
                <NavLink to="#" onClick={handleNotImplemented} className={commonMobileLinkClass}>Cómo funciona</NavLink>
                <NavLink to="#" onClick={handleNotImplemented} className={commonMobileLinkClass}>FAQ</NavLink>
                <hr className="my-4" />
                <div className="flex flex-col gap-3 mt-auto">
                  <Button variant="outline" onClick={() => closeMenuAndNavigate('/iniciar-sesion')}>Iniciar Sesión</Button>
                  <Button onClick={handleRegisterClick} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Registrarse Gratis</Button>
                </div>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <>
      <motion.header 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <MobileMenu />
            </div>
            <Link to="/" className="flex items-center gap-2">
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
            </Link>
            {user && (
              <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full cursor-pointer" onClick={handleNotImplemented}>
                <Users className="h-5 w-5 text-secondary" />
                <span className="font-medium text-sm">{profile?.full_name || 'Mi Perfil'}</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </div>
            )}
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-6">
                  <Link to="/mi-botiquin" className="text-primary-foreground font-medium hover:text-secondary transition-colors">Mi Botiquín</Link>
                  <Link to="#" onClick={handleNotImplemented} className="text-primary-foreground font-medium hover:text-secondary transition-colors">Registro de Síntomas</Link>
                  <Link to="#" onClick={handleNotImplemented} className="text-primary-foreground font-medium hover:text-secondary transition-colors">Comunidad</Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-6">
                  <Link to="/" className="text-primary-foreground font-medium hover:text-secondary transition-colors">Inicio</Link>
                  <Link to="#" onClick={handleNotImplemented} className="text-primary-foreground font-medium hover:text-secondary transition-colors">Cómo funciona</Link>
                  <Link to="#" onClick={handleNotImplemented} className="text-primary-foreground font-medium hover:text-secondary transition-colors">FAQ</Link>
                </div>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20" onClick={handleNotImplemented}>
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                          {getInitials(profile?.full_name, user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-text-title">{profile?.full_name || 'Mi Cuenta'}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profile?.is_admin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Panel de Admin</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate('/mi-cuenta')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" className="text-primary-foreground hover:bg-white/20 hover:text-white" onClick={() => navigate('/iniciar-sesion')}>Iniciar Sesión</Button>
                <Button onClick={handleRegisterClick} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Registrarse Gratis</Button>
              </div>
            )}
          </div>
        </div>
      </motion.header>
      <PlansModal isOpen={isPlansModalOpen} onOpenChange={setIsPlansModalOpen} />
    </>
  );
};

export default Header;
