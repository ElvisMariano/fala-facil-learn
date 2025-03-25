import { create } from 'zustand';
import api from '@/lib/api';
import { DeckFilters, FlashcardDeck, DeckLevel, DeckSortOption } from '../types/flashcard.types';
import { flashcardService } from '../services/flashcard.service';

type LevelProgress = Record<DeckLevel, {
  completed: number;
  total: number;
  unlocked: boolean;
}>;

<<<<<<< HEAD
interface FlashcardFilters {
  search: string;
  levels: string[];
  categories: string[];
  showCompleted: boolean;
=======
interface FlashcardProgress {
  userId: string;
  deckId: number;
  cardId: number;
  difficulty: string;
  lastStudiedAt: Date;
  studyCount: number;
>>>>>>> temp
}

interface FlashcardStore {
  decks: FlashcardDeck[];
  filteredDecks: FlashcardDeck[];
  filters: FlashcardFilters;
  currentLevel: DeckLevel;
  levelProgress: LevelProgress;
  deckProgress: Record<string, FlashcardProgress[]>;
  setDecks: (decks: FlashcardDeck[]) => void;
  setFilters: (filters: Partial<FlashcardFilters>) => void;
  fetchDecks: () => Promise<void>;
  updateDeckProgress: (deckId: string, progress: any) => void;
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

const defaultFilters: FlashcardFilters = {
  search: '',
  levels: [],
  categories: [],
  showCompleted: true
};

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  decks: [],
  filteredDecks: [],
  currentLevel: 'beginner',
  levelProgress: {
    beginner: { completed: 0, total: 0, unlocked: true },
    intermediate: { completed: 0, total: 0, unlocked: false },
    advanced: { completed: 0, total: 0, unlocked: false }
  },
<<<<<<< HEAD
  filters: defaultFilters,
=======
  deckProgress: {},
  filters: {
    levels: [],
    categories: [],
    searchTerm: '',
    sortBy: 'name',
    showCompleted: true
  },
>>>>>>> temp

  setDecks: (newDecks) => {
    set({ decks: newDecks });
  },

  setFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.filters, ...newFilters };
      const filtered = filterDecks(state.decks, updatedFilters);
      return { filters: updatedFilters, filteredDecks: filtered };
    });
  },

  fetchDecks: async () => {
    try {
      const response = await api.get('/flashcards');
      const transformedDecks = response.data.map((deck: any) => ({
        id: deck.id.toString(),
        title: deck.title,
        description: deck.description || '',
        level: deck.level,
        category: deck.category || 'vocabulary',
        difficulty: deck.difficulty,
        locked: deck.locked,
        isFavorite: deck.isFavorite,
        nextReview: deck.nextReviewDate,
        lastPracticed: deck.lastStudyDate,
        progress: {
          totalCards: deck.progress.totalCards || 0,
          completedCards: deck.progress.completedCards || 0,
          correctAnswers: deck.progress.correctAnswers || 0,
          streakDays: deck.progress.streakDays || 0,
          lastStudyDate: deck.progress.lastStudyDate || null,
          nextReviewDate: deck.progress.nextReviewDate || null
        },
        achievements: deck.achievements || [],
        tags: deck.tags || [],
        estimatedTimeMinutes: deck.estimatedTimeMinutes || 5
      }));

      const filtered = filterDecks(transformedDecks, get().filters);
      set({ decks: transformedDecks, filteredDecks: filtered });
    } catch (error) {
      console.error('Erro ao buscar decks:', error);
    }
  },

  updateDeckProgress: (deckId, progress) => {
    set((state) => {
      const updatedDecks = state.decks.map(deck => {
        if (deck.id === deckId) {
          return {
            ...deck,
            progress: {
              ...deck.progress,
              completedCards: progress.completedCards,
              correctAnswers: progress.correctAnswers,
              streakDays: progress.streakDays,
              lastStudyDate: new Date().toISOString(),
              nextReviewDate: progress.nextReviewDate
            }
          };
        }
        return deck;
      });

      const filtered = filterDecks(updatedDecks, state.filters);
      return { decks: updatedDecks, filteredDecks: filtered };
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

function filterDecks(decks: FlashcardDeck[], filters: FlashcardFilters): FlashcardDeck[] {
  return decks.filter(deck => {
    // Filtrar por busca
    if (filters.search && !deck.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filtrar por nível
    if (filters.levels.length > 0 && !filters.levels.includes(deck.level)) {
      return false;
    }

    // Filtrar por categoria
    if (filters.categories.length > 0 && !filters.categories.includes(deck.category)) {
      return false;
    }

    // Filtrar decks completos
    if (!filters.showCompleted && deck.progress.completedCards === deck.progress.totalCards) {
      return false;
    }

    return true;
  });
} 