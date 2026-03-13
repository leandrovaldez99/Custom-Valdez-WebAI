import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Wrench, ShieldCheck, History, MessageCircle, Car, LayoutGrid, ChevronRight, ChevronLeft, Settings2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

const ProjectCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-video overflow-hidden group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Vista ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </AnimatePresence>

      {/* Labels for Before/After */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all duration-300 ${currentIndex === 0 ? 'bg-primary/80 text-white' : 'bg-black/80 text-white'}`}>
          {currentIndex === 0 ? 'Después' : 'Antes'}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};


const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Rotating hero images
  const images = ['/motocross.jpg', '/motopista.png', '/motoviaje.jpeg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Mouse position as motion values (0 to 1 range, 0.5 = center)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms for the title group
  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  // Parallax offsets - text (shallow depth)
  const textX = useTransform(smoothX, [0, 1], [-15, 15]);
  const textY = useTransform(smoothY, [0, 1], [-10, 10]);


  // Spotlight position (percentage)
  const spotlightX = useTransform(smoothX, [0, 1], [0, 100]);
  const spotlightY = useTransform(smoothY, [0, 1], [0, 100]);

  // Spotlight background gradient that follows mouse
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]: number[]) =>
      `radial-gradient(circle 400px at ${x}% ${y}%, rgba(0, 174, 239, 0.12) 0%, transparent 70%)`
  );

  // Spotlight opacity
  const spotlightOpacity = useMotionValue(0);
  const smoothSpotlightOpacity = useSpring(spotlightOpacity, { damping: 20, stiffness: 100 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    spotlightOpacity.set(1);
  }, [mouseX, mouseY, spotlightOpacity]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    spotlightOpacity.set(0);
  }, [mouseX, mouseY, spotlightOpacity]);

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden bg-black pt-16 md:pt-20"
    >
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Custom Valdez Workshop - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover opacity-40"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black"></div>
      </div>

      {/* Spotlight overlay that follows the mouse */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: smoothSpotlightOpacity,
          background: spotlightBackground,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center cursor-default"
          style={{
            perspective: 1000,
          }}
        >
          {/* 3D Tilt container - parallax applied to the whole group */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 mb-6 group cursor-crosshair"
            style={{
              rotateX,
              rotateY,
              x: textX,
              y: textY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* "Custom" text + "Shock Specialists" subtitle */}
            <div className="flex flex-col items-center md:items-end md:-mr-8 lg:-mr-16 z-0">
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter leading-none text-white italic drop-shadow-xl">
                Custom
              </h1>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                Shock Specialists
              </span>
            </div>

            {/* Logo */}
            <img
              src="https://i.imgur.com/3D6eBT8.png"
              alt="Custom Valdez Logo"
              className="h-40 md:h-56 lg:h-[20rem] w-auto object-contain opacity-100 z-10"
              referrerPolicy="no-referrer"
            />

            {/* "Valdez" text + "Since 2000" subtitle */}
            <div className="flex flex-col items-center md:items-start md:-ml-8 lg:-ml-16 z-0">
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter leading-none text-white italic drop-shadow-xl">
                Valdez
              </h1>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300 md:pl-3">
                Since 2000
              </span>
            </div>
          </motion.div>



          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 leading-relaxed opacity-70 hover:opacity-100 transition-opacity duration-300">
            Especialistas en reparación, mantenimiento y personalización de amortiguadores y monoshoks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 opacity-95 hover:opacity-100 transition-opacity duration-300">
            <a
              href="#contact"
              className="bg-primary text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-primary-dark hover:scale-105 transition-all flex items-center justify-center"
            >
              Contactar Ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-4xl mx-auto">
        {[
          {
            title: 'Service',
            desc: 'Mantenimiento preventivo y puesta a punto integral para tu suspensión.',
            icon: ShieldCheck,
            img: '/service.png'
          },
          {
            title: 'Restauración',
            desc: 'Recuperación estética y funcional completa a estándares de fábrica.',
            icon: History,
            img: '/ohlins.png'
          },
        ].map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: idx * 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group relative h-[400px] md:h-[450px] overflow-hidden bg-zinc-900 cursor-pointer"
          >
            {/* Background image with enhanced transitions */}
            <motion.img
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ opacity: 0.5 }}
              referrerPolicy="no-referrer"
            />

            {/* Hover glow overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-[1]"></div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-[3]">
              {/* Icon */}
              <div className="text-primary mb-4">
                <service.icon className="w-9 h-9 drop-shadow-[0_0_8px_rgba(0,174,239,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(0,174,239,0.7)] transition-all duration-500" />
              </div>

              <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description with slide-up animation */}
              <div className="overflow-hidden">
                <p className="text-slate-300 text-sm font-medium mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                  {service.desc}
                </p>
              </div>

              {/* Animated bottom line */}
              <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,174,239,0.5)]"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const GallerySection = () => (
  <section id="gallery" className="bg-black py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="max-w-2xl">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Portafolio</span>
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Trabajos <span className="text-primary">Realizados</span>
          </h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {[
          {
            title: 'Refurb KW',
            vehicle: 'BMW M3 E92',
            images: ['https://picsum.photos/seed/kw-after/600/400', 'https://picsum.photos/seed/kw-before/600/400']
          },
          {
            title: 'King Shocks',
            vehicle: 'TOYOTA TUNDRA',
            images: ['https://picsum.photos/seed/king-after/600/400', 'https://picsum.photos/seed/king-before/600/400']
          },
          {
            title: 'Fox 2.0 Restore',
            vehicle: 'JEEP WRANGLER',
            images: ['https://picsum.photos/seed/fox-after/600/400', 'https://picsum.photos/seed/fox-before/600/400']
          },
          {
            title: 'Öhlins Service',
            vehicle: 'DUCATI 996',
            images: ['https://picsum.photos/seed/ohlins-after/600/400', 'https://picsum.photos/seed/ohlins-before/600/400']
          },
          {
            title: 'Bilstein B6',
            vehicle: 'PORSCHE 911',
            images: ['https://picsum.photos/seed/bilstein-after/600/400', 'https://picsum.photos/seed/bilstein-before/600/400']
          },
          {
            title: 'Ford Raptor SVT',
            vehicle: 'FORD RAPTOR',
            images: ['https://picsum.photos/seed/raptor-after/600/400', 'https://picsum.photos/seed/raptor-before/600/400']
          },
        ].map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden bg-secondary-dark/50 border border-white/5"
          >
            <ProjectCarousel images={project.images} title={project.title} />
            <div className="p-6 bg-zinc-900/50">
              <h3 className="text-white text-lg font-black uppercase italic tracking-tighter mb-1">{project.title}</h3>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest">{project.vehicle}</p>
            </div>
          </motion.div>
        ))}
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
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
      <GallerySection />
      <Contact />
      <MapSection />
    </>
  );
};

export default Home;
