
import { Button } from "@/components/ui/custom/Button";
import { useState, useEffect } from "react";
import { Volume2, RefreshCw, ArrowLeft, ArrowRight, Check, X, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playAudio } from "@/utils/audioUtils";

// Sample flashcard data
const flashcards = [
  {
    id: 1,
    front: "Hello",
    back: "Olá",
    example: "Hello, how are you today?",
    level: "A1",
  },
  {
    id: 2,
    front: "Goodbye",
    back: "Adeus",
    example: "Goodbye, see you tomorrow!",
    level: "A1",
  },
  {
    id: 3,
    front: "Thank you",
    back: "Obrigado/Obrigada",
    example: "Thank you for your help!",
    level: "A1",
  },
  {
    id: 4,
    front: "Please",
    back: "Por favor",
    example: "Please, can you help me?",
    level: "A1",
  },
];

const FlashcardDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [exiting, setExiting] = useState(false);
  
  const currentCard = flashcards[currentIndex];
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      setExiting(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setExiting(false);
      }, 300);
    }
  };
  
  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setExiting(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsFlipped(false);
        setExiting(false);
      }, 300);
    }
  };

  const handlePlayAudio = async (text: string, slow: boolean = false) => {
    try {
      await playAudio(text, 'en-US', 0.9, slow);
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    }
  };
  
  // Auto-flip demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFlipped) {
        setIsFlipped(true);
        
        setTimeout(() => {
          if (currentIndex < flashcards.length - 1) {
            setDirection(1);
            setExiting(true);
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % flashcards.length);
              setIsFlipped(false);
              setExiting(false);
            }, 300);
          } else {
            setDirection(-1);
            setExiting(true);
            setTimeout(() => {
              setCurrentIndex(0);
              setIsFlipped(false);
              setExiting(false);
            }, 300);
          }
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isFlipped]);
  
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-edge">
            Sistema de Flashcards
          </h2>
          <p className="text-muted-foreground">
            Domine o vocabulário com nosso sistema inteligente de flashcards usando repetição espaçada para memorização ideal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Flashcard display */}
          <div className="relative h-[400px] perspective">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ 
                  x: direction * 50, 
                  opacity: 0, 
                  rotateY: isFlipped ? 180 : 0 
                }}
                animate={{ 
                  x: 0, 
                  opacity: 1, 
                  rotateY: isFlipped ? 180 : 0 
                }}
                exit={{ 
                  x: direction * -50, 
                  opacity: 0,
                  rotateY: isFlipped ? 180 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 cursor-pointer preserve-3d"
                onClick={flipCard}
              >
                {/* Card front */}
                <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-white border border-muted ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary mb-4">
                    Nível {currentCard.level}
                  </div>
                  <p className="text-4xl font-display font-bold mb-4">{currentCard.front}</p>
                  <p className="text-sm text-muted-foreground mb-6">Clique para virar</p>
                  <div className="flex gap-2">
                    <Button variant="subtle" size="sm" className="flex items-center gap-2" onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentCard.front);
                    }}>
                      <Volume2 className="h-4 w-4" />
                      <span>Ouvir</span>
                    </Button>
                    <Button variant="subtle" size="sm" className="flex items-center gap-2" onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentCard.front, true);
                    }}>
                      <VolumeX className="h-4 w-4" />
                      <span>Ouvir Lento</span>
                    </Button>
                  </div>
                </div>
                
                {/* Card back */}
                <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-primary/5 border border-primary/20 ${isFlipped ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'rotateY(180deg)' }}>
                  <div className="flex flex-col items-center justify-center w-full h-full transform-style-3d">
                    <p className="text-4xl font-display font-bold mb-6">{currentCard.back}</p>
                    <div className="w-full max-w-xs p-4 rounded-lg bg-white text-center mb-6">
                      <p className="text-sm text-muted-foreground italic">"{currentCard.example}"</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="subtle" size="sm" className="flex items-center gap-2" onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(currentCard.example);
                      }}>
                        <Volume2 className="h-4 w-4" />
                        <span>Ouvir</span>
                      </Button>
                      <Button variant="subtle" size="sm" className="flex items-center gap-2" onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(currentCard.example, true);
                      }}>
                        <VolumeX className="h-4 w-4" />
                        <span>Ouvir Lento</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Flashcard description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold">Otimize Seu Aprendizado</h3>
            <p className="text-muted-foreground">
              Nosso sistema de flashcards usa tecnologia de repetição espaçada para maximizar sua retenção de memória. Palavras que você acha difíceis aparecerão com mais frequência, enquanto aquelas que você conhece bem aparecerão com menos frequência.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/10 text-accent flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Algoritmo Inteligente</p>
                  <p className="text-sm text-muted-foreground">Cartões se adaptam ao seu progresso de aprendizado</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/10 text-accent flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Pronúncia em Áudio</p>
                  <p className="text-sm text-muted-foreground">Ouça a pronúncia nativa para cada palavra</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/10 text-accent flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Exemplos em Frases</p>
                  <p className="text-sm text-muted-foreground">Aprenda palavras em contexto para melhor retenção</p>
                </div>
              </li>
            </ul>
            
            <div className="pt-4">
              <Button>Começar a Praticar</Button>
            </div>
          </div>
        </div>
        
        {/* Flashcard controls */}
        <div className="flex justify-center mt-8 gap-4">
          <Button variant="outline" size="sm" onClick={prevCard} disabled={currentIndex === 0}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={flipCard}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Difficulty buttons */}
        <div className="flex justify-center mt-4 gap-4">
          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
            <X className="h-4 w-4 mr-1" /> Difícil
          </Button>
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
            Médio
          </Button>
          <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
            <Check className="h-4 w-4 mr-1" /> Fácil
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlashcardDemo;
