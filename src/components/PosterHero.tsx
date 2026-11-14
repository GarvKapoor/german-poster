import React, { useState, useRef } from 'react';
import { Volume2, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { MealTime, MEAL_TIME_INFO } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import { KineticHeroTitle } from './KineticHeroTitle';
import { useScrollDirection } from '../utils/useScrollDirection';

interface PosterHeroProps {
  timeHour: number;
  setTimeHour: (hour: number) => void;
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  lang: 'de' | 'en';
  onExploreClick: () => void;
  slowAudio: boolean;
}

export const PosterHero: React.FC<PosterHeroProps> = ({
  timeHour,
  setTimeHour,
  selectedMeal,
  setSelectedMeal,
  lang,
  onExploreClick,
  slowAudio,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollDirection } = useScrollDirection();
  const dirY = scrollDirection === 'down' ? 40 : -40;

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mealInfo = MEAL_TIME_INFO[selectedMeal];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 3.5;
    const rotY = ((x - centerX) / centerX) * 3.5;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleHeroSpeech = async () => {
    sound.playClick();
    setIsSpeaking(true);
    const textToSpeak = lang === 'de'
      ? 'Herzlich willkommen zur kulinarischen Reise durch Deutschland! Entdecken Sie Frühstück, Mittagessen, Kaffee und Abendbrot. Guten Appetit!'
      : 'Willkommen! Welcome to culinary Germany! Discover breakfast, lunch, afternoon coffee, and dinner. Guten Appetit!';
    await speakGerman(textToSpeak, slowAudio ? 0.7 : 0.9);
    setIsSpeaking(false);
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative space-y-0 overflow-hidden">
      
      {/* 1. MASTER KINETIC HEADLINE HERO (DIV 1: Covers full screen, preserves pristine aesthetic) */}
      <KineticHeroTitle
        timeHour={timeHour}
        setTimeHour={setTimeHour}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        lang={lang}
        slowAudio={slowAudio}
      />

      {/* 2. INTERACTIVE 3D SWISS / BAUHAUS POSTER DETAILS (DIV 2: Always solid & visible, zero black void) */}
      <div
        id="details-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between border-b border-stone-800 bg-stone-900/95 px-4 sm:px-8 xl:px-16 py-8 sm:py-12 shadow-2xl poster-grain transition-shadow duration-300 overflow-hidden"
      >
        {/* Dynamic Glare Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Poster Top Banner */}
        <motion.div 
          initial={{ opacity: 0, y: dirY * -0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 border-b border-stone-800 pb-5 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-stone-300">
              DEUTSCHE ESSKULTUR & TRADITION • DAS GROSSPLAKAT
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-2 bg-stone-950 px-3.5 py-1.5 rounded-full border border-stone-800 text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{mealInfo.timeRange}</span>
            </span>
            <span className="hidden sm:inline-block text-stone-600">|</span>
            <span className="hidden sm:inline-block font-bold">KULTUR-PLAKAT № 01</span>
          </div>
        </motion.div>

        {/* Poster Wide Body */}
        <div className="relative z-10 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center my-auto">
          
          {/* Left Column: Bold Cultural Pillars & Speech Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: dirY * 0.5 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'de' ? 'Kulturelle Esskultur & Alltag' : 'Cultural Food Tradition'}</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                {lang === 'de' ? 'Die vier Säulen der deutschen Küche' : 'The Four Pillars of German Culinary Life'}
              </h2>
              <p className="font-serif italic text-amber-300 text-lg sm:text-xl pt-0.5">
                {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn}
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {lang === 'de' ? (
                <>
                  Entdecke die faszinierende Vielfalt der deutschen Küche: Von ofenfrischen 
                  <strong className="text-amber-300 font-semibold"> Brötchen</strong> am Morgen, herzhaften 
                  <strong className="text-red-400 font-semibold"> Schnitzeln</strong> und 
                  <strong className="text-amber-300 font-semibold"> Käsespätzle</strong> zur Mittagszeit, über 
                  süße <strong className="text-amber-300 font-semibold">Schwarzwälder Kirschtorte</strong> bis 
                  zur traditionsreichen <strong className="text-indigo-300 font-semibold">Abendbrot-Kultur</strong>.
                </>
              ) : (
                <>
                  Explore the captivating richness of German food culture: From warm crusty 
                  <strong className="text-amber-300 font-semibold"> Brötchen</strong> in the morning, hearty 
                  <strong className="text-red-400 font-semibold"> Schnitzel</strong> and 
                  <strong className="text-amber-300 font-semibold"> Käsespätzle</strong> at noon, to sweet 
                  <strong className="text-amber-300 font-semibold"> Black Forest Cake</strong> and 
                  traditional cold-cut <strong className="text-indigo-300 font-semibold">Abendbrot</strong>.
                </>
              )}
            </p>

            {/* Interactive Audio & Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleHeroSpeech}
                disabled={isSpeaking}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl ${
                  isSpeaking
                    ? 'bg-amber-500 text-stone-950 scale-105 ring-4 ring-amber-400/40'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-amber-500/25 hover:scale-105'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{isSpeaking ? (lang === 'de' ? 'Spricht Deutsch...' : 'Speaking German...') : (lang === 'de' ? 'Audio-Einführung anhören' : 'Listen to Audio Tour')}</span>
              </button>

              <button
                onClick={() => scrollToSection('panorama')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-bold transition-all shadow-lg hover:scale-105"
              >
                <span>{lang === 'de' ? 'Weiter zum Tageszeiten-Panorama' : 'Explore Day Horizon'}</span>
                <span>↓</span>
              </button>
            </div>

            {/* Educational Badges: Der / Die / Das */}
            <div className="pt-3 grid grid-cols-3 gap-3 border-t border-stone-800">
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-blue-500/35">
                <span className="text-[10px] font-black uppercase text-blue-400 block tracking-wider">Maskulin</span>
                <span className="text-base font-black text-white">DER</span>
                <span className="text-[11px] text-stone-400 block truncate mt-0.5">Kaffee, Sauerbraten, Salat</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-red-500/35">
                <span className="text-[10px] font-black uppercase text-red-400 block tracking-wider">Feminin</span>
                <span className="text-base font-black text-white">DIE</span>
                <span className="text-[11px] text-stone-400 block truncate mt-0.5">Bratwurst, Brezel, Torte</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-green-500/35">
                <span className="text-[10px] font-black uppercase text-green-400 block tracking-wider">Neutrum</span>
                <span className="text-base font-black text-white">DAS</span>
                <span className="text-[11px] text-stone-400 block truncate mt-0.5">Brötchen, Schnitzel, Bier</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Giant Porcelain Plate Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30, y: dirY * 0.5 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-stone-800/90 to-stone-950 border border-stone-700/80 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group poster-grain">
              
              <div 
                className="absolute inset-0 opacity-40 blur-3xl transition-all duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${mealInfo.accentColor} 0%, transparent 70%)` }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-700 text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mealInfo.timeRange}</span>
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold">
                  DE-ESSEN
                </span>
              </div>

              {/* Card Center: Animated Food Plate Visual */}
              <div className="relative z-10 my-auto text-center py-2">
                <div className="relative inline-block">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-tr from-stone-800 via-stone-750 to-stone-900 p-2.5 shadow-2xl border-4 border-stone-600/40 flex items-center justify-center relative">
                    <div className="absolute -top-5 text-xl opacity-60 animate-steam">💨</div>
                    <div className="text-6xl sm:text-7xl select-none transform transition-transform group-hover:scale-110 duration-500 animate-float">
                      {selectedMeal === 'fruehstueck' && '🥐'}
                      {selectedMeal === 'mittagessen' && '🥩'}
                      {selectedMeal === 'kaffee' && '🍰'}
                      {selectedMeal === 'abendbrot' && '🥖'}
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl text-white mt-3 tracking-tight">
                  {lang === 'de' ? mealInfo.titleDe : mealInfo.titleEn}
                </h3>
                <p className="font-serif italic text-amber-300 text-xs sm:text-sm mt-0.5 px-4">
                  {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn}
                </p>
              </div>

              {/* Card Bottom: Meal switcher buttons */}
              <div className="relative z-10 grid grid-cols-4 gap-1.5 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800">
                {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMeal(m);
                      if (m === 'fruehstueck') setTimeHour(8);
                      if (m === 'mittagessen') setTimeHour(13);
                      if (m === 'kaffee') setTimeHour(16);
                      if (m === 'abendbrot') setTimeHour(19);
                    }}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all truncate text-center ${
                      selectedMeal === m
                        ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold scale-105'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {m === 'fruehstueck' && 'Frühstück'}
                    {m === 'mittagessen' && 'Mittag'}
                    {m === 'kaffee' && 'Kaffee'}
                    {m === 'abendbrot' && 'Abend'}
                  </button>
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* Poster Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: dirY * 0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 border-t border-stone-800 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">💡 Wusstest du schon?</span>
            <span>
              {lang === 'de' 
                ? 'Das Deutsche Reinheitsgebot von 1516 erlaubt nur 4 Zutaten: Wasser, Malz, Hopfen und Hefe!' 
                : 'The German Beer Purity Law of 1516 permits only 4 ingredients: water, malt, hops, and yeast!'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 font-mono text-xs">
            <span>🥨 3.000+ BROTE</span>
            <span>🍺 1.500+ BRAUEREIEN</span>
            <span>🌭 1.500+ WURSTSORTEN</span>
          </div>
        </motion.div>

      </div>

    </div>
  );
};
