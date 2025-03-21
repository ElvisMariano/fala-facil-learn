
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { Search, Award, Users, MessageSquare, Calendar, Clock, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

// Sample forum posts data
const forumPosts = [
  {
    id: 1,
    author: {
      name: "Ana Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      level: 15
    },
    title: "Dicas para memorizar verbos irregulares",
    content: "Olá pessoal! Estou com dificuldades para memorizar os verbos irregulares em inglês. Alguém tem alguma dica ou técnica que funcione bem?",
    date: "2023-06-12T10:30:00",
    likes: 24,
    comments: 8,
    tags: ["dicas", "verbos", "memorização"]
  },
  {
    id: 2,
    author: {
      name: "Carlos Mendes",
      avatar: "https://i.pravatar.cc/150?img=2",
      level: 23
    },
    title: "Grupos de conversação online",
    content: "Pessoal, conhecem algum grupo de conversação online gratuito? Preciso praticar meu inglês falado e gostaria de recomendações.",
    date: "2023-06-10T14:45:00",
    likes: 32,
    comments: 15,
    tags: ["conversação", "prática", "grupos"]
  },
  {
    id: 3,
    author: {
      name: "Juliana Costa",
      avatar: "https://i.pravatar.cc/150?img=3",
      level: 41
    },
    title: "Séries com legendas em inglês",
    content: "Quero compartilhar uma lista de séries que me ajudaram muito a melhorar meu inglês. Assisti com legendas em inglês e fez toda diferença!",
    date: "2023-06-08T09:15:00",
    likes: 57,
    comments: 23,
    tags: ["séries", "legendas", "dicas"]
  }
];

// Sample leaderboard data
const leaderboardData = [
  { id: 1, name: "Mariana Alves", avatar: "https://i.pravatar.cc/150?img=5", xp: 12500, streak: 85 },
  { id: 2, name: "Rafael Souza", avatar: "https://i.pravatar.cc/150?img=6", xp: 11200, streak: 62 },
  { id: 3, name: "Camila Rocha", avatar: "https://i.pravatar.cc/150?img=7", xp: 10800, streak: 74 },
  { id: 4, name: "Bruno Lima", avatar: "https://i.pravatar.cc/150?img=8", xp: 9700, streak: 45 },
  { id: 5, name: "Gabriel Torres", avatar: "https://i.pravatar.cc/150?img=9", xp: 9300, streak: 50 }
];

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Clube de Conversação",
    description: "Pratique seu inglês falado com outros estudantes em sessões moderadas por professores.",
    date: "2023-06-20T18:00:00",
    location: "Zoom (Online)",
    participants: 18,
    maxParticipants: 25
  },
  {
    id: 2,
    title: "Workshop de Pronúncia",
    description: "Aprenda técnicas para melhorar sua pronúncia em inglês com foco nos sons mais difíceis para falantes de português.",
    date: "2023-06-25T15:30:00",
    location: "Google Meet (Online)",
    participants: 35,
    maxParticipants: 50
  },
  {
    id: 3,
    title: "Desafio de Vocabulário",
    description: "Participe do desafio semanal para expandir seu vocabulário. Os três primeiros ganham prêmios!",
    date: "2023-06-18T10:00:00",
    location: "Plataforma Fala Fácil",
    participants: 72,
    maxParticipants: 100
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("forum");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter forum posts based on search term
  const filteredPosts = forumPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit',
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold mb-2">Comunidade</h1>
            <p className="text-muted-foreground">
              Conecte-se com outros estudantes, participe de discussões e eventos
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b mb-8">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "forum" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("forum")}
            >
              Fórum
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "leaderboard" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Ranking
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "events" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("events")}
            >
              Eventos
            </button>
          </div>
          
          {/* Forum Tab */}
          {activeTab === "forum" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar no fórum..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Nova Publicação
                </Button>
              </div>
              
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center">
                        <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 rounded-full mr-3" />
                        <div>
                          <p className="font-medium">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">Nível {post.author.level}</p>
                        </div>
                      </div>
                      <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.date)} às {formatTime(post.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center hover:text-primary">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center hover:text-primary">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center hover:text-primary">
                            <Share className="h-4 w-4 mr-1" />
                            <span>Compartilhar</span>
                          </button>
                          <button className="flex items-center hover:text-primary">
                            <Bookmark className="h-4 w-4 mr-1" />
                            <span>Salvar</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Nenhuma publicação encontrada para "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <div>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Ranking da Semana</CardTitle>
                  <CardDescription>Os estudantes mais ativos da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {leaderboardData.map((user, index) => (
                      <div key={user.id} className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full mr-3 text-sm font-bold">
                          {index + 1}
                        </div>
                        
                        <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full mr-3" />
                        
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="mr-3">{user.xp.toLocaleString()} XP</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {user.streak} dias de sequência
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-24 text-right">
                          <div className="flex items-center justify-end mb-1">
                            <Award className={`h-4 w-4 mr-1 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-700' : 'text-muted-foreground'}`} />
                            <span className="text-sm font-medium">
                              {index === 0 ? "Ouro" : index === 1 ? "Prata" : index === 2 ? "Bronze" : `-`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full mr-3 text-sm font-bold">
                        26
                      </div>
                      
                      <img src="https://i.pravatar.cc/150?img=4" alt="Seu Avatar" className="h-12 w-12 rounded-full mr-3" />
                      
                      <div className="flex-1">
                        <p className="font-medium">Você</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="mr-3">4,250 XP</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            12 dias de sequência
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.map(event => (
                <Card key={event.id} className="border-0 shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{event.description}</p>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Data e Hora</p>
                          <p className="text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('pt-BR', { 
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })} às {formatTime(event.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Local</p>
                          <p className="text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Participantes</p>
                          <div className="flex items-center">
                            <span className="text-muted-foreground mr-2">
                              {event.participants}/{event.maxParticipants}
                            </span>
                            <ProgressIndicator
                              value={(event.participants / event.maxParticipants) * 100}
                              max={100}
                              size="sm"
                              className="w-20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Inscrever-se
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
