
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className="mb-6 text-primary hover:bg-primary/10"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver al inicio
    </Button>
  );
};

export default BackButton;
