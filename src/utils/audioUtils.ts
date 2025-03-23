
/**
 * Reproduz texto usando a Web Speech API para pronúncia
 * @param text Texto para ser reproduzido
 * @param lang Idioma do texto (padrão: inglês)
 * @param rate Velocidade da fala (padrão: 0.9)
 * @param slow Se verdadeiro, insere vírgulas entre palavras para fala mais lenta
 * @returns Promise que resolve quando o áudio terminar de tocar
 */
export const playAudio = (text: string, lang: string = 'en-US', rate: number = 0.9, slow: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      // Cancelar qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      // Se for modo lento, adiciona vírgulas entre palavras
      const processedText = slow ? text.split(' ').join(', ') : text;
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.lang = lang;
      utterance.rate = slow ? rate * 0.7 : rate; // Reduz ainda mais a velocidade no modo lento
      
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
 * @param slow Se verdadeiro, insere vírgulas entre palavras para fala mais lenta
 * @returns Promise que resolve quando o áudio terminar de tocar
 */
export const playAudioWithVoice = (text: string, voiceName: string, rate: number = 0.9, slow: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      // Cancelar qualquer fala em andamento
      window.speechSynthesis.cancel();
      
      // Se for modo lento, adiciona vírgulas entre palavras
      const processedText = slow ? text.split(' ').join(', ') : text;
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = slow ? rate * 0.7 : rate; // Reduz ainda mais a velocidade no modo lento
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Erro na síntese de fala: ${event.error}`));
      
      window.speechSynthesis.speak(utterance);
    } else {
      reject(new Error('A API Web Speech não é suportada neste navegador.'));
    }
  });
};
