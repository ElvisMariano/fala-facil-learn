
import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { BookOpen, Clock, CheckCircle, ChevronLeft, Lock } from "lucide-react";
import LessonContent from "./LessonContent";

const advancedLessons = [
  {
    id: "advanced-idioms",
    title: "Expressões Idiomáticas Avançadas",
    description: "Expressões idiomáticas comuns em inglês formal e informal",
    duration: 35,
    xp: 60,
    completed: false,
    level: "C1",
    locked: true,
    topics: ["Business Idioms", "Everyday Idioms", "Cultural References", "Advanced Usage"]
  },
  {
    id: "business-english",
    title: "Inglês para Negócios",
    description: "Vocabulário e expressões para o ambiente de trabalho",
    duration: 40,
    xp: 65,
    completed: false,
    level: "C1",
    locked: true,
    topics: ["Meetings", "Presentations", "Negotiations", "Business Correspondence"]
  },
  {
    id: "academic-english",
    title: "Inglês Acadêmico",
    description: "Estruturas e vocabulário para redação acadêmica",
    duration: 45,
    xp: 70,
    completed: false,
    level: "C1",
    locked: true,
    topics: ["Essay Structure", "Academic Vocabulary", "Citations", "Research Language"]
  },
  {
    id: "advanced-debate",
    title: "Debates Avançados",
    description: "Técnicas de argumentação e discussão em inglês",
    duration: 50,
    xp: 75,
    completed: false,
    level: "C2",
    locked: true,
    topics: ["Forming Arguments", "Counter-Arguments", "Logical Fallacies", "Persuasive Language"]
  },
  {
    id: "literary-analysis",
    title: "Análise Literária",
    description: "Como analisar textos literários em inglês",
    duration: 45,
    xp: 70,
    completed: false,
    level: "C2",
    locked: true,
    topics: ["Literary Devices", "Critical Analysis", "Interpretation", "Cultural Context"]
  },
];

const LessonsList = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex items-center mb-8 gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/licoes")}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para Categorias
        </Button>
        <h1 className="text-2xl font-display font-bold">Lições Avançadas (C1-C2)</h1>
      </div>
      
      <div className="flex flex-col gap-4 mb-10">
        <Card className="bg-gradient-to-r from-purple-100 to-purple-50 border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Nivel Avançado</h3>
            <p className="text-muted-foreground mb-4">
              Estas lições são projetadas para estudantes com nível avançado de inglês.
              Complete os níveis Iniciante e Intermediário para desbloquear este conteúdo.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Complete 80% do nível Intermediário para desbloquear</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advancedLessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className={`hover:shadow-md transition-all ${lesson.completed ? 'border-l-4 border-l-accent' : ''} ${lesson.locked ? 'opacity-70' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {lesson.level}
                  </span>
                  {lesson.completed && (
                    <span className="text-accent">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                  )}
                  {lesson.locked && (
                    <span className="text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <span className="text-primary font-medium">+{lesson.xp} XP</span>
              </div>
              <CardTitle className="mt-2">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration} minutos</span>
              </div>
              
              {lesson.topics && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Tópicos:</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.topics.map((topic, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                as={Link} 
                to={lesson.locked ? "#" : `/licoes/licao/${lesson.id}`} 
                className="w-full mt-2" 
                disabled={lesson.locked}
              >
                {lesson.locked ? "Bloqueado" : (lesson.completed ? "Revisar Lição" : "Iniciar Lição")}
              </Button>
              
              {lesson.locked && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Complete os níveis anteriores para desbloquear
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AdvancedLessons = () => {
  return (
    <Routes>
      <Route path="/" element={<LessonsList />} />
      <Route path="/:lessonId" element={<LessonContent />} />
    </Routes>
  );
};

export default AdvancedLessons;
