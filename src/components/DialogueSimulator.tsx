import React, { useState } from 'react';
import { Volume2, MessageSquareHeart, Sparkles, User, Store, Play, CheckCircle } from 'lucide-react';
import { DIALOGUE_SCENARIOS, DialogueScenario } from '../data/dialogues';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';

export const DialogueSimulator: React.FC<{ lang: 'de' | 'en'; slowAudio: boolean }> = ({ lang, slowAudio }) => {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario>(DIALOGUE_SCENARIOS[0]);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const handlePlayLine = async (index: number) => {
    sound.playClick();
    setActiveLineIndex(index);
    const line = selectedScenario.lines[index];
    await speakGerman(line.audioText, slowAudio ? 0.7 : 0.9);
    setActiveLineIndex(null);
  };

  const handlePlayFullDialogue = async () => {
    if (isPlayingAll) return;
    sound.playClick();
    setIsPlayingAll(true);

    for (let i = 0; i < selectedScenario.lines.length; i++) {
      setActiveLineIndex(i);
      await speakGerman(selectedScenario.lines[i].audioText, slowAudio ? 0.7 : 0.9);
      // Brief pause between lines
      await new Promise(r => setTimeout(r, 600));
    }

    setActiveLineIndex(null);
    setIsPlayingAll(false);
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
          <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'de' ? 'Praxisnahe Sprachausgabe' : 'Conversational Audio Lab'}</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          {lang === 'de' ? 'Auf Deutsch bestellen & sprechen' : 'Order & Speak in German'}
        </h2>
        <p className="font-serif italic text-stone-300 text-sm sm:text-base">
          {lang === 'de' ? 'Lerne authentische Konversationen im Restaurant und beim Bäcker mit nativer Aussprache.' : 'Master authentic German conversations at the restaurant and bakery with native pronunciation.'}
        </p>
      </div>

      {/* Scenario Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-stone-900 border border-stone-800">
        
        {/* Scenario Toggle */}
        <div className="flex gap-2">
          {DIALOGUE_SCENARIOS.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedScenario(sc);
                  setActiveLineIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold scale-105'
                    : 'text-stone-400 hover:text-white bg-stone-950/60 border border-stone-800'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{lang === 'de' ? sc.titleDe : sc.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Play Full Dialogue Button */}
        <button
          onClick={handlePlayFullDialogue}
          disabled={isPlayingAll}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition-all ${
            isPlayingAll
              ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-400/40'
              : 'bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-stone-950 hover:scale-105'
          }`}
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isPlayingAll ? 'animate-spin' : ''}`} />
          <span>{isPlayingAll ? 'Spielt Dialog ab...' : (lang === 'de' ? 'Ganzen Dialog anhören' : 'Play Full Dialogue')}</span>
        </button>
      </div>

      {/* Dialogue Timeline / Chat Stream */}
      <div className="p-6 sm:p-10 rounded-[2.5rem] bg-stone-900 border border-stone-800 shadow-2xl space-y-6 poster-grain">
        
        {/* Location Subtitle */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 text-xs">
          <span className="font-mono text-stone-400 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Ort: <strong>{selectedScenario.location}</strong></span>
          </span>
          <span className="text-stone-500">
            {selectedScenario.lines.length} {lang === 'de' ? 'Gesprächsphasen' : 'dialogue turns'}
          </span>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {selectedScenario.lines.map((line, idx) => {
            const isWaiter = line.speaker === 'waiter';
            const isActive = activeLineIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => handlePlayLine(idx)}
                className={`group p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-4 ${
                  isActive
                    ? 'border-amber-400 bg-amber-400/15 shadow-lg shadow-amber-400/10 ring-2 ring-amber-400'
                    : isWaiter
                    ? 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                    : 'bg-stone-800/60 border-stone-700 hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Speaker Avatar */}
                  <div className={`p-2.5 rounded-2xl shrink-0 ${
                    isWaiter
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {isWaiter ? <Store className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Speech Bubble Content */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                      {lang === 'de' ? line.speakerLabelDe : line.speakerLabelEn}
                    </span>
                    <p className={`text-sm sm:text-base font-semibold leading-relaxed transition-colors ${
                      isActive ? 'text-amber-300' : 'text-white'
                    }`}>
                      „{line.textDe}“
                    </p>
                    <p className="text-xs text-stone-400 italic">
                      {line.textEn}
                    </p>

                    {/* Cultural Tip Pill if present */}
                    {line.tipDe && (
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{line.tipDe}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Speaker Audio Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayLine(idx);
                  }}
                  className={`p-3 rounded-2xl border transition-all shrink-0 self-end sm:self-center ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 border-amber-300 scale-110 shadow-lg'
                      : 'bg-stone-900 border-stone-700 text-stone-400 group-hover:text-amber-400 group-hover:border-amber-400/50'
                  }`}
                  title="Satz anhören"
                >
                  <Volume2 className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* German Restaurant Etiquette Tips */}
        <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Deutsche Restaurant-Knigge (Cultural Etiquette)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
            <p>
              • <strong>Trinkgeld:</strong> In Deutschland sind 5% bis 10% Trinkgeld üblich. Man sagt beim Bezahlen einfach den aufgerundeten Betrag (z.B. „25 Euro bitte!“).
            </p>
            <p>
              • <strong>Getrennt zahlen:</strong> Die Frage „Zusammen oder getrennt?“ ist in Deutschland Standard. Freunde teilen Rechnungen fast immer getrennt („getrennt bitte!“).
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
