import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import {
  Users,
  BookOpen,
  Settings,
  BarChart3,
  FilePlus,
  PencilLine,
  Trash2,
  Search,
  UserPlus,
  Bell,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
  Plus,
  EyeOff,
  Eye,
  Flag,
  ShieldAlert,
  Filter,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Sample data for users
const usersData = [
  { id: 1, name: "Ana Oliveira", email: "ana.oliveira@email.com", level: "B1", registered: "10/03/2023", lastAccess: "12/06/2023", status: "active" },
  { id: 2, name: "Carlos Santos", email: "carlos.santos@email.com", level: "A2", registered: "15/04/2023", lastAccess: "10/06/2023", status: "active" },
  { id: 3, name: "Mariana Costa", email: "mariana.costa@email.com", level: "C1", registered: "05/01/2023", lastAccess: "11/06/2023", status: "active" },
  { id: 4, name: "Rafael Lima", email: "rafael.lima@email.com", level: "B2", registered: "20/02/2023", lastAccess: "01/06/2023", status: "inactive" },
  { id: 5, name: "Juliana Martins", email: "juliana.martins@email.com", level: "A1", registered: "30/05/2023", lastAccess: "08/06/2023", status: "active" }
];

// Sample data for lessons
const lessonsData = [
  { id: 1, title: "Present Simple", category: "Grammar", level: "A1", students: 145, completion: 85, status: "published" },
  { id: 2, title: "Family Vocabulary", category: "Vocabulary", level: "A1", students: 132, completion: 78, status: "published" },
  { id: 3, title: "Past Simple", category: "Grammar", level: "A2", students: 98, completion: 62, status: "published" },
  { id: 4, title: "Conditionals", category: "Grammar", level: "B1", students: 76, completion: 45, status: "draft" },
  { id: 5, title: "Business English", category: "Conversation", level: "B2", students: 54, completion: 38, status: "published" }
];

// Sample analytics data
const analyticsData = {
  totalUsers: 1250,
  activeUsers: 876,
  totalLessons: 48,
  completedLessons: 4350,
  feedbackScore: 4.7,
  userGrowth: [
    { month: "Jan", users: 950 },
    { month: "Feb", users: 1020 },
    { month: "Mar", users: 1080 },
    { month: "Apr", users: 1150 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1250 }
  ],
  lessonCompletion: [
    { category: "Grammar", completed: 1850 },
    { category: "Vocabulary", completed: 1250 },
    { category: "Listening", completed: 650 },
    { category: "Speaking", completed: 350 },
    { category: "Reading", completed: 450 }
  ]
};

// Sample notifications
const notificationsData = [
  { id: 1, type: "user", message: "Novo usuário registrado: Maria Silva", time: "1 hora atrás", read: false },
  { id: 2, type: "system", message: "Backup do sistema concluído com sucesso", time: "3 horas atrás", read: true },
  { id: 3, type: "message", message: "Nova mensagem no fórum: Dúvidas sobre verbos modais", time: "5 horas atrás", read: false },
  { id: 4, type: "alert", message: "Atenção: 5 usuários não acessam há mais de 30 dias", time: "1 dia atrás", read: true }
];

// Sample activities data
const activitiesData = [
  { id: 1, title: "Vocabulário - Cores", type: "Lição", category: "Vocabulário", level: "A1", status: "active", createdAt: "15/05/2023" },
  { id: 2, title: "Present Continuous", type: "Exercício", category: "Gramática", level: "A2", status: "active", createdAt: "20/05/2023" },
  { id: 3, title: "Animais Domésticos", type: "Flashcards", category: "Vocabulário", level: "A1", status: "inactive", createdAt: "25/05/2023" },
  { id: 4, title: "Preposições de Lugar", type: "Quiz", category: "Gramática", level: "B1", status: "active", createdAt: "30/05/2023" },
  { id: 5, title: "Conversação - Restaurante", type: "Diálogo", category: "Conversação", level: "B2", status: "active", createdAt: "02/06/2023" }
];

// Sample forum posts data
const forumPostsData = [
  { id: 1, title: "Dúvida sobre tempos verbais", author: "Ana Oliveira", date: "10/06/2023", status: "approved", flagged: false, replies: 5 },
  { id: 2, title: "Como praticar conversação?", author: "Carlos Santos", date: "09/06/2023", status: "approved", flagged: false, replies: 8 },
  { id: 3, title: "Material de estudo para iniciantes", author: "Mariana Costa", date: "08/06/2023", status: "pending", flagged: false, replies: 0 },
  { id: 4, title: "Conteúdo inapropriado", author: "Rafael Lima", date: "07/06/2023", status: "rejected", flagged: true, replies: 2 },
  { id: 5, title: "Cronograma de estudos", author: "Juliana Martins", date: "06/06/2023", status: "approved", flagged: false, replies: 4 }
];

// Admin panel tabs
type TabType = "dashboard" | "users" | "lessons" | "activities" | "forum" | "analytics" | "settings";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Activity management states
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  
  // Forum management states
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter data based on search term
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLessons = lessonsData.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActivities = activitiesData.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredForumPosts = forumPostsData
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => filterStatus === "all" || post.status === filterStatus);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

  const handleViewPost = (post: any) => {
    setCurrentPost(post);
    setShowPostDetails(true);
  };

  const handleApprovePost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Approving post with ID: ${id}`);
    // Then update the UI accordingly
  };

  const handleRejectPost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Rejecting post with ID: ${id}`);
    // Then update the UI accordingly
  };

  const handleDeletePost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Deleting post with ID: ${id}`);
    // Then update the UI accordingly
  };
  
  const renderAdminHeader = () => (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <h1 className="text-xl font-display font-semibold hidden md:block">Painel Administrativo</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-muted/50"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notificações</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notificationsData.map(notification => (
                    <div key={notification.id} className={`p-3 border-b hover:bg-muted/50 ${notification.read ? '' : 'bg-blue-50'}`}>
                      <div className="flex items-start">
                        {notification.type === "user" && <Users className="h-5 w-5 mr-2 text-blue-500" />}
                        {notification.type === "system" && <Settings className="h-5 w-5 mr-2 text-gray-500" />}
                        {notification.type === "message" && <MessageSquare className="h-5 w-5 mr-2 text-green-500" />}
                        {notification.type === "alert" && <AlertCircle className="h-5 w-5 mr-2 text-red-500" />}
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t">
                  <button className="text-sm text-primary hover:underline">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className="p-2 rounded-full hover:bg-muted/50">
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <div className="flex items-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Admin Avatar"
              className="h-8 w-8 rounded-full mr-2"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@falafacil.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSidebar = () => (
    <aside className={`bg-white border-r w-64 fixed inset-y-0 left-0 z-20 transition-transform duration-300 ease-in-out ${
      mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    }`}>
      <div className="h-16 border-b flex items-center px-6">
        <h1 className="text-xl font-display font-semibold">Fala Fácil</h1>
      </div>
      
      <nav className="p-4 space-y-1">
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "dashboard" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <BarChart3 className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "users" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <Users className="h-5 w-5 mr-3" />
          <span>Usuários</span>
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "lessons" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("lessons")}
        >
          <BookOpen className="h-5 w-5 mr-3" />
          <span>Lições</span>
        </button>

        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "activities" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          <Calendar className="h-5 w-5 mr-3" />
          <span>Atividades</span>
        </button>

        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "forum" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("forum")}
        >
          <MessageSquare className="h-5 w-5 mr-3" />
          <span>Fórum</span>
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "analytics" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 className="h-5 w-5 mr-3" />
          <span>Análises</span>
        </button>
        
        <button
          className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
            activeTab === "settings" ? "bg-primary text-white" : "hover:bg-muted/50"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="h-5 w-5 mr-3" />
          <span>Configurações</span>
        </button>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Button 
          variant="outline" 
          width="full" 
          as={Link} 
          to="/"
          className="flex items-center justify-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
  
  const renderDashboard = () => (
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
  
  const renderUsers = () => (
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
  
  const renderLessons = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Gerenciar Lições</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0
