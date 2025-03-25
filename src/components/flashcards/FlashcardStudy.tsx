import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { Card } from '@/components/ui/custom/Card';
import { useFlashcardStore } from '@/store/flashcardStore';
import { FlashcardDeck } from '@/types/flashcard.types';
import { Volume2, RefreshCw, CheckCircle, X, ChevronLeft } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface FlashcardStudyProps {
  deck: FlashcardDeck;
  onBack: () => void;
}

export function FlashcardStudy({ deck, onBack }: FlashcardStudyProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { updateDeckProgress } = useFlashcardStore();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get(`/flashcards/${deck.id}/cards`);
        setCards(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar cards:', error);
        toast.error('Erro ao carregar os cards do deck');
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [deck.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficulty = async (difficulty: string) => {
    if (!cards[currentCardIndex]) return;

    try {
      const response = await api.post(`/flashcards/${deck.id}/progress`, {
        cardId: cards[currentCardIndex].id,
        difficulty
      });

      // Atualizar o progresso no store
      updateDeckProgress(deck.id, response.data);

      // Avançar para o próximo card
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      } else {
        // Finalizar estudo
        toast.success('Parabéns! Você completou este deck!');
        onBack();
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      toast.error('Erro ao salvar seu progresso');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Este deck ainda não possui cards.</p>
        <Button onClick={onBack} className="mt-4">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="text-sm text-muted-foreground">
            Card {currentCardIndex + 1} de {cards.length}
          </div>
        </div>

        <Card className="relative w-full aspect-[4/3] cursor-pointer" onClick={handleFlip}>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-xl font-medium">
              {isFlipped ? currentCard.back : currentCard.front}
            </div>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={(e) => {
              e.stopPropagation();
              // TODO: Implementar TTS
            }}>
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg" onClick={() => handleDifficulty('hard')}>
            <X className="w-4 h-4 mr-2" />
            Difícil
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleDifficulty('medium')}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Revisar
          </Button>
          <Button variant="default" size="lg" onClick={() => handleDifficulty('easy')}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Fácil
          </Button>
        </div>
      </div>
    </div>
  );
} 