import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isScrolled
        ? 'top-4 mx-4 md:mx-auto max-w-5xl bg-black/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/5 rounded-full py-3 px-2'
        : 'top-0 w-full bg-black/40 backdrop-blur-sm py-4'
        }`}
    >
      <div className="w-full px-6 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center group">
            <motion.img
              src="https://i.imgur.com/3D6eBT8.png"
              alt="Custom Valdez Logo"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'Inicio', to: '/#top' },
            { label: 'Servicios', to: '/#services' },
            { label: 'Galería', to: '/#gallery' },
            { label: 'Contacto', to: '/#contact' },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="relative group"
            >
              <Link
                className="text-white/80 group-hover:text-primary transition-colors text-xs font-black uppercase tracking-[0.2em] relative pb-1"
                to={item.to}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.a
            href="https://wa.me/+5493487623100"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center justify-center bg-primary text-white px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest"
            whileHover={{
              scale: 1.05,
              backgroundColor: '#25D366',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
          >
            WhatsApp
          </motion.a>
          <div className="md:hidden size-10 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-white relative before:absolute before:-top-2 before:left-0 before:w-6 before:h-0.5 before:bg-white after:absolute after:top-2 after:left-0 after:w-6 after:h-0.5 after:bg-white"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
