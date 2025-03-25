import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle } from 'lucide-react';
import { DeckLevel } from '@/types/flashcard.types';
import { cn } from '@/lib/utils';

interface LevelProgressProps {
  currentLevel: DeckLevel;
  levelProgress: {
    [key in DeckLevel]: {
      completed: number;
      total: number;
      unlocked: boolean;
    };
  };
}

const levelOrder: DeckLevel[] = ['beginner', 'intermediate', 'advanced'];

export const LevelProgress: React.FC<LevelProgressProps> = ({ currentLevel, levelProgress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progresso por Nível</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {levelOrder.map((level) => {
            const progress = levelProgress[level];
            const isCurrentLevel = level === currentLevel;
            const completion = (progress.completed / progress.total) * 100;
            
            return (
              <div key={level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!progress.unlocked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : completion === 100 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : null}
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrentLevel && "text-primary",
                      !progress.unlocked && "text-muted-foreground"
                    )}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {progress.completed}/{progress.total} decks
                  </span>
                </div>
                
                <Progress 
                  value={completion} 
                  className={cn(
                    "h-2",
                    !progress.unlocked && "opacity-50"
                  )}
                />
                
                {!progress.unlocked && (
                  <p className="text-xs text-muted-foreground">
                    Complete o nível anterior para desbloquear
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}; 