
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, Plus, X, Settings, BarChart3, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface FlashcardSet {
  id: number;
  title: string;
  category: string;
  level: string;
  cardCount: number;
  completionRate: number;
  active: boolean;
}

const sampleFlashcardSets: FlashcardSet[] = [
  { id: 1, title: "Vocabulário Básico", category: "Vocabulário", level: "A1", cardCount: 120, completionRate: 85, active: true },
  { id: 2, title: "Expressões do Dia a Dia", category: "Frases", level: "A2", cardCount: 85, completionRate: 72, active: true },
  { id: 3, title: "Tempos Verbais", category: "Gramática", level: "B1", cardCount: 64, completionRate: 68, active: true },
  { id: 4, title: "Vocabulário de Negócios", category: "Vocabulário", level: "B2", cardCount: 95, completionRate: 54, active: true },
  { id: 5, title: "Vocabulário Avançado", category: "Vocabulário", level: "C1", cardCount: 150, completionRate: 35, active: false },
];

interface FlashcardsManagerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FlashcardsManager: React.FC<FlashcardsManagerProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>(sampleFlashcardSets);
  const [showFlashcardForm, setShowFlashcardForm] = useState(false);
  const [currentFlashcardSet, setCurrentFlashcardSet] = useState<FlashcardSet | null>(null);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  
  const filteredFlashcardSets = flashcardSets.filter(set => 
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    set.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditFlashcardSet = (set: FlashcardSet) => {
    setCurrentFlashcardSet(set);
    setShowFlashcardForm(true);
  };

  const handleSaveFlashcardSet = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Implementação simplificada - em um app real, seria uma chamada API
    if (currentFlashcardSet) {
      setFlashcardSets(flashcardSets.map(set => 
        set.id === currentFlashcardSet.id ? currentFlashcardSet : set
      ));
    } else {
      const newSet: FlashcardSet = {
        id: Math.max(0, ...flashcardSets.map(set => set.id)) + 1,
        title: "Novo Conjunto de Flashcards",
        category: "Vocabulário",
        level: "A1",
        cardCount: 0,
        completionRate: 0,
        active: true
      };
      setFlashcardSets([...flashcardSets, newSet]);
    }
    
    setShowFlashcardForm(false);
    setCurrentFlashcardSet(null);
  };

  const handleToggleActive = (id: number) => {
    setFlashcardSets(flashcardSets.map(set => 
      set.id === id ? {...set, active: !set.active} : set
    ));
  };

  const handleDeleteFlashcardSet = (id: number) => {
    setFlashcardSets(flashcardSets.filter(set => set.id !== id));
  };

  const handleAddCards = (setId: number) => {
    // Em um app real, isso abriria um modal para adicionar novos cartões
    setShowAddCardModal(true);
    console.log(`Adicionar cartões ao conjunto ${setId}`);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Gerenciar Flashcards</CardTitle>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar conjuntos de flashcards..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => {
              setCurrentFlashcardSet(null);
              setShowFlashcardForm(true);
            }}>
              <FilePlus className="h-4 w-4 mr-2" />
              Novo Conjunto
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlashcardSets.map(set => (
            <div key={set.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className={`p-4 ${set.active ? 'bg-white' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      set.level.includes('A1') ? 'bg-green-100 text-green-800' :
                      set.level.includes('A2') ? 'bg-blue-100 text-blue-800' :
                      set.level.includes('B1') ? 'bg-purple-100 text-purple-800' :
                      set.level.includes('B2') ? 'bg-pink-100 text-pink-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {set.level}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      {set.category}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 hover:bg-muted rounded"
                      onClick={() => handleEditFlashcardSet(set)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 hover:bg-muted rounded"
                      onClick={() => handleToggleActive(set.id)}
                    >
                      {set.active ? 
                        <Trash2 className="h-4 w-4 text-red-500" /> : 
                        <Settings className="h-4 w-4" />
                      }
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">{set.title}</h3>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Cartões: {set.cardCount}</span>
                    <span>Taxa de conclusão: {set.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${set.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAddCards(set.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Cartões
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Estatísticas
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredFlashcardSets.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">Nenhum conjunto de flashcards encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
        
        {showFlashcardForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {currentFlashcardSet ? "Editar Conjunto de Flashcards" : "Novo Conjunto de Flashcards"}
                </h3>
                <button 
                  className="p-1 hover:bg-muted rounded"
                  onClick={() => setShowFlashcardForm(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSaveFlashcardSet}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
                  <Input 
                    id="title" 
                    placeholder="Digite o título do conjunto" 
                    defaultValue={currentFlashcardSet?.title || ""} 
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">Categoria</label>
                    <select 
                      id="category" 
                      className="w-full border rounded-md p-2" 
                      defaultValue={currentFlashcardSet?.category || "Vocabulário"}
                    >
                      <option value="Vocabulário">Vocabulário</option>
                      <option value="Frases">Frases</option>
                      <option value="Gramática">Gramática</option>
                      <option value="Expressões">Expressões</option>
                      <option value="Gírias">Gírias</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium mb-1">Nível</label>
                    <select 
                      id="level" 
                      className="w-full border rounded-md p-2" 
                      defaultValue={currentFlashcardSet?.level || "A1"}
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Descrição</label>
                  <Textarea 
                    id="description" 
                    placeholder="Digite uma descrição para o conjunto de flashcards" 
                    className="min-h-24" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    defaultChecked={currentFlashcardSet?.active ?? true}
                  />
                  <label htmlFor="active" className="text-sm font-medium">Conjunto ativo</label>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setShowFlashcardForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {currentFlashcardSet ? "Atualizar" : "Criar"} Conjunto
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {showAddCardModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Adicionar Flashcards</h3>
                <button 
                  className="p-1 hover:bg-muted rounded"
                  onClick={() => setShowAddCardModal(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Adicionar Múltiplos Cartões</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Importe cartões usando um arquivo CSV ou planilha Excel.
                    </p>
                    <Button variant="subtle">Importar de Arquivo</Button>
                  </div>
                  
                  <h4 className="font-medium mb-3">Adicionar Cartão Individual</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Termo em Inglês</label>
                        <Input placeholder="Digite o termo em inglês" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tradução para Português</label>
                        <Input placeholder="Digite a tradução" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Exemplo de Uso (opcional)</label>
                      <Input placeholder="Digite uma frase de exemplo" />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-primary">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm">Adicionar pronúncia (será gerada automaticamente)</span>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Cartão
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Cartões Adicionados (0)</h4>
                  <div className="border rounded-lg p-4 text-center text-muted-foreground">
                    Nenhum cartão adicionado ainda.
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowAddCardModal(false)}>
                    Cancelar
                  </Button>
                  <Button disabled>
                    Salvar Cartões
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredFlashcardSets.length} de {flashcardSets.length} conjuntos
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardsManager;
