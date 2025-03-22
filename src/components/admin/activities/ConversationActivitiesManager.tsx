
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  X, 
  Save,
  Volume2,
  MessageSquare,
  ListChecks
} from "lucide-react";

// Tipo para atividades de conversação
interface ConversationActivity {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'role-play' | 'dialogue' | 'discussion' | 'interview';
  participants: number;
  duration: number; // em minutos
  topics: string[];
  hasAudio: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Dados de exemplo para atividades de conversação
const sampleActivities: ConversationActivity[] = [
  {
    id: 1,
    title: "No Restaurante",
    description: "Praticar diálogo em um restaurante, fazendo pedidos e conversando com o garçom.",
    level: "beginner",
    type: "role-play",
    participants: 2,
    duration: 10,
    topics: ["food", "ordering", "restaurant"],
    hasAudio: true,
    status: "active",
    createdAt: "12/03/2023"
  },
  {
    id: 2,
    title: "Entrevista de Emprego",
    description: "Simular uma entrevista de emprego para praticar vocabulário profissional.",
    level: "intermediate",
    type: "interview",
    participants: 2,
    duration: 15,
    topics: ["job", "career", "professional"],
    hasAudio: true,
    status: "active",
    createdAt: "15/04/2023"
  },
  {
    id: 3,
    title: "Debate: Meio Ambiente",
    description: "Debater sobre questões ambientais e soluções sustentáveis.",
    level: "advanced",
    type: "discussion",
    participants: 4,
    duration: 20,
    topics: ["environment", "sustainability", "climate"],
    hasAudio: false,
    status: "active",
    createdAt: "22/05/2023"
  },
  {
    id: 4,
    title: "Conversação Cotidiana",
    description: "Praticar diálogos do dia a dia com situações comuns.",
    level: "beginner",
    type: "dialogue",
    participants: 2,
    duration: 8,
    topics: ["daily life", "casual", "greetings"],
    hasAudio: true,
    status: "inactive",
    createdAt: "10/02/2023"
  }
];

const ConversationActivitiesManager: React.FC = () => {
  const [activities, setActivities] = useState<ConversationActivity[]>(sampleActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ConversationActivity | null>(null);
  const [newActivity, setNewActivity] = useState<Partial<ConversationActivity>>({
    title: "",
    description: "",
    level: "beginner",
    type: "dialogue",
    participants: 2,
    duration: 10,
    topics: [],
    hasAudio: false,
    status: "active"
  });
  const [topicInput, setTopicInput] = useState("");

  // Filtrar atividades baseado no termo de busca
  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Manipulador para editar uma atividade
  const handleEditActivity = (activity: ConversationActivity) => {
    setEditingActivity(activity);
    setNewActivity(activity);
    setIsFormOpen(true);
  };

  // Manipulador para excluir uma atividade
  const handleDeleteActivity = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  // Manipulador para mudanças no formulário
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewActivity(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'participants' || name === 'duration') {
      setNewActivity(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setNewActivity(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manipulador para adicionar tópicos
  const handleAddTopic = () => {
    if (topicInput.trim()) {
      setNewActivity(prev => ({
        ...prev,
        topics: [...(prev.topics || []), topicInput.trim()]
      }));
      setTopicInput("");
    }
  };

  // Manipulador para remover tópicos
  const handleRemoveTopic = (topicToRemove: string) => {
    setNewActivity(prev => ({
      ...prev,
      topics: (prev.topics || []).filter(topic => topic !== topicToRemove)
    }));
  };

  // Manipulador para salvar uma atividade
  const handleSaveActivity = () => {
    if (!newActivity.title || !newActivity.description) {
      alert("Título e descrição são campos obrigatórios!");
      return;
    }

    if (editingActivity) {
      // Atualizar atividade existente
      setActivities(activities.map(activity => 
        activity.id === editingActivity.id ? { ...activity, ...newActivity } as ConversationActivity : activity
      ));
    } else {
      // Adicionar nova atividade
      const newId = Math.max(...activities.map(activity => activity.id), 0) + 1;
      const today = new Date().toLocaleDateString("pt-BR");
      
      setActivities([
        ...activities, 
        { 
          ...newActivity as ConversationActivity, 
          id: newId,
          createdAt: today
        }
      ]);
    }

    // Resetar o formulário
    setNewActivity({
      title: "",
      description: "",
      level: "beginner",
      type: "dialogue",
      participants: 2,
      duration: 10,
      topics: [],
      hasAudio: false,
      status: "active"
    });
    setEditingActivity(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Gerenciar Atividades de Conversação</CardTitle>
              <CardDescription>Crie e edite atividades para praticar habilidades de conversação</CardDescription>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar atividades..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Atividade
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isFormOpen && (
            <Card className="mb-6 border border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {editingActivity ? "Editar Atividade" : "Nova Atividade"}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => {
                    setIsFormOpen(false);
                    setEditingActivity(null);
                    setNewActivity({
                      title: "",
                      description: "",
                      level: "beginner",
                      type: "dialogue",
                      participants: 2,
                      duration: 10,
                      topics: [],
                      hasAudio: false,
                      status: "active"
                    });
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Título *</label>
                    <Input
                      name="title"
                      value={newActivity.title || ""}
                      onChange={handleFormChange}
                      placeholder="Ex: Conversação no Restaurante"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Descrição *</label>
                    <Textarea
                      name="description"
                      value={newActivity.description || ""}
                      onChange={handleFormChange}
                      placeholder="Descreva a atividade e seus objetivos"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nível</label>
                    <select
                      name="level"
                      value={newActivity.level || "beginner"}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Atividade</label>
                    <select
                      name="type"
                      value={newActivity.type || "dialogue"}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="dialogue">Diálogo</option>
                      <option value="role-play">Role-Play</option>
                      <option value="discussion">Discussão</option>
                      <option value="interview">Entrevista</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Participantes</label>
                    <Input
                      name="participants"
                      type="number"
                      min={1}
                      max={10}
                      value={newActivity.participants || 2}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duração (minutos)</label>
                    <Input
                      name="duration"
                      type="number"
                      min={5}
                      max={60}
                      value={newActivity.duration || 10}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Tópicos</label>
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="Adicionar tópico"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTopic();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTopic}
                        variant="outline"
                      >
                        Adicionar
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newActivity.topics?.map((topic, index) => (
                        <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                          <span className="text-sm">{topic}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTopic(topic)}
                            className="ml-2 text-primary hover:text-primary/70"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasAudio"
                      name="hasAudio"
                      checked={newActivity.hasAudio || false}
                      onChange={(e) => 
                        setNewActivity(prev => ({ ...prev, hasAudio: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <label htmlFor="hasAudio" className="text-sm font-medium">
                      Esta atividade possui áudio de exemplo
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="status"
                      name="status"
                      checked={newActivity.status === 'active'}
                      onChange={(e) => 
                        setNewActivity(prev => ({ 
                          ...prev, 
                          status: e.target.checked ? 'active' : 'inactive' 
                        }))
                      }
                      className="rounded"
                    />
                    <label htmlFor="status" className="text-sm font-medium">
                      Atividade ativa
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => {
                    setIsFormOpen(false);
                    setEditingActivity(null);
                  }}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveActivity}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Participantes</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.title}</TableCell>
                    <TableCell>
                      {activity.type === 'dialogue' && 'Diálogo'}
                      {activity.type === 'role-play' && 'Role-Play'}
                      {activity.type === 'discussion' && 'Discussão'}
                      {activity.type === 'interview' && 'Entrevista'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activity.level === 'beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : activity.level === 'intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.level === 'beginner' 
                          ? 'Iniciante' 
                          : activity.level === 'intermediate' 
                            ? 'Intermediário' 
                            : 'Avançado'}
                      </span>
                    </TableCell>
                    <TableCell>{activity.participants}</TableCell>
                    <TableCell>{activity.duration} min</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activity.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell>{activity.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditActivity(activity)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `Nenhuma atividade encontrada para "${searchTerm}"` 
                  : "Nenhuma atividade cadastrada"}
              </p>
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
    </div>
  );
};

export default ConversationActivitiesManager;
