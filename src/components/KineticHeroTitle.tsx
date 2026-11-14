import React, { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';
import { MealTime } from '../data/foodData';

interface KineticHeroTitleProps {
  timeHour: number;
  setTimeHour: (hour: number) => void;
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  lang: 'de' | 'en';
  slowAudio: boolean;
}

interface FloatingFood {
  id: string;
  name: string;
  article: 'der' | 'die' | 'das';
  emoji: string;
  xPercent: number;
  yPercent: number;
  delay: string;
}

const ORBITING_FOODS: FloatingFood[] = [
  { id: 'brezel', name: 'Brezel', article: 'die', emoji: '🥨', xPercent: 10, yPercent: 22, delay: '0s' },
  { id: 'schnitzel', name: 'Schnitzel', article: 'das', emoji: '🥩', xPercent: 88, yPercent: 20, delay: '0.6s' },
  { id: 'bier', name: 'Weizenbier', article: 'das', emoji: '🍺', xPercent: 86, yPercent: 62, delay: '1.2s' },
  { id: 'broetchen', name: 'Brötchen', article: 'das', emoji: '🥖', xPercent: 12, yPercent: 65, delay: '1.8s' },
  { id: 'torte', name: 'Kirschtorte', article: 'die', emoji: '🍰', xPercent: 50, yPercent: 6, delay: '2.4s' },
];

export const KineticHeroTitle: React.FC<KineticHeroTitleProps> = ({
  timeHour,
  setTimeHour,
  selectedMeal,
  setSelectedMeal,
  lang,
  slowAudio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [activeFood, setActiveFood] = useState<FloatingFood | null>(null);
  const [isSpeakingTitle, setIsSpeakingTitle] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#f59e0b', '#ef4444', '#fbbf24', '#ffffff', '#eab308'];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -Math.random() * 1.2 - 0.2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let cursorX = width * 0.5;
    let cursorY = height * 0.5;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onPointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(cursorX, cursorY, 10, cursorX, cursorY, 300);
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
      gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - cursorX;
        const dy = p.y - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const force = (110 - dist) / 110;
          p.vx += (dx / dist) * force * 1.4;
          p.vy += (dy / dist) * force * 1.4;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 - 0.015;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1.0;

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, []);

  const word1 = lang === 'de' ? 'KULINARISCHES' : 'CULINARY';
  const word2 = lang === 'de' ? 'DEUTSCHLAND' : 'GERMANY';

  const handleLetterHover = (index: number) => {
    sound.playLetterNote(index);
    setHoveredLetter(index);
  };

  const handleTitleClick = () => {
    sound.playPop();
    sound.playSuccess();
    try {
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#000000', '#DD0000', '#FFCC00'],
      });
    } catch {
      // fallback
    }
  };

  const handleSpeakTitle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsSpeakingTitle(true);
    const text = lang === 'de' ? 'Kulinarisches Deutschland' : 'Culinary Germany';
    await speakGerman(text, slowAudio ? 0.7 : 0.9);
    setIsSpeakingTitle(false);
  };

  const handleFoodClick = async (food: FloatingFood) => {
    sound.playPop();
    setActiveFood(food);
    await speakGerman(`${food.article} ${food.name}`, slowAudio ? 0.7 : 0.9);
    setTimeout(() => setActiveFood(null), 2000);
  };

  const getSkyStyle = () => {
    if (timeHour < 10) {
      return 'from-amber-600/30 via-orange-600/15 to-stone-950';
    } else if (timeHour < 15) {
      return 'from-amber-500/20 via-red-600/15 to-stone-950';
    } else if (timeHour < 18) {
      return 'from-amber-700/25 via-stone-900 to-stone-950';
    } else {
      return 'from-indigo-950/40 via-purple-950/20 to-stone-950';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between border-b border-stone-800 bg-gradient-to-b ${getSkyStyle()} px-4 sm:px-8 xl:px-16 py-8 sm:py-12 overflow-hidden shadow-2xl transition-all duration-700 select-none group poster-grain`}
    >
      {/* Background Interactive Fluid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Banner Status */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-stone-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5 w-5 h-4 rounded overflow-hidden shadow">
            <span className="h-1.5 bg-stone-950 w-full" />
            <span className="h-1.5 bg-red-600 w-full" />
            <span className="h-1.5 bg-amber-400 w-full" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-extrabold text-amber-300 block">
              BUNDESREPUBLIK DEUTSCHLAND
            </span>
            <span className="text-[11px] text-stone-400">
              {lang === 'de' ? 'Offizielles Interaktives Bildungsplakat' : 'Official Interactive Educational Poster'}
            </span>
          </div>
        </div>

        <div className="text-xs font-mono text-stone-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === 'de' ? 'Echtzeit-Mahlzeitensteuerung aktiv' : 'Real-time Day Clock Active'}</span>
        </div>
      </div>

      {/* Floating Interactive 3D Satellites */}
      {ORBITING_FOODS.map((food) => (
        <div
          key={food.id}
          onClick={() => handleFoodClick(food)}
          style={{
            left: `${food.xPercent}%`,
            top: `${food.yPercent}%`,
            animationDelay: food.delay,
          }}
          className="absolute z-20 hidden lg:flex flex-col items-center cursor-pointer group/orb animate-float hover:scale-125 transition-transform duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-stone-900/90 border border-stone-700 backdrop-blur-md shadow-xl flex items-center justify-center text-2xl group-hover/orb:border-amber-400 group-hover/orb:ring-2 group-hover/orb:ring-amber-400/30 transition-all">
            <span className="transform group-hover/orb:rotate-12 transition-transform">
              {food.emoji}
            </span>
          </div>

          <span className="mt-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-stone-950/95 text-stone-200 border border-stone-700 shadow-lg opacity-0 group-hover/orb:opacity-100 transition-opacity whitespace-nowrap">
            {food.article.toUpperCase()} {food.name}
          </span>
        </div>
      ))}

      {/* Active Food Tooltip Popup when clicked */}
      {activeFood && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-5 py-2.5 rounded-2xl bg-amber-400 text-stone-950 font-black text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="text-xl">{activeFood.emoji}</span>
          <span>{activeFood.article.toUpperCase()} {activeFood.name}!</span>
        </div>
      )}

      {/* ELEGANT TYPOGRAPHIC POSTER HEADLINE */}
      <div 
        onClick={handleTitleClick}
        className="relative z-10 text-center py-6 sm:py-10 space-y-4 cursor-pointer my-auto max-w-5xl mx-auto"
      >
        
        {/* Kinetic Word 1: KULINARISCHES / CULINARY */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {word1.split('').map((char, idx) => {
            const isHovered = hoveredLetter === idx;
            return (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(idx)}
                onMouseLeave={() => setHoveredLetter(null)}
                className={`font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight inline-block transition-all duration-200 transform leading-none ${
                  isHovered
                    ? 'text-amber-300 -translate-y-3 scale-125 rotate-3 drop-shadow-[0_15px_25px_rgba(245,158,11,0.6)] z-20'
                    : 'text-white hover:text-amber-200 drop-shadow-md'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Kinetic Word 2: DEUTSCHLAND / GERMANY */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {word2.split('').map((char, idx) => {
            const letterGlobalIndex = word1.length + idx;
            const isHovered = hoveredLetter === letterGlobalIndex;
            return (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(letterGlobalIndex)}
                onMouseLeave={() => setHoveredLetter(null)}
                className={`font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight inline-block transition-all duration-200 transform leading-none ${
                  isHovered
                    ? 'text-red-400 -translate-y-3 scale-125 -rotate-3 drop-shadow-[0_15px_25px_rgba(239,68,68,0.7)] z-20'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-200 drop-shadow-md'
                }`}
              >
                {char}
              </span>
            );
          })}
          <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-amber-400 animate-pulse leading-none">
            .
          </span>
        </div>

        {/* Phonetic & Audio Pronunciation Button Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleSpeakTitle}
            disabled={isSpeakingTitle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-xl transition-all duration-300 ${
              isSpeakingTitle
                ? 'bg-amber-500 text-stone-950 scale-105 ring-4 ring-amber-400/40'
                : 'bg-stone-900/90 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-amber-400/40 hover:scale-105'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isSpeakingTitle ? 'animate-bounce' : ''}`} />
            <span>
              {isSpeakingTitle
                ? (lang === 'de' ? 'Sprachausgabe aktiv...' : 'Speaking...')
                : (lang === 'de' ? '🔊 [ku-li-ˈnaː-ʁɪ-ʃəs ˈdɔʏ̯tʃ-lant]' : '🔊 Speak Title in German')}
            </span>
          </button>

          <span className="px-3.5 py-1.5 rounded-xl bg-stone-900/70 border border-stone-800 text-xs font-serif italic text-stone-300">
            {lang === 'de' ? '✨ Berühre die Buchstaben für Harfen-Töne!' : '✨ Hover letters to play notes!'}
          </span>
        </div>

        {/* Subtitle description */}
        <p className="font-serif italic text-lg sm:text-2xl text-stone-300 max-w-3xl mx-auto pt-2 leading-relaxed">
          {lang === 'de' 
            ? 'Vom ofenfrischen Frühstück über das herzhafte Mittagessen bis zum gemütlichen Abendbrot.' 
            : 'From oven-fresh morning breakfast to hearty lunch and cozy evening supper.'}
        </p>

      </div>

      {/* Bottom Live Interactive Meal Indicators */}
      <div className="relative z-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((meal) => {
          const isCurrent = selectedMeal === meal;
          return (
            <button
              key={meal}
              onClick={() => {
                sound.playClick();
                setSelectedMeal(meal);
                // Also update timeHour to match
                if (meal === 'fruehstueck') setTimeHour(8);
                if (meal === 'mittagessen') setTimeHour(13);
                if (meal === 'kaffee') setTimeHour(16);
                if (meal === 'abendbrot') setTimeHour(19);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-xl shadow-amber-400/20 scale-[1.02]'
                  : 'bg-stone-950/70 text-stone-400 border-stone-800 hover:text-white hover:bg-stone-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="uppercase text-[10px] font-black tracking-wider opacity-80">
                  {meal === 'fruehstueck' && '06:30 - 10:00'}
                  {meal === 'mittagessen' && '12:00 - 14:00'}
                  {meal === 'kaffee' && '15:00 - 17:00'}
                  {meal === 'abendbrot' && '18:30 - 20:30'}
                </span>
                <span className="text-xl">
                  {meal === 'fruehstueck' && '🥐'}
                  {meal === 'mittagessen' && '🥩'}
                  {meal === 'kaffee' && '🍰'}
                  {meal === 'abendbrot' && '🥖'}
                </span>
              </div>
              <span className="font-display font-extrabold text-sm sm:text-base block truncate">
                {meal === 'fruehstueck' && (lang === 'de' ? 'Das Frühstück' : 'Breakfast')}
                {meal === 'mittagessen' && (lang === 'de' ? 'Das Mittagessen' : 'Lunch')}
                {meal === 'kaffee' && (lang === 'de' ? 'Kaffee & Kuchen' : 'Afternoon Coffee')}
                {meal === 'abendbrot' && (lang === 'de' ? 'Das Abendbrot' : 'Supper')}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
