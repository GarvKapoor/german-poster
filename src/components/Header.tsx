import React from 'react';
import { Volume2, VolumeX, Sparkles, Printer, Globe, UtensilsCrossed, Compass, Gamepad2, MessageSquareHeart } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'de' | 'en';
  setLang: (lang: 'de' | 'en') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenPrintModal: () => void;
  slowAudio: boolean;
  setSlowAudio: (slow: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  soundEnabled,
  setSoundEnabled,
  onOpenPrintModal,
  slowAudio,
  setSlowAudio,
}) => {
  const handleTabClick = (tabId: string) => {
    sound.playClick();
    setCurrentTab(tabId);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const toggleLang = () => {
    sound.playClick();
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const navItems = [
    { id: 'poster', labelDe: 'Plakat-Ansicht', labelEn: 'Poster Canvas', icon: Sparkles },
    { id: 'meals', labelDe: 'Mahlzeiten', labelEn: 'Meal Times', icon: UtensilsCrossed },
    { id: 'plate', labelDe: 'Mein Teller', labelEn: 'Plate Composer', icon: UtensilsCrossed },
    { id: 'map', labelDe: 'Landkarte', labelEn: 'Specialty Map', icon: Compass },
    { id: 'quiz', labelDe: 'Der-Die-Das Spiel', labelEn: 'Gender Duel', icon: Gamepad2 },
    { id: 'dialogue', labelDe: 'Dialog-Labor', labelEn: 'Conversation Lab', icon: MessageSquareHeart },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-stone-950/80 border-b border-stone-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with German Flag Accent */}
          <div 
            onClick={() => handleTabClick('poster')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-stone-900 p-0.5 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-2xl">
                🥨
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  KULINARIK
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  DEUTSCHLAND
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {lang === 'de' ? 'Das interaktive Bildungsplakat' : 'Interactive German Culinary Poster'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-stone-900/90 rounded-2xl border border-stone-800/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/25 scale-[1.02]'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{lang === 'de' ? item.labelDe : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Utility Tools: Language, Audio Speed, Sound FX, Print */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Speed (Slow / Normal) */}
            <button
              onClick={() => {
                sound.playClick();
                setSlowAudio(!slowAudio);
              }}
              title={lang === 'de' ? 'Aussprache-Tempo umschalten' : 'Toggle Audio Speed'}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                slowAudio
                  ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              🐢 {slowAudio ? 'Langsam (0.7x)' : 'Normal (0.9x)'}
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Audio stummschalten' : 'Audio aktivieren'}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/50 text-xs font-bold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'de' ? 'DE' : 'EN'}</span>
            </button>

            {/* Printable Poster Modal Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenPrintModal();
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-red-600/20 hover:scale-105 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'de' ? 'Plakat Drucken' : 'Print Poster'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2.5 gap-2 border-t border-stone-900 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-bold shadow'
                    : 'bg-stone-900/80 text-stone-400 border border-stone-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'de' ? item.labelDe : item.labelEn}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
