
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, EyeOff, Eye, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface ActivitiesTabProps {
  activitiesData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activitiesData, searchTerm, setSearchTerm }) => {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  
  // Filter data based on search term
  const filteredActivities = activitiesData.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditActivity = (activity: any) => {
    setCurrentActivity(activity);
    setShowActivityForm(true);
  };

  const handleDeleteActivity = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Deleting activity with ID: ${id}`);
    // Then update the UI accordingly
  };

  const handleToggleActivityStatus = (id: number, currentStatus: string) => {
    // In a real app, this would be an API call
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`Toggling activity with ID: ${id} to ${newStatus}`);
    // Then update the UI accordingly
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Gerenciar Atividades</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar atividades..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => {
                setCurrentActivity(null);
                setShowActivityForm(true);
              }}>
                <FilePlus className="h-4 w-4 mr-2" />
                Nova Atividade
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
                  <th className="py-3 px-2 text-left font-medium">Tipo</th>
                  <th className="py-3 px-2 text-left font-medium">Categoria</th>
                  <th className="py-3 px-2 text-left font-medium">Nível</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map(activity => (
                  <tr key={activity.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">{activity.title}</td>
                    <td className="py-3 px-2">{activity.type}</td>
                    <td className="py-3 px-2">{activity.category}</td>
                    <td className="py-3 px-2">{activity.level}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {activity.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 hover:bg-muted rounded"
                          onClick={() => handleEditActivity(activity)}
                        >
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 hover:bg-muted rounded"
                          onClick={() => handleToggleActivityStatus(activity.id, activity.status)}
                        >
                          {activity.status === 'active' ? 
                            <EyeOff className="h-4 w-4 text-amber-500" /> : 
                            <Eye className="h-4 w-4 text-green-500" />
                          }
                        </button>
                        <button 
                          className="p-1 hover:bg-muted rounded text-red-500"
                          onClick={() => handleDeleteActivity(activity.id)}
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
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhuma atividade encontrada para "{searchTerm}"</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredActivities.length} de {activitiesData.length} atividades
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showActivityForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {currentActivity ? "Editar Atividade" : "Nova Atividade"}
              </h3>
              <button 
                className="p-1 hover:bg-muted rounded"
                onClick={() => setShowActivityForm(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
                <Input 
                  id="title" 
                  placeholder="Digite o título da atividade" 
                  defaultValue={currentActivity?.title || ""} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1">Tipo</label>
                  <select 
                    id="type" 
                    className="w-full border rounded-md p-2" 
                    defaultValue={currentActivity?.type || ""}
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="Lição">Lição</option>
                    <option value="Exercício">Exercício</option>
                    <option value="Flashcards">Flashcards</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Diálogo">Diálogo</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Categoria</label>
                  <select 
                    id="category" 
                    className="w-full border rounded-md p-2" 
                    defaultValue={currentActivity?.category || ""}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Vocabulário">Vocabulário</option>
                    <option value="Gramática">Gramática</option>
                    <option value="Conversação">Conversação</option>
                    <option value="Listening">Listening</option>
                    <option value="Reading">Reading</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="level" className="block text-sm font-medium mb-1">Nível</label>
                  <select 
                    id="level" 
                    className="w-full border rounded-md p-2" 
                    defaultValue={currentActivity?.level || ""}
                  >
                    <option value="">Selecione um nível</option>
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
                  placeholder="Digite uma descrição para a atividade" 
                  className="min-h-24" 
                  defaultValue={currentActivity?.description || ""}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="status" 
                  defaultChecked={currentActivity?.status === 'active'}
                />
                <label htmlFor="status" className="text-sm font-medium">Atividade ativa</label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowActivityForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {currentActivity ? "Atualizar" : "Criar"} Atividade
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;
