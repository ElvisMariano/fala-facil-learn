
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Award, BarChart3, Calendar, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "João Silva",
    level: 12,
    xp: 3450,
    streak: 7,
    nextLevel: 4000,
    progress: 85,
    lastActivity: "2023-07-15T10:30:00"
  };

  // Mock recent activities
  const recentActivities = [
    { id: 1, type: "lesson", title: "Presente Simples", date: "2023-07-15T10:30:00", xp: 25 },
    { id: 2, type: "flashcard", title: "Vocabulário de Viagem", date: "2023-07-14T14:20:00", xp: 15 },
    { id: 3, type: "quiz", title: "Adjetivos", date: "2023-07-13T09:45:00", xp: 20 },
  ];

  // Mock recommended lessons
  const recommendedLessons = [
    { id: 1, title: "Presente Contínuo", level: "A1", duration: 15, progress: 0 },
    { id: 2, title: "Vocabulário de Alimentos", level: "A1", duration: 10, progress: 0 },
    { id: 3, title: "Perguntas Básicas", level: "A1", duration: 20, progress: 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Olá, {user.name}!</h1>
              <p className="text-muted-foreground">Bem-vindo de volta ao seu aprendizado de inglês.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="bg-primary/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Sequência</p>
                  <p className="text-xl font-bold">{user.streak} dias</p>
                </div>
              </div>
              <div className="bg-accent/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Nível</p>
                  <p className="text-xl font-bold">{user.level}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Section */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Seu Progresso</CardTitle>
              <CardDescription>Nível {user.level} - {user.xp}/{user.nextLevel} XP</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressIndicator 
                value={(user.xp / user.nextLevel) * 100} 
                max={100}
                showValue={true}
                size="lg"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lições Completadas</p>
                    <p className="text-xl font-medium">24</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dias Estudados</p>
                    <p className="text-xl font-medium">32</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tempo Total</p>
                    <p className="text-xl font-medium">14h 30m</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precisão</p>
                    <p className="text-xl font-medium">{user.progress}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recent Activity */}
            <div className="col-span-1">
              <h2 className="text-xl font-display font-bold mb-4">Atividade Recente</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mt-1">
                            {activity.type === "lesson" ? (
                              <BookOpen className="h-5 w-5" />
                            ) : activity.type === "flashcard" ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <Award className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('pt-BR', { 
                                day: 'numeric', 
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-accent flex items-center">
                          +{activity.xp} XP
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="ghost" className="w-full">Ver Histórico Completo</Button>
              </div>
            </div>
            
            {/* Recommended Lessons */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display font-bold">Lições Recomendadas</h2>
                <Button variant="ghost" asChild>
                  <Link to="/licoes">Ver Todas as Lições</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {lesson.level}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {lesson.duration} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">Iniciar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
