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
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
        opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4}
    })
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.1 }}
      className="glass-nav border-t border-white/10 pt-16 pb-8"
      id="contacto"
    >
      <div className="container mx-auto px-4">
        <div className="card-float">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center md:text-left">
            <motion.div variants={footerItemVariants} custom={0}>
              <p className="font-heading text-2xl font-semibold text-white mb-3">
                <span className="text-aqua-400">Farmed</span>Search
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Democratizando el conocimiento farmacológico en Chile. Información clara y confiable.
              </p>
            </motion.div>
            
            <motion.div variants={footerItemVariants} custom={1}>
              <p className="font-semibold text-white text-lg mb-4">Navegación</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#inicio" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    🏠 Inicio
                  </a>
                </li>
                <li>
                  <a href="#cómo-funciona" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    ⚙️ Cómo Funciona
                  </a>
                </li>
                <li>
                  <a href="#faq" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    ❓ FAQ
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={footerItemVariants} custom={2}>
              <p className="font-semibold text-white text-lg mb-4">Legal</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    📄 Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    🔒 Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    🍪 Política de Cookies
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={footerItemVariants} custom={3}>
              <p className="font-semibold text-white text-lg mb-4">Contacto</p>
              <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-center md:justify-start group">
                      <Mail className="h-4 w-4 mr-2 text-aqua-400 group-hover:text-aqua-300 transition-colors duration-300"/> 
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        contacto@farmedplus.cl
                      </span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start group">
                      <Phone className="h-4 w-4 mr-2 text-aqua-400 group-hover:text-aqua-300 transition-colors duration-300"/> 
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        +56 9 XXXX XXXX
                      </span>
                  </li>
              </ul>
              
              <div className="flex justify-center md:justify-start space-x-3 mt-6">
                {socialLinks.map(link => (
                  <motion.a 
                      key={link.label} 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label} 
                      className="text-gray-300 hover:text-aqua-400 transition-all duration-300 p-3 glass-card rounded-full hover:shadow-aqua-glow"
                      whileHover={{ scale: 1.1, y: -2}}
                      transition={{ type: "spring", stiffness: 300}}
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
              className="border-t border-white/20 pt-8 text-center"
          >
            <div className="glass-card p-4 mb-4">
              <p className="text-xs mb-2 text-gray-300 leading-relaxed">
                <span className="font-bold text-aqua-400">⚠️ Importante:</span> La información proporcionada por FarmedSearch es referencial y no reemplaza una consulta médica profesional. Consulta siempre a tu doctor o farmacéutico.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {currentYear} <span className="text-aqua-400 font-medium">FarmedSearch Chile</span>. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
