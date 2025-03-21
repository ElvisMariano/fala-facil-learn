
import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { BookOpen, Clock, CheckCircle, ChevronLeft, Lock } from "lucide-react";
import LessonContent from "./LessonContent";

const intermediateLessons = [
  {
    id: "present-perfect",
    title: "Presente Perfeito",
    description: "Estrutura e uso do Present Perfect",
    duration: 30,
    xp: 45,
    completed: false,
    level: "B1",
    locked: false,
    topics: ["Have/Has + Past Participle", "Ever/Never", "Just/Already/Yet", "For/Since"]
  },
  {
    id: "conditionals",
    title: "Condicionais",
    description: "Aprenda a formar frases condicionais em inglês",
    duration: 35,
    xp: 50,
    completed: false,
    level: "B1",
    locked: false,
    topics: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"]
  },
  {
    id: "reported-speech",
    title: "Discurso Indireto",
    description: "Como transformar discurso direto em indireto",
    duration: 40,
    xp: 55,
    completed: false,
    level: "B1",
    locked: true,
    topics: ["Reporting Verbs", "Tense Changes", "Time Expressions", "Questions in Reported Speech"]
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    description: "Verbos frasais comuns em inglês",
    duration: 30,
    xp: 45,
    completed: false,
    level: "B2",
    locked: true,
    topics: ["Common Phrasal Verbs", "Separable vs Inseparable", "Context and Usage"]
  },
  {
    id: "passive-voice",
    title: "Voz Passiva",
    description: "Estrutura e uso da voz passiva em inglês",
    duration: 35,
    xp: 50,
    completed: false,
    level: "B2",
    locked: true,
    topics: ["Passive Structure", "Tenses in Passive Voice", "By + Agent", "When to Use Passive"]
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
        <h1 className="text-2xl font-display font-bold">Lições para Intermediários (B1-B2)</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {intermediateLessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className={`hover:shadow-md transition-all ${lesson.completed ? 'border-l-4 border-l-accent' : ''} ${lesson.locked ? 'opacity-70' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
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
              
              <Button asChild className="w-full mt-2" disabled={lesson.locked}>
                <Link to={lesson.locked ? "#" : `/licoes/licao/${lesson.id}`}>
                  {lesson.locked ? "Bloqueado" : (lesson.completed ? "Revisar Lição" : "Iniciar Lição")}
                </Link>
              </Button>
              
              {lesson.locked && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Complete as lições anteriores para desbloquear
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const IntermediateLessons = () => {
  return (
    <Routes>
      <Route path="/" element={<LessonsList />} />
      <Route path="/:lessonId" element={<LessonContent />} />
    </Routes>
  );
};

export default IntermediateLessons;
