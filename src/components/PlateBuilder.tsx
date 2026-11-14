import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, RefreshCw, ChefHat, Flame, Utensils } from 'lucide-react';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface DishOption {
  id: string;
  name: string;
  article: 'der' | 'die' | 'das';
  accusative: string;
  emoji: string;
  calories: number;
  type: 'main' | 'side' | 'drink' | 'dessert';
}

const MAIN_OPTIONS: DishOption[] = [
  { id: 'schnitzel', name: 'Wiener Schnitzel', article: 'das', accusative: 'ein knuspriges Wiener Schnitzel', emoji: '🥩', calories: 580, type: 'main' },
  { id: 'bratwurst', name: 'Thüringer Rostbratwurst', article: 'die', accusative: 'eine Thüringer Rostbratwurst', emoji: '🌭', calories: 360, type: 'main' },
  { id: 'spaetzle', name: 'Allgäuer Käsespätzle', article: 'die', accusative: 'hausgemachte Käsespätzle', emoji: '🧀', calories: 640, type: 'main' },
  { id: 'sauerbraten', name: 'Rheinischer Sauerbraten', article: 'der', accusative: 'einen zarten Sauerbraten', emoji: '🍲', calories: 520, type: 'main' },
  { id: 'currywurst', name: 'Berliner Currywurst', article: 'die', accusative: 'eine würzige Currywurst', emoji: '🍛', calories: 420, type: 'main' },
  { id: 'spiegelei', name: 'Zwei Spiegeleier', article: 'das', accusative: 'zwei frische Spiegeleier', emoji: '🍳', calories: 180, type: 'main' },
];

const SIDE_OPTIONS: DishOption[] = [
  { id: 'kartoffelsalat', name: 'Schwäbischer Kartoffelsalat', article: 'der', accusative: 'einem warmen Kartoffelsalat', emoji: '🥔', calories: 210, type: 'side' },
  { id: 'brezel', name: 'Bayerische Brezel', article: 'die', accusative: 'einer ofenfrischen Brezel', emoji: '🥨', calories: 230, type: 'side' },
  { id: 'broetchen', name: 'Knuspriges Brötchen', article: 'das', accusative: 'einem krossen Brötchen', emoji: '🥖', calories: 140, type: 'side' },
  { id: 'sauerkraut', name: 'Weinsauerkraut', article: 'das', accusative: 'feinem Weinsauerkraut', emoji: '🥬', calories: 60, type: 'side' },
];

const DRINK_OPTIONS: DishOption[] = [
  { id: 'apfelschorle', name: 'Naturtrübe Apfelschorle', article: 'die', accusative: 'eine spritzige Apfelschorle', emoji: '🍏', calories: 70, type: 'drink' },
  { id: 'bier', name: 'Kühles Weizenbier', article: 'das', accusative: 'ein kühles Weizenbier', emoji: '🍺', calories: 180, type: 'drink' },
  { id: 'kaffee', name: 'Frisch gebrühter Kaffee', article: 'der', accusative: 'einen heißen Kaffee', emoji: '☕', calories: 5, type: 'drink' },
  { id: 'saft', name: 'Orangensaft', article: 'der', accusative: 'einen frischen Orangensaft', emoji: '🍊', calories: 95, type: 'drink' },
];

const DESSERT_OPTIONS: DishOption[] = [
  { id: 'apfelstrudel', name: 'Apfelstrudel mit Vanillesauce', article: 'der', accusative: 'einen warmen Apfelstrudel', emoji: '🥧', calories: 340, type: 'dessert' },
  { id: 'torte', name: 'Schwarzwälder Kirschtorte', article: 'die', accusative: 'ein Stück Schwarzwälder Kirschtorte', emoji: '🍰', calories: 410, type: 'dessert' },
  { id: 'marmelade', name: 'Erdbeerkonfitüre', article: 'die', accusative: 'etwas süße Marmelade', emoji: '🍓', calories: 55, type: 'dessert' },
];

export const PlateBuilder: React.FC<{ lang: 'de' | 'en'; slowAudio: boolean }> = ({ lang, slowAudio }) => {
  const [selectedMain, setSelectedMain] = useState<DishOption>(MAIN_OPTIONS[0]);
  const [selectedSide, setSelectedSide] = useState<DishOption>(SIDE_OPTIONS[0]);
  const [selectedDrink, setSelectedDrink] = useState<DishOption>(DRINK_OPTIONS[0]);
  const [selectedDessert, setSelectedDessert] = useState<DishOption | null>(DESSERT_OPTIONS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const totalCalories = selectedMain.calories + selectedSide.calories + selectedDrink.calories + (selectedDessert?.calories || 0);

  const generatedSentenceDe = `Ich hätte gerne ${selectedMain.accusative} mit ${selectedSide.accusative}, dazu ${selectedDrink.accusative}${selectedDessert ? ` und als Nachspeise ${selectedDessert.accusative}` : ''}, bitte! Guten Appetit!`;
  const generatedSentenceEn = `I would like ${selectedMain.name.toLowerCase()} with ${selectedSide.name.toLowerCase()}, together with ${selectedDrink.name.toLowerCase()}${selectedDessert ? ` and for dessert ${selectedDessert.name.toLowerCase()}` : ''}, please! Enjoy your meal!`;

  const handleSpeakOrder = async () => {
    sound.playClick();
    setIsSpeaking(true);
    await speakGerman(generatedSentenceDe, slowAudio ? 0.7 : 0.9);
    setIsSpeaking(false);
  };

  const handleRandomize = () => {
    sound.playClick();
    const randomMain = MAIN_OPTIONS[Math.floor(Math.random() * MAIN_OPTIONS.length)];
    const randomSide = SIDE_OPTIONS[Math.floor(Math.random() * SIDE_OPTIONS.length)];
    const randomDrink = DRINK_OPTIONS[Math.floor(Math.random() * DRINK_OPTIONS.length)];
    const randomDessert = Math.random() > 0.3 ? DESSERT_OPTIONS[Math.floor(Math.random() * DESSERT_OPTIONS.length)] : null;

    setSelectedMain(randomMain);
    setSelectedSide(randomSide);
    setSelectedDrink(randomDrink);
    setSelectedDessert(randomDessert);

    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="teller" className="w-full py-16 px-4 sm:px-8 xl:px-12 2xl:px-16 border-b border-stone-800 bg-stone-900/40 relative overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6 mb-10"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Utensils className="w-4 h-4" />
            <span>{lang === 'de' ? 'Interaktive Teller-Werkstatt' : 'Interactive Plate Composer'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-1 tracking-tight">
            {lang === 'de' ? 'Stell deinen deutschen Teller zusammen' : 'Build Your German Feast'}
          </h2>
          <p className="font-serif italic text-stone-300 text-base sm:text-lg mt-1">
            {lang === 'de' ? 'Wähle deine Lieblingskomponenten und lerne, das Gericht auf Deutsch im Akkusativ zu bestellen!' : 'Compose your favorite dishes and practice ordering in German!'}
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-xl transition-all self-start md:self-auto hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{lang === 'de' ? 'Zufälliges Menü würfeln' : 'Surprise German Menu'}</span>
        </button>
      </motion.div>

      {/* Grid spanning full width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Virtual Porcelain Plate Simulator */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="relative w-full max-w-lg aspect-square rounded-[3rem] bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-2 border-stone-800 p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group poster-grain">
            
            {/* Ambient Warm Light Underneath Plate */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Porcelain Plate Rim */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-stone-200 via-stone-100 to-white shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_2px_12px_rgba(255,255,255,0.9)] border-8 border-stone-300/40 flex items-center justify-center p-4">
              
              {/* Inner Plate Depression */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-stone-100 to-stone-200 shadow-inner flex flex-wrap items-center justify-center gap-3 p-4">
                
                {/* Main Food Item */}
                <div 
                  title={selectedMain.name}
                  className="text-6xl sm:text-7xl transform -rotate-6 hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-md select-none"
                >
                  {selectedMain.emoji}
                </div>

                {/* Side Dish */}
                <div 
                  title={selectedSide.name}
                  className="text-5xl sm:text-6xl transform rotate-12 hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-md select-none"
                >
                  {selectedSide.emoji}
                </div>

                {/* Optional Dessert on Plate */}
                {selectedDessert && (
                  <div 
                    title={selectedDessert.name}
                    className="text-4xl sm:text-5xl transform -rotate-12 hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-md select-none"
                  >
                    {selectedDessert.emoji}
                  </div>
                )}
              </div>
            </div>

            {/* Drink beside the plate */}
            <div 
              title={selectedDrink.name}
              className="absolute bottom-6 right-6 text-5xl sm:text-6xl transform hover:scale-125 transition-transform duration-300 cursor-pointer drop-shadow-xl select-none"
            >
              {selectedDrink.emoji}
            </div>

            {/* Total Energy Badge */}
            <div className="mt-6 flex items-center gap-2 px-5 py-2 rounded-full bg-stone-900/90 border border-stone-700 text-xs text-stone-300 shadow">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Gesamter Nährwert: <strong className="text-amber-300 text-sm">{totalCalories} kcal</strong></span>
            </div>

          </div>

          {/* Dynamic Generated German Sentence Box */}
          <div className="w-full max-w-lg mt-6 p-6 rounded-3xl bg-stone-900 border border-amber-500/40 space-y-3 shadow-2xl poster-grain">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'de' ? 'Generierter Bestellsatz:' : 'Dynamic German Order Sentence:'}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                Akkusativ & Dativ
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              „{generatedSentenceDe}“
            </p>

            <p className="text-xs text-stone-400 italic">
              {generatedSentenceEn}
            </p>

            <button
              onClick={handleSpeakOrder}
              disabled={isSpeaking}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 scale-[1.02]'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-400/20'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>{isSpeaking ? 'Liest Menü vor...' : (lang === 'de' ? 'Gesamten Bestellsatz anhören' : 'Hear Complete German Order')}</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Wide Ingredient Selectors */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >

          {/* 1. Hauptspeise */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <span>1.</span> {lang === 'de' ? 'Hauptspeise wählen' : 'Choose Main Course'}
              </h3>
              <span className="text-xs font-semibold text-amber-400">{selectedMain.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MAIN_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedMain(item);
                  }}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center gap-3 ${
                    selectedMain.id === item.id
                      ? 'border-amber-400 bg-amber-400/15 text-white font-bold ring-2 ring-amber-400 shadow-md'
                      : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="truncate">
                    <span className="block truncate font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-stone-400 block">~{item.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Beilage */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <span>2.</span> {lang === 'de' ? 'Klassische Beilage' : 'Choose German Side'}
              </h3>
              <span className="text-xs font-semibold text-amber-400">{selectedSide.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SIDE_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSide(item);
                  }}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center gap-3 ${
                    selectedSide.id === item.id
                      ? 'border-amber-400 bg-amber-400/15 text-white font-bold ring-2 ring-amber-400 shadow-md'
                      : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="truncate">
                    <span className="block truncate font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-stone-400 block">~{item.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Getränk */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <span>3.</span> {lang === 'de' ? 'Typisches Getränk' : 'Choose Beverage'}
              </h3>
              <span className="text-xs font-semibold text-amber-400">{selectedDrink.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DRINK_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDrink(item);
                  }}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center gap-3 ${
                    selectedDrink.id === item.id
                      ? 'border-amber-400 bg-amber-400/15 text-white font-bold ring-2 ring-amber-400 shadow-md'
                      : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="truncate">
                    <span className="block truncate font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-stone-400 block">~{item.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Nachspeise */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <span>4.</span> {lang === 'de' ? 'Süße Nachspeise (Optional)' : 'Sweet Dessert (Optional)'}
              </h3>
              <span className="text-xs font-semibold text-amber-400">{selectedDessert ? selectedDessert.name : 'Keine'}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedDessert(null);
                }}
                className={`p-3.5 rounded-2xl text-center border text-xs transition-all ${
                  selectedDessert === null
                    ? 'border-amber-400 bg-amber-400/15 text-white font-bold ring-2 ring-amber-400'
                    : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:bg-stone-800'
                }`}
              >
                🚫 {lang === 'de' ? 'Ohne Nachtisch' : 'No Dessert'}
              </button>
              {DESSERT_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDessert(item);
                  }}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center gap-3 ${
                    selectedDessert?.id === item.id
                      ? 'border-amber-400 bg-amber-400/15 text-white font-bold ring-2 ring-amber-400 shadow-md'
                      : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="truncate">
                    <span className="block truncate font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-stone-400 block">~{item.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
