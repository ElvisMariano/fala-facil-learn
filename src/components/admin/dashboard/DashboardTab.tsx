
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Users, BookOpen, CheckCircle, MessageSquare, Settings, AlertCircle } from "lucide-react";

interface DashboardTabProps {
  setActiveTab: (tab: string) => void;
  usersData: any[];
  lessonsData: any[];
  analyticsData: any;
  notificationsData: any[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ 
  setActiveTab, 
  usersData, 
  lessonsData, 
  analyticsData, 
  notificationsData 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                <p className="text-3xl font-bold mt-1">{analyticsData.totalUsers}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500">+12%</span>
              <span className="text-muted-foreground ml-2">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lições Criadas</p>
                <p className="text-3xl font-bold mt-1">{analyticsData.totalLessons}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500">+5</span>
              <span className="text-muted-foreground ml-2">últimos 30 dias</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lições Completadas</p>
                <p className="text-3xl font-bold mt-1">{analyticsData.completedLessons}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500">+820</span>
              <span className="text-muted-foreground ml-2">últimos 30 dias</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nota de Satisfação</p>
                <p className="text-3xl font-bold mt-1">{analyticsData.feedbackScore}/5</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500">+0.2</span>
              <span className="text-muted-foreground ml-2">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Últimos Usuários Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersData.slice(0, 3).map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center mr-3">
                      <span className="font-medium">{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p>{user.registered}</p>
                    <p className={`text-xs ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="subtle" size="sm" onClick={() => setActiveTab("users")}>
                Ver Todos os Usuários
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Últimas Lições Criadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessonsData.slice(0, 3).map(lesson => (
                <div key={lesson.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-muted rounded-lg h-10 w-10 flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">{lesson.category} • Nível {lesson.level}</p>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p>{lesson.students} alunos</p>
                    <p className={`text-xs ${lesson.status === 'published' ? 'text-green-500' : 'text-amber-500'}`}>
                      {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="subtle" size="sm" onClick={() => setActiveTab("lessons")}>
                Ver Todas as Lições
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notificações Recentes</CardTitle>
            <Button variant="outline" size="sm">Marcar todas como lidas</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {notificationsData.map(notification => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg ${notification.read ? 'bg-muted/30' : 'bg-blue-50'} hover:bg-muted/50`}
              >
                <div className="flex items-start">
                  {notification.type === "user" && <Users className="h-5 w-5 mr-3 text-blue-500" />}
                  {notification.type === "system" && <Settings className="h-5 w-5 mr-3 text-gray-500" />}
                  {notification.type === "message" && <MessageSquare className="h-5 w-5 mr-3 text-green-500" />}
                  {notification.type === "alert" && <AlertCircle className="h-5 w-5 mr-3 text-red-500" />}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="subtle" size="sm">
              Ver Todas as Notificações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
