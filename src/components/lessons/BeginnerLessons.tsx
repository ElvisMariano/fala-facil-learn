
import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { BookOpen, Clock, CheckCircle, ChevronLeft, Star } from "lucide-react";
import LessonContent from "./LessonContent";

const beginnerLessons = [
  {
    id: "basic-greetings",
    title: "Saudações Básicas",
    description: "Aprenda a cumprimentar pessoas em inglês",
    duration: 15,
    xp: 25,
    completed: true,
    level: "A1",
    topics: ["Hello", "Good morning", "Good afternoon", "Good evening", "Goodbye"]
  },
  {
    id: "personal-info",
    title: "Informações Pessoais",
    description: "Como se apresentar e perguntar informações básicas",
    duration: 20,
    xp: 30,
    completed: true,
    level: "A1",
    topics: ["Name", "Age", "Nationality", "Job"]
  },
  {
    id: "numbers",
    title: "Números em Inglês",
    description: "Aprenda a contar e usar números em conversas",
    duration: 25,
    xp: 35,
    completed: false,
    level: "A1",
    topics: ["Numbers 1-10", "Numbers 11-100", "Telephone numbers", "Age"]
  },
  {
    id: "simple-present",
    title: "Presente Simples",
    description: "Estrutura e uso do tempo presente simples",
    duration: 30,
    xp: 40,
    completed: false,
    level: "A1",
    topics: ["I am", "You are", "He/She is", "Questions", "Negatives"]
  },
  {
    id: "daily-routine",
    title: "Rotina Diária",
    description: "Vocabulário e frases para falar sobre seu dia a dia",
    duration: 25,
    xp: 35,
    completed: false,
    level: "A1",
    topics: ["Wake up", "Breakfast", "Go to work", "Lunch", "Dinner", "Sleep"]
  },
  {
    id: "basic-questions",
    title: "Perguntas Básicas",
    description: "Como fazer e responder perguntas simples",
    duration: 20,
    xp: 30,
    completed: false,
    level: "A2",
    topics: ["What", "Where", "When", "Who", "How"]
  }
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
        <h1 className="text-2xl font-display font-bold">Lições para Iniciantes (A1-A2)</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beginnerLessons.map((lesson) => (
          <Card key={lesson.id} className={`hover:shadow-md transition-all ${lesson.completed ? 'border-l-4 border-l-accent' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {lesson.level}
                  </span>
                  {lesson.completed && (
                    <span className="text-accent">
                      <CheckCircle className="h-4 w-4" />
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
              
              <Button as={Link} to={`/licoes/licao/${lesson.id}`} className="w-full mt-2">
                {lesson.completed ? "Revisar Lição" : "Iniciar Lição"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const BeginnerLessons = () => {
  return (
    <Routes>
      <Route path="/" element={<LessonsList />} />
      <Route path="/:lessonId" element={<LessonContent />} />
    </Routes>
  );
};

export default BeginnerLessons;
