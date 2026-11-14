import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, UtensilsCrossed, Compass, Gamepad2, MessageSquareHeart } from 'lucide-react';
import { sound } from '../utils/sound';

export const FloatingPosterHUD: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [scrollY, setScrollY] = useState(0);

  const sections = [
    { id: 'intro', label: 'Titel', icon: Sparkles },
    { id: 'panorama', label: 'Panorama', icon: UtensilsCrossed },
    { id: 'katalog', label: 'Speisen', icon: UtensilsCrossed },
    { id: 'teller', label: 'Baukasten', icon: UtensilsCrossed },
    { id: 'landkarte', label: 'Landkarte', icon: Compass },
    { id: 'spiel', label: 'Quiz', icon: Gamepad2 },
    { id: 'dialoge', label: 'Dialoge', icon: MessageSquareHeart },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine active section based on scroll offsets
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
    <aside aria-label="Page navigation" className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 p-2 rounded-3xl bg-stone-950/80 backdrop-blur-xl border border-stone-800/80 shadow-2xl">
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

            {/* Tooltip Label */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-stone-900 text-white text-[11px] font-bold tracking-wide border border-stone-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {sec.label}
            </span>
          </button>
        );
      })}

      {/* Back to top button */}
      {scrollY > 400 && (
        <button
          onClick={scrollToTop}
          className="mt-2 p-2.5 rounded-2xl bg-stone-900 text-amber-400 hover:bg-amber-400 hover:text-stone-950 transition-colors border border-stone-800"
          title="Nach oben scrollen"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
