export type DeckLevel = 'beginner' | 'intermediate' | 'advanced';
export type DeckCategory = 'vocabulary' | 'grammar' | 'phrases' | 'idioms';
export type DeckSortOption = 'name' | 'date' | 'progress' | 'level';
export type DeckDifficulty = 'easy' | 'medium' | 'hard';

export interface DeckFilters {
  levels: DeckLevel[];
  categories: DeckCategory[];
  searchTerm: string;
  sortBy: DeckSortOption;
  showCompleted: boolean;
}

export interface DeckProgress {
  totalCards: number;
  completedCards: number;
  correctAnswers: number;
  streakDays: number;
  lastStudyDate: string;
  nextReviewDate: string | null;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  example?: string;
  deckId: number;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  level: DeckLevel;
  category: DeckCategory;
  difficulty: DeckDifficulty;
  locked: boolean;
  isFavorite: boolean;
  nextReview: string | null;
  lastPracticed: string;
  progress: DeckProgress;
  achievements: string[];
  tags: string[];
  estimatedTimeMinutes: number;
  cards: Flashcard[];
} 