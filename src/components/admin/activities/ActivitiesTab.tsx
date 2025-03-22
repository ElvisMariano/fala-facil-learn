
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FlaskConical, MessageSquare, ListChecks } from "lucide-react";
import FlashcardsManager from "./FlashcardsManager";
import ConversationActivitiesManager from "./ConversationActivitiesManager";

interface ActivitiesTabProps {
  activitiesData: any[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ 
  activitiesData,
  searchTerm,
  setSearchTerm
}) => {
  const [activeSubTab, setActiveSubTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Atividades</h1>
          <p className="text-muted-foreground">Gerencie as diferentes atividades de aprendizado</p>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveSubTab} value={activeSubTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" className="flex items-center">
            <ListChecks className="h-4 w-4 mr-2" />
            <span>Todas</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="conversation" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Conversação</span>
          </TabsTrigger>
          <TabsTrigger value="interactive" className="flex items-center">
            <FlaskConical className="h-4 w-4 mr-2" />
            <span>Interativas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Visão Geral de Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Flashcards</h3>
                          <p className="text-sm text-muted-foreground">Sistema de memorização</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">125</span>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveSubTab("flashcards")}
                      >
                        Gerenciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Conversação</h3>
                          <p className="text-sm text-muted-foreground">Prática de diálogos</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">48</span>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveSubTab("conversation")}
                      >
                        Gerenciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <FlaskConical className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Interativas</h3>
                          <p className="text-sm text-muted-foreground">Exercícios interativos</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">72</span>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveSubTab("interactive")}
                      >
                        Gerenciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-4">Atividades Recentes</h3>
                <div className="space-y-4">
                  {activitiesData.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
                          activity.type === 'Flashcards' 
                            ? 'bg-blue-100' 
                            : activity.type === 'Diálogo' 
                              ? 'bg-green-100' 
                              : 'bg-purple-100'
                        }`}>
                          {activity.type === 'Flashcards' && <BookOpen className="h-5 w-5 text-blue-600" />}
                          {activity.type === 'Diálogo' && <MessageSquare className="h-5 w-5 text-green-600" />}
                          {activity.type !== 'Flashcards' && activity.type !== 'Diálogo' && (
                            <FlaskConical className="h-5 w-5 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.type} • {activity.category} • Nível {activity.level}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          activity.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {activity.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{activity.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <FlashcardsManager />
        </TabsContent>

        <TabsContent value="conversation">
          <ConversationActivitiesManager />
        </TabsContent>

        <TabsContent value="interactive">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Atividades Interativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FlaskConical className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Gerenciador de Atividades Interativas</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Esta seção permitirá a criação de atividades interativas como
                  múltipla escolha, preenchimento de lacunas e atividades de escuta.
                </p>
                <Button variant="outline">
                  Em Desenvolvimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivitiesTab;
