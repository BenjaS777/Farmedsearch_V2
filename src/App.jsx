
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
    <>
      <Header />
      <Hero 
        onConsultationStart={handleConsultationStart}
        onConsultationSuccess={handleConsultationSuccess}
        onConsultationError={handleConsultationError}
        isLoading={isLoading} 
      />
      <AnimatePresence mode="wait">
        {isLandingPageVisible && (
          <motion.div
            key="landing-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <KeyBenefits />
            <HowItWorks />
            <Testimonials />
          </motion.div>
        )}
      </AnimatePresence>
      
      <ResultsSection 
        medicationData={medicationData} 
        isLoading={isLoading} 
        error={error}
      />
      
      <PricingSection />

      <FAQ />
      
      <AnimatePresence mode="wait">
        {isLandingPageVisible && (
          <motion.div
            key="landing-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FinalCTA />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};


function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route 
              path="/mi-botiquin" 
              element={
                <ProtectedRoute>
                  <MiBotiquin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mi-cuenta" 
              element={
                <ProtectedRoute>
                  <MiCuenta />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
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
