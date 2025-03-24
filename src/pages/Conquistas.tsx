import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap, Award, Star, Calendar, BookOpen, Clock, Share2, Lock } from "lucide-react";
import { AchievementService, type Achievement, type AchievementStats } from "@/services/achievement.service";
import { toast } from "@/components/ui/use-toast";
import { profile } from "console";

// Dados de fallback caso a API falhe
const fallbackAchievements: Achievement[] = [
  {
    id: 1,
    title: "Primeira Lição",
    description: "Complete sua primeira lição",
    category: "iniciante",
    xp: 50,
    progress: 100,
    earned: true,
    earnedAt: new Date("2023-04-10")
  },
  {
    id: 2,
    title: "Explorador de Vocabulário",
    description: "Aprenda 50 palavras novas",
    category: "vocabulario",
    xp: 100,
    progress: 80,
    earned: false,
    progressText: "40/50 palavras"
  },
  {
    id: 3,
    title: "Sequência de 3 Dias",
    description: "Estude por 3 dias consecutivos",
    category: "sequencia",
    xp: 100,
    progress: 100,
    earned: true,
    earnedAt: new Date("2023-04-12")
  }
];

const fallbackStats: AchievementStats = {
  totalAchievements: 10,
  earnedAchievements: 2,
  totalXP: 150,
  nextAchievement: {
    id: 2,
    title: "Explorador de Vocabulário",
    description: "Aprenda 50 palavras novas",
    category: "vocabulario",
    xp: 100,
    progress: 80,
    earned: false,
    progressText: "40/50 palavras"
  }
};

const Conquistas = () => {
  const [filter, setFilter] = useState("all");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [achievementsData, statsData] = await Promise.all([
        AchievementService.getAchievements(),
        AchievementService.getStats()
      ]);
      
      setAchievements(achievementsData);
      setStats(statsData);
    } catch (error) {
      console.error("Erro ao carregar conquistas:", error);
      // Usar dados de fallback
      setAchievements(fallbackAchievements);
      setStats(fallbackStats);
      setError("Não foi possível carregar suas conquistas. Exibindo dados de exemplo.");
      
      toast({
        title: "Erro",
        description: "Não foi possível carregar as conquistas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando suas conquistas...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-display font-bold mb-2">Conquistas</h1>
          <p className="text-muted-foreground mb-6">
            Acompanhe seu progresso e desbloqueie conquistas enquanto aprende inglês.
          </p>
          
          {error && (
            <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Conquistas Desbloqueadas</h3>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  {stats?.earnedAchievements} / {stats?.totalAchievements}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${stats ? (stats.earnedAchievements / stats.totalAchievements * 100) : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats ? Math.round((stats.earnedAchievements / stats.totalAchievements) * 100) : 0}% completado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">XP de Conquistas</h3>
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats?.totalXP} XP
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
                {stats?.nextAchievement ? (
                  <div className="mb-2">
                    <p className="font-medium">{stats.nextAchievement.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {stats.nextAchievement.progressText || `${stats.nextAchievement.progress}% completado`}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ width: `${stats.nextAchievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma conquista em progresso</p>
                )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.length > 0 ? (
              filteredAchievements.map((achievement) => (
                <Card key={achievement.id} className={!achievement.earned ? "opacity-75" : undefined}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium flex items-center">
                          {achievement.title}
                          {!achievement.earned && achievement.progress === 0 && (
                            <Lock className="h-4 w-4 ml-2 text-muted-foreground" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="ml-4">
                        {getAchievementIcon(achievement.category)}
                      </div>
                    </div>
                    
                    {achievement.earned ? (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-600 font-medium">Conquistado!</span>
                        <span className="text-primary font-medium">+{achievement.xp} XP</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-full rounded-full bg-primary" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">
                            {achievement.progressText || `${achievement.progress}% completado`}
                          </span>
                          <span className="text-primary font-medium">+{achievement.xp} XP</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Award className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma conquista encontrada</h3>
                <p className="text-muted-foreground mb-6">
                  {filter !== "all" 
                    ? "Não há conquistas disponíveis para esse filtro. Tente outra categoria." 
                    : "Continue estudando para desbloquear conquistas."
                  }
                </p>
                {filter !== "all" && (
                  <Button variant="outline" onClick={() => setFilter("all")}>
                    Ver todas as conquistas
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const getAchievementIcon = (category: string) => {
  switch (category) {
    case 'iniciante':
      return <BookOpen className="h-6 w-6 text-primary" />;
    case 'vocabulario':
      return <Star className="h-6 w-6 text-primary" />;
    case 'sequencia':
      return <Calendar className="h-6 w-6 text-primary" />;
    case 'nivel':
      return <Zap className="h-6 w-6 text-primary" />;
    case 'flashcards':
      return <Award className="h-6 w-6 text-primary" />;
    case 'desafio':
      return <Clock className="h-6 w-6 text-primary" />;
    case 'social':
      return <Share2 className="h-6 w-6 text-primary" />;
    default:
      return <Award className="h-6 w-6 text-primary" />;
  }
};

export default Conquistas;
