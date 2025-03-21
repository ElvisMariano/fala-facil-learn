
import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Clock, CheckCircle, Lock, Search } from "lucide-react";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import BeginnerLessons from "@/components/lessons/BeginnerLessons";
import IntermediateLessons from "@/components/lessons/IntermediateLessons";
import AdvancedLessons from "@/components/lessons/AdvancedLessons";
import LessonContent from "@/components/lessons/LessonContent";

const LessonsOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    { id: "beginner", title: "Iniciante (A1-A2)", description: "Conceitos básicos e vocabulário essencial", progress: 65, color: "bg-green-100 text-green-700", link: "/licoes/iniciante" },
    { id: "intermediate", title: "Intermediário (B1-B2)", description: "Gramática intermediária e conversação", progress: 30, color: "bg-blue-100 text-blue-700", link: "/licoes/intermediario" },
    { id: "advanced", title: "Avançado (C1-C2)", description: "Fluência avançada e expressões idiomáticas", progress: 10, color: "bg-purple-100 text-purple-700", link: "/licoes/avancado" },
    { id: "vocabulary", title: "Vocabulário Temático", description: "Palavras agrupadas por temas", progress: 45, color: "bg-amber-100 text-amber-700", link: "/licoes/vocabulario" },
    { id: "grammar", title: "Gramática", description: "Regras gramaticais e exercícios práticos", progress: 50, color: "bg-red-100 text-red-700", link: "/licoes/gramatica" },
    { id: "conversation", title: "Conversação", description: "Diálogos e frases comuns", progress: 20, color: "bg-teal-100 text-teal-700", link: "/licoes/conversacao" },
  ];
  
  const filteredCategories = categories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Lições de Inglês</h1>
          <p className="text-muted-foreground">Aprenda inglês com lições estruturadas por nível de proficiência.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar lições..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-all">
            <CardHeader className={`rounded-t-xl ${category.color.split(' ')[0]} bg-opacity-30`}>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso</span>
                  <span>{category.progress}%</span>
                </div>
                <ProgressIndicator value={category.progress} max={100} />
              </div>
              <Button asChild className="w-full">
                <Link to={category.link}>Acessar Lições</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhuma lição encontrada para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

const Lessons = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 px-6">
        <Routes>
          <Route path="/" element={<LessonsOverview />} />
          <Route path="/iniciante/*" element={<BeginnerLessons />} />
          <Route path="/intermediario/*" element={<IntermediateLessons />} />
          <Route path="/avancado/*" element={<AdvancedLessons />} />
          <Route path="/licao/:id" element={<LessonContent />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lessons;
