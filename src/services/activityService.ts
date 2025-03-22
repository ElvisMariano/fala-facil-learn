
import { api } from "./api";

export interface FlashcardItem {
  id: string;
  term: string;
  definition: string;
  example?: string;
  audio?: string;
  image?: string;
}

export interface Flashcard {
  id?: string;
  title: string;
  description: string;
  category: string;
  level: string;
  cards: FlashcardItem[];
}

export interface ExerciseQuestion {
  id: string;
  type: "multiple_choice" | "fill_blank" | "listening" | "matching";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audio?: string;
  explanation?: string;
}

export interface InteractiveExercise {
  id?: string;
  title: string;
  description: string;
  level: string;
  category: string;
  introduction?: string;
  questions: ExerciseQuestion[];
}

export interface ConversationActivity {
  id?: string;
  title: string;
  description: string;
  level: string;
  scenario: string;
  instructions: string;
  exampleDialog?: string;
  vocabularyItems?: string[];
}

export const activityService = {
  // Flashcards
  getAllFlashcards: async (params = {}) => {
    return api.get("/activities/flashcards", params);
  },
  
  getFlashcardById: async (id: string) => {
    return api.get(`/activities/flashcards/${id}`);
  },
  
  createFlashcard: async (flashcard: Flashcard) => {
    return api.post("/activities/flashcards", flashcard);
  },
  
  updateFlashcard: async (id: string, flashcard: Partial<Flashcard>) => {
    return api.put(`/activities/flashcards/${id}`, flashcard);
  },
  
  deleteFlashcard: async (id: string) => {
    return api.delete(`/activities/flashcards/${id}`);
  },
  
  // Exercícios Interativos
  getAllExercises: async (params = {}) => {
    return api.get("/activities/exercises", params);
  },
  
  getExerciseById: async (id: string) => {
    return api.get(`/activities/exercises/${id}`);
  },
  
  createExercise: async (exercise: InteractiveExercise) => {
    return api.post("/activities/exercises", exercise);
  },
  
  updateExercise: async (id: string, exercise: Partial<InteractiveExercise>) => {
    return api.put(`/activities/exercises/${id}`, exercise);
  },
  
  deleteExercise: async (id: string) => {
    return api.delete(`/activities/exercises/${id}`);
  },
  
  // Atividades de Conversação
  getAllConversations: async (params = {}) => {
    return api.get("/activities/conversations", params);
  },
  
  getConversationById: async (id: string) => {
    return api.get(`/activities/conversations/${id}`);
  },
  
  createConversation: async (conversation: ConversationActivity) => {
    return api.post("/activities/conversations", conversation);
  },
  
  updateConversation: async (id: string, conversation: Partial<ConversationActivity>) => {
    return api.put(`/activities/conversations/${id}`, conversation);
  },
  
  deleteConversation: async (id: string) => {
    return api.delete(`/activities/conversations/${id}`);
  },
};
