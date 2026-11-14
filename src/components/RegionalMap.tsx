import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Compass, MapPin, Sparkles, Lightbulb } from 'lucide-react';
import { GERMAN_REGIONS, RegionSpecialty } from '../data/regions';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

export const RegionalMap: React.FC<{ lang: 'de' | 'en'; slowAudio: boolean }> = ({ lang, slowAudio }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionSpecialty>(GERMAN_REGIONS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSelect = (region: RegionSpecialty) => {
    sound.playClick();
    setSelectedRegion(region);
  };

  const handleSpeech = async (text: string) => {
    sound.playClick();
    setIsSpeaking(true);
    await speakGerman(text, slowAudio ? 0.7 : 0.9);
    setIsSpeaking(false);
  };

  return (
    <section id="landkarte" className="w-full py-16 px-4 sm:px-8 xl:px-12 2xl:px-16 border-b border-stone-800 bg-stone-950 relative overflow-hidden">
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="border-b border-stone-800 pb-6 mb-10"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
          <Compass className="w-4 h-4" />
          <span>{lang === 'de' ? 'Kulinarische Geographie' : 'Culinary Geography'}</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-1 tracking-tight">
          {lang === 'de' ? 'Regionale Spezialitäten Deutschlands' : 'Regional Specialties of Germany'}
        </h2>
        <p className="font-serif italic text-stone-300 text-base sm:text-lg mt-1">
          {lang === 'de' ? 'Klicke auf die Bundesländer auf der Landkarte, um die typischen Traditionsgerichte zu entdecken.' : 'Click on any German state on the map to discover its signature culinary traditions.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Interactive Stylized SVG Map of Germany */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/5] max-h-[520px] rounded-[2.8rem] bg-stone-900 border-2 border-stone-800 p-6 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden poster-grain">
            
            {/* Map Top Indicator */}
            <div className="absolute top-5 left-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-stone-300 uppercase font-bold">
                BUNDESREPUBLIK DEUTSCHLAND
              </span>
            </div>

            {/* Stylized SVG Map Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Germany Silhouette Vector Outline */}
              <svg
                viewBox="0 0 500 620"
                className="w-full h-full text-stone-800 drop-shadow-2xl"
                fill="currentColor"
              >
                <path
                  d="M170,40 L240,30 L290,60 L380,120 L350,190 L420,230 L400,320 L440,370 L380,440 L350,560 L230,590 L160,560 L120,490 L100,380 L70,300 L120,210 L140,110 Z"
                  className="fill-stone-850 stroke-stone-700 stroke-2"
                />
                <path
                  d="M200,90 L260,80 L310,130 L340,210 L300,310 L350,400 L300,510 L200,530 L150,430 L130,290 L160,180 Z"
                  className="fill-stone-800 stroke-stone-700/60 stroke-1"
                />
              </svg>

              {/* Interactive Hotspot Pins for Each Region */}
              {GERMAN_REGIONS.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => handleSelect(region)}
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition-all duration-300 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    {/* Glowing Pin Bubble */}
                    <div
                      className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-2xl border-2 transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-white ring-4 ring-amber-400/40 shadow-amber-400/40'
                          : 'bg-stone-900 border-stone-600 text-stone-200 hover:border-amber-400'
                      }`}
                    >
                      <span>{region.foodEmoji}</span>
                    </div>

                    {/* Region Label Pill */}
                    <span
                      className={`mt-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg border ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-amber-300 font-extrabold'
                          : 'bg-stone-950/90 text-stone-300 border-stone-700 group-hover:text-white'
                      }`}
                    >
                      {region.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Bottom Caption */}
            <p className="text-xs text-stone-400 text-center mt-2">
              📍 Tippe auf ein Bundesland, um mehr zu erfahren.
            </p>

          </div>
        </motion.div>

        {/* Right Column: Detailed Regional Showcase Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="p-8 sm:p-10 rounded-[2.8rem] bg-stone-900 border-2 border-stone-800 shadow-2xl space-y-6 poster-grain relative overflow-hidden">
            
            {/* Top Regional Tag */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedRegion.name}</span>
              </span>

              <span className="text-xs font-mono text-stone-400">
                Hauptstadt: <strong className="text-white">{selectedRegion.capital}</strong>
              </span>
            </div>

            {/* Famous Dish Highlight */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                {lang === 'de' ? 'Das berühmteste Kultgericht:' : 'Iconic Signature Specialty:'}
              </span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="text-5xl p-2.5 rounded-2xl bg-stone-950 border border-stone-800 shadow">
                    {selectedRegion.foodEmoji}
                  </span>
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {selectedRegion.famousDish}
                    </h3>
                    <span className="text-xs font-semibold text-amber-400">
                      Artikel: {selectedRegion.article.toUpperCase()} {selectedRegion.famousDish.split('&')[0].trim()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeech(`${selectedRegion.famousDish}, Spezialität aus ${selectedRegion.name}`)}
                  disabled={isSpeaking}
                  className="p-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-all shadow-md shrink-0 hover:scale-105"
                  title="Aussprache anhören"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                </button>
              </div>
            </div>

            {/* Cultural Description */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
              <p className="text-stone-200 text-sm leading-relaxed">
                {lang === 'de' ? selectedRegion.descriptionDe : selectedRegion.descriptionEn}
              </p>
            </div>

            {/* Cultural Folklore / Trivia */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>{lang === 'de' ? 'Kuriose Anekdote & Geschichte' : 'Regional Folklore & Story'}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                „{selectedRegion.triviaDe}“
              </p>
            </div>

            {/* Fast Selection Grid of All Regions */}
            <div className="pt-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2.5">
                {lang === 'de' ? 'Schnellauswahl aller Bundesländer:' : 'All Regions:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {GERMAN_REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`p-3 rounded-2xl text-left border text-xs transition-all flex items-center gap-2.5 ${
                      selectedRegion.id === r.id
                        ? 'border-amber-400 bg-amber-400/20 text-white font-bold ring-2 ring-amber-400'
                        : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <span className="text-xl">{r.foodEmoji}</span>
                    <span className="truncate font-semibold">{r.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
};
