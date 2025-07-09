import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PackagePlus, CheckCircle } from 'lucide-react';

const AddToBotiquinButton = ({ onAddClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAddClick();
    setIsAdded(true);
  };

  return (
    <motion.div 
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Button 
        size="lg" 
        onClick={handleClick} 
        disabled={isAdded}
        className={`transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
      >
        {isAdded ? (
          <CheckCircle className="mr-2 h-5 w-5" />
        ) : (
          <PackagePlus className="mr-2 h-5 w-5" />
        )}
        {isAdded ? 'Añadiendo...' : 'Añadir a Mi Botiquín'}
      </Button>
    </motion.div>
  );
};

export default AddToBotiquinButton;