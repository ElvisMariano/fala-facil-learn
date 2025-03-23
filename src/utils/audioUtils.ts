
/**
 * Reproduz texto usando a Web Speech API para pronúncia
 * @param text Texto para ser reproduzido
 * @param lang Idioma do texto (padrão: inglês)
 * @param rate Velocidade da fala (padrão: 0.9)
 * @returns Promise que resolve quando o áudio terminar de tocar
 */
export const playAudio = (text: string, lang: string = 'en-US', rate: number = 0.9): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      // Cancelar qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Erro na síntese de fala: ${event.error}`));
      
      window.speechSynthesis.speak(utterance);
    } else {
      reject(new Error('A API Web Speech não é suportada neste navegador.'));
    }
  });
};

/**
 * Obtém todas as vozes disponíveis para síntese de fala
 * @returns Array de objetos SpeechSynthesisVoice
 */
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
};

/**
 * Reproduz texto usando uma voz específica
 * @param text Texto para ser reproduzido
 * @param voiceName Nome da voz a ser usada (se disponível)
 * @param rate Velocidade da fala (padrão: 0.9)
 * @returns Promise que resolve quando o áudio terminar de tocar
 */
export const playAudioWithVoice = (text: string, voiceName: string, rate: number = 0.9): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      // Cancelar qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = rate;
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Erro na síntese de fala: ${event.error}`));
      
      window.speechSynthesis.speak(utterance);
    } else {
      reject(new Error('A API Web Speech não é suportada neste navegador.'));
    }
  });
};
