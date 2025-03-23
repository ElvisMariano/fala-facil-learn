
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Volume2, RefreshCw, CheckCircle, X, ChevronLeft, ChevronRight, Plus, Search, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample flashcard decks data
const flashcardDecks = [
  {
    id: "basic-vocabulary",
    title: "Vocabulário Básico",
    description: "Palavras essenciais para iniciantes",
    cards: 50,
    level: "A1",
    progress: 75,
    color: "from-green-500 to-emerald-600",
    lastPracticed: "2023-07-12T15:30:00"
  },
  {
    id: "travel-phrases",
    title: "Frases para Viagem",
    description: "Expressões úteis para turistas",
    cards: 35,
    level: "A2",
    progress: 40,
    color: "from-blue-500 to-indigo-600",
    lastPracticed: "2023-07-10T09:20:00"
  },
  {
    id: "business-english",
    title: "Inglês para Negócios",
    description: "Termos comuns no ambiente de trabalho",
    cards: 65,
    level: "B1-B2",
    progress: 25,
    color: "from-purple-500 to-violet-600",
    lastPracticed: "2023-07-05T14:15:00"
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    description: "Verbos frasais comuns em inglês",
    cards: 40,
    level: "B2",
    progress: 15,
    color: "from-amber-500 to-orange-600",
    lastPracticed: "2023-06-28T10:45:00"
  },
  {
    id: "idioms",
    title: "Expressões Idiomáticas",
    description: "Expressões comuns e seus significados",
    cards: 30,
    level: "C1",
    progress: 5,
    color: "from-red-500 to-rose-600",
    lastPracticed: "2023-06-15T16:30:00"
  },
];

// Sample flashcards for a specific deck
const sampleFlashcards = [
  {
    id: 1,
    front: "Hello",
    back: "Olá",
    example: "Hello, how are you today?",
    level: "A1",
    lastReviewed: "2023-07-12T15:30:00",
    nextReview: "2023-07-15T00:00:00",
    difficulty: "easy"
  },
  {
    id: 2,
    front: "Goodbye",
    back: "Adeus",
    example: "Goodbye, see you tomorrow!",
    level: "A1",
    lastReviewed: "2023-07-11T10:20:00",
    nextReview: "2023-07-14T00:00:00",
    difficulty: "medium"
  },
  {
    id: 3,
    front: "Thank you",
    back: "Obrigado/Obrigada",
    example: "Thank you for your help!",
    level: "A1",
    lastReviewed: "2023-07-10T14:45:00",
    nextReview: "2023-07-13T00:00:00",
    difficulty: "easy"
  },
  {
    id: 4,
    front: "Please",
    back: "Por favor",
    example: "Please, can you help me?",
    level: "A1",
    lastReviewed: "2023-07-09T09:15:00",
    nextReview: "2023-07-13T00:00:00",
    difficulty: "easy"
  },
  {
    id: 5,
    front: "Excuse me",
    back: "Com licença",
    example: "Excuse me, where is the bathroom?",
    level: "A1",
    lastReviewed: "2023-07-08T16:30:00",
    nextReview: "2023-07-12T00:00:00",
    difficulty: "medium"
  },
];

const FlashcardDecksList = ({ onStartStudy }: { onStartStudy: (deckId: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter decks based on search term
  const filteredDecks = flashcardDecks.filter(deck => 
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Memorize novo vocabulário com nosso sistema inteligente de flashcards.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar decks..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <Card key={deck.id} className="h-full hover:shadow-lg transition-all overflow-hidden flex flex-col">
            <div className={`h-3 w-full bg-gradient-to-r ${deck.color}`}></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{deck.title}</CardTitle>
                <span className="px-2 py-0.5 bg-muted rounded-full text-xs font-medium">
                  {deck.level}
                </span>
              </div>
              <CardDescription>{deck.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span>{deck.cards} cartões</span>
                  <span>{deck.progress}% completado</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${deck.color}`} 
                    style={{ width: `${deck.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Último estudo: {new Date(deck.lastPracticed).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => onStartStudy(deck.id)}>Estudar</Button>
                <Button variant="outline" className="px-3">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Deck Card */}
        <Card className="h-full border-dashed hover:shadow-lg transition-all overflow-hidden flex flex-col justify-center items-center py-10">
          <Plus className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Criar Novo Deck</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Crie um novo conjunto de flashcards personalizado para seus estudos.
          </p>
          <Button>Criar Deck</Button>
        </Card>
      </div>
    </div>
  );
};

const FlashcardStudy = ({ onBackToDeck, deckId }: { onBackToDeck: () => void, deckId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [exiting, setExiting] = useState(false);
  
  const currentCard = sampleFlashcards[currentIndex];
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const nextCard = () => {
    if (currentIndex < sampleFlashcards.length - 1) {
      setDirection(1);
      setExiting(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setExiting(false);
      }, 300);
    }
  };
  
  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setExiting(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsFlipped(false);
        setExiting(false);
      }, 300);
    }
  };
  
  const markDifficulty = (difficulty: string) => {
    // In a real app, this would update the card's difficulty and schedule the next review
    console.log(`Card ${currentCard.id} marked as ${difficulty}`);
    nextCard();
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="mr-4" onClick={onBackToDeck}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para Decks
        </Button>
        <h1 className="text-2xl font-display font-bold">
          {flashcardDecks.find(deck => deck.id === deckId)?.title || "Vocabulário"}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
        {/* Flashcard display */}
        <div className="relative h-[400px] perspective">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ 
                x: direction * 50, 
                opacity: 0, 
                rotateY: isFlipped ? 180 : 0 
              }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                rotateY: isFlipped ? 180 : 0 
              }}
              exit={{ 
                x: direction * -50, 
                opacity: 0,
                rotateY: isFlipped ? 180 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 cursor-pointer preserve-3d"
              onClick={flipCard}
            >
              {/* Card front */}
              <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-white border border-muted ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary mb-4">
                  Nível {currentCard.level}
                </div>
                <p className="text-4xl font-display font-bold mb-4">{currentCard.front}</p>
                <p className="text-sm text-muted-foreground mb-6">Clique para virar</p>
                <Button 
                  variant="subtle" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(currentCard.front);
                  }}
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Ouvir</span>
                </Button>
              </div>
              
              {/* Card back */}
              <div className={`absolute inset-0 backface-hidden rounded-xl shadow-lg p-8 flex flex-col items-center justify-center bg-primary/5 border border-primary/20 rotateY-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-4xl font-display font-bold mb-6">{currentCard.back}</p>
                <div className="w-full max-w-xs p-4 rounded-lg bg-white text-center mb-6">
                  <p className="text-sm text-muted-foreground italic">"{currentCard.example}"</p>
                </div>
                <Button 
                  variant="subtle" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(currentCard.example);
                  }}
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Ouvir</span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Study information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Estudo</CardTitle>
              <CardDescription>
                Cartão {currentIndex + 1} de {sampleFlashcards.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Como funciona:</h3>
                <p className="text-sm text-muted-foreground">
                  Nosso sistema usa repetição espaçada para otimizar seu aprendizado. 
                  Palavras difíceis aparecerão com mais frequência, e as mais fáceis, menos vezes.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Dica:</h3>
                <p className="text-sm text-muted-foreground">
                  Tente formar uma frase com a palavra atual antes de virar o cartão.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Flashcard controls */}
      <div className="flex justify-center mb-4 gap-4">
        <Button variant="outline" size="sm" onClick={prevCard} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={flipCard}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={nextCard} disabled={currentIndex === sampleFlashcards.length - 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Difficulty buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-destructive text-destructive hover:bg-destructive/10"
          onClick={() => markDifficulty('hard')}
        >
          <X className="h-4 w-4 mr-1" /> Difícil
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => markDifficulty('medium')}
        >
          Médio
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-accent text-accent hover:bg-accent/10"
          onClick={() => markDifficulty('easy')}
        >
          <CheckCircle className="h-4 w-4 mr-1" /> Fácil
        </Button>
      </div>
    </div>
  );
};

const FlashcardPage = () => {
  const [activeView, setActiveView] = useState("decks"); // "decks" or "study"
  const [activeDeckId, setActiveDeckId] = useState("");
  
  const handleStartStudy = (deckId: string) => {
    setActiveDeckId(deckId);
    setActiveView("study");
  };
  
  const handleBackToDeck = () => {
    setActiveView("decks");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 px-6">
        {activeView === "decks" ? (
          <FlashcardDecksList onStartStudy={handleStartStudy} />
        ) : (
          <FlashcardStudy onBackToDeck={handleBackToDeck} deckId={activeDeckId} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default FlashcardPage;
