
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { BookOpen, Plus, Trash2 } from "lucide-react";

interface ExerciseQuestionProps {
  id: string;
  type: "multiple_choice" | "fill_blank" | "listening" | "matching";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audio?: string;
  explanation?: string;
}

interface InteractiveExerciseFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    level: string;
    category: string;
    introduction?: string;
    questions: ExerciseQuestionProps[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const InteractiveExerciseForm: React.FC<InteractiveExerciseFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    level: initialData?.level || "beginner",
    category: initialData?.category || "grammar",
    introduction: initialData?.introduction || "",
    questions: initialData?.questions || [
      { 
        id: Math.random().toString(36).slice(2), 
        type: "multiple_choice" as const, 
        question: "", 
        options: ["", "", "", ""], 
        correctAnswer: "", 
        explanation: "" 
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    
    // Reset options and correctAnswer when changing question type
    if (field === "type") {
      if (value === "multiple_choice") {
        updatedQuestions[index].options = ["", "", "", ""];
        updatedQuestions[index].correctAnswer = "";
      } else if (value === "matching") {
        updatedQuestions[index].options = ["", ""];
        updatedQuestions[index].correctAnswer = ["", ""];
      } else if (value === "fill_blank") {
        updatedQuestions[index].options = [];
        updatedQuestions[index].correctAnswer = "";
      } else if (value === "listening") {
        updatedQuestions[index].options = ["", "", "", ""];
        updatedQuestions[index].correctAnswer = "";
        updatedQuestions[index].audio = "";
      }
    }
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    const options = [...(updatedQuestions[questionIndex].options || [])];
    options[optionIndex] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleMatchingChange = (questionIndex: number, pairIndex: number, side: 'left' | 'right', value: string) => {
    const updatedQuestions = [...formData.questions];
    const correctAnswer = [...(Array.isArray(updatedQuestions[questionIndex].correctAnswer) 
      ? updatedQuestions[questionIndex].correctAnswer 
      : ["", ""])] as string[];
    
    correctAnswer[side === 'left' ? 0 : 1] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], correctAnswer };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { 
          id: Math.random().toString(36).slice(2), 
          type: "multiple_choice" as const, 
          question: "", 
          options: ["", "", "", ""], 
          correctAnswer: "", 
          explanation: "" 
        }
      ]
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length <= 1) return;
    
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id
    });
  };

  const renderQuestionFields = (question: ExerciseQuestionProps, qIndex: number) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <>
            <div className="mt-4 space-y-3">
              <label className="text-sm font-medium">Opções</label>
              {(question.options || []).map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <span className="font-medium">{String.fromCharCode(65 + oIndex)}.</span>
                  <input
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Resposta Correta</label>
              <select
                value={question.correctAnswer as string}
                onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Selecione a resposta correta</option>
                {(question.options || []).map((_, oIndex) => (
                  <option key={oIndex} value={String.fromCharCode(65 + oIndex)}>
                    {String.fromCharCode(65 + oIndex)}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
        
      case "fill_blank":
        return (
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">Resposta Correta</label>
            <input
              value={question.correctAnswer as string}
              onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Palavra ou frase correta"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use underscore (_) para indicar o espaço em branco na pergunta, ex: "I ___ to school yesterday."
            </p>
          </div>
        );
        
      case "listening":
        return (
          <>
            <div className="mt-2 space-y-2">
              <label className="text-sm font-medium">URL do Áudio</label>
              <input
                value={question.audio || ""}
                onChange={(e) => handleQuestionChange(qIndex, "audio", e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="URL para arquivo de áudio"
                required
              />
            </div>
            
            <div className="mt-4 space-y-3">
              <label className="text-sm font-medium">Opções</label>
              {(question.options || []).map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <span className="font-medium">{String.fromCharCode(65 + oIndex)}.</span>
                  <input
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Resposta Correta</label>
              <select
                value={question.correctAnswer as string}
                onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Selecione a resposta correta</option>
                {(question.options || []).map((_, oIndex) => (
                  <option key={oIndex} value={String.fromCharCode(65 + oIndex)}>
                    {String.fromCharCode(65 + oIndex)}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
        
      case "matching":
        return (
          <div className="mt-4 space-y-3">
            <label className="text-sm font-medium">Pares para Correspondência</label>
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((pairIndex) => (
                <div key={pairIndex} className="grid grid-cols-2 gap-2">
                  <input
                    value={Array.isArray(question.options) && question.options[pairIndex * 2] || ""}
                    onChange={(e) => handleOptionChange(qIndex, pairIndex * 2, e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder={`Item ${pairIndex + 1} (esquerda)`}
                  />
                  <input
                    value={Array.isArray(question.options) && question.options[pairIndex * 2 + 1] || ""}
                    onChange={(e) => handleOptionChange(qIndex, pairIndex * 2 + 1, e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder={`Item ${pairIndex + 1} (direita)`}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Os pares serão embaralhados na apresentação ao aluno.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {initialData ? "Editar Exercício Interativo" : "Novo Exercício Interativo"}
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
                <option value="grammar">Gramática</option>
                <option value="vocabulary">Vocabulário</option>
                <option value="listening">Compreensão Auditiva</option>
                <option value="reading">Leitura</option>
                <option value="writing">Escrita</option>
                <option value="mixed">Misto</option>
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
          
          <div className="space-y-2">
            <label htmlFor="introduction" className="text-sm font-medium">
              Introdução
            </label>
            <textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="Texto introdutório para contextualizar o exercício (opcional)"
            />
          </div>
          
          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Questões</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addQuestion}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Adicionar Questão
              </Button>
            </div>
            
            {formData.questions.map((question, qIndex) => (
              <div key={question.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Questão #{qIndex + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeQuestion(qIndex)}
                    disabled={formData.questions.length <= 1}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Questão</label>
                  <select
                    value={question.type}
                    onChange={(e) => handleQuestionChange(
                      qIndex, 
                      "type", 
                      e.target.value as "multiple_choice" | "fill_blank" | "listening" | "matching"
                    )}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="multiple_choice">Múltipla Escolha</option>
                    <option value="fill_blank">Preencher Lacuna</option>
                    <option value="listening">Compreensão Auditiva</option>
                    <option value="matching">Correspondência</option>
                  </select>
                </div>
                
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-medium">Pergunta</label>
                  <textarea
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                {renderQuestionFields(question, qIndex)}
                
                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">Explicação</label>
                  <textarea
                    value={question.explanation || ""}
                    onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                    placeholder="Explicação da resposta correta (opcional)"
                  />
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
              {initialData ? "Atualizar" : "Criar"} Exercício Interativo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InteractiveExerciseForm;
