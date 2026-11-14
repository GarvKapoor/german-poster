import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PosterHero } from './components/PosterHero';
import { FoodGrid } from './components/FoodGrid';
import { FoodDetailModal } from './components/FoodDetailModal';
import { PlateBuilder } from './components/PlateBuilder';
import { GenderQuiz } from './components/GenderQuiz';
import { RegionalMap } from './components/RegionalMap';
import { DialogueSimulator } from './components/DialogueSimulator';
import { PosterExportModal } from './components/PosterExportModal';
import { FoodItem, MealTime } from './data/foodData';
import { initGermanVoice } from './utils/speech';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('poster');
  const [selectedMeal, setSelectedMeal] = useState<MealTime>('mittagessen');
  const [selectedFoodModal, setSelectedFoodModal] = useState<FoodItem | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [slowAudio, setSlowAudio] = useState(false);

  useEffect(() => {
    initGermanVoice();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        slowAudio={slowAudio}
        setSlowAudio={setSlowAudio}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Poster Overview (Default View) */}
        {currentTab === 'poster' && (
          <div className="space-y-6">
            <PosterHero
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              lang={lang}
              onExploreClick={() => setCurrentTab('meals')}
              slowAudio={slowAudio}
            />

            {/* Quick Teaser of Food Items */}
            <FoodGrid
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              onSelectFood={(item) => setSelectedFoodModal(item)}
              lang={lang}
              slowAudio={slowAudio}
            />
          </div>
        )}

        {/* Meal Times Explorer */}
        {currentTab === 'meals' && (
          <FoodGrid
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            onSelectFood={(item) => setSelectedFoodModal(item)}
            lang={lang}
            slowAudio={slowAudio}
          />
        )}

        {/* Interactive Plate Builder (Mein Teller) */}
        {currentTab === 'plate' && (
          <PlateBuilder lang={lang} slowAudio={slowAudio} />
        )}

        {/* Regional Specialty Map */}
        {currentTab === 'map' && (
          <RegionalMap lang={lang} slowAudio={slowAudio} />
        )}

        {/* Der / Die / Das Gamified Quiz */}
        {currentTab === 'quiz' && (
          <GenderQuiz lang={lang} slowAudio={slowAudio} />
        )}

        {/* Conversational Ordering Simulator */}
        {currentTab === 'dialogue' && (
          <DialogueSimulator lang={lang} slowAudio={slowAudio} />
        )}
      </main>

      {/* Detail Modal for any food */}
      <FoodDetailModal
        food={selectedFoodModal}
        onClose={() => setSelectedFoodModal(null)}
        lang={lang}
        slowAudio={slowAudio}
      />

      {/* High-Resolution Printable Poster Modal */}
      <PosterExportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-stone-500 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span>🥨</span>
          <span className="font-bold text-stone-300">Kulinarisches Deutschland</span>
          <span>•</span>
          <span>Interaktives Deutsches Lern- & Bildungsplakat</span>
        </div>
        <p>
          Themenbereich: <strong>Deutsches Essen & Mahlzeiten (Frühstück, Mittagessen, Abendessen)</strong>
        </p>
        <p className="text-[11px] text-stone-600">
          Entwickelt mit React, TypeScript, Tailwind CSS & Web Speech API für maximale Interaktivität und kreative Noten.
        </p>
      </footer>

    </div>
  );
};

export default App;
