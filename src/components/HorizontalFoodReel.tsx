import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, Flame, MapPin, Play, Pause } from 'lucide-react';
import { FOOD_ITEMS, FoodItem, Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import { useScrollDirection } from '../utils/useScrollDirection';

interface HorizontalFoodReelProps {
  onSelectFood: (food: FoodItem) => void;
  lang: 'de' | 'en';
  slowAudio: boolean;
}

export const HorizontalFoodReel: React.FC<HorizontalFoodReelProps> = ({
  onSelectFood,
  lang,
  slowAudio,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const { scrollDirection } = useScrollDirection();
  const dirY = scrollDirection === 'down' ? 35 : -35;

  const handlePronounce = async (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    sound.playClick();
    await speakGerman(`${item.article} ${item.name}`, slowAudio ? 0.7 : 0.9);
  };

  const getArticleBadge = (article: Article) => {
    switch (article) {
      case 'der':
        return 'bg-blue-600/30 text-blue-300 border-blue-500/50';
      case 'die':
        return 'bg-red-600/30 text-red-300 border-red-500/50';
      case 'das':
        return 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50';
    }
  };

  // Duplicated list for seamless infinite auto-scroll
  const duplicatedItems = [...FOOD_ITEMS, ...FOOD_ITEMS];

  return (
    <section className="w-full py-12 bg-stone-950/80 border-b border-stone-800 relative overflow-hidden group/section">
      
      {/* Full width header with smooth entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-4 sm:px-8 xl:px-12 2xl:px-16 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'de' ? 'Automatischer Karussell-Lauf' : 'Self-Scrolling Carousel'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1 tracking-tight">
            {lang === 'de' ? 'Das Große Kulinarik-Karussell' : 'The Great German Culinary Reel'}
          </h2>
          <p className="font-serif italic text-stone-400 text-sm mt-0.5">
            {lang === 'de' ? '18 ikonische Spezialitäten im kontinuierlichen Laufband.' : '18 iconic specialties in a continuous showcase.'}
          </p>
        </div>

        {/* Live Auto-Scroll Status Indicator & Pause Toggle */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 shadow-md">
            <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span>{isPaused ? (lang === 'de' ? 'Pausiert' : 'Paused') : (lang === 'de' ? 'Auto-Lauf aktiv' : 'Auto-scrolling')}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsPaused(!isPaused);
            }}
            className="p-2.5 rounded-2xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white transition-all shadow-md"
            title={isPaused ? 'Auto-Scroll fortsetzen' : 'Auto-Scroll pausieren'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </motion.div>

      {/* Full-bleed Auto-Scrolling Track with smooth view animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-hidden py-3"
        style={{ perspective: 1200 }}
      >
        <div
          className={`gap-6 px-4 ${isPaused ? '' : 'animate-food-reel'}`}
          style={isPaused ? { display: 'flex', width: 'max-content' } : {}}
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => {
                sound.playClick();
                onSelectFood(item);
              }}
              className="w-[290px] sm:w-[330px] shrink-0 rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/60 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 poster-grain select-none"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full overflow-hidden bg-stone-950">
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
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                {/* Floating Article Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider border backdrop-blur-md ${getArticleBadge(item.article)}`}>
                    {item.article.toUpperCase()}
                  </span>
                  <span className="p-1 rounded-lg bg-stone-950/80 text-sm backdrop-blur-md border border-stone-800">
                    {item.emoji}
                  </span>
                </div>

                {/* Audio Speaker */}
                <button
                  onClick={(e) => handlePronounce(e, item)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-stone-950/80 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-stone-700 hover:border-amber-400 transition-colors backdrop-blur-md shadow"
                  title="Aussprache anhören"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {/* Calories & Region */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300">
                  <span className="flex items-center gap-1 bg-stone-950/80 px-2 py-0.5 rounded backdrop-blur-md text-amber-300">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>{item.calories} kcal</span>
                  </span>
                  <span className="flex items-center gap-1 bg-stone-950/80 px-2 py-0.5 rounded backdrop-blur-md truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span className="truncate">{item.region.split(' ')[0]}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-display font-extrabold text-xl text-white group-hover:text-amber-300 transition-colors truncate">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400">
                      {item.phonetic}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 truncate">
                    {item.englishName}
                  </p>
                </div>

                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {lang === 'de' ? item.descriptionDe : item.descriptionEn}
                </p>

                {/* Bottom Quick Action */}
                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-semibold text-stone-400 group-hover:text-amber-400 transition-colors">
                  <span>{lang === 'de' ? 'Details öffnen' : 'View details'}</span>
                  <span>→</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </motion.div>

      {/* Forward Action Button with directional entrance */}
      <motion.div 
        initial={{ opacity: 0, y: dirY * 0.7 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="w-full flex justify-center pt-8"
      >
        <button
          onClick={() => {
            sound.playClick();
            document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900/90 hover:bg-amber-400 text-stone-200 hover:text-stone-950 border border-stone-700 hover:border-amber-400 text-xs sm:text-sm font-bold transition-all shadow-xl hover:scale-105 group/btn"
        >
          <span>{lang === 'de' ? 'Zum Speisenkatalog vorblättern' : 'Explore Complete Food Catalog'}</span>
          <span className="text-amber-400 group-hover/btn:text-stone-950 transition-colors">↓</span>
        </button>
      </motion.div>

    </section>
  );
};
