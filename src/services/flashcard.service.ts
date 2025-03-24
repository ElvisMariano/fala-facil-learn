
import api from '../lib/api';

export const flashcardService = {
  // Obter todos os conjuntos de flashcards (para usuários)
  getAllDecks: async () => {
    const response = await api.get('/flashcards');
    return response.data;
  },

  // Obter todos os conjuntos de flashcards (para admin)
  getAllDecksAdmin: async () => {
    const response = await api.get('/flashcards/admin');
    return response.data;
  },

  // Obter um conjunto de flashcards específico pelo ID
  getDeckById: async (id: string) => {
    const response = await api.get(`/flashcards/${id}`);
    return response.data;
  },

  // Obter cartões de um conjunto específico
  getCardsByDeckId: async (deckId: string) => {
    const response = await api.get(`/flashcards/${deckId}/cards`);
    return response.data;
  },

  // Obter detalhes completos de um deck (para edição)
  getDeckDetails: async (deckId: string) => {
    const response = await api.get(`/flashcards/${deckId}/details`);
    return response.data;
  },

  // Criar um novo conjunto de flashcards
  createDeck: async (deckData: any) => {
    const response = await api.post('/flashcards', deckData);
    return response.data;
  },

  // Atualizar um conjunto de flashcards existente
  updateDeck: async (deckId: string, deckData: any) => {
    const response = await api.put(`/flashcards/${deckId}`, deckData);
    return response.data;
  },

  // Excluir um conjunto de flashcards
  deleteDeck: async (deckId: string) => {
    const response = await api.delete(`/flashcards/${deckId}`);
    return response.data;
  },

  // Registrar progresso de estudo
  updateProgress: async (deckId: string, cardId: number, difficulty: string) => {
    const response = await api.post(`/flashcards/${deckId}/progress`, {
      cardId,
      difficulty
    });
    return response.data;
  },

  // Obter estatísticas de progresso do usuário
  getUserProgress: async () => {
    const response = await api.get('/flashcards/progress');
    return response.data;
  }
};
