import React, { useState } from 'react';
import { X, Volume2, Sparkles, Flame, MapPin, ChefHat, Lightbulb, Check } from 'lucide-react';
import { FoodItem, Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

interface FoodDetailModalProps {
  food: FoodItem | null;
  onClose: () => void;
  lang: 'de' | 'en';
  slowAudio: boolean;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  onClose,
  lang,
  slowAudio,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!food) return null;

  const handleSpeech = async (text: string) => {
    sound.playClick();
    setIsSpeaking(true);
    await speakGerman(text, slowAudio ? 0.7 : 0.9);
    setIsSpeaking(false);
  };

  const getArticleColor = (article: Article) => {
    switch (article) {
      case 'der': return 'text-blue-400 bg-blue-500/20 border-blue-500/40';
      case 'die': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'das': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-900 border border-stone-700/80 shadow-2xl shadow-black text-stone-100 poster-grain"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* Floating Emoji */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="text-4xl p-2 rounded-2xl bg-stone-950/80 border border-stone-800 backdrop-blur-md shadow-lg">
              {food.emoji}
            </span>
            <div>
              <span className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase border backdrop-blur-md ${getArticleColor(food.article)}`}>
                {food.article.toUpperCase()} (Grammatisches Geschlecht)
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                {food.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Subtitle & Phonetic Pronunciation Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <p className="text-stone-300 text-sm font-medium">
                {food.englishName}
              </p>
              <p className="font-mono text-xs text-amber-400 mt-0.5">
                IPA Aussprache: {food.phonetic}
              </p>
            </div>

            <button
              onClick={() => handleSpeech(`${food.article} ${food.name}`)}
              disabled={isSpeaking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-all"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>{isSpeaking ? 'Spricht...' : (lang === 'de' ? 'Aussprache anhören' : 'Hear Pronunciation')}</span>
            </button>
          </div>

          {/* Meta Tags: Region, Calories, Flavor */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Herkunft & Region</span>
              </span>
              <span className="font-semibold text-white block mt-1 truncate">{food.region}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Nährwert / Energie</span>
              </span>
              <span className="font-semibold text-white block mt-1">~{food.calories} kcal pro Portion</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 col-span-2 sm:col-span-1">
              <span className="text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Geschmacksprofil</span>
              </span>
              <span className="font-semibold text-white block mt-1 truncate">{food.tasteProfile.join(', ')}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-stone-400 mb-1">
              {lang === 'de' ? 'Über dieses Gericht' : 'About this specialty'}
            </h4>
            <p className="text-stone-200 text-sm leading-relaxed">
              {lang === 'de' ? food.descriptionDe : food.descriptionEn}
            </p>
          </div>

          {/* Key Ingredients (Zutaten) */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-stone-400 mb-2 flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'de' ? 'Klassische Zutaten' : 'Key Ingredients'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {(lang === 'de' ? food.keyIngredientsDe : food.keyIngredientsEn).map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-medium bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{ing}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Cultural Fun Fact */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>{lang === 'de' ? 'Kultur-Fakt & Anekdote' : 'Cultural Fun Fact'}</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed italic">
              „{food.funFactDe}“
            </p>
          </div>

          {/* Ordering Phrase Practice */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
              {lang === 'de' ? 'Sprechübung (Bestellung auf Deutsch)' : 'Speaking Practice (Ordering in German)'}
            </span>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  „{food.sampleSentenceDe}“
                </p>
                <p className="text-xs text-stone-400 italic">
                  {food.sampleSentenceEn}
                </p>
              </div>
              <button
                onClick={() => handleSpeech(food.sampleSentenceDe)}
                className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
