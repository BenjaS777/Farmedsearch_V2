import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeOff } from 'lucide-react';

const ResultCard = ({ section, isPrincipleActive = false, index = 0 }) => {
  const commonCardClass = "bg-card text-card-foreground shadow-soft-lg rounded-xl border border-border overflow-hidden";
  const commonHeaderClass = "flex flex-row items-center space-x-4 p-5 md:p-6 border-b border-border";
  const commonTitleClass = "text-xl md:text-2xl font-heading text-text-title";
  const commonIconWrapperClass = "p-3 rounded-full";
  const commonIconClass = "h-7 w-7 md:h-8 md:w-8";
  const commonContentClass = "p-5 md:p-6 text-base md:text-lg leading-relaxed";

  return (
    <motion.div
      key={section.key}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
      className={isPrincipleActive ? "col-span-1 md:col-span-2 mb-8 md:mb-10" : ""}
    >
      <Card className={`${commonCardClass} ${section.isPlaceholder ? 'border-muted/30' : section.borderColorClass} border-l-4 md:border-l-6 hover:shadow-soft-xl transition-shadow duration-300`}>
        <CardHeader className={`${commonHeaderClass} ${section.isPlaceholder ? 'bg-muted/5' : section.bgColorClass}`}>
          <div className={`${commonIconWrapperClass} ${section.isPlaceholder ? 'bg-muted/10' : section.bgColorClass}`}>
            {React.cloneElement(section.isPlaceholder ? <EyeOff /> : section.icon, {className: `${isPrincipleActive ? 'h-8 w-8 md:h-10 md:w-10' : commonIconClass} ${section.isPlaceholder ? 'text-muted-foreground' : section.colorClass}`})}
          </div>
          <CardTitle className={`${commonTitleClass} ${section.isPlaceholder ? 'text-muted-foreground' : 'text-text-title'}`}>{section.title}</CardTitle>
        </CardHeader>
        <CardContent className={commonContentClass}>
          <p className={`${section.isPlaceholder ? 'text-muted-foreground italic' : 'text-card-foreground'} whitespace-pre-line`}>{section.currentContent}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;