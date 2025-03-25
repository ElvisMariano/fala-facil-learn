import React from 'react';
import { cn } from '@/lib/utils';
import { DeckLevel } from '@/types/flashcard.types';

interface LevelBadgeProps {
  level: DeckLevel;
  className?: string;
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800'
};

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, className }) => {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        levelColors[level],
        className
      )}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}; 