
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom/Tabs";
import FlashcardsManager from "./FlashcardsManager";
import ConversationActivitiesManager from "./ConversationActivitiesManager";
import InteractiveExercisesManager from "./InteractiveExercisesManager";

interface ActivitiesTabProps {
  activitiesData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ 
  activitiesData,
  searchTerm, 
  setSearchTerm 
}) => {
  const [activeTab, setActiveTab] = useState("flashcards");

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Gerenciar Atividades</CardTitle>
          <p className="text-muted-foreground mt-1">
            Crie e gerencie atividades para os alunos praticarem o idioma
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="interactive">Exercícios Interativos</TabsTrigger>
              <TabsTrigger value="conversation">Atividades de Conversação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flashcards">
              <FlashcardsManager 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </TabsContent>
            
            <TabsContent value="interactive">
              <InteractiveExercisesManager 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </TabsContent>
            
            <TabsContent value="conversation">
              <ConversationActivitiesManager 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitiesTab;
