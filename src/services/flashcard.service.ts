
import api from '../lib/api';

export const flashcardService = {
  // Obter todos os conjuntos de flashcards
  getAllDecks: async () => {
    console.log('Buscando todos os flashcards');
    try {
      const response = await api.get('/flashcards');
      console.log('Resposta da API (getAllDecks):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os flashcards:', error);
      throw error;
    }
  },

  // Obter um conjunto de flashcards específico pelo ID
  getDeckById: async (id: string) => {
    console.log(`Buscando flashcard ${id}`);
    try {
      const response = await api.get(`/flashcards/${id}`);
      console.log(`Resposta da API (getDeckById - ${id}):`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar flashcard ${id}:`, error);
      throw error;
    }
  },

  // Criar um novo conjunto de flashcards
  createDeck: async (deckData: any) => {
    console.log('Criando novo deck:', deckData);
    try {
      const response = await api.post('/flashcards', deckData);
      console.log('Resposta da criação do deck:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar deck:', error);
      throw error;
    }
  },

  // Atualizar um conjunto de flashcards existente
  updateDeck: async (id: string, deckData: any) => {
    console.log(`Atualizando flashcard ${id} com dados:`, deckData);
    try {
      const response = await api.put(`/flashcards/${id}`, deckData);
      console.log('Resposta da atualização do deck:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar deck ${id}:`, error);
      throw error;
    }
  },

  // Excluir um conjunto de flashcards
  deleteDeck: async (id: string) => {
    console.log(`Excluindo flashcard com ID: ${id}`);
    try {
      const response = await api.delete(`/flashcards/${id}`);
      console.log('Resposta da exclusão do deck:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir deck ${id}:`, error);
      throw error;
    }
  },

  // Adicionar um card a um conjunto
  addCard: async (deckId: string, cardData: any) => {
    console.log(`Adicionando card ao deck ${deckId}:`, cardData);
    try {
      const response = await api.post(`/flashcards/${deckId}/cards`, cardData);
      console.log('Resposta da adição do card:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao adicionar card ao deck ${deckId}:`, error);
      throw error;
    }
  },

  // Atualizar um card
  updateCard: async (deckId: string, cardId: string, cardData: any) => {
    console.log(`Atualizando card ${cardId} do deck ${deckId}:`, cardData);
    try {
      const response = await api.put(`/flashcards/${deckId}/cards/${cardId}`, cardData);
      console.log('Resposta da atualização do card:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar card ${cardId} do deck ${deckId}:`, error);
      throw error;
    }
  },

  // Excluir um card
  deleteCard: async (deckId: string, cardId: string) => {
    console.log(`Excluindo card ${cardId} do deck ${deckId}`);
    try {
      const response = await api.delete(`/flashcards/${deckId}/cards/${cardId}`);
      console.log('Resposta da exclusão do card:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir card ${cardId} do deck ${deckId}:`, error);
      throw error;
    }
  },

  // Registrar progresso de estudo
  updateProgress: async (deckId: string, cardId: string, difficulty: string) => {
    console.log(`Atualizando progresso para deck ${deckId}, card ${cardId}, dificuldade: ${difficulty}`);
    try {
      const response = await api.post(`/flashcards/${deckId}/progress`, {
        cardId,
        difficulty
      });
      console.log('Resposta da atualização de progresso:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar progresso para deck ${deckId}, card ${cardId}:`, error);
      throw error;
    }
  },

  // Obter estatísticas de progresso do usuário
  getUserProgress: async () => {
    console.log('Buscando progresso do usuário');
    try {
      const response = await api.get('/flashcards/progress');
      console.log('Resposta do progresso do usuário:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar progresso do usuário:', error);
      throw error;
    }
  }
};
