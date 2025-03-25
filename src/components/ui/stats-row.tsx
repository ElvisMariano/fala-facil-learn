import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Flame } from 'lucide-react';

interface StatsRowProps {
  cards: number;
  completed: number;
  accuracy: number;
  streak: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  cards,
  completed,
  accuracy,
  streak
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-sm">
        <div className="font-medium">{completed}/{cards}</div>
        <div className="text-muted-foreground">Cartões</div>
      </div>
      <div className="text-sm">
        <div className="font-medium">{Math.round(accuracy * 100)}%</div>
        <div className="text-muted-foreground">Precisão</div>
      </div>
      <div className="text-sm flex items-center gap-1">
        <Flame className="h-4 w-4 text-orange-500" />
        <div>
          <span className="font-medium">{streak}</span>
          <span className="text-muted-foreground ml-1">dias</span>
        </div>
      </div>
    </div>
  );
}; 