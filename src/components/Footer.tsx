import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white border-t border-white/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.imgur.com/3D6eBT8.png" 
              alt="Logo" 
              className="h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-black uppercase tracking-tight">Custom Valdez</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Ingeniería de suspensión de alto rendimiento. Especialistas en reparación, mantenimiento y personalización de amortiguadores y monoshoks.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/customvaldez" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/customvaldez" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/+5493487623100" target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-8">Navegación</h3>
          <ul className="flex flex-col gap-4">
            <li><Link to="/#top" className="text-slate-400 hover:text-primary transition-colors text-sm">Inicio</Link></li>
            <li><Link to="/#services" className="text-slate-400 hover:text-primary transition-colors text-sm">Servicios</Link></li>
            <li><Link to="/#gallery" className="text-slate-400 hover:text-primary transition-colors text-sm">Galería</Link></li>
            <li><Link to="/#contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Contacto</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contacto</h3>
          <ul className="flex flex-col gap-6">
            <li className="flex gap-4">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span className="text-slate-400 text-sm">Pellegrini 2358, Zárate, Buenos Aires</span>
            </li>
            <li className="flex gap-4">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span className="text-slate-400 text-sm">+54 9 3487 62-3100</span>
            </li>
            <li className="flex gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span className="text-slate-400 text-sm">customvaldez@yahoo.com</span>
            </li>
          </ul>
        </div>

        {/* Schedule/Extra */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-8">Horarios</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between text-sm">
              <span className="text-slate-500">Lunes - Viernes:</span>
              <span className="text-slate-300">09:00 - 18:00</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-500">Sábados:</span>
              <span className="text-slate-300">09:00 - 13:00</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-500">Domingos:</span>
              <span className="text-slate-300 text-primary">Cerrado</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
          © 2000 Custom Valdez. Todos los derechos reservados.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-slate-600 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">Privacidad</a>
          <a href="#" className="text-slate-600 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">Términos</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
