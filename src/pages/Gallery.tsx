import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`size-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-4' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden cursor-ew-resize select-none shadow-2xl border border-slate-100"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200')` }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200')`,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
        }}
      />
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-primary shadow-lg z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <ChevronRight className="w-5 h-5 rotate-180" />
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="absolute top-6 left-6 z-30 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-sm uppercase tracking-[0.2em]">Antes</div>
      <div className="absolute top-6 right-6 z-30 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-sm uppercase tracking-[0.2em]">Después</div>
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/60 to-transparent text-white z-10">
        <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-2">Reconstrucción Ford Raptor SVT</h3>
        <p className="text-slate-300 text-sm md:text-lg font-medium max-w-2xl">Reemplazo completo de sellos, recarga de nitrógeno y recubrimiento en polvo personalizado.</p>
      </div>
    </div>
  );
};

const Gallery = () => (
  <section id="gallery" className="bg-background-light py-24 px-6 md:px-10 lg:px-40 scroll-mt-24 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center gap-2">
          <div className="w-12 h-[2px] bg-primary"></div>
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Portafolio</span>
        </div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
        >
          Destacado de <br /> <span className="text-primary">Restauración</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg max-w-2xl font-medium mt-4"
        >
          Sea testigo de la transformación completa de los sistemas de suspensión de alto rendimiento.
        </motion.p>
      </div>
      
      <BeforeAfterSlider />

      <div className="mt-32">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Proyectos <span className="text-primary">Recientes</span></h2>
          <div className="w-20 h-1 bg-primary"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
          {[
            { 
              title: 'Refurb de Coilovers KW', 
              desc: 'Desmontaje completo, pulido de ejes y ajuste de válvulas personalizado para uso en pista.', 
              vehicle: 'BMW M3 E92', 
              id: '#0429', 
              images: [
                'https://picsum.photos/seed/kw1/600/400',
                'https://picsum.photos/seed/kw2/600/400',
                'https://picsum.photos/seed/kw3/600/400'
              ] 
            },
            { 
              title: 'Servicio de Horquilla Öhlins', 
              desc: 'Reparación de fugas y restauración de anodizado dorado para carreras vintage.', 
              vehicle: 'DUCATI 996', 
              id: '', 
              images: [
                'https://picsum.photos/seed/ohlins1/600/400',
                'https://picsum.photos/seed/ohlins2/600/400'
              ] 
            },
            { 
              title: 'Reconstrucción King Shocks', 
              desc: 'Servicio de depósito remoto y actualización de sellos de alta resistencia.', 
              vehicle: 'TOYOTA TUNDRA', 
              id: '', 
              images: [
                'https://picsum.photos/seed/king1/600/400',
                'https://picsum.photos/seed/king2/600/400'
              ] 
            },
            { 
              title: 'Restauración Fox 2.0', 
              desc: 'Desmontaje completo de cuerpos severamente oxidados, chorreado de arena y re-recubrimiento.', 
              vehicle: 'JEEP WRANGLER', 
              id: '#0420', 
              images: [
                'https://picsum.photos/seed/fox1/600/400',
                'https://picsum.photos/seed/fox2/600/400',
                'https://picsum.photos/seed/fox3/600/400'
              ] 
            },
            { 
              title: 'Revisión Bilstein B6', 
              desc: 'Restauración de la ingeniería clásica alemana a las especificaciones de fábrica.', 
              vehicle: 'PORSCHE 911 (964)', 
              id: '', 
              images: [
                'https://picsum.photos/seed/bilstein1/600/400',
                'https://picsum.photos/seed/bilstein2/600/400'
              ] 
            },
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col overflow-hidden bg-secondary-dark/50 p-1 hover:bg-secondary-dark transition-all"
            >
              <div className="relative">
                <ProjectCarousel images={project.images} title={project.title} />
                {project.id && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest z-10">
                    {project.id}
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    {project.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{project.desc}</p>
                <div className="pt-6 mt-auto border-t border-white/5 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  {project.vehicle}
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="flex flex-col items-center justify-center gap-8 bg-black p-12 text-center">
            <div className="size-20 rounded-full border border-white/20 flex items-center justify-center text-primary">
              <Settings2 className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter">¿Tienes un proyecto?</h3>
              <p className="text-slate-400 text-sm font-medium">Podemos restaurar su suspensión a una condición mejor que nueva.</p>
            </div>
            <a 
              href="https://wa.me/+5493487623100" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-xs transition-all"
            >
              Comienza Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
