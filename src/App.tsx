import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PosterHero } from './components/PosterHero';
import { MealPanoramicStrip } from './components/MealPanoramicStrip';
import { HorizontalFoodReel } from './components/HorizontalFoodReel';
import { FoodGrid } from './components/FoodGrid';
import { PlateBuilder } from './components/PlateBuilder';
import { RegionalMap } from './components/RegionalMap';
import { GenderQuiz } from './components/GenderQuiz';
import { DialogueSimulator } from './components/DialogueSimulator';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FoodDetailModal } from './components/FoodDetailModal';
import { PosterExportModal } from './components/PosterExportModal';
import { FoodItem, MealTime } from './data/foodData';
import { initGermanVoice } from './utils/speech';

export const App: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealTime>('mittagessen');
  const [selectedFoodModal, setSelectedFoodModal] = useState<FoodItem | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [slowAudio, setSlowAudio] = useState(false);

  useEffect(() => {
    initGermanVoice();
  }, []);

  const scrollToDishes = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950 relative overflow-x-hidden">
      
      {/* Sticky Top Header (Clean: Logo + Audio Speed + Sound + Lang + Print) */}
      <Header
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        slowAudio={slowAudio}
        setSlowAudio={setSlowAudio}
      />

      {/* CONTINUOUS SINGLE-PAGE POSTER JOURNEY */}
      <main className="flex-1 w-full space-y-0">
        
        {/* 1. HERO POSTER SHOWCASE (DIV 1 + DIV 2: Fill & Cover the Whole Page) */}
        <div id="intro" className="w-full">
          <PosterHero
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            lang={lang}
            onExploreClick={scrollToDishes}
            slowAudio={slowAudio}
          />
        </div>

        {/* 2. INFINITE TICKER MARQUEE (100% Full Width) */}
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
        <HorizontalFoodReel
          onSelectFood={(item) => setSelectedFoodModal(item)}
          lang={lang}
          slowAudio={slowAudio}
        />

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

        {/* 6. REVERSE QUOTE MARQUEE BANNER */}
        <MarqueeBanner reverse variant="dark" />

        {/* 7. INTERACTIVE KITCHEN PLATE COMPOSER */}
        <div id="teller" className="w-full">
          <PlateBuilder lang={lang} slowAudio={slowAudio} />
        </div>

        {/* 8. INTERACTIVE REGIONAL SPECIALTIES MAP */}
        <div id="landkarte" className="w-full">
          <RegionalMap lang={lang} slowAudio={slowAudio} />
        </div>

        {/* 9. DER-DIE-DAS GRAMMAR DUEL GAME */}
        <div id="spiel" className="w-full">
          <GenderQuiz lang={lang} slowAudio={slowAudio} />
        </div>

        {/* 10. REAL-LIFE RESTAURANT & BAKERY DIALOGUE LAB */}
        <div id="dialoge" className="w-full">
          <DialogueSimulator lang={lang} slowAudio={slowAudio} />
        </div>

      </main>

      {/* Global Modals */}
      <FoodDetailModal
        food={selectedFoodModal}
        onClose={() => setSelectedFoodModal(null)}
        lang={lang}
        slowAudio={slowAudio}
      />

      <PosterExportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        lang={lang}
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
