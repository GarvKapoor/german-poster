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
  xPercent: number;
  yPercent: number;
  delay: string;
  scale: number;
}

const ORBITING_FOODS: FloatingFood[] = [
  { id: 'brezel', name: 'Brezel', article: 'die', emoji: '🥨', xPercent: 6, yPercent: 20, delay: '0s', scale: 1.15 },
  { id: 'schnitzel', name: 'Schnitzel', article: 'das', emoji: '🥩', xPercent: 90, yPercent: 18, delay: '0.6s', scale: 1.2 },
  { id: 'bier', name: 'Weizenbier', article: 'das', emoji: '🍺', xPercent: 92, yPercent: 62, delay: '1.2s', scale: 1.1 },
  { id: 'broetchen', name: 'Brötchen', article: 'das', emoji: '🥖', xPercent: 5, yPercent: 65, delay: '1.8s', scale: 1.05 },
  { id: 'torte', name: 'Kirschtorte', article: 'die', emoji: '🍰', xPercent: 50, yPercent: 4, delay: '2.4s', scale: 1.0 },
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
  const [timeHour, setTimeHour] = useState<number>(12);
  const [isSpeakingTitle, setIsSpeakingTitle] = useState(false);

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

  useEffect(() => {
    if (selectedMeal === 'fruehstueck' && (timeHour < 6 || timeHour >= 11)) setTimeHour(8);
    if (selectedMeal === 'mittagessen' && (timeHour < 11 || timeHour >= 15)) setTimeHour(13);
    if (selectedMeal === 'kaffee' && (timeHour < 15 || timeHour >= 18)) setTimeHour(16);
    if (selectedMeal === 'abendbrot' && timeHour < 18) setTimeHour(19);
  }, [selectedMeal]);

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
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.4 - 0.3,
        size: Math.random() * 4 + 1.5,
        alpha: Math.random() * 0.6 + 0.2,
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

      const gradient = ctx.createRadialGradient(cursorX, cursorY, 10, cursorX, cursorY, 320);
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
      gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.06)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - cursorX;
        const dy = p.y - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.vx += (dx / dist) * force * 1.6;
          p.vy += (dy / dist) * force * 1.6;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 - 0.02;

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
        ctx.shadowBlur = 12;
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
        particleCount: 65,
        spread: 90,
        origin: { y: 0.45 },
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
      return 'from-amber-600/35 via-orange-600/20 to-stone-950';
    } else if (timeHour < 15) {
      return 'from-yellow-500/30 via-red-600/20 to-stone-950';
    } else if (timeHour < 18) {
      return 'from-amber-700/35 via-stone-850 to-stone-950';
    } else {
      return 'from-indigo-950/60 via-purple-950/40 to-stone-950';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[92vh] flex flex-col justify-between border-b-2 border-stone-800 bg-gradient-to-b ${getSkyStyle()} px-4 sm:px-8 xl:px-14 py-8 xl:py-12 overflow-hidden shadow-2xl transition-all duration-700 select-none group poster-grain`}
    >
      {/* Background Interactive Fluid Canvas spanning full viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Banner: Status & Sky Slider */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-5">
        
        {/* German Flag Badge */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5 w-5 h-4 rounded overflow-hidden shadow">
            <span className="h-1.5 bg-stone-950 w-full" />
            <span className="h-1.5 bg-red-600 w-full" />
            <span className="h-1.5 bg-amber-400 w-full" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-black text-amber-300 block">
              BUNDESREPUBLIK DEUTSCHLAND
            </span>
            <span className="text-[11px] text-stone-400">
              Offizielles Kulinarisches Großformat-Plakat
            </span>
          </div>
        </div>

        {/* Dynamic Sun/Moon Time Arc Controller */}
        <div className="flex items-center gap-4 bg-stone-900/90 px-5 py-2 rounded-full border border-stone-700 shadow-xl">
          <span className="text-xs font-mono text-stone-300 flex items-center gap-2">
            {timeHour < 18 ? <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} /> : <Moon className="w-4 h-4 text-indigo-300" />}
            <span className="font-bold text-white text-sm">{String(timeHour).padStart(2, '0')}:00 Uhr</span>
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
            className="w-32 sm:w-48 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            title="Tageszeit regeln"
          />

          <span className="text-xs font-black uppercase tracking-wider text-amber-400 hidden sm:inline-block">
            {selectedMeal === 'fruehstueck' && '🌅 Frühstück'}
            {selectedMeal === 'mittagessen' && '☀️ Mittagessen'}
            {selectedMeal === 'kaffee' && '☕ Kaffee & Kuchen'}
            {selectedMeal === 'abendbrot' && '🌙 Abendbrot'}
          </span>
        </div>

      </div>

      {/* Floating Interactive 3D Satellites spanning across wide screen */}
      {ORBITING_FOODS.map((food) => (
        <div
          key={food.id}
          onClick={() => handleFoodClick(food)}
          style={{
            left: `${food.xPercent}%`,
            top: `${food.yPercent + 12}%`,
            animationDelay: food.delay,
          }}
          className="absolute z-20 hidden md:flex flex-col items-center cursor-pointer group/orb animate-float hover:scale-125 transition-transform duration-300"
        >
          <div className="w-14 h-14 rounded-2xl bg-stone-900/90 border-2 border-stone-700 backdrop-blur-md shadow-2xl flex items-center justify-center text-3xl group-hover/orb:border-amber-400 group-hover/orb:ring-4 group-hover/orb:ring-amber-400/30 transition-all">
            <span className="transform group-hover/orb:rotate-12 transition-transform">
              {food.emoji}
            </span>
          </div>

          <span className="mt-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-950/95 text-stone-200 border border-stone-700 shadow-xl opacity-0 group-hover/orb:opacity-100 transition-opacity whitespace-nowrap">
            {food.article.toUpperCase()} {food.name}
          </span>
        </div>
      ))}

      {/* Active Food Tooltip Popup when clicked */}
      {activeFood && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-6 py-3 rounded-2xl bg-amber-400 text-stone-950 font-black text-base shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-2xl">{activeFood.emoji}</span>
          <span>{activeFood.article.toUpperCase()} {activeFood.name}!</span>
        </div>
      )}

      {/* MASSIVE CENTRAL KINETIC TYPOGRAPHY (Stretching edge-to-edge) */}
      <div 
        onClick={handleTitleClick}
        className="relative z-10 text-center py-6 sm:py-10 space-y-4 cursor-pointer my-auto"
      >
        
        {/* Kinetic Word 1: KULINARISCHES / CULINARY */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3 xl:gap-4">
          {word1.split('').map((char, idx) => {
            const isHovered = hoveredLetter === idx;
            return (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(idx)}
                onMouseLeave={() => setHoveredLetter(null)}
                className={`font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] tracking-tighter inline-block transition-all duration-200 transform leading-none ${
                  isHovered
                    ? 'text-amber-300 -translate-y-4 scale-125 rotate-3 drop-shadow-[0_20px_35px_rgba(245,158,11,0.7)] z-20'
                    : 'text-white hover:text-amber-200 drop-shadow-lg'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Kinetic Word 2: DEUTSCHLAND / GERMANY */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3 xl:gap-4">
          {word2.split('').map((char, idx) => {
            const letterGlobalIndex = word1.length + idx;
            const isHovered = hoveredLetter === letterGlobalIndex;
            return (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(letterGlobalIndex)}
                onMouseLeave={() => setHoveredLetter(null)}
                className={`font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] tracking-tighter inline-block transition-all duration-200 transform leading-none ${
                  isHovered
                    ? 'text-red-400 -translate-y-4 scale-125 -rotate-3 drop-shadow-[0_20px_35px_rgba(239,68,68,0.8)] z-20'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-200 drop-shadow-lg'
                }`}
              >
                {char}
              </span>
            );
          })}
          <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] text-amber-400 animate-pulse leading-none">
            .
          </span>
        </div>

        {/* Phonetic & Audio Pronunciation Button Bar */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleSpeakTitle}
            disabled={isSpeakingTitle}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 ${
              isSpeakingTitle
                ? 'bg-amber-500 text-stone-950 scale-105 ring-4 ring-amber-400/40'
                : 'bg-stone-900/90 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-amber-400/50 hover:scale-105'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isSpeakingTitle ? 'animate-bounce' : ''}`} />
            <span>
              {isSpeakingTitle
                ? (lang === 'de' ? 'Sprachausgabe aktiv...' : 'Speaking...')
                : (lang === 'de' ? '🔊 [ku-li-ˈnaː-ʁɪ-ʃəs ˈdɔʏ̯tʃ-lant]' : '🔊 Speak Title in German')}
            </span>
          </button>

          <span className="px-4 py-2 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs sm:text-sm font-serif italic text-stone-300">
            {lang === 'de' ? '✨ Fahre mit der Maus über die Buchstaben für Harfen-Töne!' : '✨ Hover letters to play musical notes!'}
          </span>
        </div>

        {/* Subtitle description */}
        <p className="font-serif italic text-xl sm:text-3xl text-stone-200 max-w-4xl mx-auto pt-2 leading-relaxed">
          {lang === 'de' 
            ? 'Vom ofenfrischen Frühstück über das herzhafte Mittagessen bis zum gemütlichen Abendbrot.' 
            : 'From oven-fresh morning breakfast to hearty lunch and cozy evening supper.'}
        </p>

      </div>

      {/* Bottom Live Interactive Meal Indicators spanning full width */}
      <div className="relative z-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((meal) => {
          const isCurrent = selectedMeal === meal;
          return (
            <button
              key={meal}
              onClick={() => {
                sound.playClick();
                setSelectedMeal(meal);
              }}
              className={`p-4 rounded-3xl border text-left transition-all ${
                isCurrent
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-2xl shadow-amber-400/30 scale-[1.02]'
                  : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-white hover:bg-stone-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="uppercase text-[11px] font-black tracking-wider opacity-85">
                  {meal === 'fruehstueck' && '06:30 - 10:00 Uhr'}
                  {meal === 'mittagessen' && '12:00 - 14:00 Uhr'}
                  {meal === 'kaffee' && '15:00 - 17:00 Uhr'}
                  {meal === 'abendbrot' && '18:30 - 20:30 Uhr'}
                </span>
                <span className="text-2xl">
                  {meal === 'fruehstueck' && '🥐'}
                  {meal === 'mittagessen' && '🥩'}
                  {meal === 'kaffee' && '🍰'}
                  {meal === 'abendbrot' && '🥖'}
                </span>
              </div>
              <span className="font-display font-extrabold text-base sm:text-lg block truncate">
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
