
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  X, 
  Save,
  Volume2
} from "lucide-react";

// Tipo para flashcards
interface Flashcard {
  id: number;
  word: string;
  translation: string;
  example: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hasAudio: boolean;
  createdAt: string;
}

// Dados de exemplo para flashcards
const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    word: "apple",
    translation: "maçã",
    example: "I eat an apple every day.",
    category: "Food",
    difficulty: "beginner",
    hasAudio: true,
    createdAt: "15/03/2023"
  },
  {
    id: 2,
    word: "house",
    translation: "casa",
    example: "My house is very big.",
    category: "Home",
    difficulty: "beginner",
    hasAudio: true,
    createdAt: "17/03/2023"
  },
  {
    id: 3,
    word: "endeavor",
    translation: "esforçar-se",
    example: "He will endeavor to finish the project on time.",
    category: "Verbs",
    difficulty: "advanced",
    hasAudio: true,
    createdAt: "22/04/2023"
  },
  {
    id: 4,
    word: "threshold",
    translation: "limiar",
    example: "The company has reached the threshold of profitability.",
    category: "Business",
    difficulty: "advanced",
    hasAudio: false,
    createdAt: "02/05/2023"
  },
  {
    id: 5,
    word: "book",
    translation: "livro",
    example: "I read a book every week.",
    category: "Education",
    difficulty: "beginner",
    hasAudio: true,
    createdAt: "10/03/2023"
  }
];

const FlashcardsManager: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(sampleFlashcards);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);
  const [newFlashcard, setNewFlashcard] = useState<Partial<Flashcard>>({
    word: "",
    translation: "",
    example: "",
    category: "",
    difficulty: "beginner",
    hasAudio: false
  });

  // Filtrar flashcards baseado no termo de busca
  const filteredFlashcards = flashcards.filter(card => 
    card.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    card.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manipulador para editar um flashcard
  const handleEditFlashcard = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
    setNewFlashcard(flashcard);
    setIsFormOpen(true);
  };

  // Manipulador para excluir um flashcard
  const handleDeleteFlashcard = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este flashcard?")) {
      setFlashcards(flashcards.filter(card => card.id !== id));
    }
  };

  // Manipulador para mudanças no formulário
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewFlashcard(prev => ({ ...prev, [name]: checked }));
    } else {
      setNewFlashcard(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manipulador para salvar um flashcard
  const handleSaveFlashcard = () => {
    if (!newFlashcard.word || !newFlashcard.translation) {
      alert("Palavra e tradução são campos obrigatórios!");
      return;
    }

    if (editingFlashcard) {
      // Atualizar flashcard existente
      setFlashcards(flashcards.map(card => 
        card.id === editingFlashcard.id ? { ...card, ...newFlashcard } as Flashcard : card
      ));
    } else {
      // Adicionar novo flashcard
      const newId = Math.max(...flashcards.map(card => card.id), 0) + 1;
      const today = new Date().toLocaleDateString("pt-BR");
      
      setFlashcards([
        ...flashcards, 
        { 
          ...newFlashcard as Flashcard, 
          id: newId,
          createdAt: today
        }
      ]);
    }

    // Resetar o formulário
    setNewFlashcard({
      word: "",
      translation: "",
      example: "",
      category: "",
      difficulty: "beginner",
      hasAudio: false
    });
    setEditingFlashcard(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Gerenciar Flashcards</CardTitle>
              <CardDescription>Crie e edite flashcards para auxiliar no aprendizado de vocabulário</CardDescription>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar flashcards..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Flashcard
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isFormOpen && (
            <Card className="mb-6 border border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {editingFlashcard ? "Editar Flashcard" : "Novo Flashcard"}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => {
                    setIsFormOpen(false);
                    setEditingFlashcard(null);
                    setNewFlashcard({
                      word: "",
                      translation: "",
                      example: "",
                      category: "",
                      difficulty: "beginner",
                      hasAudio: false
                    });
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Palavra (Inglês) *</label>
                    <Input
                      name="word"
                      value={newFlashcard.word || ""}
                      onChange={handleFormChange}
                      placeholder="Ex: apple"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tradução (Português) *</label>
                    <Input
                      name="translation"
                      value={newFlashcard.translation || ""}
                      onChange={handleFormChange}
                      placeholder="Ex: maçã"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Exemplo de uso</label>
                    <Textarea
                      name="example"
                      value={newFlashcard.example || ""}
                      onChange={handleFormChange}
                      placeholder="Ex: I eat an apple every day."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoria</label>
                    <Input
                      name="category"
                      value={newFlashcard.category || ""}
                      onChange={handleFormChange}
                      placeholder="Ex: Food"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nível de Dificuldade</label>
                    <select
                      name="difficulty"
                      value={newFlashcard.difficulty || "beginner"}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id="hasAudio"
                      name="hasAudio"
                      checked={newFlashcard.hasAudio || false}
                      onChange={(e) => 
                        setNewFlashcard(prev => ({ ...prev, hasAudio: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <label htmlFor="hasAudio" className="text-sm font-medium">
                      Este flashcard possui áudio de pronúncia
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => {
                    setIsFormOpen(false);
                    setEditingFlashcard(null);
                  }}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveFlashcard}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Palavra</TableHead>
                  <TableHead>Tradução</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Áudio</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlashcards.map((flashcard) => (
                  <TableRow key={flashcard.id}>
                    <TableCell className="font-medium">{flashcard.word}</TableCell>
                    <TableCell>{flashcard.translation}</TableCell>
                    <TableCell>{flashcard.category}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flashcard.difficulty === 'beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : flashcard.difficulty === 'intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}>
                        {flashcard.difficulty === 'beginner' 
                          ? 'Iniciante' 
                          : flashcard.difficulty === 'intermediate' 
                            ? 'Intermediário' 
                            : 'Avançado'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {flashcard.hasAudio ? (
                        <Volume2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{flashcard.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditFlashcard(flashcard)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFlashcard(flashcard.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFlashcards.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `Nenhum flashcard encontrado para "${searchTerm}"` 
                  : "Nenhum flashcard cadastrado"}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredFlashcards.length} de {flashcards.length} flashcards
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardsManager;
