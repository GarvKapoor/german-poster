import React from 'react';
import { X, Printer, Download, Sparkles } from 'lucide-react';
import { FOOD_ITEMS, MEAL_TIME_INFO, MealTime } from '../data/foodData';
import { sound } from '../utils/sound';

interface PosterExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'de' | 'en';
}

export const PosterExportModal: React.FC<PosterExportModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const mealTimes: MealTime[] = ['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      {/* Outer Modal Shell */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl my-8 rounded-[2.5rem] bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden poster-grain"
      >
        {/* Top Control Header (Hidden when printing) */}
        <div className="no-print p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </span>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                {lang === 'de' ? 'Offizielles Ausstellungs-Plakat' : 'Official Exhibition Poster'}
              </h3>
              <p className="text-xs text-stone-400">
                {lang === 'de' ? 'Optimiert für A3/A4 Druck und digitale Präsentationen' : 'Optimized for high-res print and digital presentation'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-lg transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'de' ? 'Jetzt drucken / Als PDF speichern' : 'Print / Save as PDF'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Poster Canvas */}
        <div className="p-6 sm:p-12 bg-stone-950 text-stone-100 print:bg-white print:text-black space-y-8 font-sans">
          
          {/* Poster Top Bar */}
          <div className="border-b-4 border-amber-400 pb-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-600 print:bg-black" />
                <span className="text-xs uppercase font-mono tracking-[0.3em] font-extrabold text-amber-400 print:text-black">
                  DEUTSCHE ESSKULTUR & MAHLZEITEN
                </span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white print:text-black">
                KULINARISCHES DEUTSCHLAND
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-stone-300 print:text-stone-700 mt-1">
                Ein interaktives Bildungs- und Kulturplakat: Frühstück, Mittagessen, Kaffee & Abendbrot
              </p>
            </div>

            <div className="text-right font-mono text-xs text-stone-400 print:text-stone-600 space-y-1">
              <p className="font-bold text-white print:text-black">EDITION 2026</p>
              <p>SPRACHe: DEUTSCH (A1-B1)</p>
              <p>THEMA: DEUTSCHES ESSEN</p>
            </div>
          </div>

          {/* Grammar Matrix (Der, Die, Das) */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-blue-950/40 border-2 border-blue-500/50 print:bg-stone-100 print:border-black">
              <span className="text-xs font-black text-blue-400 print:text-black block">MASKULIN</span>
              <span className="font-display font-black text-2xl text-white print:text-black">DER</span>
              <span className="text-[11px] text-stone-300 print:text-stone-700 block mt-1">Kaffee, Sauerbraten, Kartoffelsalat</span>
            </div>
            <div className="p-3 rounded-2xl bg-red-950/40 border-2 border-red-500/50 print:bg-stone-100 print:border-black">
              <span className="text-xs font-black text-red-400 print:text-black block">FEMININ</span>
              <span className="font-display font-black text-2xl text-white print:text-black">DIE</span>
              <span className="text-[11px] text-stone-300 print:text-stone-700 block mt-1">Bratwurst, Brezel, Marmelade, Kirschtorte</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/50 print:bg-stone-100 print:border-black">
              <span className="text-xs font-black text-emerald-400 print:text-black block">NEUTRUM</span>
              <span className="font-display font-black text-2xl text-white print:text-black">DAS</span>
              <span className="text-[11px] text-stone-300 print:text-stone-700 block mt-1">Brötchen, Schnitzel, Müsli, Bier</span>
            </div>
          </div>

          {/* Four Meal Times Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mealTimes.map((mt) => {
              const info = MEAL_TIME_INFO[mt];
              const dishes = FOOD_ITEMS.filter(f => f.mealTimes.includes(mt)).slice(0, 3);

              return (
                <div 
                  key={mt}
                  className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 print:bg-stone-50 print:border-stone-300 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 print:border-stone-200 pb-2">
                    <div>
                      <h4 className="font-display font-extrabold text-xl text-white print:text-black">
                        {info.titleDe}
                      </h4>
                      <p className="font-serif italic text-xs text-amber-300 print:text-stone-600">
                        {info.quoteDe}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-stone-950 print:bg-white text-stone-300 print:text-black border border-stone-700 print:border-stone-300">
                      {info.timeRange}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {dishes.map((dish) => (
                      <div 
                        key={dish.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-950/60 print:bg-white border border-stone-800/60 print:border-stone-200 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{dish.emoji}</span>
                          <div>
                            <span className="font-bold text-white print:text-black">
                              <span className="uppercase text-amber-400 print:text-stone-800 mr-1">{dish.article}</span>
                              {dish.name}
                            </span>
                            <span className="text-[10px] text-stone-400 print:text-stone-500 block truncate max-w-[200px]">
                              {dish.tasteProfile.join(' • ')}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-stone-400 print:text-stone-600">
                          ~{dish.calories} kcal
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Poster Footer: Historic Facts & UNESCO Credentials */}
          <div className="pt-6 border-t-2 border-stone-800 print:border-stone-300 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 print:text-stone-600 font-mono">
            <div>
              <p>💡 <strong>Kulturgut:</strong> Die deutsche Brotkultur umfasst über 3.000 Sorten (UNESCO-Weltkulturerbe seit 2014).</p>
            </div>
            <div className="flex gap-4">
              <span>🥨 MAHLZEIT!</span>
              <span>•</span>
              <span>GUTEN APPETIT!</span>
              <span>•</span>
              <span>PROST!</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
