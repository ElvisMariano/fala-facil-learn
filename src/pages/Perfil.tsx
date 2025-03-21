
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AtSign, User, Lock, Bell, Globe, Zap, Save } from "lucide-react";

const Perfil = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao@example.com",
    language: "pt-BR",
    notifications: {
      email: true,
      push: true,
      streak: true,
      updates: false
    },
    learningGoal: "10",
    currentLevel: 12,
    streakDays: 7,
    totalXP: 3450
  });
  
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false);
    setFormData({...userData});
    setSuccessMessage("");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [name.split('.')[1]]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    setSuccessMessage("Alterações salvas com sucesso!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-display font-bold mb-8">Seu Perfil</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center mb-6 pt-2">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary-foreground text-white flex items-center justify-center text-3xl font-bold mb-2">
                      {userData.name.charAt(0)}
                    </div>
                    <h2 className="font-medium">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2">
                    <Button 
                      variant={activeTab === "account" ? "default" : "ghost"} 
                      className="justify-start"
                      onClick={() => handleTabChange("account")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Conta
                    </Button>
                    <Button 
                      variant={activeTab === "password" ? "default" : "ghost"} 
                      className="justify-start"
                      onClick={() => handleTabChange("password")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Senha
                    </Button>
                    <Button 
                      variant={activeTab === "notifications" ? "default" : "ghost"} 
                      className="justify-start"
                      onClick={() => handleTabChange("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notificações
                    </Button>
                    <Button 
                      variant={activeTab === "preferences" ? "default" : "ghost"} 
                      className="justify-start"
                      onClick={() => handleTabChange("preferences")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Preferências
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Seu Progresso</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Nível</span>
                    <span className="font-medium">{userData.currentLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Sequência</span>
                    <span className="font-medium">{userData.streakDays} dias</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>XP Total</span>
                    <span className="font-medium">{userData.totalXP}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {activeTab === "account" && "Informações da Conta"}
                        {activeTab === "password" && "Alterar Senha"}
                        {activeTab === "notifications" && "Preferências de Notificação"}
                        {activeTab === "preferences" && "Configurações de Aprendizado"}
                      </CardTitle>
                      <CardDescription>
                        {activeTab === "account" && "Gerencie seus dados pessoais"}
                        {activeTab === "password" && "Atualize sua senha de acesso"}
                        {activeTab === "notifications" && "Controle quando você recebe notificações"}
                        {activeTab === "preferences" && "Personalize sua experiência de aprendizado"}
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Editar</Button>
                    ) : (
                      <Button variant="ghost" onClick={() => {
                        setIsEditing(false);
                        setFormData({...userData});
                      }}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {successMessage && (
                    <div className="bg-accent/10 text-accent text-sm p-3 rounded-md mb-4">
                      {successMessage}
                    </div>
                  )}
                  
                  {activeTab === "account" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <Button onClick={handleSave} className="mt-6">
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Alterações
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "password" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="currentPassword" className="text-sm font-medium">
                          Senha Atual
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="currentPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="newPassword" className="text-sm font-medium">
                          Nova Senha
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="newPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirmar Nova Senha
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="confirmPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <Button onClick={handleSave} className="mt-6">
                          <Save className="h-4 w-4 mr-2" />
                          Atualizar Senha
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "notifications" && (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Emails</h3>
                            <p className="text-sm text-muted-foreground">Receba emails sobre seu progresso e dicas</p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="notifications.email"
                              name="notifications.email"
                              className="rounded"
                              checked={formData.notifications.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Notificações Push</h3>
                            <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="notifications.push"
                              name="notifications.push"
                              className="rounded"
                              checked={formData.notifications.push}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Lembretes de Sequência</h3>
                            <p className="text-sm text-muted-foreground">Receba lembretes para manter sua sequência ativa</p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="notifications.streak"
                              name="notifications.streak"
                              className="rounded"
                              checked={formData.notifications.streak}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Atualizações e Novidades</h3>
                            <p className="text-sm text-muted-foreground">Fique por dentro das novidades do Fala Fácil</p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="notifications.updates"
                              name="notifications.updates"
                              className="rounded"
                              checked={formData.notifications.updates}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <Button onClick={handleSave} className="mt-6">
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Preferências
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "preferences" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="language" className="text-sm font-medium">
                          Idioma da Interface
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <select
                            id="language"
                            name="language"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={formData.language}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es">Español</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Este é o idioma usado na interface do aplicativo.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="learningGoal" className="text-sm font-medium">
                          Meta Diária (minutos)
                        </label>
                        <div className="relative">
                          <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <select
                            id="learningGoal"
                            name="learningGoal"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={formData.learningGoal}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option value="5">5 minutos</option>
                            <option value="10">10 minutos</option>
                            <option value="15">15 minutos</option>
                            <option value="20">20 minutos</option>
                            <option value="30">30 minutos</option>
                          </select>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Quanto tempo você deseja estudar todos os dias.
                        </p>
                      </div>
                      
                      {isEditing && (
                        <Button onClick={handleSave} className="mt-6">
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Preferências
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Perfil;
