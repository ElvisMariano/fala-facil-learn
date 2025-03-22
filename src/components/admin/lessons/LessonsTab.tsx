
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, Filter, Eye, AlertCircle } from "lucide-react";
import LessonForm from "./LessonForm";
import { toast } from "sonner";

interface LessonsTabProps {
  lessonsData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const LessonsTab: React.FC<LessonsTabProps> = ({ 
  lessonsData, 
  searchTerm, 
  setSearchTerm 
}) => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Em um ambiente real, isso seria uma chamada à API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Simulando uma chamada à API
        setLoading(true);
        // Em um ambiente real, isso seria fetch('/api/lessons')
        setTimeout(() => {
          setLessons(lessonsData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Erro ao carregar lições. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchLessons();
  }, [lessonsData]);

  // Filtrar lições baseado na busca e filtros
  const filteredLessons = lessons.filter(lesson => 
    (lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     lesson.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (levelFilter === "all" || lesson.level === levelFilter) &&
    (categoryFilter === "all" || lesson.category === categoryFilter) &&
    (statusFilter === "all" || lesson.status === statusFilter)
  );

  const handleCreateLesson = (data: any) => {
    // Em um ambiente real, enviaria para a API
    const newLesson = {
      id: `lesson-${Date.now()}`,
      ...data,
      students: 0,
      createdAt: new Date().toISOString(),
    };
    
    setLessons([...lessons, newLesson]);
    setView("list");
    toast.success("Lição criada com sucesso!");
  };

  const handleUpdateLesson = (data: any) => {
    // Em um ambiente real, enviaria para a API
    const updatedLessons = lessons.map(lesson => 
      lesson.id === data.id ? { ...lesson, ...data } : lesson
    );
    setLessons(updatedLessons);
    setView("list");
    toast.success("Lição atualizada com sucesso!");
  };

  const handleDeleteLesson = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta lição?")) {
      // Em um ambiente real, enviaria para a API
      const updatedLessons = lessons.filter(lesson => lesson.id !== id);
      setLessons(updatedLessons);
      toast.success("Lição excluída com sucesso!");
    }
  };

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
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
        <LessonForm 
          onSubmit={handleCreateLesson}
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
        <LessonForm 
          initialData={selectedLesson}
          onSubmit={handleUpdateLesson}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Gerenciar Lições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Gerenciar Lições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-medium mb-2">Erro ao carregar lições</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Gerenciar Lições</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar lições..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setView("create")}>
                <FilePlus className="h-4 w-4 mr-2" />
                Nova Lição
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
            <div className="flex flex-wrap gap-2">
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
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">Todas as Categorias</option>
                <option value="grammar">Gramática</option>
                <option value="vocabulary">Vocabulário</option>
                <option value="conversation">Conversação</option>
                <option value="listening">Compreensão Auditiva</option>
                <option value="reading">Leitura</option>
                <option value="writing">Escrita</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">Todos os Status</option>
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
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
                  <th className="py-3 px-2 text-left font-medium">Alunos</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map(lesson => (
                  <tr key={lesson.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">{lesson.title}</td>
                    <td className="py-3 px-2">
                      {lesson.category === "grammar" && "Gramática"}
                      {lesson.category === "vocabulary" && "Vocabulário"}
                      {lesson.category === "conversation" && "Conversação"}
                      {lesson.category === "listening" && "Compreensão Auditiva"}
                      {lesson.category === "reading" && "Leitura"}
                      {lesson.category === "writing" && "Escrita"}
                    </td>
                    <td className="py-3 px-2">
                      {lesson.level === "beginner" && "Iniciante"}
                      {lesson.level === "intermediate" && "Intermediário"}
                      {lesson.level === "advanced" && "Avançado"}
                    </td>
                    <td className="py-3 px-2">{lesson.students}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lesson.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 hover:bg-muted rounded text-primary"
                          title="Visualizar lição"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 hover:bg-muted rounded"
                          onClick={() => handleEditLesson(lesson)}
                          title="Editar lição"
                        >
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 hover:bg-muted rounded text-red-500"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          title="Excluir lição"
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
          
          {filteredLessons.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhuma lição encontrada</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredLessons.length} de {lessons.length} lições
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

export default LessonsTab;
