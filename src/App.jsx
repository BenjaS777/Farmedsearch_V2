import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import KeyBenefits from '@/components/sections/KeyBenefits';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import ResultsSection from '@/components/sections/ResultsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/layout/Footer';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import MiBotiquin from '@/pages/MiBotiquin';
import MiCuenta from '@/pages/MiCuenta';
import Admin from '@/pages/Admin';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import { Toaster } from '@/components/ui/toaster';

const Home = () => {
  const location = useLocation();
  const [medicationData, setMedicationData] = useState(location.state?.medicationData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConsultationStart = () => {
    setIsLoading(true);
    setError(null);
    setMedicationData(null); 
  };

  const handleConsultationSuccess = (data) => {
    setIsLoading(false);
    setMedicationData(data); 
    setError(null);
  };

  const handleConsultationError = (errorMessage) => {
    setIsLoading(false);
    setError(errorMessage);
    setMedicationData(null);
  };
  
  const isLandingPageVisible = !medicationData && !isLoading && !error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header con efecto glassmorfismo */}
      <div className="glass-nav sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Contenido principal con espaciado mejorado */}
      <div className="relative">
        {/* Hero Section con tarjeta flotante */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="card-float p-8 mb-12">
              <Hero 
                onConsultationStart={handleConsultationStart}
                onConsultationSuccess={handleConsultationSuccess}
                onConsultationError={handleConsultationError}
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>

        {/* Secciones de contenido con animaciones */}
        <AnimatePresence mode="wait">
          {isLandingPageVisible && (
            <motion.div
              key="landing-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-16"
            >
              {/* Sección de beneficios clave */}
              <div className="container mx-auto px-4">
                <div className="card-float p-8">
                  <KeyBenefits />
                </div>
              </div>

              {/* Sección de cómo funciona */}
              <div className="container mx-auto px-4">
                <div className="card-float p-8">
                  <HowItWorks />
                </div>
              </div>

              {/* Sección de testimonios */}
              <div className="container mx-auto px-4">
                <div className="card-float p-8">
                  <Testimonials />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sección de resultados con estilo mejorado */}
        <div className="container mx-auto px-4 py-8">
          <div className="card-float p-8">
            <ResultsSection 
              medicationData={medicationData} 
              isLoading={isLoading} 
              error={error}
            />
          </div>
        </div>
        
        {/* Sección de precios con efecto especial */}
        <div className="container mx-auto px-4 py-8">
          <div className="relative">
            {/* Efecto de resplandor de fondo */}
            <div className="absolute inset-0 bg-teal-500 rounded-xl blur-3xl opacity-10"></div>
            <div className="card-float p-8 relative">
              <PricingSection />
            </div>
          </div>
        </div>

        {/* Sección de FAQ */}
        <div className="container mx-auto px-4 py-8">
          <div className="card-float p-8">
            <FAQ />
          </div>
        </div>
        
        {/* CTA final con animación */}
        <AnimatePresence mode="wait">
          {isLandingPageVisible && (
            <motion.div
              key="landing-cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="container mx-auto px-4 py-8"
            >
              <div className="card-float p-8">
                <FinalCTA />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer con estilo mejorado */}
        <div className="mt-16">
          <div className="glass-nav border-t border-slate-700">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Forzar tema oscuro para toda la aplicación
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    
    // Aplicar estilos globales al body
    document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
    document.body.style.minHeight = '100vh';
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/registro" 
              element={
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="container mx-auto px-4 py-12">
                    <div className="card-float p-8 max-w-md mx-auto">
                      <Register />
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/iniciar-sesion" 
              element={
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="container mx-auto px-4 py-12">
                    <div className="card-float p-8 max-w-md mx-auto">
                      <Login />
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/mi-botiquin" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="glass-nav sticky top-0 z-50">
                      <Header />
                    </div>
                    <div className="container mx-auto px-4 py-12">
                      <div className="card-float p-8">
                        <MiBotiquin />
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mi-cuenta" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="glass-nav sticky top-0 z-50">
                      <Header />
                    </div>
                    <div className="container mx-auto px-4 py-12">
                      <div className="card-float p-8 max-w-2xl mx-auto">
                        <MiCuenta />
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="glass-nav sticky top-0 z-50">
                      <Header />
                    </div>
                    <div className="container mx-auto px-4 py-12">
                      <div className="card-float p-8">
                        <Admin />
                      </div>
                    </div>
                  </div>
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

