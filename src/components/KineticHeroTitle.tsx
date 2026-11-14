import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Sparkles, Sun, Moon, Flame, Utensils } from 'lucide-react';
import { sound } from '../utils/sound';
import { speakGerman } from '../utils/speech';
import confetti from 'canvas-confetti';
import { MealTime } from '../data/foodData';

interface KineticHeroTitleProps {
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
  xPercent: number; // position relative to container
  yPercent: number;
  delay: string;
  scale: number;
}

const ORBITING_FOODS: FloatingFood[] = [
  { id: 'brezel', name: 'Brezel', article: 'die', emoji: '🥨', xPercent: 8, yPercent: 18, delay: '0s', scale: 1.1 },
  { id: 'schnitzel', name: 'Schnitzel', article: 'das', emoji: '🥩', xPercent: 88, yPercent: 12, delay: '0.6s', scale: 1.15 },
  { id: 'bier', name: 'Weizenbier', article: 'das', emoji: '🍺', xPercent: 92, yPercent: 68, delay: '1.2s', scale: 1.05 },
  { id: 'broetchen', name: 'Brötchen', article: 'das', emoji: '🥖', xPercent: 4, yPercent: 72, delay: '1.8s', scale: 1.0 },
  { id: 'torte', name: 'Kirschtorte', article: 'die', emoji: '🍰', xPercent: 48, yPercent: -8, delay: '2.4s', scale: 0.95 },
];

export const KineticHeroTitle: React.FC<KineticHeroTitleProps> = ({
  selectedMeal,
  setSelectedMeal,
  lang,
  slowAudio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [activeFood, setActiveFood] = useState<FloatingFood | null>(null);
  const [timeHour, setTimeHour] = useState<number>(12); // 6 to 22
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [isSpeakingTitle, setIsSpeakingTitle] = useState(false);

  // Synchronize meal time with timeHour slider
  useEffect(() => {
    if (timeHour < 11) {
      if (selectedMeal !== 'fruehstueck') setSelectedMeal('fruehstueck');
    } else if (timeHour < 15) {
      if (selectedMeal !== 'mittagessen') setSelectedMeal('mittagessen');
    } else if (timeHour < 18) {
      if (selectedMeal !== 'kaffee') setSelectedMeal('kaffee');
    } else {
      if (selectedMeal !== 'abendbrot') setSelectedMeal('abendbrot');
    }
  }, [timeHour]);

  // Synchronize timeHour when meal tab clicked externally
  useEffect(() => {
    if (selectedMeal === 'fruehstueck' && (timeHour < 6 || timeHour >= 11)) setTimeHour(8);
    if (selectedMeal === 'mittagessen' && (timeHour < 11 || timeHour >= 15)) setTimeHour(13);
    if (selectedMeal === 'kaffee' && (timeHour < 15 || timeHour >= 18)) setTimeHour(16);
    if (selectedMeal === 'abendbrot' && timeHour < 18) setTimeHour(19);
  }, [selectedMeal]);

  // Dynamic Canvas Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: beer bubbles, golden crumbs, sizzling sparks
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      baseAlpha: number;
    }

    const particles: Particle[] = [];
    const colors = ['#f59e0b', '#ef4444', '#fbbf24', '#ffffff', '#eab308'];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2 - 0.2, // float upwards like steam/bubbles
        size: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let cursorX = width * 0.5;
    let cursorY = height * 0.5;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
      setMousePos({ x: cursorX / width, y: cursorY / height });
    };
    window.addEventListener('mousemove', onPointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle radiant light beam from current cursor position
      const gradient = ctx.createRadialGradient(cursorX, cursorY, 10, cursorX, cursorY, 260);
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
      gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles with cursor repulsion physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fluid cursor repulsion
        const dx = p.x - cursorX;
        const dy = p.y - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const force = (110 - dist) / 110;
          p.vx += (dx / dist) * force * 1.4;
          p.vy += (dy / dist) * force * 1.4;
        }

        // Apply velocities with dampening
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 - 0.015; // natural buoyant drift upward

        // Wrap around canvas edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle
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

  // Title strings
  const word1 = lang === 'de' ? 'KULINARISCHES' : 'CULINARY';
  const word2 = lang === 'de' ? 'DEUTSCHLAND' : 'GERMANY';

  const handleLetterHover = (index: number) => {
    sound.playLetterNote(index);
    setHoveredLetter(index);
  };

  const handleLetterLeave = () => {
    setHoveredLetter(null);
  };

  // Explosive celebratory click on title
  const handleTitleClick = () => {
    sound.playPop();
    sound.playSuccess();
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.4 },
        colors: ['#000000', '#DD0000', '#FFCC00'], // German Flag colors
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

  // Sky backdrop gradient based on timeHour
  const getSkyStyle = () => {
    if (timeHour < 10) {
      // Sunrise Dawn
      return 'from-amber-600/30 via-orange-600/20 to-stone-950';
    } else if (timeHour < 15) {
      // Bright Alpine Noon
      return 'from-yellow-500/25 via-red-600/20 to-stone-950';
    } else if (timeHour < 18) {
      // Golden Coffee Hour
      return 'from-amber-700/30 via-stone-800/40 to-stone-950';
    } else {
      // Night Tavern Velvet
      return 'from-indigo-900/40 via-purple-950/30 to-stone-950';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-[2.8rem] border-2 border-stone-800 bg-gradient-to-b ${getSkyStyle()} p-6 sm:p-12 overflow-hidden shadow-2xl transition-all duration-700 select-none group poster-grain`}
    >
      {/* Background Interactive Fluid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Dynamic Time Arc (Sun & Moon Sky Track) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-5 mb-8">
        
        {/* German Flag Badge & Live Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-0.5 w-4 h-3.5 rounded-sm overflow-hidden shadow">
            <span className="h-1 bg-stone-950 w-full" />
            <span className="h-1 bg-red-600 w-full" />
            <span className="h-1 bg-amber-400 w-full" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-extrabold text-amber-300">
            {lang === 'de' ? 'INTERAKTIVES MEISTER-PLAKAT' : 'DYNAMIC POSTER SHOWCASE'}
          </span>
        </div>

        {/* Dynamic Sun/Moon Time Arc Controller */}
        <div className="flex items-center gap-3 bg-stone-900/90 px-4 py-1.5 rounded-full border border-stone-700/80 shadow-inner">
          <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
            {timeHour < 18 ? <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '18s' }} /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            <span className="font-bold text-white">{String(timeHour).padStart(2, '0')}:00 Uhr</span>
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
            className="w-28 sm:w-36 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            title="Tageszeit regeln"
          />

          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 hidden sm:inline-block">
            {selectedMeal === 'fruehstueck' && 'Frühstück'}
            {selectedMeal === 'mittagessen' && 'Mittag'}
            {selectedMeal === 'kaffee' && 'Kaffee'}
            {selectedMeal === 'abendbrot' && 'Abendbrot'}
          </span>
        </div>

      </div>

      {/* Floating Interactive 3D Satellites (Pretzel, Beer, Schnitzel, Bread Roll, Cake) */}
      {ORBITING_FOODS.map((food) => (
        <div
          key={food.id}
          onClick={() => handleFoodClick(food)}
          style={{
            left: `${food.xPercent}%`,
            top: `${food.yPercent + 15}%`,
            animationDelay: food.delay,
          }}
          className="absolute z-20 hidden md:flex flex-col items-center cursor-pointer group/orb animate-float hover:scale-125 transition-transform duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-stone-900/90 border border-stone-700/80 backdrop-blur-md shadow-xl flex items-center justify-center text-2xl group-hover/orb:border-amber-400 group-hover/orb:ring-2 group-hover/orb:ring-amber-400/40 transition-all">
            <span className="transform group-hover/orb:rotate-12 transition-transform">
              {food.emoji}
            </span>
          </div>

          <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-stone-950/90 text-stone-300 border border-stone-800 shadow opacity-0 group-hover/orb:opacity-100 transition-opacity whitespace-nowrap">
            {food.article.toUpperCase()} {food.name}
          </span>
        </div>
      ))}

      {/* Active Food Tooltip Popup when clicked */}
      {activeFood && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-5 py-2.5 rounded-2xl bg-amber-400 text-stone-950 font-black text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <span>{activeFood.emoji}</span>
          <span>{activeFood.article.toUpperCase()} {activeFood.name}!</span>
        </div>
      )}

      {/* CENTRAL KINETIC TYPOGRAPHY HEADLINE */}
      <div 
        onClick={handleTitleClick}
        className="relative z-10 text-center py-6 sm:py-10 space-y-4 cursor-pointer"
      >
        
        {/* Kinetic Word 1: KULINARISCHES / CULINARY */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {word1.split('').map((char, idx) => {
            const isHovered = hoveredLetter === idx;
            return (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(idx)}
                onMouseLeave={handleLetterLeave}
                className={`font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter inline-block transition-all duration-200 transform ${
                  isHovered
                    ? 'text-amber-300 -translate-y-4 scale-125 rotate-3 drop-shadow-[0_15px_25px_rgba(245,158,11,0.6)] z-20'
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
                onMouseLeave={handleLetterLeave}
                className={`font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter inline-block transition-all duration-200 transform ${
                  isHovered
                    ? 'text-red-400 -translate-y-4 scale-125 -rotate-3 drop-shadow-[0_15px_25px_rgba(239,68,68,0.7)] z-20'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-200 drop-shadow-md'
                }`}
              >
                {char}
              </span>
            );
          })}
          {/* Animated Period */}
          <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-amber-400 animate-pulse">
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

          <span className="px-3 py-1.5 rounded-xl bg-stone-900/70 border border-stone-800 text-xs font-serif italic text-stone-300">
            {lang === 'de' ? '✨ Berühre die Buchstaben für Töne!' : '✨ Hover letters to play notes!'}
          </span>
        </div>

        {/* Subtitle description */}
        <p className="font-serif italic text-lg sm:text-2xl text-stone-200 max-w-2xl mx-auto pt-2 leading-relaxed">
          {lang === 'de' 
            ? 'Vom ofenfrischen Frühstück über das herzhafte Mittagessen bis zum gemütlichen Abendbrot.' 
            : 'From oven-fresh morning breakfast to hearty lunch and cozy evening supper.'}
        </p>

      </div>

      {/* Bottom Live Interactive Meal Indicators */}
      <div className="relative z-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((meal) => {
          const isCurrent = selectedMeal === meal;
          return (
            <button
              key={meal}
              onClick={() => {
                sound.playClick();
                setSelectedMeal(meal);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-lg shadow-amber-400/20 scale-[1.03]'
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
                <span>
                  {meal === 'fruehstueck' && '🥐'}
                  {meal === 'mittagessen' && '🥩'}
                  {meal === 'kaffee' && '🍰'}
                  {meal === 'abendbrot' && '🥖'}
                </span>
              </div>
              <span className="font-display font-extrabold text-sm block truncate">
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
