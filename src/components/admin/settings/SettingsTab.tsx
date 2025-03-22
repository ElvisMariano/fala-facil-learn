
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, PencilLine } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Configurações do Sistema</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar configurações..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Nova Configuração
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Configuração</th>
                  <th className="py-3 px-2 text-left font-medium">Valor</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-2">Registros Abertos</td>
                  <td className="py-3 px-2">
                    <Switch id="open-registrations" defaultChecked />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-muted rounded">
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-2">Fórum Ativo</td>
                  <td className="py-3 px-2">
                    <Switch id="forum-active" defaultChecked />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-muted rounded">
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-2">Modo de Manutenção</td>
                  <td className="py-3 px-2">
                    <Switch id="maintenance-mode" />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-muted rounded">
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
