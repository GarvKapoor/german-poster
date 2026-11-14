import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, Sparkles, Flame, MapPin } from 'lucide-react';
import { FOOD_ITEMS, FoodItem, Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    sound.playClick();
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

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

  return (
    <section className="w-full py-12 bg-stone-950/80 border-b border-stone-800 relative overflow-hidden">
      
      {/* Full width header */}
      <div className="w-full px-4 sm:px-8 xl:px-12 2xl:px-16 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'de' ? 'Horizontale Galerie' : 'Edge-to-Edge Food Carousel'}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1 tracking-tight">
            {lang === 'de' ? 'Das Große Kulinarik-Karussell' : 'The Great German Culinary Reel'}
          </h2>
          <p className="font-serif italic text-stone-400 text-sm mt-0.5">
            {lang === 'de' ? 'Scrolle horizontal durch alle 13 Spezialitäten mit Audio und Artikeln.' : 'Swipe or scroll horizontally through all German delicacies.'}
          </p>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-2xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white transition-all shadow-md"
            title="Nach links scrollen"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-2xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white transition-all shadow-md"
            title="Nach rechts scrollen"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="w-full flex gap-5 overflow-x-auto px-4 sm:px-8 xl:px-12 2xl:px-16 pb-6 pt-2 scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {FOOD_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => {
              sound.playClick();
              onSelectFood(item);
            }}
            style={{ scrollSnapAlign: 'start' }}
            className="w-[300px] sm:w-[340px] shrink-0 rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/50 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 poster-grain"
          >
            {/* Card Image */}
            <div className="relative h-44 w-full overflow-hidden bg-stone-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
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
                className="absolute top-3 right-3 p-2 rounded-xl bg-stone-950/80 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-stone-700 hover:border-amber-400 transition-colors backdrop-blur-md"
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
                <div className="flex items-baseline justify-between">
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

          </motion.div>
        ))}
      </div>

    </section>
  );
};
