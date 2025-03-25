import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, Brain } from 'lucide-react';
import { FlashcardDeck } from '@/types/flashcard.types';
import { cn } from '@/lib/utils';
import { useFlashcardStore } from '@/store/flashcardStore';

interface DeckStatsProps {
  deck?: FlashcardDeck;
}

export const DeckStats: React.FC<DeckStatsProps> = ({ deck: propDeck }) => {
  const { decks } = useFlashcardStore();
  
  // Se não receber um deck específico, usa o primeiro deck disponível
  const deck = propDeck || decks[0];

  // Se não houver deck disponível, mostra mensagem
  if (!deck) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            Nenhum deck disponível para mostrar estatísticas
          </p>
        </CardContent>
      </Card>
    );
  }

  // Validação adicional para garantir que progress existe
  if (!deck.progress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            Estatísticas não disponíveis para este deck
          </p>
        </CardContent>
      </Card>
    );
  }

  const accuracy = deck.progress.correctAnswers / deck.progress.completedCards * 100 || 0;
  const completion = (deck.progress.completedCards / deck.progress.totalCards) * 100;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Progresso</span>
            </div>
            <Progress value={completion} className="h-2" />
            <p className="text-xs text-muted-foreground">{completion.toFixed(1)}% completo</p>
          </div>

          {/* Precisão */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Precisão</span>
            </div>
            <Progress value={accuracy} className="h-2" />
            <p className="text-xs text-muted-foreground">{accuracy.toFixed(1)}% de acertos</p>
          </div>

          {/* Streak */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold">{deck.progress.streakDays}</p>
            <p className="text-xs text-muted-foreground">dias seguidos</p>
          </div>

          {/* Tempo Estimado */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Tempo</span>
            </div>
            <p className="text-2xl font-bold">{deck.estimatedTimeMinutes}</p>
            <p className="text-xs text-muted-foreground">minutos restantes</p>
          </div>
        </div>

        {/* Conquistas */}
        {deck.achievements?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Conquistas</h4>
            <div className="flex flex-wrap gap-2">
              {deck.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    "bg-primary/10 text-primary",
                    "flex items-center gap-1"
                  )}
                >
                  <Trophy className="h-3 w-3" />
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 