
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ChevronUp, XCircle, AlertCircle, Lightbulb, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const modalVerbsLesson = {
  title: "Verbos Modais (Modal Verbs)",
  description: "Aprenda a usar os verbos modais can, could, may, might, should e must",
  sections: [
    {
      id: "introduction",
      title: "Introdução aos Verbos Modais",
      content: `
        <p>Verbos modais são um tipo especial de verbo auxiliar que modificam o modo como vemos a ação do verbo principal. Eles expressam modalidade – ou seja, possibilidade, permissão, habilidade, obrigação, etc.</p>
        
        <p>Características importantes dos verbos modais:</p>
        <ul>
          <li>Não usam auxiliares para formar perguntas ou negativas</li>
          <li>Não possuem conjugações (não mudam de forma)</li>
          <li>São seguidos pelo verbo principal na forma base (sem "to")</li>
          <li>Não têm infinitivo ou forma -ing</li>
        </ul>
        
        <p>Os verbos modais mais comuns em inglês são: <strong>can</strong>, <strong>could</strong>, <strong>may</strong>, <strong>might</strong>, <strong>must</strong>, <strong>should</strong>, <strong>will</strong> e <strong>would</strong>.</p>
      `
    },
    {
      id: "can-could",
      title: "Can & Could",
      content: `
        <h3>Can (Poder / Conseguir)</h3>
        <p>Usamos "can" para falar sobre:</p>
        <ul>
          <li><strong>Habilidade:</strong> I <u>can</u> speak three languages. (Eu consigo/posso falar três idiomas.)</li>
          <li><strong>Possibilidade:</strong> It <u>can</u> get very cold here in winter. (Pode ficar muito frio aqui no inverno.)</li>
          <li><strong>Permissão:</strong> You <u>can</u> use my phone if you need to. (Você pode usar meu telefone se precisar.)</li>
        </ul>
        
        <p>Para formar a negativa, use "cannot" ou "can't":</p>
        <ul>
          <li>I <u>cannot</u> (can't) swim very well. (Eu não consigo nadar muito bem.)</li>
        </ul>
        
        <h3>Could (Poderia / Conseguia)</h3>
        <p>Usamos "could" para falar sobre:</p>
        <ul>
          <li><strong>Habilidade no passado:</strong> When I was younger, I <u>could</u> run very fast. (Quando eu era mais jovem, eu conseguia correr muito rápido.)</li>
          <li><strong>Possibilidade:</strong> It <u>could</u> rain later today. (Pode chover mais tarde hoje.)</li>
          <li><strong>Pedidos educados:</strong> <u>Could</u> you help me with this? (Você poderia me ajudar com isso?)</li>
        </ul>
        
        <div class="bg-blue-50 p-4 rounded-lg my-4">
          <p class="font-medium">Diferença importante:</p>
          <p>"Can" é geralmente usado para o presente, enquanto "could" pode expressar o passado de "can" ou uma possibilidade mais hipotética/remota no presente ou futuro.</p>
        </div>
      `
    },
    {
      id: "may-might",
      title: "May & Might",
      content: `
        <h3>May (Poder / Talvez)</h3>
        <p>Usamos "may" para falar sobre:</p>
        <ul>
          <li><strong>Possibilidade:</strong> It <u>may</u> rain tomorrow. (Pode chover amanhã.)</li>
          <li><strong>Permissão (formal):</strong> <u>May</u> I come in? (Posso entrar?)</li>
        </ul>
        
        <h3>Might (Poderia / Talvez)</h3>
        <p>Usamos "might" para falar sobre:</p>
        <ul>
          <li><strong>Possibilidade menor:</strong> I <u>might</u> go to the party, but I'm not sure. (Eu talvez vá à festa, mas não tenho certeza.)</li>
        </ul>
        
        <div class="bg-blue-50 p-4 rounded-lg my-4">
          <p class="font-medium">Diferença entre may e might:</p>
          <p>"May" geralmente sugere uma possibilidade mais provável que "might". Compare:</p>
          <p>- It <u>may</u> rain tomorrow. (É bastante possível que chova amanhã.)</p>
          <p>- It <u>might</u> rain tomorrow. (Há alguma possibilidade de que chova amanhã, mas é menos certo.)</p>
        </div>
      `
    },
    {
      id: "must-should",
      title: "Must & Should",
      content: `
        <h3>Must (Dever / Ter que)</h3>
        <p>Usamos "must" para falar sobre:</p>
        <ul>
          <li><strong>Obrigação forte:</strong> You <u>must</u> stop at a red light. (Você deve parar no sinal vermelho.)</li>
          <li><strong>Proibição (na negativa):</strong> You <u>must not</u> enter this area. (Você não deve/não pode entrar nesta área.)</li>
          <li><strong>Dedução lógica:</strong> She <u>must</u> be tired after working all day. (Ela deve estar cansada depois de trabalhar o dia todo.)</li>
        </ul>
        
        <h3>Should (Deveria)</h3>
        <p>Usamos "should" para falar sobre:</p>
        <ul>
          <li><strong>Conselho ou recomendação:</strong> You <u>should</u> eat more vegetables. (Você deveria comer mais vegetais.)</li>
          <li><strong>Obrigação leve:</strong> I <u>should</u> call my mother more often. (Eu deveria ligar para minha mãe com mais frequência.)</li>
          <li><strong>Expectativa:</strong> The package <u>should</u> arrive tomorrow. (O pacote deve chegar amanhã.)</li>
        </ul>
        
        <div class="bg-blue-50 p-4 rounded-lg my-4">
          <p class="font-medium">Diferença importante:</p>
          <p>"Must" expressa uma obrigação ou necessidade mais forte que "should". "Should" sugere algo recomendável, mas não absolutamente necessário.</p>
        </div>
      `
    }
  ],
  exercises: [
    {
      id: 1,
      type: "multiple-choice",
      question: "John ____ speak three languages fluently.",
      options: ["can", "should", "might", "must"],
      correctAnswer: "can",
      explanation: "Usamos 'can' para falar sobre habilidade. John tem a habilidade de falar três idiomas fluentemente."
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "You ____ be careful when you drive in bad weather.",
      options: ["can", "should", "may", "could"],
      correctAnswer: "should",
      explanation: "Usamos 'should' para dar conselhos ou recomendações. Esta frase é um conselho sobre direção segura."
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "It's very cloudy. It ____ rain later.",
      options: ["can", "must", "might", "should"],
      correctAnswer: "might",
      explanation: "Usamos 'might' para falar sobre possibilidades no futuro, especialmente quando não temos muita certeza."
    },
    {
      id: 4,
      type: "fill-blank",
      question: "You ____ smoke in this building. It's prohibited.",
      correctAnswer: "must not",
      explanation: "Usamos 'must not' para expressar proibição. Fumar no prédio é proibido."
    },
    {
      id: 5,
      type: "fill-blank",
      question: "When I was a child, I ____ swim very well.",
      correctAnswer: "could",
      explanation: "Usamos 'could' para falar sobre habilidades no passado."
    },
    {
      id: 6,
      type: "true-false",
      question: "O verbo modal 'can' pode ser usado para expressar possibilidade no futuro.",
      correctAnswer: true,
      explanation: "Correto. Por exemplo: 'It can get very cold in winter.' (Pode ficar muito frio no inverno.)"
    },
    {
      id: 7,
      type: "true-false",
      question: "Os verbos modais precisam do auxiliar 'do' para formar perguntas.",
      correctAnswer: false,
      explanation: "Incorreto. Os verbos modais formam perguntas por inversão, sem precisar do auxiliar 'do'. Exemplo: 'Can you help me?' (não 'Do you can help me?')"
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "She hasn't eaten all day. She ____ be hungry.",
      options: ["could", "should", "must", "may"],
      correctAnswer: "must",
      explanation: "Usamos 'must' para expressar dedução lógica. Com base nas informações (não comeu o dia todo), é lógico concluir que ela está com fome."
    }
  ]
};

const ModalVerbsLesson = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true
  });
  const [currentView, setCurrentView] = useState<"content" | "exercise">("content");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
    
    if (!expandedSections[sectionId]) {
      setActiveSection(sectionId);
    }
  };
  
  const handleAnswerSelection = (exerciseId: number, answer: string | boolean) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };
  
  const checkAnswer = (exerciseId: number) => {
    setShowExplanation(prev => ({
      ...prev,
      [exerciseId]: true
    }));
  };
  
  const isAnswerCorrect = (exerciseId: number) => {
    const exercise = modalVerbsLesson.exercises.find(ex => ex.id === exerciseId);
    if (!exercise || userAnswers[exerciseId] === undefined) return false;
    
    return userAnswers[exerciseId] === exercise.correctAnswer;
  };
  
  const goToNextExercise = () => {
    if (currentExerciseIndex < modalVerbsLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setShowExplanation({});
    } else {
      // All exercises completed
      setLessonCompleted(true);
    }
  };
  
  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setShowExplanation({});
    }
  };
  
  const currentExercise = modalVerbsLesson.exercises[currentExerciseIndex];
  const progressPercentage = (currentExerciseIndex / modalVerbsLesson.exercises.length) * 100;
  
  const renderExercise = () => {
    const exercise = currentExercise;
    
    switch (exercise.type) {
      case "multiple-choice":
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">{exercise.question}</h3>
            
            <div className="space-y-3">
              {exercise.options?.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    userAnswers[exercise.id] === option 
                      ? isAnswerCorrect(exercise.id)
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => !showExplanation[exercise.id] && handleAnswerSelection(exercise.id, option)}
                >
                  {option}
                  {showExplanation[exercise.id] && userAnswers[exercise.id] === option && (
                    <span className="float-right">
                      {isAnswerCorrect(exercise.id) 
                        ? <CheckCircle className="h-5 w-5 text-green-500" /> 
                        : <XCircle className="h-5 w-5 text-red-500" />}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {showExplanation[exercise.id] && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Explicação:</p>
                    <p>{exercise.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case "fill-blank":
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">{exercise.question}</h3>
            
            <div className="mb-6">
              <input
                type="text"
                className={`w-full p-3 border rounded-lg ${
                  showExplanation[exercise.id]
                    ? isAnswerCorrect(exercise.id)
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : ""
                }`}
                placeholder="Digite sua resposta..."
                value={userAnswers[exercise.id] as string || ""}
                onChange={(e) => !showExplanation[exercise.id] && handleAnswerSelection(exercise.id, e.target.value)}
                disabled={showExplanation[exercise.id]}
              />
              
              {showExplanation[exercise.id] && !isAnswerCorrect(exercise.id) && (
                <p className="text-sm text-green-600 mt-2">
                  Resposta correta: {exercise.correctAnswer}
                </p>
              )}
            </div>
            
            {showExplanation[exercise.id] && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Explicação:</p>
                    <p>{exercise.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case "true-false":
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">{exercise.question}</h3>
            
            <div className="space-y-3">
              {[true, false].map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    userAnswers[exercise.id] === option 
                      ? isAnswerCorrect(exercise.id)
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => !showExplanation[exercise.id] && handleAnswerSelection(exercise.id, option)}
                >
                  {option ? "Verdadeiro" : "Falso"}
                  {showExplanation[exercise.id] && userAnswers[exercise.id] === option && (
                    <span className="float-right">
                      {isAnswerCorrect(exercise.id) 
                        ? <CheckCircle className="h-5 w-5 text-green-500" /> 
                        : <XCircle className="h-5 w-5 text-red-500" />}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {showExplanation[exercise.id] && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Explicação:</p>
                    <p>{exercise.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return <p>Tipo de exercício não suportado</p>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to="/gramatica" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para Gramática
            </Link>
            
            <h1 className="text-3xl font-display font-bold mb-2">{modalVerbsLesson.title}</h1>
            <p className="text-muted-foreground">{modalVerbsLesson.description}</p>
          </div>
          
          <div className="flex justify-between mb-6">
            <Button 
              variant={currentView === "content" ? "default" : "outline"} 
              onClick={() => setCurrentView("content")}
            >
              Conteúdo
            </Button>
            <Button 
              variant={currentView === "exercise" ? "default" : "outline"} 
              onClick={() => setCurrentView("exercise")}
            >
              Exercícios
            </Button>
          </div>
          
          {currentView === "content" ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="mb-6">
                  {modalVerbsLesson.sections.map((section) => (
                    <div key={section.id} className="mb-4">
                      <button
                        className="flex w-full items-center justify-between py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={() => toggleSection(section.id)}
                      >
                        <h3 className={`font-medium text-lg ${activeSection === section.id ? 'text-primary' : ''}`}>
                          {section.title}
                        </h3>
                        {expandedSections[section.id] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      
                      {expandedSections[section.id] && (
                        <div className="py-4 px-5">
                          <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button onClick={() => setCurrentView("exercise")}>
                    Praticar com Exercícios
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : lessonCompleted ? (
            <Card className="border-0 shadow-md text-center py-10">
              <CardContent>
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
                <p className="text-lg mb-6">Você completou a lição sobre Verbos Modais!</p>
                
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium mb-2">Pontos ganhos</p>
                    <p className="text-2xl font-bold text-primary">200 XP</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button as={Link} to="/gramatica" variant="outline" className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para Gramática
                    </Button>
                    <Button as={Link} to="/gramatica/conditionals" className="flex-1">
                      Próxima Lição
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Exercício {currentExerciseIndex + 1} de {modalVerbsLesson.exercises.length}</CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">{Math.round(progressPercentage)}% concluído</span>
                  </div>
                </div>
                <ProgressIndicator value={progressPercentage} max={100} />
              </CardHeader>
              <CardContent className="p-6">
                {renderExercise()}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={goToPreviousExercise}
                    disabled={currentExerciseIndex === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  
                  {showExplanation[currentExercise.id] ? (
                    <Button onClick={goToNextExercise}>
                      {currentExerciseIndex < modalVerbsLesson.exercises.length - 1 ? (
                        <>
                          Próximo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Finalizar
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={() => checkAnswer(currentExercise.id)}>
                      Verificar Resposta
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModalVerbsLesson;
