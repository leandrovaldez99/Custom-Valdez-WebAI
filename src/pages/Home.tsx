import React from 'react';
import { Wrench, ShieldCheck, History, MessageCircle, Car, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';


const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-black pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://i.imgur.com/UKBByX6.jpg" 
        alt="Custom Valdez Workshop" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
    </div>
    
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center group cursor-default"
        >
          <div className="flex items-center justify-center mb-6 transition-opacity duration-300 opacity-50 group-hover:opacity-100">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Shock Specialists</span>
          </div>
          <h1 className="text-white text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 italic transition-opacity duration-300 opacity-40 group-hover:opacity-100">
            Domina <br /> El Camino
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 leading-relaxed transition-opacity duration-300 opacity-30 group-hover:opacity-100">
            Especialistas en reparación, mantenimiento y personalización de amortiguadores de alto rendimiento.
          </p>
          <div className="flex flex-wrap justify-center gap-4 transition-opacity duration-300 opacity-40 group-hover:opacity-100">
            <a 
              href="#contact" 
              className="bg-primary text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center gap-3 group/btn"
            >
              Contactar Ahora
              <div className="w-6 h-[2px] bg-white group-hover/btn:w-10 transition-all"></div>
            </a>
          </div>
        </motion.div>
      </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-background-light">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-slate-400 text-lg font-medium">
            Ingeniería de precisión para tu suspensión. Desde mantenimiento preventivo hasta configuraciones de competición.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {[
          { 
            title: 'Service', 
            desc: 'Mantenimiento preventivo y puesta a punto integral para tu suspensión.', 
            icon: ShieldCheck,
            img: 'https://images.unsplash.com/photo-1591438122447-3e9f55a7a39a?auto=format&fit=crop&q=80&w=800'
          },
          { 
            title: 'Reparación', 
            desc: 'Diagnóstico y solución de fallas con recambio de componentes de alta calidad.', 
            icon: Wrench,
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
          },
          { 
            title: 'Restauración', 
            desc: 'Recuperación estética y funcional completa a estándares de fábrica.', 
            icon: History,
            img: 'https://images.unsplash.com/photo-1502744691670-71517a542763?auto=format&fit=crop&q=80&w=800'
          },
        ].map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative h-[400px] overflow-hidden bg-zinc-900"
          >
            <img 
              src={service.img} 
              alt={service.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="text-primary mb-4">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter mb-2">{service.title}</h3>
              <p className="text-slate-300 text-sm font-medium mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.desc}
              </p>
              <div className="w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const GalleryCTA = () => (
  <section className="bg-black py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=1200" 
            alt="Gallery Preview" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Portafolio</span>
        <h2 className="text-white text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
          Trabajos <br /> Realizados
        </h2>
        <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">
          Explora nuestra galería de proyectos terminados. Calidad artesanal combinada con tecnología de vanguardia.
        </p>
        <Link 
          to="/gallery" 
          className="inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm group"
        >
          Ver Galería Completa
          <div className="size-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-background-light">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-white text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-16">
        Conecta Con <span className="text-primary">Nosotros</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            name: 'Facebook', 
            handle: '@customvaldez', 
            url: 'https://www.facebook.com/customvaldez',
            color: '#1877F2',
            icon: (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )
          },
          { 
            name: 'Instagram', 
            handle: '@customvaldez', 
            url: 'https://www.instagram.com/customvaldez',
            color: '#E4405F',
            icon: (
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            )
          },
          { 
            name: 'WhatsApp', 
            handle: 'Chatea con nosotros', 
            url: 'https://wa.me/+5493487623100',
            color: '#25D366',
            icon: (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            )
          },
        ].map((social, idx) => (
          <a 
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-10 border border-white/5 hover:border-primary hover:shadow-2xl transition-all group bg-secondary-dark/50"
          >
            <div className="size-16 rounded-full flex items-center justify-center bg-white/5 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              {social.icon}
            </div>
            <span className="text-white font-black uppercase tracking-widest text-sm">{social.name}</span>
            <span className="text-slate-500 text-xs">{social.handle}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const MapSection = () => (
  <section className="w-full h-[450px] bg-background-dark border-t border-white/5 overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.6666666666665!2d-59.0244444!3d-34.0966667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb0b0b0b0b0b0b%3A0x0!2sPellegrini%202358%2C%20Z%C3%A1rate%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación Custom Valdez"
      className="invert brightness-90 contrast-125 hue-rotate-[10deg] opacity-60 hover:opacity-100 transition-opacity duration-500"
    ></iframe>
  </section>
);

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <GalleryCTA />
      <Contact />
      <MapSection />
    </>
  );
};

export default Home;
