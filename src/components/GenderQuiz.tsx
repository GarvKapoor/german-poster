import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Trophy, Flame, Sparkles, RefreshCw, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Article } from '../data/foodData';
import { speakGerman } from '../utils/speech';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface QuizWord {
  word: string;
  article: Article;
  english: string;
  emoji: string;
  ruleExplanation?: string;
}

const QUIZ_ITEMS: QuizWord[] = [
  { word: 'Brötchen', article: 'das', english: 'bread roll', emoji: '🥖', ruleExplanation: 'Endungen auf "-chen" sind immer neutral (DAS)!' },
  { word: 'Kaffee', article: 'der', english: 'coffee', emoji: '☕', ruleExplanation: 'Die meisten Heiß- und Wachmachergetränke sind maskulin (DER Kaffee, DER Tee).' },
  { word: 'Bratwurst', article: 'die', english: 'grilled sausage', emoji: '🌭', ruleExplanation: 'Zusammengesetzte Nomen richten sich nach dem letzten Wort: DIE Wurst → DIE Bratwurst!' },
  { word: 'Schnitzel', article: 'das', english: 'schnitzel', emoji: '🥩', ruleExplanation: 'Das Schnitzel ist sächlich (DAS Schnitzel).' },
  { word: 'Käsespätzle', article: 'die', english: 'cheese noodles (plural)', emoji: '🧀', ruleExplanation: 'Spätzle steht im Deutschen meistens im Plural: DIE Spätzle.' },
  { word: 'Brezel', article: 'die', english: 'pretzel', emoji: '🥨', ruleExplanation: 'Traditionell feminin: DIE Brezel (oder in Bayern "die Brezn").' },
  { word: 'Apfelstrudel', article: 'der', english: 'apple strudel', emoji: '🥧', ruleExplanation: 'Bestimmt durch das Grundwort: DER Strudel → DER Apfelstrudel.' },
  { word: 'Bier', article: 'das', english: 'beer', emoji: '🍺', ruleExplanation: 'Das Bier ist sächlich (DAS Bier).' },
  { word: 'Marmelade', article: 'die', english: 'jam', emoji: '🍓', ruleExplanation: 'Wörter mit der Endung "-ade" sind feminin: DIE Marmelade, DIE Limonade.' },
  { word: 'Käse', article: 'der', english: 'cheese', emoji: '🧀', ruleExplanation: 'Der Käse ist maskulin (DER Käse).' },
  { word: 'Apfelschorle', article: 'die', english: 'apple spritzer', emoji: '🍏', ruleExplanation: 'Bestimmt durch: DIE Schorle → DIE Apfelschorle.' },
  { word: 'Sauerbraten', article: 'der', english: 'pot roast', emoji: '🍲', ruleExplanation: 'Bestimmt durch: DER Braten → DER Sauerbraten.' },
  { word: 'Müsli', article: 'das', english: 'muesli', emoji: '🥣', ruleExplanation: 'Endung auf Schweizer Verkleinerung "-li" ist neutral: DAS Müsli.' },
  { word: 'Currywurst', article: 'die', english: 'currywurst', emoji: '🍛', ruleExplanation: 'Wieder wegen DIE Wurst → DIE Currywurst!' },
  { word: 'Schwarzwälder Kirschtorte', article: 'die', english: 'Black Forest cake', emoji: '🍰', ruleExplanation: 'Wegen DIE Torte → DIE Schwarzwälder Kirschtorte.' },
  { word: 'Spiegelei', article: 'das', english: 'fried egg', emoji: '🍳', ruleExplanation: 'Bestimmt durch: DAS Ei → DAS Spiegelei.' }
];

export const GenderQuiz: React.FC<{ lang: 'de' | 'en'; slowAudio: boolean }> = ({ lang, slowAudio }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [lastSelected, setLastSelected] = useState<Article | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentItem = QUIZ_ITEMS[currentIndex % QUIZ_ITEMS.length];

  const handleAnswer = async (selectedArticle: Article) => {
    if (feedback !== null) return;

    setLastSelected(selectedArticle);
    const isCorrect = selectedArticle === currentItem.article;

    if (isCorrect) {
      sound.playSuccess();
      setFeedback('correct');
      const newStreak = streak + 1;
      setScore(s => s + 10 * (newStreak > 1 ? newStreak : 1));
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);

      if (newStreak % 5 === 0) {
        try {
          sound.playFanfare();
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // fallback
        }
      }
    } else {
      sound.playError();
      setFeedback('wrong');
      setStreak(0);
    }

    await speakGerman(`${currentItem.article} ${currentItem.word}`, slowAudio ? 0.7 : 0.9);

    setTimeout(() => {
      setFeedback(null);
      setLastSelected(null);
      if (currentIndex + 1 >= QUIZ_ITEMS.length) {
        setGameOver(true);
      } else {
        setCurrentIndex(i => i + 1);
      }
    }, 1300);
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setLastSelected(null);
    setGameOver(false);
  };

  return (
    <section id="spiel" className="w-full py-16 px-4 sm:px-8 xl:px-12 2xl:px-16 border-b border-stone-800 bg-stone-900/30 relative overflow-hidden">
      
      {/* Quiz Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center space-y-2 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'de' ? 'Grammatik-Duell' : 'Grammar Duel Arena'}</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Der, Die oder Das?
        </h2>
        <p className="font-serif italic text-stone-300 text-base sm:text-lg">
          {lang === 'de' ? 'Teste dein Wissen über das grammatikalische Geschlecht deutscher Lebensmittel!' : 'Test your knowledge on the grammatical gender of iconic German foods!'}
        </p>
      </motion.div>

      {/* Score & Streak Bar */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 p-4 rounded-3xl bg-stone-900 border border-stone-800 text-center shadow-2xl mb-8">
        <div>
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center justify-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Punkte</span>
          </span>
          <span className="font-display font-black text-xl sm:text-2xl text-amber-400">{score}</span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Serie (Streak)</span>
          </span>
          <span className="font-display font-black text-xl sm:text-2xl text-red-400">
            {streak > 0 ? `${streak}x 🔥` : '0'}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Frage</span>
          <span className="font-display font-black text-xl sm:text-2xl text-stone-200">
            {Math.min(currentIndex + 1, QUIZ_ITEMS.length)} / {QUIZ_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Main Flashcard Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {!gameOver ? (
          <div className="relative p-8 sm:p-12 rounded-[2.8rem] bg-stone-900 border-2 border-stone-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 poster-grain">
            
            {/* Card Emoji & Word */}
            <div className="space-y-3">
              <span className="text-7xl sm:text-8xl block select-none animate-float">
                {currentItem.emoji}
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block mb-1">
                  {lang === 'de' ? 'Welcher Artikel gehört dazu?' : 'Which article belongs here?'}
                </span>
                <h3 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
                  {feedback ? `${currentItem.article.toUpperCase()} ` : ''}{currentItem.word}
                </h3>
                <p className="text-stone-400 text-sm sm:text-base italic mt-1">
                  ({currentItem.english})
                </p>
              </div>
            </div>

            {/* Answer Buttons (Der / Die / Das) */}
            <div className="w-full max-w-md grid grid-cols-3 gap-3 sm:gap-4 pt-4">
              
              {/* DER Button (Blue) */}
              <button
                onClick={() => handleAnswer('der')}
                disabled={feedback !== null}
                className={`py-5 px-3 rounded-2xl font-black text-xl sm:text-2xl tracking-wider transition-all shadow-xl ${
                  feedback && currentItem.article === 'der'
                    ? 'bg-blue-600 text-white ring-4 ring-blue-400 scale-105'
                    : feedback && lastSelected === 'der'
                    ? 'bg-red-900 text-white'
                    : 'bg-blue-600/90 hover:bg-blue-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                DER
              </button>

              {/* DIE Button (Red) */}
              <button
                onClick={() => handleAnswer('die')}
                disabled={feedback !== null}
                className={`py-5 px-3 rounded-2xl font-black text-xl sm:text-2xl tracking-wider transition-all shadow-xl ${
                  feedback && currentItem.article === 'die'
                    ? 'bg-red-600 text-white ring-4 ring-red-400 scale-105'
                    : feedback && lastSelected === 'die'
                    ? 'bg-red-900 text-white'
                    : 'bg-red-600/90 hover:bg-red-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                DIE
              </button>

              {/* DAS Button (Green) */}
              <button
                onClick={() => handleAnswer('das')}
                disabled={feedback !== null}
                className={`py-5 px-3 rounded-2xl font-black text-xl sm:text-2xl tracking-wider transition-all shadow-xl ${
                  feedback && currentItem.article === 'das'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-400 scale-105'
                    : feedback && lastSelected === 'das'
                    ? 'bg-red-900 text-white'
                    : 'bg-emerald-600/90 hover:bg-emerald-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                DAS
              </button>

            </div>

            {/* Feedback Display */}
            {feedback && (
              <div className={`w-full max-w-md p-4 rounded-2xl border text-sm font-medium animate-fadeIn ${
                feedback === 'correct'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border-red-500 text-red-200'
              }`}>
                <div className="flex items-center justify-center gap-2 font-bold mb-1">
                  {feedback === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Richtig! Ausgezeichnet!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span>Leider falsch! Es heißt: {currentItem.article.toUpperCase()} {currentItem.word}</span>
                    </>
                  )}
                </div>
                {currentItem.ruleExplanation && (
                  <p className="text-xs text-stone-300 italic mt-1">
                    💡 {currentItem.ruleExplanation}
                  </p>
                )}
              </div>
            )}

            {/* Rule Info Helper */}
            <div className="pt-2 text-stone-400 text-xs flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Klicke auf den passenden Artikel, um sofort die Sprachausgabe zu hören.</span>
            </div>

          </div>
        ) : (
          /* Game Over Celebratory Summary */
          <div className="p-8 sm:p-12 rounded-[2.8rem] bg-stone-900 border-2 border-amber-400/50 text-center space-y-6 shadow-2xl">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
              Wunderbar gemeistert!
            </h3>
            <p className="text-stone-300 max-w-md mx-auto text-sm">
              Du hast alle {QUIZ_ITEMS.length} deutschen Lebensmittel erfolgreich geübt und stolze <strong className="text-amber-400">{score} Punkte</strong> erzielt!
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Noch einmal spielen</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>

    </section>
  );
};
