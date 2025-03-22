
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { BookOpen } from "lucide-react";

interface LessonFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    level: string;
    category: string;
    content: string;
    status: "draft" | "published";
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    level: initialData?.level || "beginner",
    category: initialData?.category || "grammar",
    content: initialData?.content || "",
    status: initialData?.status || "draft"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          <BookOpen className="h-5 w-5 text-primary" />
          {initialData ? "Editar Lição" : "Nova Lição"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                <option value="grammar">Gramática</option>
                <option value="vocabulary">Vocabulário</option>
                <option value="conversation">Conversação</option>
                <option value="listening">Compreensão Auditiva</option>
                <option value="reading">Leitura</option>
                <option value="writing">Escrita</option>
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
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Conteúdo
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full p-2 border rounded-md"
              required
            />
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
              {initialData ? "Atualizar" : "Criar"} Lição
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LessonForm;
