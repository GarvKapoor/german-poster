import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { PosterHero } from './components/PosterHero';
import { MealPanoramicStrip } from './components/MealPanoramicStrip';
import { HorizontalFoodReel } from './components/HorizontalFoodReel';
import { FoodGrid } from './components/FoodGrid';
import { PlateBuilder } from './components/PlateBuilder';
import { RegionalMap } from './components/RegionalMap';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FloatingPosterHUD } from './components/FloatingPosterHUD';
import { FoodDetailModal } from './components/FoodDetailModal';
import { FoodItem, MealTime } from './data/foodData';
import { initGermanVoice } from './utils/speech';
import { useScrollDirection } from './utils/useScrollDirection';

export const App: React.FC = () => {
  const [timeHour, setTimeHour] = useState<number>(12);
  const [selectedMeal, setSelectedMeal] = useState<MealTime>('mittagessen');
  const [selectedFoodModal, setSelectedFoodModal] = useState<FoodItem | null>(null);
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [slowAudio, setSlowAudio] = useState(false);
  const { tiltAngle, scrollDirection } = useScrollDirection();

  useEffect(() => {
    initGermanVoice();
  }, []);

  // Initialize Lenis Smooth Inertia Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Synchronize meal time whenever timeHour is adjusted via the center navbar slider
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

  const scrollToDishes = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950 relative overflow-x-hidden">
      
      {/* Sticky Top Header with Time Bar in Center of Navbar */}
      <Header
        timeHour={timeHour}
        setTimeHour={setTimeHour}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        slowAudio={slowAudio}
        setSlowAudio={setSlowAudio}
      />

      {/* Restored Floating Side Navigation HUD */}
      <FloatingPosterHUD />

      {/* CONTINUOUS SINGLE-PAGE POSTER JOURNEY */}
      <main className="flex-1 w-full space-y-0">
        
        {/* 1. HERO POSTER SHOWCASE (DIV 1 + DIV 2: Fill & Cover Whole Page) */}
        <div id="intro" className="w-full">
          <PosterHero
            timeHour={timeHour}
            setTimeHour={setTimeHour}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            lang={lang}
            onExploreClick={scrollToDishes}
            slowAudio={slowAudio}
          />
        </div>

        {/* 2. INFINITE AUTO-SCROLLING TICKER MARQUEE (100% Full Width) */}
        <MarqueeBanner variant="gold" />

        {/* 3. FULL-WIDTH 4-COLUMN DAY HORIZON PANORAMA */}
        <div id="panorama" className="w-full">
          <MealPanoramicStrip
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            onSelectFood={(item) => setSelectedFoodModal(item)}
            lang={lang}
            slowAudio={slowAudio}
          />
        </div>

        {/* 4. EDGE-TO-EDGE HORIZONTAL FOOD REEL CAROUSEL */}
        <div id="karussell" className="w-full">
          <HorizontalFoodReel
            onSelectFood={(item) => setSelectedFoodModal(item)}
            lang={lang}
            slowAudio={slowAudio}
          />
        </div>

        {/* 5. DEEP DIVE FOOD CATALOG */}
        <div id="katalog" className="w-full">
          <FoodGrid
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            onSelectFood={(item) => setSelectedFoodModal(item)}
            lang={lang}
            slowAudio={slowAudio}
          />
        </div>

        {/* 6. REVERSE QUOTE AUTO-SCROLLING MARQUEE BANNER */}
        <MarqueeBanner reverse variant="dark" />

        {/* 7. INTERACTIVE KITCHEN PLATE COMPOSER */}
        <div id="teller" className="w-full">
          <PlateBuilder lang={lang} slowAudio={slowAudio} />
        </div>

        {/* 8. INTERACTIVE REGIONAL SPECIALTIES MAP */}
        <div id="landkarte" className="w-full">
          <RegionalMap lang={lang} slowAudio={slowAudio} />
        </div>

        {/* Note: The last two divs ("Der, Die or Das?" and "Order & speak in German")
            have been cleanly removed as requested by the user */}

      </main>

      {/* Global Modals */}
      <FoodDetailModal
        food={selectedFoodModal}
        onClose={() => setSelectedFoodModal(null)}
        lang={lang}
        slowAudio={slowAudio}
      />

      {/* Cohesive Poster Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-12 px-4 sm:px-8 xl:px-14 text-center text-xs text-stone-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-2xl">🥨</span>
          <span className="font-display font-black text-lg text-white tracking-wide">
            KULINARISCHES DEUTSCHLAND
          </span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-300 font-serif italic text-sm">
            Das Interaktive Single-Page Bildungsplakat
          </span>
        </div>

        <p className="text-stone-400">
          Themenbereich: <strong>Deutsches Essen & Mahlzeiten (Frühstück, Mittagessen, Abendbrot)</strong>
        </p>

        <p className="text-[11px] text-stone-600 max-w-xl mx-auto">
          Gestaltet nach Schweizer & Bauhaus-Plakatästhetik mit flüssigen Scroll-Animationen, 
          Web Audio API, nativer de-DE Sprachsynthese und 100% voller Breiten-Ausnutzung ohne Leerräume.
        </p>
      </footer>

    </div>
  );
};

export default App;
