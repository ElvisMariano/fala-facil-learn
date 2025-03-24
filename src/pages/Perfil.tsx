import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AtSign, User, Lock, Bell, Globe, Zap, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ProfileService, type Profile, type ProfileUpdateData, type PasswordUpdateData } from "@/services/profile.service";
import { toast } from "@/components/ui/use-toast";

const Perfil = () => {
  const { user, getUserDisplayName } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileUpdateData>({});
  const [passwordData, setPasswordData] = useState<PasswordUpdateData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await ProfileService.getProfile();
      setProfile(data);
      setFormData({
        learningGoal: data.learningGoal,
        language: data.language,
        notifications: data.notifications
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do perfil.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false);
    if (profile) {
      setFormData({
        learningGoal: profile.learningGoal,
        language: profile.language,
        notifications: profile.notifications
      });
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name.split('.')[1]]: checked
        }
      }));
    } else if (name.startsWith('password.')) {
      const field = name.split('.')[1];
      setPasswordData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (activeTab === 'password') {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não coincidem.",
            variant: "destructive"
          });
          return;
        }
        await ProfileService.updatePassword(passwordData);
        toast({
          title: "Sucesso",
          description: "Senha atualizada com sucesso!"
        });
      } else {
        const updatedProfile = await ProfileService.updateProfile(formData);
        setProfile(updatedProfile);
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso!"
        });
      }
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

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
                      {getUserDisplayName()?.charAt(0) || user?.email?.charAt(0) || '?'}
                    </div>
                    <h2 className="font-medium">{getUserDisplayName() || 'Usuário'}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email || 'Email não disponível'}</p>
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
                    <span className="font-medium">{profile?.level}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Sequência</span>
                    <span className="font-medium">{profile?.streakDays} dias</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>XP Total</span>
                    <span className="font-medium">{profile?.xp}</span>
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
                        if (profile) {
                          setFormData({
                            learningGoal: profile.learningGoal,
                            language: profile.language,
                            notifications: profile.notifications
                          });
                        }
                      }}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {activeTab === "account" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium">
                          Nome de Usuário
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            id="username"
                            name="username"
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={user?.username}
                            disabled
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
                            value={user?.email}
                            disabled
                          />
                        </div>
                      </div>
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
                            name="password.currentPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            value={passwordData.currentPassword}
                            onChange={handleInputChange}
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
                            name="password.newPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
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
                            name="password.confirmPassword"
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="••••••••"
                            value={passwordData.confirmPassword}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "notifications" && (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="notifications.email"
                            checked={formData.notifications?.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="rounded border-gray-300"
                          />
                          <span>Notificações por email</span>
                        </label>
                        
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="notifications.push"
                            checked={formData.notifications?.push}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="rounded border-gray-300"
                          />
                          <span>Notificações push</span>
                        </label>
                        
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="notifications.streak"
                            checked={formData.notifications?.streak}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="rounded border-gray-300"
                          />
                          <span>Lembretes de sequência</span>
                        </label>
                        
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="notifications.updates"
                            checked={formData.notifications?.updates}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="rounded border-gray-300"
                          />
                          <span>Atualizações e novidades</span>
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "preferences" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="learningGoal" className="text-sm font-medium">
                          Meta Diária (minutos)
                        </label>
                        <select
                          id="learningGoal"
                          name="learningGoal"
                          className="w-full px-4 py-2 border rounded-lg"
                          value={formData.learningGoal}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option value="5">5 minutos</option>
                          <option value="10">10 minutos</option>
                          <option value="15">15 minutos</option>
                          <option value="20">20 minutos</option>
                          <option value="30">30 minutos</option>
                          <option value="45">45 minutos</option>
                          <option value="60">60 minutos</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="language" className="text-sm font-medium">
                          Idioma da Interface
                        </label>
                        <select
                          id="language"
                          name="language"
                          className="w-full px-4 py-2 border rounded-lg"
                          value={formData.language}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {isEditing && (
                    <Button onClick={handleSave} className="mt-6">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
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
