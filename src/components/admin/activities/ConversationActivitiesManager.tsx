
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2, EyeOff, Eye, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface ConversationActivityType {
  id: number;
  title: string;
  level: string;
  minutes: number;
  rating: number;
  scenarios: string[];
  active: boolean;
  description: string;
}

const sampleConversationActivities: ConversationActivityType[] = [
  {
    id: 1,
    title: "Saudações e Apresentações",
    level: "A1",
    minutes: 15,
    rating: 4.5,
    scenarios: ["No escritório", "Em uma festa", "Na rua"],
    active: true,
    description: "Diálogos básicos para cumprimentos e apresentações"
  },
  {
    id: 2,
    title: "No Restaurante",
    level: "A2",
    minutes: 20,
    rating: 4.7,
    scenarios: ["Fazendo reservas", "Pedindo comida", "Pagando a conta"],
    active: true,
    description: "Como fazer pedidos e se comunicar em restaurantes"
  },
  {
    id: 3,
    title: "Fazendo Compras",
    level: "A2",
    minutes: 25,
    rating: 4.6,
    scenarios: ["Em uma loja de roupas", "No supermercado", "Negociando preços"],
    active: true,
    description: "Diálogos úteis para compras em lojas"
  },
  {
    id: 4,
    title: "Viagens",
    level: "A2-B1",
    minutes: 30,
    rating: 4.9,
    scenarios: ["No aeroporto", "No hotel", "Pedindo direções"],
    active: true,
    description: "Conversas em situações de viagem"
  },
  {
    id: 5,
    title: "Entrevista de Emprego",
    level: "B1",
    minutes: 35,
    rating: 4.8,
    scenarios: ["Qualificações", "Experiência anterior", "Respondendo perguntas comuns"],
    active: true,
    description: "Como se comunicar em uma entrevista de trabalho"
  }
];

interface ConversationActivitiesManagerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ConversationActivitiesManager: React.FC<ConversationActivitiesManagerProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const [activities, setActivities] = useState<ConversationActivityType[]>(sampleConversationActivities);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<ConversationActivityType | null>(null);
  const [newScenario, setNewScenario] = useState("");
  const [editingScenarios, setEditingScenarios] = useState<string[]>([]);
  
  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditActivity = (activity: ConversationActivityType) => {
    setCurrentActivity(activity);
    setEditingScenarios([...activity.scenarios]);
    setShowActivityForm(true);
  };

  const handleAddScenario = () => {
    if (newScenario.trim() && editingScenarios) {
      setEditingScenarios([...editingScenarios, newScenario.trim()]);
      setNewScenario("");
    }
  };

  const handleRemoveScenario = (index: number) => {
    setEditingScenarios(editingScenarios.filter((_, i) => i !== index));
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Exemplo de implementação - em um app real, isso seria uma chamada à API
    if (currentActivity) {
      // Editar atividade existente
      setActivities(activities.map(act => 
        act.id === currentActivity.id 
          ? {...currentActivity, scenarios: editingScenarios} 
          : act
      ));
    } else {
      // Adicionar nova atividade
      const newActivity: ConversationActivityType = {
        id: Math.max(0, ...activities.map(a => a.id)) + 1,
        title: "Nova Atividade",
        level: "A1",
        minutes: 15,
        rating: 4.0,
        scenarios: editingScenarios,
        active: true,
        description: "Descrição da nova atividade"
      };
      setActivities([...activities, newActivity]);
    }
    
    setShowActivityForm(false);
    setCurrentActivity(null);
    setEditingScenarios([]);
  };

  const handleToggleActive = (id: number) => {
    setActivities(activities.map(act => 
      act.id === id ? {...act, active: !act.active} : act
    ));
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(act => act.id !== id));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Gerenciar Atividades de Conversação</CardTitle>
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
              setEditingScenarios([]);
              setShowActivityForm(true);
            }}>
              <FilePlus className="h-4 w-4 mr-2" />
              Nova Atividade
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="border rounded-lg overflow-hidden">
              <div className={`p-4 ${activity.active ? 'bg-white' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    activity.level.includes('A1') ? 'bg-green-100 text-green-800' :
                    activity.level.includes('A2') ? 'bg-blue-100 text-blue-800' :
                    activity.level.includes('B1') ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {activity.level}
                  </span>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 hover:bg-muted rounded"
                      onClick={() => handleEditActivity(activity)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 hover:bg-muted rounded"
                      onClick={() => handleToggleActive(activity.id)}
                    >
                      {activity.active ? 
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
                </div>
                <h3 className="font-medium text-lg mb-1">{activity.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                
                <div className="flex items-center text-sm mb-3">
                  <span className="mr-4">{activity.minutes} minutos</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-1">{activity.rating}</span>
                  </div>
                </div>
                
                <div className="text-sm font-medium mb-1">Cenários:</div>
                <div className="flex flex-wrap gap-2">
                  {activity.scenarios.map((scenario, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {scenario}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {filteredActivities.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">Nenhuma atividade encontrada para "{searchTerm}"</p>
            </div>
          )}
        </div>
          
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
              <form className="space-y-4" onSubmit={handleSaveActivity}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
                  <Input 
                    id="title" 
                    placeholder="Digite o título da atividade" 
                    defaultValue={currentActivity?.title || ""} 
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium mb-1">Nível</label>
                    <select 
                      id="level" 
                      className="w-full border rounded-md p-2" 
                      defaultValue={currentActivity?.level || "A1"}
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="A1-A2">A1-A2</option>
                      <option value="A2-B1">A2-B1</option>
                      <option value="B1">B1</option>
                      <option value="B1-B2">B1-B2</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C1-C2">C1-C2</option>
                      <option value="C2">C2</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="minutes" className="block text-sm font-medium mb-1">Duração (minutos)</label>
                    <Input 
                      id="minutes" 
                      type="number" 
                      min="1" 
                      defaultValue={currentActivity?.minutes.toString() || "15"} 
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Descrição</label>
                  <Textarea 
                    id="description" 
                    placeholder="Digite uma descrição para a atividade" 
                    className="min-h-24" 
                    defaultValue={currentActivity?.description || ""}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cenários</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editingScenarios.map((scenario, index) => (
                      <div key={index} className="flex items-center bg-muted rounded-full pl-3 pr-1 py-1">
                        <span className="text-sm">{scenario}</span>
                        <button 
                          type="button"
                          className="ml-1 p-1 hover:bg-gray-200 rounded-full" 
                          onClick={() => handleRemoveScenario(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <Input 
                      placeholder="Adicionar novo cenário" 
                      value={newScenario}
                      onChange={(e) => setNewScenario(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button"
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={handleAddScenario}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    defaultChecked={currentActivity?.active ?? true}
                  />
                  <label htmlFor="active" className="text-sm font-medium">Atividade ativa</label>
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
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredActivities.length} de {activities.length} atividades
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

export default ConversationActivitiesManager;
