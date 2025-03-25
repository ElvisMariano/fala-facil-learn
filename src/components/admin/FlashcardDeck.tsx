
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { flashcardService } from "@/services/flashcard.service";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FlashcardDeckProps {
  deckId: string;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ deckId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['flashcard-deck', deckId],
    queryFn: async () => {
      const response = await flashcardService.getDeckById(deckId);
      return response.data.deck;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Erro ao carregar detalhes do deck</h3>
        <p className="text-muted-foreground mb-4">
          Não foi possível carregar os detalhes deste conjunto de flashcards.
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <p className="text-muted-foreground">{data.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-6">
          <div className="bg-muted px-4 py-2 rounded-md">
            <span className="text-sm font-medium">Nível: </span>
            <span>
              {data.level === "beginner" && "Iniciante"}
              {data.level === "intermediate" && "Intermediário"}
              {data.level === "advanced" && "Avançado"}
            </span>
          </div>
          
          {data.category && (
            <div className="bg-muted px-4 py-2 rounded-md">
              <span className="text-sm font-medium">Categoria: </span>
              <span>
                {data.category === "vocabulary" && "Vocabulário"}
                {data.category === "phrases" && "Frases"}
                {data.category === "idioms" && "Expressões Idiomáticas"}
                {data.category === "grammar" && "Regras Gramaticais"}
              </span>
            </div>
          )}
          
          <div className="bg-muted px-4 py-2 rounded-md">
            <span className="text-sm font-medium">Cards: </span>
            <span>{data.cards?.length || 0}</span>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-3">Cards</h3>
        
        {data.cards && data.cards.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Frente</TableHead>
                <TableHead>Verso</TableHead>
                <TableHead>Exemplo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.cards.map((card: any, index: number) => (
                <TableRow key={card.id || index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{card.front}</TableCell>
                  <TableCell>{card.back}</TableCell>
                  <TableCell>{card.example || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Este conjunto ainda não tem cards</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardDeck;
