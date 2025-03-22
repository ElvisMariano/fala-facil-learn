
import React from "react";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings, 
  MessageSquare, 
  LogOut,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";

type TabType = "dashboard" | "users" | "lessons" | "activities" | "forum" | "analytics" | "settings";

interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;  // Corrigido o tipo aqui
  mobileMenuOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  mobileMenuOpen 
}) => {
  return (
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
};

export default AdminSidebar;
