import React, { useState, useRef } from 'react';
import { Volume2, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { MealTime, MEAL_TIME_INFO } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import { KineticHeroTitle } from './KineticHeroTitle';

interface PosterHeroProps {
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  lang: 'de' | 'en';
  onExploreClick: () => void;
  slowAudio: boolean;
}

export const PosterHero: React.FC<PosterHeroProps> = ({
  selectedMeal,
  setSelectedMeal,
  lang,
  onExploreClick,
  slowAudio,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
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

    const rotX = -((y - centerY) / centerY) * 4;
    const rotY = ((x - centerX) / centerX) * 4;

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

  return (
    <div className="w-full relative space-y-0 overflow-hidden">
      
      {/* 1. MASTER KINETIC HEADLINE HERO (DIV 1: Covers whole screen) */}
      <KineticHeroTitle
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        lang={lang}
        slowAudio={slowAudio}
      />

      {/* 2. INTERACTIVE 3D SWISS / BAUHAUS POSTER DETAILS (DIV 2: Covers whole screen) */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full min-h-[90vh] flex flex-col justify-between border-b-2 border-stone-800 bg-stone-900/95 px-4 sm:px-8 xl:px-14 py-10 xl:py-16 shadow-2xl poster-grain transition-shadow duration-300 overflow-hidden"
      >
        {/* Dynamic Glare Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Poster Top Banner across 100% full width */}
        <div className="relative z-10 border-b border-stone-800 pb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-stone-300">
              DEUTSCHE ESSKULTUR & TRADITION • DAS GROSSPLAKAT
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-2 bg-stone-950 px-4 py-1.5 rounded-full border border-stone-800 text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{mealInfo.timeRange}</span>
            </span>
            <span className="hidden sm:inline-block text-stone-600">|</span>
            <span className="hidden sm:inline-block font-bold">KULTUR-PLAKAT № 01</span>
          </div>
        </div>

        {/* Poster Wide Body spanning full width */}
        <div className="relative z-10 py-8 xl:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center my-auto">
          
          {/* Left Column: Bold Cultural Pillars & Speech Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'de' ? 'Kulturelle Esskultur & Alltag' : 'Cultural Food Tradition'}</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-tight">
                {lang === 'de' ? 'Die vier Säulen der deutschen Küche' : 'The Four Pillars of German Culinary Life'}
              </h2>
              <p className="font-serif italic text-amber-300 text-xl sm:text-2xl pt-1">
                {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn}
              </p>
            </div>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
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
                className={`flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-2xl ${
                  isSpeaking
                    ? 'bg-amber-500 text-stone-950 scale-105 ring-4 ring-amber-400/40'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-amber-500/30 hover:scale-105'
                }`}
              >
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{isSpeaking ? (lang === 'de' ? 'Spricht Deutsch...' : 'Speaking German...') : (lang === 'de' ? 'Audio-Einführung anhören' : 'Listen to Audio Tour')}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onExploreClick();
                }}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 text-stone-200 text-sm font-semibold transition-all hover:scale-105"
              >
                <span>{lang === 'de' ? 'Speisenkatalog ansehen' : 'Explore Dishes'}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Educational Badges: Der / Die / Das */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-stone-800">
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-blue-500/40">
                <span className="text-[11px] font-black uppercase text-blue-400 block tracking-wider">Maskulin</span>
                <span className="text-lg font-black text-white">DER</span>
                <span className="text-xs text-stone-400 block truncate mt-0.5">Kaffee, Sauerbraten, Salat</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-red-500/40">
                <span className="text-[11px] font-black uppercase text-red-400 block tracking-wider">Feminin</span>
                <span className="text-lg font-black text-white">DIE</span>
                <span className="text-xs text-stone-400 block truncate mt-0.5">Bratwurst, Brezel, Torte</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-green-500/40">
                <span className="text-[11px] font-black uppercase text-green-400 block tracking-wider">Neutrum</span>
                <span className="text-lg font-black text-white">DAS</span>
                <span className="text-xs text-stone-400 block truncate mt-0.5">Brötchen, Schnitzel, Bier</span>
              </div>
            </div>

          </div>

          {/* Right Column: Giant Porcelain Plate Visual (Fills the whole space) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] bg-gradient-to-br from-stone-800/90 to-stone-950 border-2 border-stone-700 p-8 flex flex-col justify-between shadow-2xl overflow-hidden group poster-grain">
              
              <div 
                className="absolute inset-0 opacity-45 blur-3xl transition-all duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${mealInfo.accentColor} 0%, transparent 70%)` }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="px-4 py-1.5 rounded-full bg-stone-900/90 border border-stone-700 text-xs font-bold text-stone-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mealInfo.timeRange}</span>
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold">
                  DE-ESSEN
                </span>
              </div>

              {/* Card Center: Animated Food Plate Visual */}
              <div className="relative z-10 my-auto text-center py-4">
                <div className="relative inline-block">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-tr from-stone-800 via-stone-750 to-stone-900 p-3 shadow-2xl border-4 border-stone-600/40 flex items-center justify-center relative">
                    <div className="absolute -top-6 text-2xl opacity-60 animate-steam">💨</div>
                    <div className="text-7xl sm:text-8xl select-none transform transition-transform group-hover:scale-115 duration-500 animate-float">
                      {selectedMeal === 'fruehstueck' && '🥐'}
                      {selectedMeal === 'mittagessen' && '🥩'}
                      {selectedMeal === 'kaffee' && '🍰'}
                      {selectedMeal === 'abendbrot' && '🥖'}
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-black text-3xl text-white mt-4 tracking-tight">
                  {lang === 'de' ? mealInfo.titleDe : mealInfo.titleEn}
                </h3>
                <p className="font-serif italic text-amber-300 text-sm mt-1 px-4">
                  {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn}
                </p>
              </div>

              {/* Card Bottom: Meal switcher buttons */}
              <div className="relative z-10 grid grid-cols-4 gap-2 bg-stone-900/90 p-2 rounded-2xl border border-stone-800">
                {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMeal(m);
                    }}
                    className={`py-2.5 px-1 text-xs font-bold rounded-xl transition-all truncate text-center ${
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
          </div>

        </div>

        {/* Poster Bottom Bar across 100% full width */}
        <div className="relative z-10 border-t border-stone-800 pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
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
        </div>

      </div>

    </div>
  );
};
