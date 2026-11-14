import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, Flame, MapPin, Info } from 'lucide-react';
import { FoodItem, MealTime, MEAL_TIME_INFO, FOOD_ITEMS, Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import { useScrollDirection } from '../utils/useScrollDirection';

interface FoodGridProps {
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  onSelectFood: (food: FoodItem) => void;
  lang: 'de' | 'en';
  slowAudio: boolean;
}

export const FoodGrid: React.FC<FoodGridProps> = ({
  selectedMeal,
  setSelectedMeal,
  onSelectFood,
  lang,
  slowAudio,
}) => {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const { scrollDirection } = useScrollDirection();
  const dirY = scrollDirection === 'down' ? 35 : -35;

  const mealInfo = MEAL_TIME_INFO[selectedMeal];

  // Filter items matching the selected meal time
  const currentItems = FOOD_ITEMS.filter((item) => item.mealTimes.includes(selectedMeal));

  const handlePronounce = async (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    sound.playClick();
    setSpeakingId(item.id);
    const textToSpeak = `${item.article} ${item.name}`;
    await speakGerman(textToSpeak, slowAudio ? 0.7 : 0.9);
    setSpeakingId(null);
  };

  const handleSentencePronounce = async (e: React.MouseEvent, sentence: string) => {
    e.stopPropagation();
    sound.playClick();
    await speakGerman(sentence, slowAudio ? 0.7 : 0.9);
  };

  const getArticleBadge = (article: Article) => {
    switch (article) {
      case 'der':
        return {
          label: 'DER (Maskulin)',
          bg: 'bg-blue-600/25 text-blue-300 border-blue-500/50',
        };
      case 'die':
        return {
          label: 'DIE (Feminin)',
          bg: 'bg-red-600/25 text-red-300 border-red-500/50',
        };
      case 'das':
        return {
          label: 'DAS (Neutrum)',
          bg: 'bg-emerald-600/25 text-emerald-300 border-emerald-500/50',
        };
    }
  };

  return (
    <section id="katalog" className="w-full py-16 px-4 sm:px-8 xl:px-12 2xl:px-16 space-y-10 border-b border-stone-800 bg-stone-950">
      
      {/* Full Width Meal Time Header with directional entrance */}
      <motion.div
        initial={{ opacity: 0, y: dirY }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-stone-800 pb-8"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'de' ? 'Speisenkatalog nach Tageszeiten' : 'Interactive Meal Catalog'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-1 tracking-tight">
            {lang === 'de' ? mealInfo.titleDe : mealInfo.titleEn}
          </h2>
          <p className="font-serif italic text-stone-300 text-base sm:text-lg mt-1">
            {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn} ({mealInfo.timeRange})
          </p>
        </div>

        {/* Meal Time Selector Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-900 rounded-2xl border border-stone-800 shadow-inner self-start xl:self-auto">
          {(['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'] as MealTime[]).map((time) => {
            const isSelected = selectedMeal === time;
            const info = MEAL_TIME_INFO[time];
            return (
              <button
                key={time}
                onClick={() => {
                  sound.playClick();
                  setSelectedMeal(time);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold scale-105'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {lang === 'de' ? info.titleDe : info.titleEn}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Grammar Color Legend reminder across full width */}
      <div className="w-full p-4 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="text-stone-300 font-medium">
          💡 <strong>Grammatik-Tipp:</strong> {lang === 'de' ? 'Im Deutschen haben alle Lebensmittel ein grammatikalisches Geschlecht (Genus):' : 'German food nouns always carry one of three genders:'}
        </span>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
            DER (Maskulin)
          </span>
          <span className="px-3 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
            DIE (Feminin)
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            DAS (Neutrum)
          </span>
        </div>
      </div>

      {/* Grid of Food Cards across full width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
        {currentItems.map((item, index) => {
          const badge = getArticleBadge(item.article);
          const isSpeaking = speakingId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: dirY }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectFood(item)}
              className="group relative rounded-[2rem] bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer poster-grain"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

                {/* Article Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider border backdrop-blur-md ${badge.bg}`}>
                    {badge.label}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-stone-950/80 backdrop-blur-md text-stone-300 border border-stone-700/80">
                    {item.emoji}
                  </span>
                </div>

                {/* Pronounce Audio Button */}
                <button
                  onClick={(e) => handlePronounce(e, item)}
                  title={lang === 'de' ? 'Deutsche Aussprache anhören' : 'Listen to German pronunciation'}
                  className={`absolute top-3 right-3 p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                    isSpeaking
                      ? 'bg-amber-400 text-stone-950 border-amber-300 scale-110 shadow-lg'
                      : 'bg-stone-950/80 text-amber-300 border-stone-700/80 hover:bg-amber-400 hover:text-stone-950 hover:border-amber-300'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                </button>

                {/* Calorie & Region Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-amber-300 font-medium">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>~{item.calories} kcal</span>
                  </span>

                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-stone-300 truncate max-w-[150px]">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Title & English Subtitle */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono text-stone-400">
                      {item.phonetic}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-medium">
                    {item.englishName}
                  </p>
                </div>

                {/* Taste Profile Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tasteProfile.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-800 text-stone-300 border border-stone-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Short Description */}
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {lang === 'de' ? item.descriptionDe : item.descriptionEn}
                </p>

                {/* Conversational Sample Phrase */}
                <div 
                  onClick={(e) => handleSentencePronounce(e, item.sampleSentenceDe)}
                  className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-amber-400/40 transition-colors flex items-center justify-between gap-3 group/phrase"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 block">
                      {lang === 'de' ? 'Praxis-Satz (Bestellen):' : 'Speaking Practice:'}
                    </span>
                    <p className="text-xs font-medium text-stone-200 group-hover/phrase:text-white transition-colors">
                      „{item.sampleSentenceDe}“
                    </p>
                    <p className="text-[11px] text-stone-400 italic">
                      {item.sampleSentenceEn}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-900 text-amber-400 group-hover/phrase:bg-amber-400 group-hover/phrase:text-stone-950 transition-colors shrink-0">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* View Details Action */}
                <div className="pt-2 flex items-center justify-between border-t border-stone-800/80 text-xs font-semibold text-stone-400 group-hover:text-amber-400 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>{lang === 'de' ? 'Kulturgeschichte & Rezeptur' : 'Cultural Trivia & Recipe'}</span>
                  </span>
                  <span>→</span>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Forward Action Button */}
      <div className="w-full flex justify-center pt-8">
        <button
          onClick={() => {
            sound.playClick();
            document.getElementById('teller')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900/90 hover:bg-amber-400 text-stone-200 hover:text-stone-950 border border-stone-700 hover:border-amber-400 text-xs sm:text-sm font-bold transition-all shadow-xl hover:scale-105 group/btn"
        >
          <span>{lang === 'de' ? 'Jetzt eigenen deutschen Teller zusammenstellen' : 'Build Your Own German Feast'}</span>
          <span className="text-amber-400 group-hover/btn:text-stone-950 transition-colors">↓</span>
        </button>
      </div>

    </section>
  );
};
