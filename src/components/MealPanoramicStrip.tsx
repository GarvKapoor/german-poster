import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Clock, Sparkles } from 'lucide-react';
import { MealTime, MEAL_TIME_INFO, FOOD_ITEMS, FoodItem } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import { useScrollDirection } from '../utils/useScrollDirection';

interface MealPanoramicStripProps {
  selectedMeal: MealTime;
  setSelectedMeal: (meal: MealTime) => void;
  onSelectFood: (food: FoodItem) => void;
  lang: 'de' | 'en';
  slowAudio: boolean;
}

export const MealPanoramicStrip: React.FC<MealPanoramicStripProps> = ({
  selectedMeal,
  setSelectedMeal,
  onSelectFood,
  lang,
  slowAudio,
}) => {
  const [hoveredMeal, setHoveredMeal] = useState<MealTime | null>(null);
  const { scrollDirection } = useScrollDirection();
  const dirY = scrollDirection === 'down' ? 35 : -35;

  const mealOrder: MealTime[] = ['fruehstueck', 'mittagessen', 'kaffee', 'abendbrot'];

  const handleSpeech = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    sound.playClick();
    await speakGerman(text, slowAudio ? 0.7 : 0.9);
  };

  return (
    <section className="w-full py-12 border-y border-stone-800 bg-stone-950/60 overflow-hidden">
      
      {/* Section Header spanning full width with directional scroll animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-4 sm:px-8 xl:px-12 2xl:px-16 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'de' ? 'Tageszeiten-Panorama' : 'Full-Width Day Horizon'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-1 tracking-tight">
            {lang === 'de' ? 'Vier Mahlzeiten im Tageslauf' : 'Four Meals of the German Day'}
          </h2>
          <p className="font-serif italic text-stone-400 text-sm sm:text-base mt-1">
            {lang === 'de' ? 'Vier kulinarische Kapitel eines traditionellen deutschen Tages.' : 'Four culinary chapters of a traditional German day.'}
          </p>
        </div>

        {/* Total stats pill */}
        <div className="flex items-center gap-3 text-xs font-mono text-stone-400 bg-stone-900 px-4 py-2 rounded-2xl border border-stone-800 self-start md:self-auto shadow-lg">
          <span>📅 4 TAGESZEITEN</span>
          <span>•</span>
          <span>🍽️ {FOOD_ITEMS.length} SPEZIALITÄTEN</span>
        </div>
      </motion.div>

      {/* Full-width 4-column dynamic expanding accordion with directional entrance */}
      <div className="w-full px-2 sm:px-6 xl:px-10 grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-[480px]">
        {mealOrder.map((mealId, idx) => {
          const info = MEAL_TIME_INFO[mealId];
          const isSelected = selectedMeal === mealId;
          const isHovered = hoveredMeal === mealId;
          const mealDishes = FOOD_ITEMS.filter(f => f.mealTimes.includes(mealId)).slice(0, 3);

          return (
            <motion.div
              key={mealId}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              onMouseEnter={() => {
                setHoveredMeal(mealId);
              }}
              onMouseLeave={() => setHoveredMeal(null)}
              onClick={() => {
                sound.playClick();
                setSelectedMeal(mealId);
              }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-2 cursor-pointer transition-all duration-500 shadow-2xl ${
                isSelected
                  ? 'border-amber-400 bg-gradient-to-b from-stone-850 via-stone-900 to-stone-950 ring-2 ring-amber-400/30'
                  : 'border-stone-800/80 bg-stone-900/60 hover:border-stone-700'
              }`}
            >
              {/* Dynamic Atmospheric Glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 20%, ${info.accentColor} 0%, transparent 70%)`
                }}
              />

              {/* Top: Sequence Number & Time Range */}
              <div className="relative z-10 flex items-center justify-between border-b border-stone-800/80 pb-4">
                <span className="font-mono text-2xl font-black text-stone-500">
                  0{idx + 1}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-stone-800 text-xs font-mono text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{info.timeRange}</span>
                </div>
              </div>

              {/* Middle: Icon & Title */}
              <div className="relative z-10 my-6 space-y-2">
                <div className="text-5xl select-none mb-3 animate-float" style={{ animationDelay: `${idx * 0.4}s` }}>
                  {mealId === 'fruehstueck' && '🥐'}
                  {mealId === 'mittagessen' && '🥩'}
                  {mealId === 'kaffee' && '🍰'}
                  {mealId === 'abendbrot' && '🥖'}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {lang === 'de' ? info.titleDe : info.titleEn}
                  </h3>
                  <button
                    onClick={(e) => handleSpeech(e, `${info.titleDe}. ${info.quoteDe}`)}
                    className="p-2 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-400 text-stone-400 hover:text-amber-400 transition-colors"
                    title="Aussprache anhören"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {lang === 'de' ? info.quoteDe : info.quoteEn}
                </p>
              </div>

              {/* Bottom: Iconic Dishes Chip Badges */}
              <div className="relative z-10 pt-4 border-t border-stone-800/80 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                  {lang === 'de' ? 'Klassiker:' : 'Classics:'}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {mealDishes.map((dish) => (
                    <button
                      key={dish.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onSelectFood(dish);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-950/80 border border-stone-800 hover:border-amber-400/50 text-[11px] font-medium text-stone-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors group/item"
                    >
                      <span>{dish.emoji}</span>
                      <span className="truncate max-w-[130px]">{dish.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Forward Action Button with directional entrance */}
      <motion.div 
        initial={{ opacity: 0, y: dirY * 0.7 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full flex justify-center pt-8"
      >
        <button
          onClick={() => {
            sound.playClick();
            document.getElementById('karussell')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900/90 hover:bg-amber-400 text-stone-200 hover:text-stone-950 border border-stone-700 hover:border-amber-400 text-xs sm:text-sm font-bold transition-all shadow-xl hover:scale-105 group/btn"
        >
          <span>{lang === 'de' ? 'Weiter zum Speisen-Karussell' : 'Explore Culinary Carousel'}</span>
          <span className="text-amber-400 group-hover/btn:text-stone-950 transition-colors">↓</span>
        </button>
      </motion.div>

    </section>
  );
};
