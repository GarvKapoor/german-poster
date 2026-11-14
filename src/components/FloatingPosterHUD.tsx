import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Sparkles, UtensilsCrossed, Compass, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { useScrollDirection } from '../utils/useScrollDirection';

export const FloatingPosterHUD: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const { scrollDirection, scrollY } = useScrollDirection();

  const sections = [
    { id: 'intro', label: 'Plakat', icon: Sparkles },
    { id: 'panorama', label: 'Panorama', icon: UtensilsCrossed },
    { id: 'karussell', label: 'Galerie', icon: UtensilsCrossed },
    { id: 'katalog', label: 'Speisen', icon: UtensilsCrossed },
    { id: 'teller', label: 'Teller', icon: Utensils },
    { id: 'landkarte', label: 'Landkarte', icon: Compass },
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Page navigation" className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 p-2 rounded-3xl bg-stone-950/85 backdrop-blur-xl border border-stone-800 shadow-2xl">
      
      {/* Scroll Direction Tactile Indicator (Shows whether user is ascending or descending) */}
      <AnimatePresence mode="wait">
        {scrollY > 150 && (
          <motion.div
            key={scrollDirection}
            initial={{ opacity: 0, scale: 0.6, y: scrollDirection === 'up' ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: scrollDirection === 'up' ? -8 : 8 }}
            transition={{ duration: 0.3 }}
            className={`p-1.5 rounded-xl text-[10px] font-mono font-black flex items-center justify-center border shadow-lg ${
              scrollDirection === 'up'
                ? 'bg-amber-400 text-stone-950 border-amber-300 ring-2 ring-amber-400/40'
                : 'bg-stone-900 text-stone-400 border-stone-800'
            }`}
            title={scrollDirection === 'up' ? 'Aufwärtsblättern (Going Back Up)' : 'Vorwärtsblättern (Scrolling Down)'}
          >
            {scrollDirection === 'up' ? (
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const Icon = sec.icon;

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`group relative p-2.5 rounded-2xl transition-all ${
              isActive
                ? 'bg-amber-400 text-stone-950 scale-110 shadow-lg shadow-amber-400/30'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Icon className="w-4 h-4" />

            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-stone-900 text-white text-[11px] font-bold tracking-wide border border-stone-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {sec.label}
            </span>
          </button>
        );
      })}

      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="mt-2 p-2.5 rounded-2xl bg-stone-900 text-amber-400 hover:bg-amber-400 hover:text-stone-950 transition-colors border border-stone-800"
          title="Nach ganz oben scrollen"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
