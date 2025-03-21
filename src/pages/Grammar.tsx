
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, BookOpen, Clock, CheckCircle, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";

const grammarTopics = [
  {
    id: "present-tenses",
    title: "Tempos Verbais: Presente",
    description: "Simple Present, Present Continuous, Present Perfect",
    duration: 30,
    exercises: 24,
    completed: 18,
    level: "A1-A2",
    locked: false,
    subtopics: [
      { title: "Simple Present", completed: true },
      { title: "Present Continuous", completed: true },
      { title: "Present Perfect", completed: false }
    ]
  },
  {
    id: "past-tenses",
    title: "Tempos Verbais: Passado",
    description: "Simple Past, Past Continuous, Past Perfect",
    duration: 35,
    exercises: 28,
    completed: 14,
    level: "A2-B1",
    locked: false,
    subtopics: [
      { title: "Simple Past", completed: true },
      { title: "Past Continuous", completed: false },
      { title: "Past Perfect", completed: false }
    ]
  },
  {
    id: "future-tenses",
    title: "Tempos Verbais: Futuro",
    description: "Will, Going to, Future Continuous, Future Perfect",
    duration: 40,
    exercises: 30,
    completed: 0,
    level: "B1",
    locked: true,
    subtopics: [
      { title: "Will Future", completed: false },
      { title: "Going to Future", completed: false },
      { title: "Future Continuous", completed: false },
      { title: "Future Perfect", completed: false }
    ]
  },
  {
    id: "modal-verbs",
    title: "Verbos Modais",
    description: "Can, Could, May, Might, Should, Must, etc.",
    duration: 25,
    exercises: 20,
    completed: 10,
    level: "A2-B1",
    locked: false,
    subtopics: [
      { title: "Can & Could", completed: true },
      { title: "May & Might", completed: false },
      { title: "Should & Must", completed: false }
    ]
  },
  {
    id: "conditionals",
    title: "Condicionais",
    description: "Zero, First, Second, Third and Mixed Conditionals",
    duration: 45,
    exercises: 35,
    completed: 0,
    level: "B1-B2",
    locked: true,
    subtopics: [
      { title: "Zero Conditional", completed: false },
      { title: "First Conditional", completed: false },
      { title: "Second Conditional", completed: false },
      { title: "Third Conditional", completed: false }
    ]
  },
  {
    id: "passive-voice",
    title: "Voz Passiva",
    description: "Passive Voice in Different Tenses",
    duration: 35,
    exercises: 25,
    completed: 0,
    level: "B1-B2",
    locked: true,
    subtopics: [
      { title: "Present Simple Passive", completed: false },
      { title: "Past Simple Passive", completed: false },
      { title: "Perfect Passive Forms", completed: false }
    ]
  }
];

const Grammar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTopics = grammarTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.subtopics.some(st => st.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Gramática Inglesa</h1>
              <p className="text-muted-foreground">Aprenda as regras gramaticais do inglês com explicações claras e exercícios práticos.</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar tópicos..."
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
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        {topic.level}
                      </span>
                      {topic.completed === topic.exercises && (
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
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{topic.duration} minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{topic.completed}/{topic.exercises} exercícios</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <ProgressIndicator 
                      value={(topic.completed / topic.exercises) * 100} 
                      max={100} 
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {topic.subtopics.map((subtopic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{subtopic.title}</span>
                        {subtopic.completed ? (
                          <CheckCircle className="h-4 w-4 text-accent" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    as={Link} 
                    to={topic.locked ? "#" : `/gramatica/${topic.id}`} 
                    className="w-full" 
                    disabled={topic.locked}
                  >
                    {topic.locked ? (
                      "Bloqueado"
                    ) : topic.completed > 0 ? (
                      <>Continuar <ArrowRight className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Começar <ArrowRight className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                  
                  {topic.locked && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Complete os tópicos anteriores para desbloquear
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTopics.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhum tópico gramatical encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Grammar;
