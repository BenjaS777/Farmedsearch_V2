import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/benjafarmedpluscl/', label: 'Instagram' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://www.youtube.com/@remediados.podcast', label: 'YouTube' },
  ];

  const footerItemVariants = {
    hidden: { opacity:0, y:15 },
    visible: (i) => ({
        opacity:1, y:0, transition: { delay: i * 0.1, duration: 0.4}
    })
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.1 }}
      className="bg-header-bg text-primary-foreground/80 pt-16 pb-8"
      id="contacto"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center md:text-left">
          <motion.div variants={footerItemVariants} custom={0}>
            <p className="font-heading text-2xl font-semibold text-white mb-3">FarmedSearch</p>
            <p className="text-sm">Democratizando el conocimiento farmacológico en Chile. Información clara y confiable.</p>
          </motion.div>
          
          <motion.div variants={footerItemVariants} custom={1}>
            <p className="font-semibold text-white text-lg mb-3">Navegación</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-accent-green transition-colors">Inicio</a></li>
              <li><a href="#cómo-funciona" className="hover:text-accent-green transition-colors">Cómo Funciona</a></li>
              <li><a href="#faq" className="hover:text-accent-green transition-colors">FAQ</a></li>
            </ul>
          </motion.div>

          <motion.div variants={footerItemVariants} custom={2}>
            <p className="font-semibold text-white text-lg mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent-green transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Política de Cookies</a></li>
            </ul>
          </motion.div>

          <motion.div variants={footerItemVariants} custom={3}>
            <p className="font-semibold text-white text-lg mb-3">Contacto</p>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-center md:justify-start">
                    <Mail className="h-4 w-4 mr-2 text-accent-green"/> 
                    <span>contacto@farmedplus.cl</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                    <Phone className="h-4 w-4 mr-2 text-accent-green"/> 
                    <span>+56 9 XXXX XXXX</span>
                </li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-3 mt-4">
              {socialLinks.map(link => (
                <motion.a 
                    key={link.label} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label} 
                    className="text-primary-foreground/70 hover:text-accent-green transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full"
                    whileHover={{ scale: 1.1, y: -2}}
                    transition={{ type: "spring", stiffness:300}}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
            variants={footerItemVariants} 
            custom={4}
            className="border-t border-primary-foreground/20 pt-8 text-center"
        >
          <p className="text-xs mb-2">
            <span className="font-bold">Importante:</span> La información proporcionada por FarmedSearch es referencial y no reemplaza una consulta médica profesional. Consulta siempre a tu doctor o farmacéutico.
          </p>
          <p className="text-xs">&copy; {currentYear} FarmedSearch Chile. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;