import api from '../lib/api';

export const flashcardService = {
  // Obter todos os conjuntos de flashcards
  getAllDecks: async () => {
    console.log('Buscando todos os flashcards');
    const response = await api.get('/flashcards');
    return response.data;
  },

  // Obter um conjunto de flashcards específico pelo ID
  getDeckById: async (id: string) => {
    console.log(`Buscando flashcard ${id}`);
    const response = await api.get(`/flashcards/${id}`);
    return response.data;
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
      console.error('Erro ao atualizar deck:', error);
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
      console.error('Erro ao excluir deck:', error);
      throw error;
    }
  },

  // Adicionar um card a um conjunto
  addCard: async (id: string, cardData: any) => {
    console.log(`Adicionando card ao deck ${id}:`, cardData);
    try {
      const response = await api.post(`/flashcards/${id}/cards`, cardData);
      console.log('Resposta da adição do card:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar card:', error);
      throw error;
    }
  },

  // Atualizar um card
  updateCard: async (id: string, cardId: string, cardData: any) => {
    console.log(`Atualizando card ${cardId} do deck ${id}:`, cardData);
    try {
      const response = await api.put(`/flashcards/${id}/cards/${cardId}`, cardData);
      console.log('Resposta da atualização do card:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar card:', error);
      throw error;
    }
  },

  // Excluir um card
  deleteCard: async (id: string, cardId: string) => {
    console.log(`Excluindo card ${cardId} do deck ${id}`);
    try {
      const response = await api.delete(`/flashcards/${id}/cards/${cardId}`);
      console.log('Resposta da exclusão do card:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir card:', error);
      throw error;
    }
  },

  // Registrar progresso de estudo
  updateProgress: async (id: string, cardId: string, difficulty: string) => {
    console.log(`Atualizando progresso para deck ${id}, card ${cardId}, dificuldade: ${difficulty}`);
    try {
      const response = await api.post(`/flashcards/${id}/progress`, {
        cardId,
        difficulty
      });
      console.log('Resposta da atualização de progresso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
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
      console.error('Erro ao buscar progresso:', error);
      throw error;
    }
  }
};
