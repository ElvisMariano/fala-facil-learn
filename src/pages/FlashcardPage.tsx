import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Volume2, RefreshCw, CheckCircle, X, ChevronLeft, ChevronRight, Search, BarChart3, VolumeX, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { playAudio } from "@/utils/audioUtils";
import { toast } from "sonner";
import api from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeckFilters } from '@/components/flashcards/DeckFilters';
import { DeckCard } from '@/components/flashcards/DeckCard';
import { DeckStats } from '@/components/flashcards/DeckStats';
import { LevelProgress } from '@/components/flashcards/LevelProgress';
import { useFlashcardStore } from '@/store/flashcardStore';
import { FlashcardDeck } from '@/types/flashcard.types';

// Types for our flashcard data
interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  level: string;
  progress: number;
  color: string;
  lastPracticed: string;
  nextReview: string;
  availableForReview: boolean;
  locked: boolean;
  category: string;
}

interface Flashcard {
  id: number;
  front: string;
  back: string;
  example: string;
  level: string;
  lastReviewed: string;
  nextReview: string;
  difficulty: string;
}

const FlashcardDecksList = ({ onStartStudy }: { onStartStudy: (deckId: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch flashcard decks from the API
  const { data, isLoading, error } = useQuery({
    queryKey: ['flashcardDecks'],
    queryFn: async () => {
      try {
        const response = await api.get('/flashcards');
        // Processa os decks para definir disponibilidade
        if (response.data?.flashcards) {
          response.data.flashcards = response.data.flashcards.map((deck: FlashcardDeck) => ({
            ...deck,
            // Se não tiver data de próxima revisão ou se a data já passou, está disponível
            availableForReview: !deck.nextReview || new Date(deck.nextReview) <= new Date(),
            // Se não tiver data do último estudo, usa a data atual
            lastPracticed: deck.lastPracticed || new Date().toISOString()
          }));
        }
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar flashcards:', error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
  
  const flashcardDecks = data?.flashcards || [];
  
  // Filter decks based on search term
  const filteredDecks = flashcardDecks.filter((deck: FlashcardDeck) => 
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date for next review
  const formatNextReview = (dateString: string) => {
    if (!dateString) return 'Disponível agora';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format last practiced date
  const formatLastPracticed = (dateString: string) => {
    if (!dateString) return 'Nunca estudado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl py-10">
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">Erro ao carregar flashcards</h3>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar os conjuntos de flashcards. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Memorize novo vocabulário com nosso sistema inteligente de flashcards.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar decks..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.length > 0 ? (
          filteredDecks.map((deck: FlashcardDeck) => (
            <Card key={deck.id} className={`h-full hover:shadow-lg transition-all overflow-hidden flex flex-col ${deck.locked ? 'opacity-70' : ''}`}>
              <div className={`h-3 w-full bg-gradient-to-r ${deck.color}`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{deck.title}</CardTitle>
                  <span className="px-2 py-0.5 bg-muted rounded-full text-xs font-medium">
                    {deck.level}
                  </span>
                </div>
                <CardDescription>{deck.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>{deck.cardCount} cartões</span>
                    <span>{deck.progress}% completado</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${deck.color}`} 
                      style={{ width: `${deck.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Último estudo: {formatLastPracticed(deck.lastPracticed)}
                  </div>
                  
                  {!deck.availableForReview && (
                    <div className="text-xs text-primary font-medium">
                      Próxima revisão: {formatNextReview(deck.nextReview)}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => onStartStudy(deck.id)}
                    disabled={deck.locked || (deck.cardCount === 0)}
                  >
                    {deck.locked ? 'Bloqueado' : 
                     (deck.cardCount === 0 ? 'Sem cartões' : 
                      (!deck.availableForReview ? 'Indisponível' : 'Estudar'))}
                  </Button>
                  <Button variant="outline" className="px-3">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
                
                {deck.locked && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Este deck será desbloqueado quando você alcançar o nível adequado.
                  </p>
                )}
                {!deck.locked && deck.cardCount === 0 && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Este deck ainda não possui cartões para estudo.
                  </p>
                )}
                {!deck.locked && deck.cardCount > 0 && !deck.availableForReview && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Próxima revisão disponível em: {formatNextReview(deck.nextReview)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Nenhum conjunto de flashcards encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FlashcardStudy = ({ onBackToDeck, deckId }: { onBackToDeck: () => void, deckId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Fetch flashcards for the selected deck
  const { data, isLoading, error } = useQuery({
    queryKey: ['flashcards', deckId],
    queryFn: async () => {
      const response = await api.get(`/flashcards/${deckId}/cards`);
      return response.data;
    },
  });

  const flashcards = data?.cards || [];
  const deckInfo = data?.deck || { title: "Vocabulário" };
  
  const queryClient = useQueryClient();

  // Update flashcard progress
  const progressMutation = useMutation({
    mutationFn: async (data: { cardId: number, difficulty: string }) => {
      return api.post(`/flashcards/${deckId}/progress`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || flashcards.length === 0) {
    return (
      <div className="container mx-auto max-w-5xl py-10">
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">Erro ao carregar flashcards</h3>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar os cartões para este deck. Tente novamente mais tarde.
          </p>
          <Button onClick={onBackToDeck}>
            Voltar para Decks
          </Button>
        </div>
      </div>
    );
  }
  
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
    } else if (!isCompleted) {
      // Session complete
      setIsCompleted(true);
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
  
  const markDifficulty = (difficulty: string) => {
    // Update card's difficulty and schedule the next review
    progressMutation.mutate({
      cardId: currentCard.id,
      difficulty
    });
    
    const updatedCompletedCards = [...completedCards];
    if (!updatedCompletedCards.includes(currentCard.id)) {
      updatedCompletedCards.push(currentCard.id);
    }
    setCompletedCards(updatedCompletedCards);
    
    if (currentIndex < flashcards.length - 1) {
      nextCard();
    } else if (updatedCompletedCards.length === flashcards.length) {
      // All cards reviewed
      setIsCompleted(true);
    }
  };

  const handlePlayAudio = async (text: string, slow: boolean = false) => {
    try {
      await playAudio(text, 'en-US', 0.9, slow);
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      toast.error("Erro ao reproduzir áudio. Verifique as configurações do seu navegador.");
    }
  };
  
  // Calculate next review date for completed cards
  const getNextReviewDate = (difficulty: string) => {
    const now = new Date();
    let daysToAdd = 1;
    
    switch (difficulty) {
      case 'easy':
        daysToAdd = 7;
        break;
      case 'medium':
        daysToAdd = 3;
        break;
      case 'hard':
        daysToAdd = 1;
        break;
      default:
        daysToAdd = 1;
    }
    
    now.setDate(now.getDate() + daysToAdd);
    return now.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isCompleted) {
    return (
      <div className="container mx-auto max-w-5xl py-10">
        <Card className="p-8 text-center">
          <CardTitle className="text-2xl font-display mb-6">🎉 Parabéns! Sessão Concluída</CardTitle>
          <CardContent className="space-y-6">
            <p className="text-lg">Você revisou {completedCards.length} cartões nesta sessão!</p>
            
            <div className="p-6 bg-muted/20 rounded-lg">
              <h3 className="font-medium mb-4">Próximas revisões:</h3>
              <div className="space-y-2">
                {flashcards.map((card: Flashcard) => (
                  <div key={card.id} className="flex justify-between items-center p-2 border-b">
                    <span className="font-medium">{card.front}</span>
                    <span>Próxima revisão: {getNextReviewDate(card.difficulty)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={onBackToDeck} className="mt-4">
              Voltar para Decks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="mr-4" onClick={onBackToDeck}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para Decks
        </Button>
        <h1 className="text-2xl font-display font-bold">
          {deckInfo.title}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 items-center mb-10">
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
                rotateY: isFlipped ? 360 : 0,
                scale: isFlipped ? 1.05 : 1
              }}
              exit={{ 
                x: direction * -50, 
                opacity: 0,
                rotateY: isFlipped ? 180 : 0 
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 cursor-pointer preserve-3d"
              onClick={flipCard}
            >
              {/* Card front */}
              <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-white border border-muted ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary mb-4">
                  Nível {deckInfo.level}
                </div>
                <p className="text-4xl font-display font-bold mb-4">{currentCard.front}</p>
                <div className="w-full max-w-xs p-4 rounded-lg bg-black/10 text-center mb-6">
                   
                  <p className="text-sm text-muted-foreground italic">Pronúncia: "{currentCard.example}"</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Clique para virar</p>
                <div className="flex gap-2">
                  <Button 
                    variant="subtle" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentCard.front);
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Ouvir</span>
                  </Button>
                  <Button 
                    variant="subtle" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentCard.front, true);
                    }}
                  >
                    <VolumeX className="h-4 w-4" />
                    <span>Ouvir Lento</span>
                  </Button>
                </div>
              </div>
              
              {/* Card back */}
              <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-primary/5 border border-primary/20 ${isFlipped ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'rotateY(180deg)' }}>
                <div style={{ transform: 'rotateY(180deg)' }} className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-sm font-medium px-5 py-1 rounded-full bg-primary/10 text-primary mb-4">
                  Tradução
                </div>
                  <p className="text-4xl font-display font-bold mb-6">{currentCard.back}</p>
                  <div className="w-full max-w-xs p-4 rounded-lg bg-white text-center mb-6">
                    <p className="text-sm text-muted-foreground italic">"{currentCard.example}"</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="subtle" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(currentCard.front);
                      }}
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>Ouvir</span>
                    </Button>
                    <Button 
                      variant="subtle" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(currentCard.front, true);
                      }}
                    >
                      <VolumeX className="h-4 w-4" />
                      <span>Ouvir Lento</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      
      {/* Flashcard controls */}
      <div className="flex justify-center mb-1 gap-1">
        <Button variant="outline" size="sm" onClick={prevCard} disabled={currentIndex === 0}>
          <ChevronLeft className="h-8 w-12" />
        </Button>
      </div>
      
      {/* Difficulty buttons */}
      <div className="flex justify-center gap-2 mb-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-destructive text-destructive hover:bg-destructive/100"
          onClick={() => markDifficulty('hard')}
        >
          <X className="h-4 w-4 mr-1" /> Difícil
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-primary text-primary hover:bg-primary/100"
          onClick={() => markDifficulty('medium')}
        >
          Médio
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-accent text-accent hover:bg-accent/100"
          onClick={() => markDifficulty('easy')}
        >
          <CheckCircle className="h-4 w-4 mr-1" /> Fácil
        </Button>
      </div>
        {/* Study information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Estudo</CardTitle>
              <CardDescription>
                Cartão {currentIndex + 1} de {flashcards.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(completedCards.length / flashcards.length) * 100}%` }}
                ></div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Como funciona:</h3>
                <p className="text-sm text-muted-foreground">
                  Nosso sistema usa repetição espaçada para otimizar seu aprendizado. 
                  Palavras difíceis aparecerão com mais frequência, e as mais fáceis, menos vezes.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Dica:</h3>
                <p className="text-sm text-muted-foreground">
                  Tente formar uma frase com a palavra atual antes de virar o cartão.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const FlashcardPage: React.FC = () => {
  const [studyMode, setStudyMode] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const { decks, setDecks, calculateLevelProgress, currentLevel, levelProgress } = useFlashcardStore();

  // Fetch decks from API
  const { data: decksData, isLoading } = useQuery({
    queryKey: ['flashcardDecks'],
    queryFn: async () => {
      const response = await api.get('/flashcards');
      // Transform API response to match FlashcardDeck interface
      const transformedDecks = response.data.flashcards.map((deck: any) => ({
        ...deck,
        progress: {
          totalCards: deck.cardCount || 0,
          completedCards: deck.progress || 0,
          correctAnswers: deck.correctAnswers || 0,
          streakDays: deck.streakDays || 0,
          lastStudyDate: deck.lastPracticed || new Date().toISOString(),
          nextReviewDate: deck.nextReview || null
        }
      }));
      return { ...response.data, flashcards: transformedDecks };
    },
  });

  // Update store when decks are loaded
  useEffect(() => {
    if (decksData?.flashcards) {
      setDecks(decksData.flashcards);
    }
  }, [decksData, setDecks]);

  useEffect(() => {
    calculateLevelProgress();
  }, [decks, calculateLevelProgress]);

  const handleStartStudy = (deckId: string) => {
    setSelectedDeckId(deckId);
    setStudyMode(true);
  };

  const handleBackToDeck = () => {
    setStudyMode(false);
    setSelectedDeckId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {studyMode && selectedDeckId ? (
          <FlashcardStudy onBackToDeck={handleBackToDeck} deckId={selectedDeckId} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              <DeckFilters />
              <LevelProgress currentLevel={currentLevel} levelProgress={levelProgress} />
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <DeckStats />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {decks.map(deck => (
                  <DeckCard
                    key={deck.id}
                    deck={deck}
                    onStudy={handleStartStudy}
                  />
                ))}
              </div>
              {decks.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum deck disponível no momento.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FlashcardPage;
