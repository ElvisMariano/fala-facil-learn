import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LevelBadge } from '../ui/level-badge';
import { StatsRow } from '../ui/stats-row';
import { Clock, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlashcardDeck, DeckDifficulty } from '@/types/flashcard.types';

interface DeckCardProps {
  deck: FlashcardDeck;
  onStudy: (deckId: string) => void;
}

const getDifficultyColor = (difficulty: DeckDifficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'hard':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
};

const getButtonLabel = (deck: FlashcardDeck) => {
  if (deck.locked) return 'Bloqueado';
  if (deck.nextReview && new Date(deck.nextReview) > new Date()) {
    return 'Indisponível';
  }
  if (deck.progress.completedCards === 0) return 'Começar';
  return 'Continuar';
};

const getDeckStatusMessage = (deck: FlashcardDeck) => {
  if (deck.locked) {
    return (
      <p className="text-sm text-muted-foreground mt-2">
        Complete o nível anterior para desbloquear
      </p>
    );
  }
  if (deck.nextReview && new Date(deck.nextReview) > new Date()) {
    return (
      <p className="text-sm text-muted-foreground mt-2">
        Disponível em {new Date(deck.nextReview).toLocaleDateString()}
      </p>
    );
  }
  return null;
};

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onStudy }) => {
  const isAvailable = !deck.locked && (!deck.nextReview || new Date(deck.nextReview) <= new Date());
  
  return (
    <Card className={cn(
      "h-full hover:shadow-lg transition-all overflow-hidden flex flex-col",
      deck.locked && "opacity-70",
      !isAvailable && "grayscale"
    )}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-muted">
        <div 
          className={cn(
            "absolute h-full transition-all",
            getDifficultyColor(deck.difficulty)
          )}
          style={{ width: `${(deck.progress.completedCards / deck.progress.totalCards) * 100}%` }}
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{deck.title}</CardTitle>
            <CardDescription>{deck.description}</CardDescription>
          </div>
          <LevelBadge level={deck.level} />
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between">
        {/* Stats */}
        <div className="space-y-4">
          <StatsRow 
            cards={deck.progress.totalCards}
            completed={deck.progress.completedCards}
            accuracy={deck.progress.correctAnswers / deck.progress.completedCards}
            streak={deck.progress.streakDays}
          />
          
          {/* Estimated Time */}
          <div className="text-sm text-muted-foreground">
            <Clock className="inline-block mr-2 h-4 w-4" />
            {deck.estimatedTimeMinutes} min
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            className="flex-1"
            onClick={() => onStudy(deck.id)}
            disabled={!isAvailable}
          >
            {getButtonLabel(deck)}
          </Button>
          <Button variant="outline" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Message */}
        {getDeckStatusMessage(deck)}
      </CardContent>
    </Card>
  );
}; 