import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Plus, X, Save } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Schema de validação
const cardSchema = z.object({
  front: z.string().min(1, "O frente do card é obrigatório"),
  back: z.string().min(1, "O verso do card é obrigatório"),
  example: z.string().optional(),
});

const flashcardSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  level: z.string().min(1, "O nível é obrigatório"),
  category: z.string().min(1, "A categoria é obrigatória"),
  cards: z.array(cardSchema).min(1, "Adicione pelo menos um card"),
});

type FlashcardFormData = z.infer<typeof flashcardSchema>;

interface FlashcardFormProps {
  initialData?: FlashcardFormData;
  onSubmit: (data: FlashcardFormData) => void;
  onCancel: () => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Configuração do formulário com React Hook Form
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FlashcardFormData>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "beginner",
      category: "vocabulary",
      cards: [{ front: "", back: "", example: "" }],
    },
  });
  
  // Field array para manipulação dinâmica dos cards
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });
  
  // Efeito para preencher o formulário com dados iniciais se fornecidos
  useEffect(() => {
    if (initialData) {
      console.log("Carregando dados iniciais no formulário:", initialData);
      const formattedData = {
        title: initialData.title || "",
        description: initialData.description || "",
        level: initialData.level || "beginner",
        category: initialData.category || "vocabulary",
        cards: initialData.cards?.length > 0 
          ? initialData.cards.map((card: any) => ({
              front: card.front || "",
              back: card.back || "",
              example: card.example || "",
            }))
          : [{ front: "", back: "", example: "" }],
      };
      
      reset(formattedData);
    }
  }, [initialData, reset]);
  
  // Função para adicionar um novo card vazio
  const addCard = () => {
    append({ front: "", back: "", example: "" });
  };
  
  // Handler do envio do formulário
  const handleFormSubmit = (data: FlashcardFormData) => {
    setIsSubmitting(true);
    console.log("Dados do formulário a serem enviados:", data);
    
    try {
      // Se temos dados iniciais, estamos editando um deck existente
      if (initialData && initialData.id) {
        onSubmit({
          ...data,
          id: initialData.id,
        });
      } else {
        onSubmit(data);
      }
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      toast.error("Ocorreu um erro ao processar o formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Editar" : "Criar"} Conjunto de Flashcards</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Informações básicas do deck */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Título */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Título
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Ex: Vocabulário básico de viagem"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              
              {/* Nível */}
              <div className="space-y-2">
                <label htmlFor="level" className="block text-sm font-medium">
                  Nível
                </label>
                <Controller
                  name="level"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="w-full p-2 border rounded-md">
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
                    </select>
                  )}
                />
                {errors.level && (
                  <p className="text-sm text-red-500">{errors.level.message}</p>
                )}
              </div>
            </div>
            
            {/* Descrição */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Descrição
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Descreva brevemente este conjunto de flashcards..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            {/* Categoria */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium">
                Categoria
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 border rounded-md">
                    <option value="vocabulary">Vocabulário</option>
                    <option value="phrases">Frases</option>
                    <option value="idioms">Expressões Idiomáticas</option>
                    <option value="grammar">Regras Gramaticais</option>
                  </select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>
          
          {/* Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Cards</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addCard}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Card
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Card {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Frente do card */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Termo (Frente)
                      </label>
                      <Controller
                        name={`cards.${index}.front`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Ex: Hello"
                          />
                        )}
                      />
                      {errors.cards?.[index]?.front && (
                        <p className="text-sm text-red-500">
                          {errors.cards[index]?.front?.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Verso do card */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Definição (Verso)
                      </label>
                      <Controller
                        name={`cards.${index}.back`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Ex: Olá"
                          />
                        )}
                      />
                      {errors.cards?.[index]?.back && (
                        <p className="text-sm text-red-500">
                          {errors.cards[index]?.back?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Exemplo */}
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium">
                      Exemplo (opcional)
                    </label>
                    <Controller
                      name={`cards.${index}.example`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Ex: Hello, how are you?"
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlashcardForm;
