// Web Speech API helper for German pronunciation

let deVoice: SpeechSynthesisVoice | null = null;

export const initGermanVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const updateVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Look for German voice
    deVoice = voices.find(v => v.lang.startsWith('de')) || null;
  };

  updateVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoice;
  }
};

export const speakGerman = (text: string, rate: number = 0.9): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const cleanText = text.replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'de-DE';
      utterance.rate = rate; // Slightly slower for language learners
      utterance.pitch = 1.0;

      if (!deVoice) {
        const voices = window.speechSynthesis.getVoices();
        deVoice = voices.find(v => v.lang.startsWith('de')) || null;
      }

      if (deVoice) {
        utterance.voice = deVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      resolve();
    }
  });
};
