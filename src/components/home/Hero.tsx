
import { Button } from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MousePointerClick, ArrowRight } from "lucide-react";

const phrases = [
  "Fale inglês com fluência",
  "Aprenda no seu próprio ritmo",
  "Pratique com confiança",
  "Domine novo vocabulário",
  "Melhore sua pronúncia",
];

const Hero = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  
  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      }
    }
  }, [currentPhraseIndex, displayText, isTyping]);
  
  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 animate-float -z-10" />
      <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-secondary/5 animate-float animation-delay-1000 -z-10" />
      
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <MousePointerClick className="h-3 w-3 mr-1" />
                Aprendizado Interativo de Idiomas
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-edge mb-4">
                Aprenda inglês de <br />
                <span className="text-primary">Forma Fácil</span>
              </h1>
              <div className="h-12 flex items-center">
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
                  <span className="inline-block">{displayText}</span>
                  <span className={cn(
                    "inline-block w-[2px] h-5 bg-primary ml-0.5",
                    isTyping && displayText.length < phrases[currentPhraseIndex].length ? "animate-pulse" : "opacity-0"
                  )} />
                </h2>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-xl">
              Nossa plataforma interativa combina metodologias eficazes de aprendizado com tecnologia moderna para ajudar você a aprender inglês com confiança e facilidade.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                Começar a Aprender
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Explorar Lições
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-muted ring-2 ring-background" />
                ))}
              </div>
              <p>
                <span className="font-medium text-foreground">10.000+</span> alunos já aprendendo
              </p>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative lg:h-[500px] animate-slide-up animation-delay-300">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 -z-10 transform rotate-2" />
            <div className="glass rounded-xl px-6 py-8 shadow-lg transform -rotate-2">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-medium">Sequência Diária</h3>
                  <p className="text-muted-foreground text-sm">Continue aprendendo para manter sua sequência</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  7
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Saudações Básicas</p>
                      <p className="text-xs text-muted-foreground">10 minutos</p>
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Frases Comuns</p>
                      <p className="text-xs text-muted-foreground">15 minutos</p>
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-muted" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Perguntas Simples</p>
                      <p className="text-xs text-muted-foreground">12 minutos</p>
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-muted" />
                </div>
              </div>
              
              <Button variant="subtle" width="full">
                Continuar Aprendendo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
