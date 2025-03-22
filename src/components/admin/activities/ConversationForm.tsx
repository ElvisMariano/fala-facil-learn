
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

interface DialogueLineProps {
  id: string;
  speaker: string;
  text: string;
  translation?: string;
  audio?: string;
}

interface QuestionProps {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

interface ConversationFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    level: string;
    category: string;
    dialogue: DialogueLineProps[];
    questions: QuestionProps[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ConversationForm: React.FC<ConversationFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    level: initialData?.level || "beginner",
    category: initialData?.category || "daily",
    dialogue: initialData?.dialogue || [
      { id: Math.random().toString(36).slice(2), speaker: "Person 1", text: "", translation: "", audio: "" },
      { id: Math.random().toString(36).slice(2), speaker: "Person 2", text: "", translation: "", audio: "" }
    ],
    questions: initialData?.questions || [
      { id: Math.random().toString(36).slice(2), text: "", options: ["", "", "", ""], correctAnswer: "", explanation: "" }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDialogueChange = (index: number, field: string, value: string) => {
    const updatedDialogue = [...formData.dialogue];
    updatedDialogue[index] = { ...updatedDialogue[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      dialogue: updatedDialogue
    }));
  };

  const addDialogueLine = () => {
    setFormData(prev => ({
      ...prev,
      dialogue: [
        ...prev.dialogue,
        { 
          id: Math.random().toString(36).slice(2), 
          speaker: `Person ${prev.dialogue.length % 2 === 0 ? "1" : "2"}`, 
          text: "", 
          translation: "", 
          audio: "" 
        }
      ]
    }));
  };

  const removeDialogueLine = (index: number) => {
    if (formData.dialogue.length <= 2) return;
    
    const updatedDialogue = [...formData.dialogue];
    updatedDialogue.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      dialogue: updatedDialogue
    }));
  };

  const handleQuestionChange = (index: number, field: string, value: string | string[]) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    const options = [...(updatedQuestions[questionIndex].options || ["", "", "", ""])];
    options[optionIndex] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options };
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
        { id: Math.random().toString(36).slice(2), text: "", options: ["", "", "", ""], correctAnswer: "", explanation: "" }
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

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {initialData ? "Editar Atividade de Conversação" : "Nova Atividade de Conversação"}
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
                <option value="daily">Conversas Diárias</option>
                <option value="business">Negócios</option>
                <option value="travel">Viagens</option>
                <option value="academic">Acadêmico</option>
                <option value="social">Social</option>
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
          
          {/* Dialogue Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Diálogo</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addDialogueLine}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Adicionar Fala
              </Button>
            </div>
            
            {formData.dialogue.map((line, index) => (
              <div key={line.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Fala #{index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeDialogueLine(index)}
                    disabled={formData.dialogue.length <= 2}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pessoa</label>
                    <input
                      value={line.speaker}
                      onChange={(e) => handleDialogueChange(index, "speaker", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Texto em Inglês</label>
                    <textarea
                      value={line.text}
                      onChange={(e) => handleDialogueChange(index, "text", e.target.value)}
                      rows={2}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-medium">Tradução para Português</label>
                  <textarea
                    value={line.translation}
                    onChange={(e) => handleDialogueChange(index, "translation", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-medium">URL do Áudio</label>
                  <input
                    value={line.audio}
                    onChange={(e) => handleDialogueChange(index, "audio", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="URL para arquivo de áudio"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Perguntas</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addQuestion}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Adicionar Pergunta
              </Button>
            </div>
            
            {formData.questions.map((question, qIndex) => (
              <div key={question.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Pergunta #{qIndex + 1}</h4>
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
                  <label className="text-sm font-medium">Texto da Pergunta</label>
                  <textarea
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <label className="text-sm font-medium">Opções</label>
                  {(question.options || ["", "", "", ""]).map((option, oIndex) => (
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
                    value={question.correctAnswer}
                    onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Selecione a resposta correta</option>
                    {(question.options || ["", "", "", ""]).map((_, oIndex) => (
                      <option key={oIndex} value={String.fromCharCode(65 + oIndex)}>
                        {String.fromCharCode(65 + oIndex)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-2 space-y-2">
                  <label className="text-sm font-medium">Explicação</label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded-md"
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
              {initialData ? "Atualizar" : "Criar"} Atividade de Conversação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConversationForm;
