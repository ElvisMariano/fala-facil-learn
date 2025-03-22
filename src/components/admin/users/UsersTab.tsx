
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, UserPlus, PencilLine, Trash2 } from "lucide-react";

interface UsersTabProps {
  usersData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({ usersData, searchTerm, setSearchTerm }) => {
  // Filter data based on search term
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Gerenciar Usuários</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Nome</th>
                  <th className="py-3 px-2 text-left font-medium">E-mail</th>
                  <th className="py-3 px-2 text-left font-medium">Nível</th>
                  <th className="py-3 px-2 text-left font-medium">Registrado em</th>
                  <th className="py-3 px-2 text-left font-medium">Último acesso</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center mr-2">
                          <span className="text-sm font-medium">{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{user.email}</td>
                    <td className="py-3 px-2">{user.level}</td>
                    <td className="py-3 px-2">{user.registered}</td>
                    <td className="py-3 px-2">{user.lastAccess}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
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
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhum usuário encontrado para "{searchTerm}"</p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredUsers.length} de {usersData.length} usuários
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

export default UsersTab;
