import React, { useState } from 'react';
import { Volume2, Info, Sparkles, Flame, MapPin } from 'lucide-react';
import { FoodItem, MealTime, MEAL_TIME_INFO, FOOD_ITEMS, Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

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
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const mealInfo = MEAL_TIME_INFO[selectedMeal];

  // Filter items matching the selected meal time
  const currentItems = FOOD_ITEMS.filter((item) => {
    const matchesMeal = item.mealTimes.includes(selectedMeal);
    if (filterCategory === 'all') return matchesMeal;
    return matchesMeal && item.category === filterCategory;
  });

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
          label: 'DER',
          bg: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
          dot: 'bg-blue-500'
        };
      case 'die':
        return {
          label: 'DIE',
          bg: 'bg-red-600/20 text-red-300 border-red-500/40',
          dot: 'bg-red-500'
        };
      case 'das':
        return {
          label: 'DAS',
          bg: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40',
          dot: 'bg-emerald-500'
        };
    }
  };

  return (
    <section id="speisen-bereich" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Meal Time Header & Dynamic Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'de' ? 'Kulinarische Tageszeiten' : 'Meals of the Day'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
            {lang === 'de' ? mealInfo.titleDe : mealInfo.titleEn}
          </h2>
          <p className="font-serif italic text-stone-400 text-base mt-1">
            {lang === 'de' ? mealInfo.quoteDe : mealInfo.quoteEn} ({mealInfo.timeRange})
          </p>
        </div>

        {/* Meal Time Selector Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-900 rounded-2xl border border-stone-800">
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {lang === 'de' ? info.titleDe : info.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grammar Legend reminder: Der / Die / Das */}
      <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="text-stone-300 font-medium">
          💡 <strong>Grammatik-Tipp:</strong> {lang === 'de' ? 'Deutsche Nomen haben drei grammatikalische Geschlechter:' : 'German nouns have three grammatical genders:'}
        </span>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
            DER (Maskulin)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
            DIE (Feminin)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            DAS (Neutrum)
          </span>
        </div>
      </div>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {currentItems.map((item) => {
          const badge = getArticleBadge(item.article);
          const isSpeaking = speakingId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectFood(item)}
              className="group relative rounded-3xl bg-stone-900/90 border border-stone-800/80 hover:border-amber-400/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

                {/* Article Badge (Der / Die / Das) */}
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
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Title & English Subtitle */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
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

                {/* Short Cultural Description */}
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {lang === 'de' ? item.descriptionDe : item.descriptionEn}
                </p>

                {/* Conversational Sample Phrase with Speaker */}
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
            </div>
          );
        })}
      </div>

    </section>
  );
};
