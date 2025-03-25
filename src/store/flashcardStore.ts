import { create } from 'zustand';
import { DeckFilters, FlashcardDeck, DeckLevel, DeckSortOption } from '../types/flashcard.types';

type LevelProgress = Record<DeckLevel, {
  completed: number;
  total: number;
  unlocked: boolean;
}>;

interface FlashcardStore {
  decks: FlashcardDeck[];
  filters: DeckFilters;
  currentLevel: DeckLevel;
  levelProgress: LevelProgress;
  setDecks: (decks: FlashcardDeck[]) => void;
  setFilters: (filters: Partial<DeckFilters>) => void;
  sortDecks: (option: DeckSortOption) => void;
  toggleFavorite: (deckId: string) => void;
  calculateLevelProgress: () => void;
  isLevelUnlocked: (level: DeckLevel) => boolean;
}

const LEVEL_REQUIREMENTS = {
  beginner: {
    previousLevel: null,
    requiredCompletion: 0
  },
  intermediate: {
    previousLevel: 'beginner' as DeckLevel,
    requiredCompletion: 70
  },
  advanced: {
    previousLevel: 'intermediate' as DeckLevel,
    requiredCompletion: 80
  }
};

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  decks: [],
  currentLevel: 'beginner',
  levelProgress: {
    beginner: { completed: 0, total: 0, unlocked: true },
    intermediate: { completed: 0, total: 0, unlocked: false },
    advanced: { completed: 0, total: 0, unlocked: false }
  },
  filters: {
    levels: [],
    categories: [],
    searchTerm: '',
    sortBy: 'name',
    showCompleted: true
  },

  setDecks: (newDecks) => {
    set({ decks: newDecks });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },

  sortDecks: (option) => {
    set((state) => ({
      decks: [...state.decks].sort((a, b) => {
        // Implementar lógica de ordenação
        switch (option) {
          case 'progress':
            return b.progress.completedCards - a.progress.completedCards;
          case 'level':
            return a.level.localeCompare(b.level);
          case 'date':
            return new Date(b.lastPracticed).getTime() - new Date(a.lastPracticed).getTime();
          default:
            return a.title.localeCompare(b.title);
        }
      })
    }));
  },

  calculateLevelProgress: () => {
    const { decks } = get();
    const progress: LevelProgress = {
      beginner: { completed: 0, total: 0, unlocked: true },
      intermediate: { completed: 0, total: 0, unlocked: false },
      advanced: { completed: 0, total: 0, unlocked: false }
    };

    // Calcular progresso para cada nível
    decks.forEach((deck) => {
      const level = deck.level;
      progress[level].total++;
      if (deck.progress.completedCards === deck.progress.totalCards) {
        progress[level].completed++;
      }
    });

    // Verificar desbloqueio de níveis
    Object.entries(LEVEL_REQUIREMENTS).forEach(([level, requirements]) => {
      const levelKey = level as DeckLevel;
      if (requirements.previousLevel === null) {
        progress[levelKey].unlocked = true;
      } else {
        const previousLevelProgress = progress[requirements.previousLevel];
        const completionPercentage = previousLevelProgress.total > 0
          ? (previousLevelProgress.completed / previousLevelProgress.total) * 100
          : 0;
        progress[levelKey].unlocked = completionPercentage >= requirements.requiredCompletion;
      }
    });

    set({ levelProgress: progress });
  },

  isLevelUnlocked: (level: DeckLevel) => {
    return get().levelProgress[level].unlocked;
  },

  toggleFavorite: (deckId: string) => {
    set((state) => ({
      decks: state.decks.map(deck => 
        deck.id === deckId 
          ? { ...deck, isFavorite: !deck.isFavorite }
          : deck
      )
    }));
  }
})); 