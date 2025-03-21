
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { ChevronLeft, ChevronRight, Volume2, CheckCircle, HelpCircle, AlertCircle, ThumbsUp } from "lucide-react";

// Sample lesson content
const lessonData = {
  "basic-greetings": {
    title: "Saudações Básicas",
    description: "Aprenda a cumprimentar pessoas em inglês",
    level: "A1",
    totalSteps: 5,
    content: [
      {
        type: "introduction",
        title: "Introdução às Saudações",
        content: "Saudações são a base de qualquer conversa em inglês. Elas são usadas para iniciar uma conversa e são uma maneira educada de reconhecer a presença de alguém.",
        examples: [
          { english: "Hello!", portuguese: "Olá!" },
          { english: "Hi!", portuguese: "Oi!" },
          { english: "Hey!", portuguese: "Ei!" }
        ]
      },
      {
        type: "content",
        title: "Saudações Formais",
        content: "Saudações formais são usadas em ambientes profissionais ou ao falar com pessoas que você não conhece bem.",
        examples: [
          { english: "Good morning!", portuguese: "Bom dia!" },
          { english: "Good afternoon!", portuguese: "Boa tarde!" },
          { english: "Good evening!", portuguese: "Boa noite! (ao chegar)" }
        ]
      },
      {
        type: "exercise",
        exerciseType: "multiple-choice",
        question: "Como você diria 'Bom dia' em inglês?",
        options: ["Good night", "Good morning", "Good afternoon", "Good evening"],
        correctAnswer: 1
      },
      {
        type: "exercise",
        exerciseType: "matching",
        question: "Combine as saudações em inglês com suas traduções:",
        pairs: [
          { item: "Good morning", match: "Bom dia" },
          { item: "Good afternoon", match: "Boa tarde" },
          { item: "Good evening", match: "Boa noite (ao chegar)" },
          { item: "Good night", match: "Boa noite (ao se despedir)" }
        ]
      },
      {
        type: "conclusion",
        title: "Resumo da Lição",
        content: "Parabéns! Você aprendeu as saudações básicas em inglês. Pratique-as regularmente para memorizar melhor.",
        tips: [
          "Use 'Good morning' até o meio-dia",
          "Use 'Good afternoon' do meio-dia até o pôr do sol",
          "Use 'Good evening' após o pôr do sol",
          "Use 'Good night' apenas ao se despedir para dormir"
        ]
      }
    ]
  },
  "numbers": {
    title: "Números em Inglês",
    description: "Aprenda a contar e usar números em conversas",
    level: "A1",
    totalSteps: 4,
    content: [
      {
        type: "introduction",
        title: "Introdução aos Números",
        content: "Aprender números é essencial para o dia a dia. Você vai usar para falar sobre preços, endereços, telefones e muito mais.",
        examples: [
          { english: "One", portuguese: "Um" },
          { english: "Two", portuguese: "Dois" },
          { english: "Three", portuguese: "Três" }
        ]
      },
      {
        type: "content",
        title: "Números de 1 a 10",
        content: "Vamos começar com os números básicos de 1 a 10.",
        examples: [
          { english: "One", portuguese: "Um" },
          { english: "Two", portuguese: "Dois" },
          { english: "Three", portuguese: "Três" },
          { english: "Four", portuguese: "Quatro" },
          { english: "Five", portuguese: "Cinco" },
          { english: "Six", portuguese: "Seis" },
          { english: "Seven", portuguese: "Sete" },
          { english: "Eight", portuguese: "Oito" },
          { english: "Nine", portuguese: "Nove" },
          { english: "Ten", portuguese: "Dez" }
        ]
      },
      {
        type: "exercise",
        exerciseType: "fill-in-blank",
        question: "Complete a sequência: One, _____, Three, _____, Five",
        blanks: ["", ""],
        correctAnswers: ["Two", "Four"]
      },
      {
        type: "conclusion",
        title: "Muito bem!",
        content: "Você aprendeu os números básicos de 1 a 10 em inglês. Continue praticando para memorizar.",
        tips: [
          "Pratique contando objetos em sua casa",
          "Tente lembrar dos números quando ver preços",
          "Pratique escrevendo os números por extenso"
        ]
      }
    ]
  }
};

const LessonContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch lesson data
    setTimeout(() => {
      if (id && lessonData[id as keyof typeof lessonData]) {
        setLesson(lessonData[id as keyof typeof lessonData]);
      } else {
        // Fallback to first lesson if ID not found
        setLesson(lessonData["basic-greetings"]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleNext = () => {
    if (currentStep < (lesson?.content.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSelectAnswer = (index: number) => {
    setAnswers({ ...answers, [currentStep]: index });
  };

  const handleMatchingAnswer = (itemIndex: number, matchIndex: number) => {
    const currentAnswers = answers[currentStep] || [];
    const newAnswers = [...currentAnswers];
    newAnswers[itemIndex] = matchIndex;
    setAnswers({ ...answers, [currentStep]: newAnswers });
  };

  const handleFillInBlank = (blankIndex: number, value: string) => {
    const currentAnswers = answers[currentStep] || [];
    const newAnswers = [...currentAnswers];
    newAnswers[blankIndex] = value;
    setAnswers({ ...answers, [currentStep]: newAnswers });
  };

  const isCurrentAnswerCorrect = () => {
    const currentContent = lesson?.content[currentStep];
    if (!currentContent || currentContent.type !== "exercise") return null;

    if (currentContent.exerciseType === "multiple-choice") {
      return answers[currentStep] === currentContent.correctAnswer;
    }

    if (currentContent.exerciseType === "fill-in-blank") {
      const userAnswers = answers[currentStep] || [];
      return currentContent.correctAnswers.every((answer: string, index: number) => 
        userAnswers[index]?.toLowerCase() === answer.toLowerCase()
      );
    }

    return null;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!lesson) {
      return (
        <div className="text-center py-10">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Lição não encontrada</h2>
          <p className="text-muted-foreground mb-6">Não foi possível encontrar esta lição.</p>
          <Button onClick={() => navigate("/licoes")}>Voltar para Lições</Button>
        </div>
      );
    }

    if (completed) {
      return (
        <div className="text-center py-10">
          <div className="rounded-full bg-accent/20 p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ThumbsUp className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
          <p className="text-muted-foreground mb-8">
            Você completou a lição "{lesson.title}". Ganhou {lesson.totalSteps * 5} XP!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/licoes")}>Voltar para Lições</Button>
            <Button variant="outline" onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setCompleted(false);
            }}>
              Revisar Lição
            </Button>
          </div>
        </div>
      );
    }

    const currentContent = lesson.content[currentStep];

    return (
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Etapa {currentStep + 1} de {lesson.totalSteps}
            </span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {lesson.level}
            </span>
          </div>
          <ProgressIndicator 
            value={((currentStep + 1) / lesson.totalSteps) * 100} 
            max={100}
          />
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{currentContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentContent.type === "introduction" || currentContent.type === "content" ? (
              <>
                <p className="mb-6">{currentContent.content}</p>
                
                {currentContent.examples && (
                  <div className="bg-muted/40 rounded-lg p-4">
                    <h4 className="font-medium mb-4">Exemplos:</h4>
                    <div className="space-y-3">
                      {currentContent.examples.map((example: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{example.english}</p>
                            <p className="text-sm text-muted-foreground">{example.portuguese}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : currentContent.type === "exercise" ? (
              <div>
                <p className="font-medium mb-6">{currentContent.question}</p>
                
                {currentContent.exerciseType === "multiple-choice" && (
                  <div className="space-y-3 mb-6">
                    {currentContent.options.map((option: string, index: number) => (
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-lg border ${
                          answers[currentStep] === index 
                            ? isCurrentAnswerCorrect() 
                              ? "border-accent bg-accent/10" 
                              : "border-destructive bg-destructive/10"
                            : "border-muted"
                        } hover:bg-muted/50 transition-colors`}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={answers[currentStep] !== undefined}
                      >
                        <div className="flex items-center">
                          <div className={`h-6 w-6 rounded-full ${
                            answers[currentStep] === index
                              ? isCurrentAnswerCorrect()
                                ? "bg-accent text-white"
                                : "bg-destructive text-white"
                              : "bg-muted"
                          } flex items-center justify-center mr-3`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {currentContent.exerciseType === "matching" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      {currentContent.pairs.map((pair: any, index: number) => (
                        <div key={index} className="p-3 rounded-lg border border-muted bg-muted/20">
                          <p>{pair.item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {currentContent.pairs.map((pair: any, index: number) => (
                        <button
                          key={index}
                          className={`w-full text-left p-3 rounded-lg border ${
                            (answers[currentStep] || [])[0] === index 
                              ? "border-primary bg-primary/10" 
                              : "border-muted"
                          } hover:bg-muted/50 transition-colors`}
                          onClick={() => handleMatchingAnswer(0, index)}
                        >
                          <p>{pair.match}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentContent.exerciseType === "fill-in-blank" && (
                  <div className="mb-6">
                    <p className="mb-4">{currentContent.question}</p>
                    {currentContent.blanks.map((blank: string, index: number) => (
                      <div key={index} className="mb-3">
                        <input
                          type="text"
                          placeholder="Digite sua resposta"
                          className="w-full p-2 border rounded-lg"
                          value={(answers[currentStep] || [])[index] || ""}
                          onChange={(e) => handleFillInBlank(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {answers[currentStep] !== undefined && (
                  <div className={`p-4 rounded-lg ${
                    isCurrentAnswerCorrect() 
                      ? "bg-accent/10 text-accent" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCurrentAnswerCorrect() ? (
                        <CheckCircle className="h-5 w-5 mt-0.5" />
                      ) : (
                        <HelpCircle className="h-5 w-5 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">
                          {isCurrentAnswerCorrect() 
                            ? "Correto! Muito bem!" 
                            : "Hmm, não está correto."}
                        </p>
                        {!isCurrentAnswerCorrect() && currentContent.exerciseType === "multiple-choice" && (
                          <p className="text-sm mt-1">
                            A resposta correta é: {currentContent.options[currentContent.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentContent.type === "conclusion" ? (
              <>
                <p className="mb-6">{currentContent.content}</p>
                
                {currentContent.tips && (
                  <div className="bg-accent/10 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-accent">Dicas:</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      {currentContent.tips.map((tip: string, index: number) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : null}
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={
              currentContent.type === "exercise" && 
              answers[currentStep] === undefined
            }
          >
            {currentStep === lesson.totalSteps - 1 ? (
              "Finalizar"
            ) : (
              <>
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/licoes")}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para Lições
        </Button>
      </div>
      
      {!loading && lesson && !completed && (
        <h1 className="text-2xl font-display font-bold mb-6">{lesson.title}</h1>
      )}
      
      {renderContent()}
    </div>
  );
};

export default LessonContent;
