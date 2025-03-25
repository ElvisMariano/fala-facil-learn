# Sistema de Flashcards

## Visão Geral
O sistema de flashcards implementa um método de estudo baseado em repetição espaçada,
com progressão de níveis e gamificação.

## Estrutura
- `FlashcardPage`: Componente principal que gerencia a visualização dos decks
- `DeckFilters`: Gerenciamento de filtros e ordenação
- `DeckCard`: Visualização individual de decks
- `DeckStats`: Exibição de estatísticas e conquistas
- `LevelProgress`: Visualização do progresso por nível
- `FlashcardStore`: Gerenciamento de estado global

## Regras de Negócio

1. **Disponibilidade de Decks**
   - Deck disponível se:
     - Nunca foi estudado
     - Data de revisão já passou
   - Decks avançados requerem progresso em níveis anteriores:
     - Intermediário: 70% de conclusão no nível iniciante
     - Avançado: 80% de conclusão no nível intermediário

2. **Progressão**
   - Baseada em acurácia e consistência
   - Deck considerado completo com 80% de acertos
   - Streak diário aumenta pontuação
   - Níveis desbloqueados progressivamente

3. **Gamificação**
   - Sistema de conquistas por deck
   - Streaks diários com recompensas
   - Pontuação por precisão nas respostas
   - Níveis de dificuldade adaptativos

4. **Filtros e Ordenação**
   - Filtros por nível e categoria
   - Ordenação por:
     - Nome
     - Data de último estudo
     - Progresso
     - Nível
   - Busca por texto
   - Filtro de decks completos

5. **Estatísticas**
   - Progresso geral por nível
   - Precisão nas respostas
   - Tempo estimado de estudo
   - Streaks e conquistas

## Componentes

### DeckCard
Exibe informações individuais do deck:
- Título e descrição
- Nível e categoria
- Barra de progresso
- Status de disponibilidade
- Estatísticas rápidas

### DeckStats
Mostra estatísticas detalhadas:
- Progresso total
- Taxa de acertos
- Streak atual
- Tempo estimado
- Conquistas desbloqueadas

### LevelProgress
Visualização do progresso por nível:
- Status de desbloqueio
- Progresso percentual
- Requisitos para próximo nível
- Decks completados/total

## Estado Global

O estado é gerenciado pelo `FlashcardStore` usando Zustand:
- Lista de decks
- Filtros ativos
- Progresso por nível
- Estado de desbloqueio
- Favoritos

## Testes

Estrutura de testes recomendada:
```typescript
// DeckCard.test.tsx
describe('DeckCard', () => {
  it('should show correct availability status', () => {
    // Test implementation
  });
  
  it('should handle study button click', () => {
    // Test implementation
  });
});

// FlashcardStore.test.ts
describe('FlashcardStore', () => {
  it('should calculate level progress correctly', () => {
    // Test implementation
  });
  
  it('should update filters correctly', () => {
    // Test implementation
  });
});
```

## Próximos Passos

1. Implementação de Testes
   - Testes unitários para componentes
   - Testes de integração para fluxos principais
   - Testes E2E para jornadas críticas

2. Melhorias de Performance
   - Implementar virtualização para listas longas
   - Otimizar cálculos de progresso
   - Adicionar cache para dados frequentes

3. Funcionalidades Futuras
   - Compartilhamento de decks
   - Modo offline
   - Estatísticas avançadas
   - Personalização visual 