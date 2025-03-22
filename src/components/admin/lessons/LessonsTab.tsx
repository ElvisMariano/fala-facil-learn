
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2 } from "lucide-react";

interface LessonsTabProps {
  lessonsData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const LessonsTab: React.FC<LessonsTabProps> = ({ lessonsData, searchTerm, setSearchTerm }) => {
  // Filter data based on search term
  const filteredLessons = lessonsData.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Nova Lição
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                    <td className="py-3 px-2">{lesson.category}</td>
                    <td className="py-3 px-2">{lesson.level}</td>
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
                        <button className="p-1 hover:bg-muted rounded">
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded text-red-500">
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
              <p className="text-muted-foreground">Nenhuma lição encontrada para "{searchTerm}"</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredLessons.length} de {lessonsData.length} lições
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
