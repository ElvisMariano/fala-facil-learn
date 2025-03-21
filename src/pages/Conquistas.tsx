
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap, Award, Star, Calendar, BookOpen, Clock, Share2, Lock } from "lucide-react";

// Sample achievements data
const achievements = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete sua primeira lição",
    icon: <BookOpen className="h-6 w-6" />,
    progress: 100,
    earned: true,
    date: "2023-06-15T10:30:00",
    xp: 10,
    category: "iniciante"
  },
  {
    id: 2,
    title: "Estudante Dedicado",
    description: "Complete 10 lições",
    icon: <BookOpen className="h-6 w-6" />,
    progress: 70,
    earned: false,
    progressText: "7/10 lições",
    xp: 25,
    category: "iniciante"
  },
  {
    id: 3,
    title: "Mestre das Palavras",
    description: "Aprenda 50 palavras novas",
    icon: <Star className="h-6 w-6" />,
    progress: 64,
    earned: false,
    progressText: "32/50 palavras",
    xp: 50,
    category: "vocabulario"
  },
  {
    id: 4,
    title: "Sequência de 7 Dias",
    description: "Estude por 7 dias consecutivos",
    icon: <Calendar className="h-6 w-6" />,
    progress: 100,
    earned: true,
    date: "2023-07-10T12:45:00",
    xp: 25,
    category: "sequencia"
  },
  {
    id: 5,
    title: "Sequência de 30 Dias",
    description: "Estude por 30 dias consecutivos",
    icon: <Calendar className="h-6 w-6" />,
    progress: 27,
    earned: false,
    progressText: "8/30 dias",
    xp: 100,
    category: "sequencia"
  },
  {
    id: 6,
    title: "Madrugador",
    description: "Complete uma lição antes das 8h da manhã",
    icon: <Clock className="h-6 w-6" />,
    progress: 0,
    earned: false,
    progressText: "0/1 lições",
    xp: 15,
    category: "desafio"
  },
  {
    id: 7,
    title: "Revisor Perfeito",
    description: "Acerte 100% em uma revisão com pelo menos 20 flashcards",
    icon: <Award className="h-6 w-6" />,
    progress: 0,
    earned: false,
    progressText: "0/1 revisões",
    xp: 30,
    category: "flashcards"
  },
  {
    id: 8,
    title: "Nível 5 Alcançado",
    description: "Alcance o nível 5",
    icon: <Zap className="h-6 w-6" />,
    progress: 100,
    earned: true,
    date: "2023-07-05T18:20:00",
    xp: 20,
    category: "nivel"
  },
  {
    id: 9,
    title: "Nível 10 Alcançado",
    description: "Alcance o nível 10",
    icon: <Zap className="h-6 w-6" />,
    progress: 100,
    earned: true,
    date: "2023-07-12T14:10:00",
    xp: 50,
    category: "nivel"
  },
  {
    id: 10,
    title: "Nível 15 Alcançado",
    description: "Alcance o nível 15",
    icon: <Zap className="h-6 w-6" />,
    progress: 30,
    earned: false,
    progressText: "Nível 12/15",
    xp: 100,
    category: "nivel"
  },
  {
    id: 11,
    title: "Compartilhador",
    description: "Compartilhe seu progresso nas redes sociais",
    icon: <Share2 className="h-6 w-6" />,
    progress: 0,
    earned: false,
    progressText: "0/1 compartilhamentos",
    xp: 10,
    category: "social"
  },
  {
    id: 12,
    title: "Gramaticamente Correto",
    description: "Complete todos os exercícios de gramática do nível A1",
    icon: <BookOpen className="h-6 w-6" />,
    progress: 40,
    earned: false,
    progressText: "4/10 exercícios",
    xp: 50,
    category: "gramatica"
  },
];

const Conquistas = () => {
  const [filter, setFilter] = useState("all");
  
  // Calculate statistics
  const totalAchievements = achievements.length;
  const earnedAchievements = achievements.filter(a => a.earned).length;
  const earnedXP = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xp, 0);
  const progressPercentage = Math.round((earnedAchievements / totalAchievements) * 100);
  
  // Filter achievements
  const filteredAchievements = filter === "all" 
    ? achievements 
    : filter === "earned" 
      ? achievements.filter(a => a.earned) 
      : filter === "in-progress" 
        ? achievements.filter(a => !a.earned && a.progress > 0) 
        : achievements.filter(a => a.category === filter);
  
  const categories = [
    { id: "all", name: "Todos" },
    { id: "earned", name: "Conquistadas" },
    { id: "in-progress", name: "Em Progresso" },
    { id: "iniciante", name: "Iniciante" },
    { id: "vocabulario", name: "Vocabulário" },
    { id: "sequencia", name: "Sequência" },
    { id: "nivel", name: "Nível" },
    { id: "flashcards", name: "Flashcards" },
    { id: "gramatica", name: "Gramática" },
    { id: "desafio", name: "Desafios" },
    { id: "social", name: "Social" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-display font-bold mb-2">Conquistas</h1>
          <p className="text-muted-foreground mb-8">
            Acompanhe seu progresso e desbloqueie conquistas enquanto aprende inglês.
          </p>
          
          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Conquistas Desbloqueadas</h3>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  {earnedAchievements} / {totalAchievements}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">{progressPercentage}% completado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">XP de Conquistas</h3>
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {earnedXP} XP
                </div>
                <p className="text-xs text-muted-foreground">Obtidos através de conquistas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Próxima Conquista</h3>
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div className="mb-2">
                  <p className="font-medium">Sequência de 30 Dias</p>
                  <p className="text-xs text-muted-foreground mb-2">8/30 dias completados</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `27%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Category filters */}
          <div className="mb-8 overflow-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={filter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Achievements grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAchievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className={achievement.earned ? "border-accent" : ""}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div 
                      className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        achievement.earned 
                          ? "bg-accent/20 text-accent" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        +{achievement.xp} XP
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                  
                  {achievement.earned ? (
                    <div className="text-xs text-accent flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Conquistado em {new Date(achievement.date).toLocaleDateString('pt-BR')}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>{achievement.progressText}</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="h-full rounded-full bg-primary" 
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Locked achievement examples */}
            <Card className="opacity-60">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      +100 XP
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-1">???</h3>
                <p className="text-sm text-muted-foreground mb-4">Continue estudando para desbloquear esta conquista.</p>
                
                <div className="flex justify-center pt-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="opacity-60">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      +200 XP
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-1">???</h3>
                <p className="text-sm text-muted-foreground mb-4">Conquista secreta. Continue progredindo para descobrir.</p>
                
                <div className="flex justify-center pt-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Conquistas;
