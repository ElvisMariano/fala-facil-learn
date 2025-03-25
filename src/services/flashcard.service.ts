
import api from '../lib/api';

export const flashcardService = {
  // Obter todos os conjuntos de flashcards
  getAllDecks: async () => {
    console.log("Buscando todos os flashcards");
    const response = await api.get('/flashcards');
    console.log("Resposta da API (getAllDecks):", response.data);
    return response.data;
  },

  // Obter um conjunto de flashcards específico pelo ID
  getDeckById: async (id: string) => {
    console.log(`Buscando flashcard com ID: ${id}`);
    const response = await api.get(`/flashcards/${id}`);
    console.log("Resposta da API (getDeckById):", response.data);
    return response.data;
  },

  // Criar um novo conjunto de flashcards
  createDeck: async (deckData: any) => {
    console.log("Dados enviados para criação:", deckData);
    const response = await api.post('/flashcards', deckData);
    console.log("Resposta da API (createDeck):", response.data);
    return response.data;
  },

  // Atualizar um conjunto de flashcards existente
  updateDeck: async (deckId: string, deckData: any) => {
    console.log(`Atualizando flashcard ${deckId} com dados:`, deckData);
    const response = await api.put(`/flashcards/${deckId}`, deckData);
    console.log("Resposta da API (updateDeck):", response.data);
    return response.data;
  },

  // Excluir um conjunto de flashcards
  deleteDeck: async (deckId: string) => {
    console.log(`Excluindo flashcard com ID: ${deckId}`);
    const response = await api.delete(`/flashcards/${deckId}`);
    console.log("Resposta da API (deleteDeck):", response.data);
    return response.data;
  },

  // Adicionar um card a um conjunto
  addCard: async (deckId: string, cardData: any) => {
    console.log(`Adicionando card ao deck ${deckId}:`, cardData);
    const response = await api.post(`/flashcards/${deckId}/cards`, cardData);
    console.log("Resposta da API (addCard):", response.data);
    return response.data;
  },

  // Atualizar um card
  updateCard: async (deckId: string, cardId: string, cardData: any) => {
    console.log(`Atualizando card ${cardId} do deck ${deckId}:`, cardData);
    const response = await api.put(`/flashcards/${deckId}/cards/${cardId}`, cardData);
    console.log("Resposta da API (updateCard):", response.data);
    return response.data;
  },

  // Excluir um card
  deleteCard: async (deckId: string, cardId: string) => {
    console.log(`Excluindo card ${cardId} do deck ${deckId}`);
    const response = await api.delete(`/flashcards/${deckId}/cards/${cardId}`);
    console.log("Resposta da API (deleteCard):", response.data);
    return response.data;
  },

  // Registrar progresso de estudo
  updateProgress: async (deckId: string, cardId: string, difficulty: string) => {
    console.log(`Atualizando progresso para deck ${deckId}, card ${cardId}, dificuldade: ${difficulty}`);
    const response = await api.post(`/flashcards/${deckId}/progress`, {
      cardId,
      difficulty
    });
    console.log("Resposta da API (updateProgress):", response.data);
    return response.data;
  },

  // Obter estatísticas de progresso do usuário
  getUserProgress: async () => {
    console.log("Buscando progresso do usuário");
    const response = await api.get('/flashcards/progress');
    console.log("Resposta da API (getUserProgress):", response.data);
    return response.data;
  }
};
