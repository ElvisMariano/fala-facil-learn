
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, BookOpen, SlidersHorizontal, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const vocabularyCategories = [
  {
    id: "basic-words",
    title: "Vocabulário Básico",
    description: "Palavras e frases essenciais para iniciantes",
    wordCount: 150,
    completed: 65,
    level: "A1",
    topics: ["Cumprimentos", "Números", "Cores", "Família", "Tempo"]
  },
  {
    id: "travel",
    title: "Viagens",
    description: "Vocabulário para situações de viagem",
    wordCount: 120,
    completed: 40,
    level: "A2",
    topics: ["Aeroporto", "Hotel", "Transporte", "Restaurante", "Direções"]
  },
  {
    id: "food",
    title: "Alimentação",
    description: "Palavras relacionadas a comidas e restaurantes",
    wordCount: 100,
    completed: 20,
    level: "A1-A2",
    topics: ["Frutas", "Vegetais", "Refeições", "Bebidas", "No restaurante"]
  },
  {
    id: "work",
    title: "Trabalho e Profissões",
    description: "Vocabulário profissional e de ambiente de trabalho",
    wordCount: 130,
    completed: 10,
    level: "B1",
    topics: ["Profissões", "Escritório", "Reuniões", "Carreira", "Negócios"]
  },
  {
    id: "technology",
    title: "Tecnologia",
    description: "Palavras para falar sobre tecnologia e internet",
    wordCount: 110,
    completed: 5,
    level: "B1-B2",
    topics: ["Computadores", "Internet", "Redes sociais", "Aplicativos", "Dispositivos"]
  },
  {
    id: "health",
    title: "Saúde e Bem-estar",
    description: "Vocabulário relacionado à saúde e cuidados médicos",
    wordCount: 140,
    completed: 0,
    level: "B1",
    topics: ["Corpo humano", "Doenças", "Médico", "Medicamentos", "Exercícios"]
  }
];

const Vocabulary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Filtrar categorias com base na pesquisa e filtro
  const filteredCategories = vocabularyCategories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
                          
    if (filter === "all") return matchesSearch;
    if (filter === "completed") return matchesSearch && category.completed === 100;
    if (filter === "inProgress") return matchesSearch && category.completed > 0 && category.completed < 100;
    if (filter === "notStarted") return matchesSearch && category.completed === 0;
    
    return matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Vocabulário Temático</h1>
              <p className="text-muted-foreground">Aprenda vocabulário inglês agrupado por temas e níveis de dificuldade.</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar vocabulário..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {category.level}
                    </span>
                    {category.completed === 100 && (
                      <span className="text-accent">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-2">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{category.wordCount} palavras</span>
                    </div>
                    <span className="text-muted-foreground">{category.completed}% concluído</span>
                  </div>
                  
                  <div className="w-full bg-muted h-2 rounded-full mb-4">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${category.completed}%` }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Tópicos:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.topics.map((topic, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button as={Link} to={`/vocabulario/${category.id}`} className="w-full">
                    {category.completed > 0 ? "Continuar" : "Começar"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhuma categoria de vocabulário encontrada para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
