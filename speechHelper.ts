// Speech synthesis helper for Spanish pronunciation

class SpeechHelper {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private spanishVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Prefer native Spanish voices
    this.spanishVoice =
      voices.find(v => v.lang.startsWith('es-ES') || v.lang.startsWith('es_ES')) ||
      voices.find(v => v.lang.startsWith('es')) ||
      null;
    this.voicesLoaded = true;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(
    text: string,
    rate: number = 0.9,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!this.isSupported()) return;

    window.speechSynthesis.cancel();

    // Clean text of emojis and special markdown-like artifacts
    const cleanText = text
      .replace(/[🇪🇸🇦🇲👩🏫👦]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = rate;

    if (this.spanishVoice) {
      utterance.voice = this.spanishVoice;
    }

    if (onStart) utterance.onstart = onStart;
    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechHelper();
