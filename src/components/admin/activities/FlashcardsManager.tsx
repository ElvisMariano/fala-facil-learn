import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, Filter, AlertCircle } from "lucide-react";
import FlashcardForm from "./FlashcardForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "@/services/flashcard.service";
import { toast } from "sonner";

interface FlashcardsManagerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FlashcardsManager: React.FC<FlashcardsManagerProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedFlashcard, setSelectedFlashcard] = useState<any>(null);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const queryClient = useQueryClient();
  
  // Query para buscar flashcards
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['admin-flashcards'],
    queryFn: async () => {
      try {
        const response = await flashcardService.getAllDecks();
        console.log("Flashcards obtidos:", response);
        return response.data || [];
      } catch (error) {
        console.error("Erro ao buscar flashcards:", error);
        throw error;
      }
    },
  });
  
  // Mutação para criar um flashcard
  const createMutation = useMutation({
    mutationFn: (newFlashcard: any) => {
      console.log("Criando novo flashcard:", newFlashcard);
      return flashcardService.createDeck(newFlashcard);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flashcards'] });
      toast.success("Conjunto de flashcards criado com sucesso!");
      setView("list");
    },
    onError: (error: any) => {
      console.error("Erro ao criar flashcard:", error);
      toast.error(`Erro ao criar flashcards: ${error.message || "Tente novamente mais tarde"}`);
    }
  });
  
  // Mutação para atualizar um flashcard
  const updateMutation = useMutation({
    mutationFn: (updatedFlashcard: any) => {
      console.log("Atualizando flashcard:", updatedFlashcard);
      return flashcardService.updateDeck(updatedFlashcard.id, updatedFlashcard);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flashcards'] });
      toast.success("Conjunto de flashcards atualizado com sucesso!");
      setView("list");
    },
    onError: (error: any) => {
      console.error("Erro ao atualizar flashcard:", error);
      toast.error(`Erro ao atualizar flashcards: ${error.message || "Tente novamente mais tarde"}`);
    }
  });
  
  // Mutação para excluir um flashcard
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      console.log("Excluindo flashcard:", id);
      return flashcardService.deleteDeck(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flashcards'] });
      toast.success("Conjunto de flashcards excluído com sucesso!");
    },
    onError: (error: any) => {
      console.error("Erro ao excluir flashcard:", error);
      toast.error(`Erro ao excluir flashcards: ${error.message || "Tente novamente mais tarde"}`);
    }
  });

  const flashcards = data?.decks || [];
  console.log("Flashcards renderizados:", flashcards);

  // Filtrar flashcards baseado na busca e filtros
  const filteredFlashcards = flashcards.filter((flashcard: any) => 
    (flashcard.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     flashcard.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (levelFilter === "all" || flashcard.level === levelFilter) &&
    (categoryFilter === "all" || flashcard.category === categoryFilter)
  );

  const handleCreateFlashcard = (data: any) => {
    // Formatar os dados para o formato esperado pelo backend
    const formattedData = {
      title: data.title,
      description: data.description,
      level: data.level,
      category: data.category,
      cards: data.cards.map((card: any) => ({
        front: card.term,
        back: card.definition,
        example: card.example || "",
      }))
    };
    createMutation.mutate(formattedData);
  };

  const handleUpdateFlashcard = (data: any) => {
    updateMutation.mutate(data);
  };

  const handleDeleteFlashcard = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este conjunto de flashcards?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditFlashcard = (flashcard: any) => {
    console.log("Editando flashcard:", flashcard);
    // Busca os detalhes completos do flashcard selecionado, incluindo os cards
    flashcardService.getDeckById(flashcard.id)
      .then(response => {
        console.log("Detalhes do flashcard:", response);
        setSelectedFlashcard(response.data.deck);
        setView("edit");
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do flashcard:", error);
        toast.error("Erro ao carregar detalhes do flashcard. Tente novamente.");
      });
  };

  if (view === "create") {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setView("list")}
          className="mb-4"
        >
          Voltar para Lista
        </Button>
        <FlashcardForm 
          onSubmit={handleCreateFlashcard}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  if (view === "edit" && selectedFlashcard) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setView("list")}
          className="mb-4"
        >
          Voltar para Lista
        </Button>
        <FlashcardForm 
          initialData={selectedFlashcard}
          onSubmit={handleUpdateFlashcard}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium mb-2">Erro ao carregar flashcards</h3>
        <p className="text-muted-foreground mb-4">
          Não foi possível carregar os conjuntos de flashcards. Tente novamente mais tarde.
        </p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-flashcards'] })}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar flashcards..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setView("create")}>
          <FilePlus className="h-4 w-4 mr-2" />
          Novo Conjunto de Flashcards
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtros:</span>
        </div>
        <div className="flex space-x-2">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">Todos os Níveis</option>
            <option value="beginner">Iniciante</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">Todas as Categorias</option>
            <option value="vocabulary">Vocabulário</option>
            <option value="phrases">Frases</option>
            <option value="idioms">Expressões Idiomáticas</option>
            <option value="grammar">Regras Gramaticais</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlashcards.length > 0 ? (
          filteredFlashcards.map((flashcard: any) => (
            <Card key={flashcard.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{flashcard.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{flashcard.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {flashcard.category && (
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          {flashcard.category === "vocabulary" && "Vocabulário"}
                          {flashcard.category === "phrases" && "Frases"}
                          {flashcard.category === "idioms" && "Expressões"}
                          {flashcard.category === "grammar" && "Gramática"}
                        </span>
                      )}
                      <span className="px-2 py-1 bg-muted rounded-full text-xs">
                        {flashcard.level === "beginner" && "Iniciante"}
                        {flashcard.level === "intermediate" && "Intermediário"}
                        {flashcard.level === "advanced" && "Avançado"}
                      </span>
                    </div>
                    <span className="text-sm">{flashcard.cards?.length || 0} cards</span>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="subtle" 
                      size="sm"
                      onClick={() => handleEditFlashcard(flashcard)}
                    >
                      <PencilLine className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleDeleteFlashcard(flashcard.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Nenhum conjunto de flashcards encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsManager;
