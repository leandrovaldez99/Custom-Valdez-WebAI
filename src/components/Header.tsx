import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);


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
          <button
            className="md:hidden size-12 flex flex-col items-center justify-center p-2 relative"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <motion.span
              className="hamburger-line block h-0.5 w-6 bg-white origin-center"
              initial={false}
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 2 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="hamburger-line block h-0.5 w-6 bg-white my-1 origin-center"
              initial={false}
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="hamburger-line block h-0.5 w-6 bg-white origin-center"
              initial={false}
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <motion.div
        className="md:hidden absolute inset-0 bg-black/80 backdrop-blur-xl z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMenuOpen(false)}
      />
      <motion.div
        className="md:hidden absolute top-full left-0 w-full h-[calc(100vh-5rem)] bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-12 py-20 px-6 overflow-auto"
        ref={menuRef}
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20, scale: isMenuOpen ? 1 : 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {[
          { label: 'Inicio', to: '/#top' },
          { label: 'Servicios', to: '/#services' },
          { label: 'Galería', to: '/#gallery' },
          { label: 'Contacto', to: '/#contact' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ delay: idx * 0.05 + 0.1 }}
          >
            <Link
              className="text-white/90 hover:text-primary transition-all text-3xl font-black uppercase tracking-[0.2em] py-4 hover:py-6 relative block"
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              <motion.span 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-primary w-0 origin-center"
                initial={false}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        ))}
        <motion.a
          href="https://wa.me/+5493487623100"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-12 py-6 rounded-none text-xl font-black uppercase tracking-wider shadow-2xl hover:shadow-primary/50 mt-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsMenuOpen(false)}
        >
          WhatsApp
        </motion.a>
      </motion.div>
    </header>
  );
};

export default Header;

