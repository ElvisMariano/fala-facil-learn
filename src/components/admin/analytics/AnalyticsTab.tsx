
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine, Trash2 } from "lucide-react";

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
                Nova Análise
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Mês</th>
                  <th className="py-3 px-2 text-left font-medium">Usuários</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.userGrowth.map(growth => (
                  <tr key={growth.month} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">{growth.month}</td>
                    <td className="py-3 px-2">{growth.users}</td>
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
          
          {analyticsData.userGrowth.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhuma análise de usuário encontrada para "{searchTerm}"</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {analyticsData.userGrowth.length} de {analyticsData.userGrowth.length} análises de usuário
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

export default AnalyticsTab;
