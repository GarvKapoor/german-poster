import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Globe, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/sound';
import { MealTime } from '../data/foodData';

interface HeaderProps {
  timeHour: number;
  setTimeHour: (hour: number) => void;
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  lang: 'de' | 'en';
  setLang: (lang: 'de' | 'en') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  slowAudio: boolean;
  setSlowAudio: (slow: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  timeHour,
  setTimeHour,
  selectedMeal,
  setSelectedMeal,
  lang,
  setLang,
  soundEnabled,
  setSoundEnabled,
  slowAudio,
  setSlowAudio,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const toggleLang = () => {
    sound.playClick();
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-stone-950/90 border-b border-stone-800/80 transition-all duration-300">
      
      {/* German Tricolor Scroll Progress Bar at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-stone-900 via-red-600 to-amber-400 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="w-full px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Brand Logo with German Flag Accent */}
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-stone-900 p-0.5 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-2xl">
                🥨
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  KULINARIK
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  DEUTSCHLAND
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                {lang === 'de' ? 'Das interaktive Bildungsplakat' : 'Interactive German Poster'}
              </p>
            </div>
          </div>

          {/* Center: Dynamic Sun/Moon Time Arc Controller */}
          <div className="flex items-center gap-3 sm:gap-4 bg-stone-900/90 px-4 sm:px-6 py-2 rounded-2xl border border-stone-700/80 shadow-inner flex-1 max-w-xl mx-2 sm:mx-6 justify-center">
            <span className="text-xs font-mono text-stone-300 flex items-center gap-1.5 shrink-0">
              {timeHour < 18 ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
              ) : (
                <Moon className="w-4 h-4 text-indigo-300" />
              )}
              <span className="font-bold text-white text-xs sm:text-sm">{String(timeHour).padStart(2, '0')}:00 Uhr</span>
            </span>

            <input
              type="range"
              min="6"
              max="22"
              value={timeHour}
              onChange={(e) => {
                sound.playClick();
                setTimeHour(parseInt(e.target.value, 10));
              }}
              className="w-full max-w-[140px] sm:max-w-[220px] h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              title="Tageszeit regeln (06:00 - 22:00 Uhr)"
            />

            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 px-2.5 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 shrink-0 hidden md:inline-block">
              {selectedMeal === 'fruehstueck' && '🌅 Frühstück'}
              {selectedMeal === 'mittagessen' && '☀️ Mittagessen'}
              {selectedMeal === 'kaffee' && '☕ Kaffee & Kuchen'}
              {selectedMeal === 'abendbrot' && '🌙 Abendbrot'}
            </span>
          </div>

          {/* Right: Audio Speed, Sound FX, Lang */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Speed */}
            <button
              onClick={() => {
                sound.playClick();
                setSlowAudio(!slowAudio);
              }}
              title={lang === 'de' ? 'Aussprache-Tempo umschalten' : 'Toggle Audio Speed'}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                slowAudio
                  ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              🐢 <span className="hidden sm:inline">{slowAudio ? 'Langsam' : 'Normal'}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Audio stummschalten' : 'Audio aktivieren'}
              className="p-2 sm:p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/50 text-xs font-bold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'de' ? 'DE' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
