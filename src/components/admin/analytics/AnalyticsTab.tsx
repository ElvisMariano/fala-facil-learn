
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from "recharts";
import { Search, FilePlus, PencilLine, Trash2, ChevronDown } from "lucide-react";

interface AnalyticsTabProps {
  analyticsData: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ analyticsData, searchTerm, setSearchTerm }) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Análises de Usuário</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar análises..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crescimento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#4f46e5" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lições Completadas por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.lessonCompletion}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Mês</th>
                  <th className="py-3 px-2 text-left font-medium">Usuários</th>
                  <th className="py-3 px-2 text-left font-medium">Lições Completadas</th>
                  <th className="py-3 px-2 text-left font-medium">Taxa de Retenção</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.userGrowth.map(growth => (
                  <tr key={growth.month} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">{growth.month}</td>
                    <td className="py-3 px-2">{growth.users}</td>
                    <td className="py-3 px-2">{Math.floor(growth.users * 0.75)}</td>
                    <td className="py-3 px-2">{Math.floor(70 + Math.random() * 20)}%</td>
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
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {analyticsData.userGrowth.length} de {analyticsData.userGrowth.length} meses
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Estatísticas de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-blue-700 font-medium mb-1">Lições Interativas</h3>
              <p className="text-2xl font-bold">{analyticsData.totalLessons}</p>
              <p className="text-sm text-muted-foreground mt-1">Média de conclusão: 78%</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-green-700 font-medium mb-1">Flashcards</h3>
              <p className="text-2xl font-bold">2,458</p>
              <p className="text-sm text-muted-foreground mt-1">Média de memorização: 65%</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-purple-700 font-medium mb-1">Atividades de Conversação</h3>
              <p className="text-2xl font-bold">1,245</p>
              <p className="text-sm text-muted-foreground mt-1">Taxa de conclusão: 82%</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Desempenho por Tipo de Atividade</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 text-left font-medium">Tipo de Atividade</th>
                  <th className="py-2 px-2 text-left font-medium">Quantidade</th>
                  <th className="py-2 px-2 text-left font-medium">Taxa de Conclusão</th>
                  <th className="py-2 px-2 text-left font-medium">Tempo Médio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-2 px-2">Múltipla escolha</td>
                  <td className="py-2 px-2">245</td>
                  <td className="py-2 px-2">92%</td>
                  <td className="py-2 px-2">1min 35s</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-2 px-2">Preenchimento de lacunas</td>
                  <td className="py-2 px-2">189</td>
                  <td className="py-2 px-2">84%</td>
                  <td className="py-2 px-2">2min 10s</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-2 px-2">Listening</td>
                  <td className="py-2 px-2">156</td>
                  <td className="py-2 px-2">76%</td>
                  <td className="py-2 px-2">3min 45s</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-2 px-2">Flashcards</td>
                  <td className="py-2 px-2">2,458</td>
                  <td className="py-2 px-2">65%</td>
                  <td className="py-2 px-2">0min 45s</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-2 px-2">Diálogos</td>
                  <td className="py-2 px-2">87</td>
                  <td className="py-2 px-2">89%</td>
                  <td className="py-2 px-2">5min 20s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
