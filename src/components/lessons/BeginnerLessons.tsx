
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { BookOpen, Clock, CheckCircle, Lock, ArrowLeft } from "lucide-react";
import LessonContent from "./LessonContent";

// Dados de exemplo para lições de nível iniciante
const beginnerLessons = [
  { 
    id: "b1", 
    title: "Apresentações e Saudações", 
    description: "Aprenda a se apresentar e cumprimentar pessoas em inglês.", 
    duration: 15, 
    progress: 100, 
    locked: false 
  },
  { 
    id: "b2", 
    title: "Números e Contagem", 
    description: "Aprenda os números em inglês e como contar de 1 a 100.", 
    duration: 20, 
    progress: 80, 
    locked: false 
  },
  { 
    id: "b3", 
    title: "Família e Relacionamentos", 
    description: "Vocabulário sobre família e como descrever relacionamentos.", 
    duration: 25, 
    progress: 60, 
    locked: false 
  },
  { 
    id: "b4", 
    title: "Presente Simples", 
    description: "Aprenda a estrutura e uso do Present Simple.", 
    duration: 30, 
    progress: 40, 
    locked: false 
  },
  { 
    id: "b5", 
    title: "Adjetivos e Descrições", 
    description: "Adjetivos comuns e como descrever pessoas e objetos.", 
    duration: 20, 
    progress: 0, 
    locked: true 
  },
];

// Componente para listar lições de nível iniciante
const BeginnerLessonsOverview = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simular estado de login

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6 flex items-center">
        <Link to="/licoes" className="flex items-center text-muted-foreground hover:text-foreground mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Voltar</span>
        </Link>
        <h1 className="text-2xl font-display font-bold">Lições para Iniciantes (A1-A2)</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Estas lições são perfeitas para quem está começando a aprender inglês. 
        Você irá aprender vocabulário essencial e estruturas gramaticais básicas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beginnerLessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{lesson.description}</p>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{lesson.duration} minutos</span>
                </div>
                
                {lesson.progress === 100 && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Concluído</span>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progresso</span>
                  <span>{lesson.progress}%</span>
                </div>
                <ProgressIndicator value={lesson.progress} max={100} />
              </div>
              
              {lesson.locked ? (
                <Button disabled className="w-full flex items-center justify-center opacity-70">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Bloqueado</span>
                </Button>
              ) : (
                isLoggedIn ? (
                  <Button as={Link} to={`/licoes/licao/${lesson.id}`} className="w-full">
                    {lesson.progress > 0 ? 'Continuar' : 'Iniciar'} Lição
                  </Button>
                ) : (
                  <Button as={Link} to="/login" className="w-full flex items-center justify-center bg-primary/80 hover:bg-primary">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Login para Acessar</span>
                  </Button>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="subtle">Carregar Mais Lições</Button>
      </div>
    </div>
  );
};

const BeginnerLessons = () => {
  return (
    <Routes>
      <Route path="/" element={<BeginnerLessonsOverview />} />
      <Route path="/licao/:id" element={<LessonContent />} />
    </Routes>
  );
};

export default BeginnerLessons;
