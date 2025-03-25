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
      // Verificar se há síntese em andamento
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        // Aguardar um pequeno intervalo para garantir que a síntese anterior foi cancelada
        setTimeout(() => {
          startSpeech();
        }, 20);
      } else {
        startSpeech();
      }

      function startSpeech() {
        // Se for modo lento, adiciona vírgulas entre palavras
        const processedText = slow ? text.split(' ').join(', ') : text;
        
        const utterance = new SpeechSynthesisUtterance(processedText);
        utterance.lang = lang;
        utterance.rate = slow ? rate * 0.7 : rate; // Reduz ainda mais a velocidade no modo lento
        utterance.volume = 1.0; // Garantir que o volume esteja no máximo
        
        // Carregar vozes antes de configurar
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            // Tentar encontrar uma voz para o idioma especificado
            const voiceForLang = voices.find(voice => voice.lang.includes(lang.substring(0, 2)));
            if (voiceForLang) {
              utterance.voice = voiceForLang;
            }
            
            utterance.onend = () => resolve();
            utterance.onerror = (event) => {
              if (event.error === 'interrupted') {
                // Se foi interrompido, tentar novamente após um breve intervalo
                setTimeout(() => {
                  window.speechSynthesis.speak(utterance);
                }, 20);
              } else {
                console.error(`Erro na síntese de fala: ${event.error}`);
                reject(new Error(`Erro na síntese de fala: ${event.error}`));
              }
            };
            
            window.speechSynthesis.speak(utterance);
          } else {
            // Se ainda não há vozes disponíveis, tentar novamente após um pequeno intervalo
            setTimeout(loadVoices, 20);
          }
        };
        
        if (window.speechSynthesis.getVoices().length > 0) {
          loadVoices();
        } else {
          // Em alguns navegadores, as vozes podem não estar disponíveis imediatamente
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
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
    // Em alguns navegadores, getVoices() pode retornar um array vazio se chamado muito cedo
    // Por isso, usamos um timeout para garantir que as vozes sejam carregadas
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Se não houver vozes, tentar novamente
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }
    return voices;
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
      // Verificar se há síntese em andamento
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        // Aguardar um pequeno intervalo para garantir que a síntese anterior foi cancelada
        setTimeout(() => {
          startSpeech();
        }, 50);
      } else {
        startSpeech();
      }

      function startSpeech() {
        // Se for modo lento, adiciona vírgulas entre palavras
        const processedText = slow ? text.split(' ').join(', ') : text;
        
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            const utterance = new SpeechSynthesisUtterance(processedText);
            const voice = voices.find(v => v.name === voiceName);
            
            if (voice) {
              utterance.voice = voice;
            }
            
            utterance.rate = slow ? rate * 0.7 : rate; // Reduz ainda mais a velocidade no modo lento
            utterance.volume = 1.0; // Garantir volume máximo
            
            utterance.onend = () => resolve();
            utterance.onerror = (event) => {
              if (event.error === 'interrupted') {
                // Se foi interrompido, tentar novamente após um breve intervalo
                setTimeout(() => {
                  window.speechSynthesis.speak(utterance);
                }, 50);
              } else {
                console.error(`Erro na síntese de fala: ${event.error}`);
                reject(new Error(`Erro na síntese de fala: ${event.error}`));
              }
            };
            
            window.speechSynthesis.speak(utterance);
          } else {
            setTimeout(loadVoices, 50);
          }
        };
        
        if (window.speechSynthesis.getVoices().length > 0) {
          loadVoices();
        } else {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    } else {
      reject(new Error('A API Web Speech não é suportada neste navegador.'));
    }
  });
};
