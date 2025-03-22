
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Plus, Trash2, Volume2 } from "lucide-react";

interface FlashcardItemProps {
  id: string;
  term: string;
  definition: string;
  example?: string;
  audio?: string;
  image?: string;
}

interface FlashcardFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    category: string;
    level: string;
    cards: FlashcardItemProps[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "vocabulary",
    level: initialData?.level || "beginner",
    cards: initialData?.cards || [
      { id: Math.random().toString(36).slice(2), term: "", definition: "", example: "", audio: "", image: "" }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (index: number, field: string, value: string) => {
    const updatedCards = [...formData.cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      cards: updatedCards
    }));
  };

  const addCard = () => {
    setFormData(prev => ({
      ...prev,
      cards: [
        ...prev.cards,
        { id: Math.random().toString(36).slice(2), term: "", definition: "", example: "", audio: "", image: "" }
      ]
    }));
  };

  const removeCard = (index: number) => {
    if (formData.cards.length <= 1) return;
    
    const updatedCards = [...formData.cards];
    updatedCards.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      cards: updatedCards
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          {initialData ? "Editar Conjunto de Flashcards" : "Novo Conjunto de Flashcards"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="vocabulary">Vocabulário</option>
                <option value="phrases">Frases</option>
                <option value="idioms">Expressões Idiomáticas</option>
                <option value="grammar">Regras Gramaticais</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="level" className="text-sm font-medium">
                Nível
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Flashcards</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addCard}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Adicionar Card
              </Button>
            </div>
            
            {formData.cards.map((card, index) => (
              <div key={card.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Card #{index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeCard(index)}
                    disabled={formData.cards.length <= 1}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Termo</label>
                    <input
                      value={card.term}
                      onChange={(e) => handleCardChange(index, "term", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Definição</label>
                    <input
                      value={card.definition}
                      onChange={(e) => handleCardChange(index, "definition", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-medium">Exemplo</label>
                  <textarea
                    value={card.example}
                    onChange={(e) => handleCardChange(index, "example", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL do Áudio</label>
                    <input
                      value={card.audio}
                      onChange={(e) => handleCardChange(index, "audio", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="URL para arquivo de áudio"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL da Imagem</label>
                    <input
                      value={card.image}
                      onChange={(e) => handleCardChange(index, "image", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="URL para imagem"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              {initialData ? "Atualizar" : "Criar"} Conjunto de Flashcards
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlashcardForm;
