
import React, { useState } from "react";
import { 
  Bell, 
  Users, 
  Settings, 
  MessageSquare, 
  AlertCircle, 
  HelpCircle, 
  Menu, 
  X 
} from "lucide-react";

interface AdminHeaderProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  notificationsData: any[];
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ mobileMenuOpen, toggleMobileMenu, notificationsData }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
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
};

export default AdminHeader;
