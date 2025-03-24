import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { BarChart, LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line } from "recharts";
import { Link } from "react-router-dom";
import { ProgressService, type ProgressStats } from "@/services/progress.service";
import { toast } from "@/components/ui/use-toast";

// Dados de fallback caso a API falhe
const fallbackData = {
  weeklyData: [
    { day: "Seg", minutes: 15, words: 12, xp: 120 },
    { day: "Ter", minutes: 20, words: 18, xp: 180 },
    { day: "Qua", minutes: 25, words: 15, xp: 150 },
    { day: "Qui", minutes: 15, words: 10, xp: 100 },
    { day: "Sex", minutes: 30, words: 22, xp: 220 },
    { day: "Sáb", minutes: 40, words: 30, xp: 300 },
    { day: "Dom", minutes: 35, words: 25, xp: 250 },
  ],
  monthlyData: [
    { month: "Jan", xp: 1200 },
    { month: "Fev", xp: 1800 },
    { month: "Mar", xp: 2200 },
    { month: "Abr", xp: 2500 },
    { month: "Mai", xp: 3000 },
    { month: "Jun", xp: 2800 },
  ],
  skillsData: [
    { name: "Vocabulário", mastery: 68 },
    { name: "Gramática", mastery: 45 },
    { name: "Compreensão", mastery: 72 },
    { name: "Fala", mastery: 38 },
    { name: "Leitura", mastery: 65 },
    { name: "Escrita", mastery: 52 },
  ],
  completedLessons: [
    { id: 1, title: "Conjugação de Verbos no Presente", date: "2023-05-10", score: 8.5 },
    { id: 2, title: "Vocabulário de Família", date: "2023-05-12", score: 9.0 },
    { id: 3, title: "Tempos Verbais: Passado Simples", date: "2023-05-15", score: 7.5 },
    { id: 4, title: "Pronomes Pessoais", date: "2023-05-18", score: 10.0 },
    { id: 5, title: "Vocabulário de Comidas", date: "2023-05-20", score: 8.0 },
  ],
  level: 18,
  proficiencyLevel: "B1",
  totalMinutes: 180,
  totalWords: 132,
  totalXP: 1320
};

const Progress = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressData, setProgressData] = useState<ProgressStats | null>(null);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      setLoading(true);
      const data = await ProgressService.getProgressStats();
      setProgressData(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar dados de progresso:", err);
      setError("Não foi possível carregar os dados de progresso. Usando dados de exemplo.");
      // Usar dados de fallback
      setProgressData(fallbackData as any);
      
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados de progresso. Exibindo dados de exemplo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando seu progresso...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Se não temos dados mesmo após o carregamento, mostrar mensagem de erro
  if (!progressData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-4">Dados não disponíveis</h2>
            <p className="text-muted-foreground mb-6">
              Não foi possível carregar seus dados de progresso. Por favor, tente novamente mais tarde.
            </p>
            <Button onClick={loadProgressData}>Tentar novamente</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { 
    weeklyData, 
    monthlyData, 
    skillsData, 
    completedLessons,
    totalMinutes,
    totalWords,
    totalXP,
    level,
    proficiencyLevel
  } = progressData;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold mb-2">Seu Progresso</h1>
            <p className="text-muted-foreground">
              Acompanhe seu desenvolvimento no aprendizado de inglês
            </p>
            {error && (
              <div className="mt-2 text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
                {error}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly stats */}
            <Card className="col-span-full lg:col-span-2 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Atividade Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="minutes"
                        name="Minutos"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="words"
                        name="Palavras Aprendidas"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Tempo Total</p>
                    <p className="text-2xl font-semibold">{totalMinutes} min</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Palavras Aprendidas</p>
                    <p className="text-2xl font-semibold">{totalWords}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">XP Ganho</p>
                    <p className="text-2xl font-semibold">{totalXP}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Skill mastery */}
            <Card className="lg:row-span-2 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Domínio de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsData.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.mastery}%</p>
                      </div>
                      <ProgressIndicator 
                        value={skill.mastery} 
                        max={100} 
                        size="md"
                        color={
                          skill.name === "Vocabulário" || skill.name === "Compreensão" ? "primary" : 
                          skill.name === "Gramática" || skill.name === "Fala" ? "secondary" : "accent"
                        }
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-4">Proficiência Geral</p>
                  <div className="flex items-center">
                    <div className="relative w-full h-40">
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <p className="text-4xl font-semibold">{proficiencyLevel}</p>
                        <p className="text-sm text-muted-foreground">
                          {proficiencyLevel === 'A1' ? 'Iniciante' : 
                           proficiencyLevel === 'A2' ? 'Básico' : 
                           proficiencyLevel === 'B1' ? 'Intermediário' : 
                           proficiencyLevel === 'B2' ? 'Intermediário Avançado' : 
                           proficiencyLevel === 'C1' ? 'Avançado' : 'Fluente'}
                        </p>
                      </div>
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeDasharray="60, 100"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly progress */}
            <Card className="col-span-full lg:col-span-2 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Progresso Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="xp" 
                        name="XP Mensal" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent achievements */}
            <Card className="col-span-full border-0 shadow-md">
              <CardHeader>
                <CardTitle>Lições Completadas Recentemente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-2 text-left font-medium">Lição</th>
                        <th className="py-3 px-2 text-left font-medium">Data</th>
                        <th className="py-3 px-2 text-left font-medium">Pontuação</th>
                        <th className="py-3 px-2 text-left font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedLessons.map((lesson) => (
                        <tr key={lesson.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">{lesson.title}</td>
                          <td className="py-3 px-2">{new Date(lesson.date).toLocaleDateString('pt-BR')}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${lesson.score >= 8 ? 'bg-green-100 text-green-800' : lesson.score >= 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {lesson.score}/10
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Button variant="subtle" size="sm" as={Link} to={`/licoes/licao/${lesson.id}`}>
                              Revisar
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {completedLessons.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-muted-foreground">
                            Nenhuma lição completada ainda. Vamos começar a estudar!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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

export default Progress;
