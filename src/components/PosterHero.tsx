import React, { useState, useRef } from 'react';
import { Volume2, Sparkles, Clock, Compass, BookOpen, ChevronRight } from 'lucide-react';
import { MealTime, MEAL_TIME_INFO } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

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

  // Mouse move handler for 3D dynamic tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

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
    <div className="relative py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Interactive 3D Poster Canvas */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative overflow-hidden rounded-[2.5rem] border border-stone-800 bg-stone-900/90 shadow-2xl shadow-black/80 poster-grain transition-shadow duration-300"
      >
        {/* Dynamic Glare Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Poster Top Banner: Swiss / Bauhaus Editorial Grid */}
        <div className="border-b border-stone-800 px-6 sm:px-12 py-5 flex flex-wrap items-center justify-between gap-4 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-stone-300">
              DEUTSCHE ESSKULTUR & TRADITION
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{mealInfo.timeRange}</span>
            </span>
            <span className="hidden sm:inline-block text-stone-500">|</span>
            <span className="hidden sm:inline-block">KULTUR-PLAKAT № 01</span>
          </div>
        </div>

        {/* Poster Body */}
        <div className="px-6 sm:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Typography & Cultural Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'de' ? 'Kreatives Bildungsplakat' : 'Creative Educational Poster'}</span>
            </div>

            {/* Giant German Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-white">
                KULINARISCHES <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-200">
                  DEUTSCHLAND.
                </span>
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-stone-300 pt-2">
                {lang === 'de' ? 'Vom Frühstück bis zum Abendbrot' : 'From morning breakfast to hearty evening supper'}
              </p>
            </div>

            {/* Cultural Paragraph */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {lang === 'de' ? (
                <>
                  Entdecke die faszinierende Vielfalt der deutschen Küche: Von ofenfrischen 
                  <strong className="text-amber-300 font-semibold"> Brötchen</strong> am Morgen, herzhaften 
                  <strong className="text-red-400 font-semibold"> Schnitzeln</strong> und 
                  <strong className="text-amber-300 font-semibold"> Käsespätzle</strong> zur Mittagszeit, über 
                  süße <strong className="text-amber-300 font-semibold">Schwarzwälder Kirschtorte</strong> bis 
                  zur traditionellen <strong className="text-indigo-300 font-semibold">Abendbrot-Kultur</strong>.
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
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl ${
                  isSpeaking
                    ? 'bg-amber-500 text-stone-950 scale-105 ring-4 ring-amber-400/40'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-amber-500/25 hover:scale-105'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{isSpeaking ? (lang === 'de' ? 'Spricht Deutsch...' : 'Speaking German...') : (lang === 'de' ? 'Audio-Einführung anhören' : 'Listen to Audio Tour')}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onExploreClick();
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 text-stone-200 text-sm font-semibold transition-all hover:scale-105"
              >
                <span>{lang === 'de' ? 'Speisen erkunden' : 'Explore Dishes'}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Educational Badges: Der / Die / Das & UNESCO */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-stone-800/80">
              <div className="p-3 rounded-2xl bg-stone-950/60 border border-blue-500/30">
                <span className="text-[10px] font-black uppercase text-blue-400 block tracking-wider">Maskulin</span>
                <span className="text-sm font-bold text-white">DER</span>
                <span className="text-[11px] text-stone-400 block truncate">Kaffee, Sauerbraten</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/60 border border-red-500/30">
                <span className="text-[10px] font-black uppercase text-red-400 block tracking-wider">Feminin</span>
                <span className="text-sm font-bold text-white">DIE</span>
                <span className="text-[11px] text-stone-400 block truncate">Bratwurst, Brezel</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/60 border border-green-500/30">
                <span className="text-[10px] font-black uppercase text-green-400 block tracking-wider">Neutrum</span>
                <span className="text-sm font-bold text-white">DAS</span>
                <span className="text-[11px] text-stone-400 block truncate">Brötchen, Schnitzel</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Poster Focal Card (Plate / Time of Day) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-stone-800/80 to-stone-950 border border-stone-700/80 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
              
              {/* Dynamic Decorative Glow */}
              <div 
                className="absolute inset-0 opacity-40 blur-2xl transition-all duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${mealInfo.accentColor} 0%, transparent 70%)` }}
              />

              {/* Card Top: Time Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mealInfo.timeRange}</span>
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
                  DE-ESSEN
                </span>
              </div>

              {/* Card Center: Animated Food Plate Visual */}
              <div className="relative z-10 my-auto text-center py-4">
                <div className="relative inline-block">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-tr from-stone-800 via-stone-700 to-stone-900 p-2 shadow-2xl border-4 border-stone-600/40 flex items-center justify-center relative">
                    {/* Steaming effect */}
                    <div className="absolute -top-6 text-xl opacity-60 animate-steam">💨</div>
                    <div className="text-6xl sm:text-7xl select-none transform transition-transform group-hover:scale-110 duration-500 animate-float">
                      {selectedMeal === 'fruehstueck' && '🥐'}
                      {selectedMeal === 'mittagessen' && '🥩'}
                      {selectedMeal === 'kaffee' && '🍰'}
                      {selectedMeal === 'abendbrot' && '🥖'}
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-4 tracking-tight">
                  {lang === 'de' ? mealInfo.titleDe : mealInfo.titleEn}
                </h3>
                <p className="font-serif italic text-amber-300/90 text-sm mt-1 px-4">
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
          </div>

        </div>

        {/* Poster Bottom Bar: Historic German Food Fun Facts */}
        <div className="border-t border-stone-800/80 bg-stone-950/80 px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">💡 Wusstest du schon?</span>
            <span>
              {lang === 'de' 
                ? 'Das Deutsche Reinheitsgebot von 1516 erlaubt nur 4 Zutaten: Wasser, Malz, Hopfen und Hefe!' 
                : 'The German Beer Purity Law of 1516 permits only 4 ingredients: water, malt, hops, and yeast!'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px]">
            <span>🥨 3.000+ BROTE</span>
            <span>🍺 1.500+ BRAUEREIEN</span>
            <span>🌭 1.500+ WURSTSORTEN</span>
          </div>
        </div>

      </div>
    </div>
  );
};
