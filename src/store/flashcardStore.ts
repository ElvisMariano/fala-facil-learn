import { create } from 'zustand';
import { DeckFilters, FlashcardDeck, DeckLevel, DeckSortOption } from '../types/flashcard.types';
import { flashcardService } from '../services/flashcard.service';

type LevelProgress = Record<DeckLevel, {
  completed: number;
  total: number;
  unlocked: boolean;
}>;

interface FlashcardProgress {
  userId: string;
  deckId: number;
  cardId: number;
  difficulty: string;
  lastStudiedAt: Date;
  studyCount: number;
}

interface FlashcardStore {
  decks: FlashcardDeck[];
  filters: DeckFilters;
  currentLevel: DeckLevel;
  levelProgress: LevelProgress;
  deckProgress: Record<string, FlashcardProgress[]>;
  setDecks: (decks: FlashcardDeck[]) => void;
  setFilters: (filters: Partial<DeckFilters>) => void;
  filteredDecks: () => FlashcardDeck[];
  sortDecks: (option: DeckSortOption) => void;
  toggleFavorite: (deckId: string) => void;
  calculateLevelProgress: () => void;
  isLevelUnlocked: (level: DeckLevel) => boolean;
  updateProgress: (deckId: string, cardId: string, difficulty: string) => Promise<void>;
  loadDeckProgress: (deckId: string) => Promise<void>;
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
  deckProgress: {},
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

  filteredDecks: () => {
    const { decks, filters } = get();
    
    return decks
      .filter(deck => {
        // Filtrar por nível
        if (filters.levels.length > 0 && !filters.levels.includes(deck.level)) {
          return false;
        }

        // Filtrar por categoria
        if (filters.categories.length > 0 && !filters.categories.includes(deck.category)) {
          return false;
        }

        // Filtrar por termo de busca
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          const matchesTitle = deck.title.toLowerCase().includes(searchLower);
          const matchesDescription = deck.description.toLowerCase().includes(searchLower);
          if (!matchesTitle && !matchesDescription) {
            return false;
          }
        }

        // Filtrar decks completos
        if (!filters.showCompleted && deck.progress.completedCards === deck.progress.totalCards) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'progress':
            return (b.progress.completedCards / b.progress.totalCards) - 
                   (a.progress.completedCards / a.progress.totalCards);
          case 'level': {
            const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
            return levelOrder[a.level] - levelOrder[b.level];
          }
          case 'date':
            return new Date(b.lastPracticed).getTime() - new Date(a.lastPracticed).getTime();
          default:
            return a.title.localeCompare(b.title);
        }
      });
  },

  sortDecks: (option) => {
    set((state) => ({
      filters: { ...state.filters, sortBy: option }
    }));
  },

  toggleFavorite: (deckId) => {
    set((state) => ({
      decks: state.decks.map(deck => 
        deck.id === deckId 
          ? { ...deck, isFavorite: !deck.isFavorite }
          : deck
      )
    }));
  },

  calculateLevelProgress: () => {
    const { decks } = get();
    const newLevelProgress: LevelProgress = {
      beginner: { completed: 0, total: 0, unlocked: true },
      intermediate: { completed: 0, total: 0, unlocked: false },
      advanced: { completed: 0, total: 0, unlocked: false }
    };

    // Calcular progresso para cada nível
    decks.forEach(deck => {
      const levelStats = newLevelProgress[deck.level];
      if (levelStats) {
        levelStats.total++;
        if (deck.progress.completedCards === deck.progress.totalCards) {
          levelStats.completed++;
        }
      }
    });

    // Verificar desbloqueio de níveis
    Object.entries(LEVEL_REQUIREMENTS).forEach(([level, requirements]) => {
      if (requirements.previousLevel) {
        const previousLevelStats = newLevelProgress[requirements.previousLevel];
        const completionPercentage = (previousLevelStats.completed / previousLevelStats.total) * 100;
        newLevelProgress[level as DeckLevel].unlocked = completionPercentage >= requirements.requiredCompletion;
      }
    });

    set({ levelProgress: newLevelProgress });
  },

  isLevelUnlocked: (level) => {
    const { levelProgress } = get();
    return levelProgress[level].unlocked;
  },

  updateProgress: async (deckId: string, cardId: string, difficulty: string) => {
    try {
      const response = await flashcardService.updateProgress(deckId, cardId, difficulty);
      set((state) => ({
        deckProgress: {
          ...state.deckProgress,
          [deckId]: state.deckProgress[deckId]?.map(progress => 
            progress.cardId === parseInt(cardId)
              ? { ...progress, ...response.progress }
              : progress
          ) || [response.progress]
        }
      }));
      // Recalcula o progresso geral após atualizar
      get().calculateLevelProgress();
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      throw error;
    }
  },

  loadDeckProgress: async (deckId: string) => {
    try {
      const response = await flashcardService.getDeckProgress(deckId);
      set((state) => ({
        deckProgress: {
          ...state.deckProgress,
          [deckId]: response.progress
        }
      }));
    } catch (error) {
      console.error('Erro ao carregar progresso do deck:', error);
      throw error;
    }
  }
})); 