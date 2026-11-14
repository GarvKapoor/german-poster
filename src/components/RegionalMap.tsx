import React, { useState } from 'react';
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
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section Header */}
      <div className="border-b border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Compass className="w-4 h-4" />
          <span>{lang === 'de' ? 'Kulinarische Geographie' : 'Culinary Geography'}</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
          {lang === 'de' ? 'Regionale Spezialitäten Deutschlands' : 'Regional Specialties of Germany'}
        </h2>
        <p className="font-serif italic text-stone-400 text-sm sm:text-base mt-1">
          {lang === 'de' ? 'Klicke auf die Bundesländer auf der Landkarte, um die typischen Traditionsgerichte zu entdecken.' : 'Click on any German state on the map to discover its signature culinary traditions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Stylized SVG Map of Germany */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] bg-stone-900/90 border border-stone-800 p-6 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden poster-grain">
            
            {/* Map Top Indicator */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                BUNDESREPUBLIK DEUTSCHLAND
              </span>
            </div>

            {/* Stylized SVG Map Container */}
            <div className="relative w-full h-full max-h-[460px] flex items-center justify-center">
              
              {/* Germany Silhouette Vector Outline */}
              <svg
                viewBox="0 0 500 620"
                className="w-full h-full text-stone-800 drop-shadow-xl"
                fill="currentColor"
              >
                {/* Stylized geometric contours representing Germany */}
                <path
                  d="M170,40 L240,30 L290,60 L380,120 L350,190 L420,230 L400,320 L440,370 L380,440 L350,560 L230,590 L160,560 L120,490 L100,380 L70,300 L120,210 L140,110 Z"
                  className="fill-stone-800/90 stroke-stone-700 stroke-2"
                />
                {/* Secondary inner contour lines for depth */}
                <path
                  d="M200,90 L260,80 L310,130 L340,210 L300,310 L350,400 L300,510 L200,530 L150,430 L130,290 L160,180 Z"
                  className="fill-stone-850 stroke-stone-700/60 stroke-1 stroke-dasharray-2"
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
                      className={`relative w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-white ring-4 ring-amber-400/40 shadow-amber-400/30'
                          : 'bg-stone-900 border-stone-600 text-stone-200 hover:border-amber-400'
                      }`}
                    >
                      <span>{region.foodEmoji}</span>
                    </div>

                    {/* Region Label Pill */}
                    <span
                      className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight whitespace-nowrap shadow-md border ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-amber-300 font-extrabold'
                          : 'bg-stone-950/90 text-stone-300 border-stone-700/70 group-hover:text-white'
                      }`}
                    >
                      {region.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Bottom Caption */}
            <p className="text-[11px] text-stone-400 text-center mt-2">
              📍 Tippe auf ein Bundesland, um mehr zu erfahren.
            </p>

          </div>
        </div>

        {/* Right Column: Detailed Regional Showcase Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-stone-900 border border-stone-700/80 shadow-2xl space-y-6 poster-grain relative overflow-hidden">
            
            {/* Top Regional Tag */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedRegion.name}</span>
              </span>

              <span className="text-xs font-mono text-stone-400">
                Hauptstadt: <strong>{selectedRegion.capital}</strong>
              </span>
            </div>

            {/* Famous Dish Highlight */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                {lang === 'de' ? 'Das berühmteste Kultgericht:' : 'Iconic Signature Specialty:'}
              </span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-2xl bg-stone-950 border border-stone-800 shadow">
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
                  className="p-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-all shadow-md shrink-0"
                  title="Aussprache anhören"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                </button>
              </div>
            </div>

            {/* Cultural Description */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
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
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2">
                {lang === 'de' ? 'Schnellauswahl aller Regionen:' : 'All Regions:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GERMAN_REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all flex items-center gap-2 ${
                      selectedRegion.id === r.id
                        ? 'border-amber-400 bg-amber-400/20 text-white font-bold ring-1 ring-amber-400'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <span>{r.foodEmoji}</span>
                    <span className="truncate">{r.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
