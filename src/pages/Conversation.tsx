
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, MessageCircle, Clock, CheckCircle, Lock, Mic, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

const conversationTopics = [
  {
    id: "greetings",
    title: "Saudações e Apresentações",
    description: "Diálogos básicos para cumprimentos e apresentações",
    duration: 15,
    difficulty: "Fácil",
    completed: true,
    level: "A1",
    locked: false,
    rating: 4.8,
    scenarios: ["No escritório", "Em uma festa", "Na rua"]
  },
  {
    id: "restaurant",
    title: "No Restaurante",
    description: "Como fazer pedidos e se comunicar em restaurantes",
    duration: 20,
    difficulty: "Fácil",
    completed: true,
    level: "A1-A2",
    locked: false,
    rating: 4.7,
    scenarios: ["Fazendo reservas", "Pedindo comida", "Pagando a conta"]
  },
  {
    id: "shopping",
    title: "Fazendo Compras",
    description: "Diálogos úteis para compras em lojas",
    duration: 25,
    difficulty: "Médio",
    completed: false,
    level: "A2",
    locked: false,
    rating: 4.6,
    scenarios: ["Em uma loja de roupas", "No supermercado", "Negociando preços"]
  },
  {
    id: "travel",
    title: "Viagens",
    description: "Conversas em situações de viagem",
    duration: 30,
    difficulty: "Médio",
    completed: false,
    level: "A2-B1",
    locked: false,
    rating: 4.9,
    scenarios: ["No aeroporto", "No hotel", "Pedindo direções"]
  },
  {
    id: "job-interview",
    title: "Entrevista de Emprego",
    description: "Como se comunicar em uma entrevista de trabalho",
    duration: 35,
    difficulty: "Difícil",
    completed: false,
    level: "B1",
    locked: true,
    rating: 4.8,
    scenarios: ["Qualificações", "Experiência anterior", "Respondendo perguntas comuns"]
  },
  {
    id: "expressing-opinions",
    title: "Expressando Opiniões",
    description: "Como dar opiniões e participar de debates",
    duration: 40,
    difficulty: "Difícil",
    completed: false,
    level: "B1-B2",
    locked: true,
    rating: 4.7,
    scenarios: ["Discussões em grupo", "Concordando e discordando", "Dando sugestões"]
  }
];

const difficultyColors = {
  "Fácil": "bg-green-100 text-green-700",
  "Médio": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-red-100 text-red-700"
};

const Conversation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTopics = conversationTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.scenarios.some(scenario => scenario.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Prática de Conversação</h1>
              <p className="text-muted-foreground">Treine suas habilidades de conversação com diálogos interativos e reconhecimento de fala.</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar diálogos..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className={`hover:shadow-md transition-all ${topic.locked ? 'opacity-70' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {topic.level}
                      </span>
                      {topic.completed && (
                        <span className="text-accent">
                          <CheckCircle className="h-4 w-4" />
                        </span>
                      )}
                      {topic.locked && (
                        <span className="text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{topic.duration} minutos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-muted-foreground">{topic.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Cenários:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.scenarios.map((scenario, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                          {scenario}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 p-2 bg-muted/50 rounded-lg flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">Diálogos</span>
                      </div>
                    </div>
                    <div className="flex-1 p-2 bg-muted/50 rounded-lg flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-primary" />
                        <span className="text-sm">Pronúncia</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    as={Link} 
                    to={topic.locked ? "#" : `/conversacao/${topic.id}`} 
                    className="w-full" 
                    disabled={topic.locked}
                  >
                    {topic.locked ? (
                      "Bloqueado"
                    ) : topic.completed ? (
                      "Praticar Novamente"
                    ) : (
                      <>Iniciar Prática <Play className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                  
                  {topic.locked && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Complete os diálogos anteriores para desbloquear
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTopics.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhum tópico de conversação encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Conversation;
