
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, Filter } from "lucide-react";
import InteractiveExerciseForm from "./InteractiveExerciseForm";

// Dados mock para exercícios interativos
const mockExercises = [
  {
    id: "ex1",
    title: "Verbos no Presente Simples",
    description: "Pratique a conjugação de verbos no presente simples",
    level: "beginner",
    category: "grammar",
    questionCount: 5,
    status: "published",
    createdAt: "2023-09-12",
  },
  {
    id: "ex2",
    title: "Vocabulário de Alimentos",
    description: "Teste seu conhecimento sobre comidas e bebidas",
    level: "intermediate",
    category: "vocabulary",
    questionCount: 8,
    status: "published",
    createdAt: "2023-09-15",
  },
  {
    id: "ex3",
    title: "Compreensão Auditiva - Conversas Cotidianas",
    description: "Escute e responda sobre conversas do dia a dia",
    level: "advanced",
    category: "listening",
    questionCount: 3,
    status: "draft",
    createdAt: "2023-09-18",
  },
];

interface InteractiveExercisesManagerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const InteractiveExercisesManager: React.FC<InteractiveExercisesManagerProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [exercises, setExercises] = useState(mockExercises);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setcategoryFilter] = useState<string>("all");

  // Filtrar os exercícios
  const filteredExercises = exercises.filter(exercise => 
    (exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (levelFilter === "all" || exercise.level === levelFilter) &&
    (categoryFilter === "all" || exercise.category === categoryFilter)
  );

  const handleCreateExercise = (data: any) => {
    const newExercise = {
      id: `ex${exercises.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      questionCount: data.questions.length,
      ...data
    };
    setExercises([...exercises, newExercise]);
    setView("list");
  };

  const handleUpdateExercise = (data: any) => {
    const updatedExercises = exercises.map(exercise => 
      exercise.id === data.id ? { ...exercise, ...data, questionCount: data.questions.length } : exercise
    );
    setExercises(updatedExercises);
    setView("list");
  };

  const handleDeleteExercise = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este exercício?")) {
      const updatedExercises = exercises.filter(exercise => exercise.id !== id);
      setExercises(updatedExercises);
    }
  };

  const handleEditExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setView("edit");
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
        <InteractiveExerciseForm 
          onSubmit={handleCreateExercise}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setView("list")}
          className="mb-4"
        >
          Voltar para Lista
        </Button>
        <InteractiveExerciseForm 
          initialData={selectedExercise}
          onSubmit={handleUpdateExercise}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Exercícios Interativos</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar exercícios..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setView("create")}>
                <FilePlus className="h-4 w-4 mr-2" />
                Novo Exercício
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
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
                onChange={(e) => setcategoryFilter(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">Todas as Categorias</option>
                <option value="grammar">Gramática</option>
                <option value="vocabulary">Vocabulário</option>
                <option value="listening">Compreensão Auditiva</option>
                <option value="reading">Leitura</option>
                <option value="mixed">Misto</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Título</th>
                  <th className="py-3 px-2 text-left font-medium">Categoria</th>
                  <th className="py-3 px-2 text-left font-medium">Nível</th>
                  <th className="py-3 px-2 text-left font-medium">Questões</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredExercises.map(exercise => (
                  <tr key={exercise.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">{exercise.title}</td>
                    <td className="py-3 px-2">
                      {exercise.category === "grammar" && "Gramática"}
                      {exercise.category === "vocabulary" && "Vocabulário"}
                      {exercise.category === "listening" && "Compreensão Auditiva"}
                      {exercise.category === "reading" && "Leitura"}
                      {exercise.category === "mixed" && "Misto"}
                    </td>
                    <td className="py-3 px-2">
                      {exercise.level === "beginner" && "Iniciante"}
                      {exercise.level === "intermediate" && "Intermediário"}
                      {exercise.level === "advanced" && "Avançado"}
                    </td>
                    <td className="py-3 px-2">{exercise.questionCount}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        exercise.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {exercise.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 hover:bg-muted rounded"
                          onClick={() => handleEditExercise(exercise)}
                        >
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 hover:bg-muted rounded text-red-500"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredExercises.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhum exercício encontrado</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredExercises.length} de {exercises.length} exercícios
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

export default InteractiveExercisesManager;
