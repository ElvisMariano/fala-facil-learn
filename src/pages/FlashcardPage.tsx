
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Input } from "@/components/ui/custom/Input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, BarChart3, ChevronLeft, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { FlashcardStudy } from '@/components/flashcards/FlashcardStudy';
import { FlashcardDeck } from '@/types/flashcard.types';

export function FlashcardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [studyMode, setStudyMode] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  
  // Fetch flashcard decks from the API
  const { data, isLoading, error } = useQuery({
    queryKey: ['flashcardDecks'],
    queryFn: async () => {
      try {
        console.log('Buscando decks de flashcards...');
        const response = await api.get('/flashcards');
        console.log('Resposta da API decks:', response.data);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar flashcards:', error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
  
  const flashcardDecks = data?.flashcards || [];
  
  // Filter decks based on search term
  const filteredDecks = flashcardDecks.filter((deck: FlashcardDeck) => 
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStartStudy = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setStudyMode(true);
  };

  const handleBackToDecks = () => {
    setStudyMode(false);
    setSelectedDeck(null);
  };

  if (studyMode && selectedDeck) {
    return <FlashcardStudy deck={selectedDeck} onBack={handleBackToDecks} />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl py-10">
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">Erro ao carregar flashcards</h3>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar os conjuntos de flashcards. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Memorize novo vocabulário com nosso sistema inteligente de flashcards.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar decks..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.length > 0 ? (
          filteredDecks.map((deck: FlashcardDeck) => (
            <Card key={deck.id} className="h-full hover:shadow-lg transition-all overflow-hidden flex flex-col">
              <div className="h-3 w-full bg-gradient-to-r from-primary to-primary/60"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{deck.title}</CardTitle>
                  <Badge variant="outline">{deck.level}</Badge>
                </div>
                <CardDescription>{deck.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>{deck.progress.totalCards} cartões</span>
                    <span>{Math.round((deck.progress.completedCards / deck.progress.totalCards) * 100 || 0)}% completado</span>
                  </div>
                  <Progress 
                    value={(deck.progress.completedCards / deck.progress.totalCards) * 100 || 0} 
                    className="h-2"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleStartStudy(deck)}
                    disabled={deck.locked || (deck.progress.totalCards === 0)}
                  >
                    {deck.locked ? 'Bloqueado' : 
                     (deck.progress.totalCards === 0 ? 'Sem cartões' : 'Estudar')}
                  </Button>
                  <Button variant="outline" size="icon">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
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
}

export default FlashcardPage;
