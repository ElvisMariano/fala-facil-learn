
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { playAudio } from "@/utils/audioUtils";

// Componente de lição
const LessonContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Exemplo de conteúdo de lição
  const lessonContent = {
    id: id || "sample-lesson",
    title: "Introducing Yourself in English",
    description: "Learn basic phrases to introduce yourself in English.",
    steps: [
      {
        type: "text",
        title: "Common Greetings",
        content: "These are common ways to greet someone in English:\n\n- Hello\n- Hi\n- Hey\n- Good morning\n- Good afternoon\n- Good evening\n\nYou can use these phrases when meeting someone for the first time or when greeting friends and acquaintances.",
        examples: [
          { text: "Hello, my name is John.", audio: true },
          { text: "Hi there, nice to meet you.", audio: true },
          { text: "Good morning, how are you today?", audio: true }
        ]
      },
      {
        type: "text",
        title: "Introducing Yourself",
        content: "After greeting someone, you typically want to introduce yourself. Here are some common phrases:\n\n- My name is [your name].\n- I'm [your name].\n- Nice to meet you.\n- Pleased to meet you.\n- It's a pleasure to meet you.",
        examples: [
          { text: "My name is Sarah. What's your name?", audio: true },
          { text: "I'm David. It's nice to meet you.", audio: true },
          { text: "Hi, I'm Maria. Pleased to meet you.", audio: true }
        ]
      },
      {
        type: "text",
        title: "Asking for Someone's Name",
        content: "To ask someone's name, you can use these questions:\n\n- What's your name?\n- What can I call you?\n- May I know your name?\n- Could you tell me your name?",
        examples: [
          { text: "What's your name?", audio: true },
          { text: "Nice to meet you. What can I call you?", audio: true },
          { text: "Hello, could you tell me your name, please?", audio: true }
        ]
      },
      {
        type: "exercise",
        title: "Practice Exercise",
        content: "Complete the conversations with appropriate phrases:",
        questions: [
          {
            question: "A: ___________ \nB: Hi, nice to meet you.",
            options: ["Hello", "Goodbye", "See you later", "Thank you"],
            correctAnswer: 0
          },
          {
            question: "A: What's your name? \nB: ___________",
            options: ["Yes, please", "My name is John", "I'm fine", "How are you?"],
            correctAnswer: 1
          },
          {
            question: "A: Good morning, ___________? \nB: I'm Emma.",
            options: ["how old are you", "where are you from", "what's your name", "how are you"],
            correctAnswer: 2
          }
        ]
      },
      {
        type: "quiz",
        title: "Lesson Quiz",
        questions: [
          {
            question: "Which of the following is NOT a common greeting in English?",
            options: ["Hello", "Good afternoon", "Welcome to meet you", "Hi there"],
            correctAnswer: 2
          },
          {
            question: "What is the most formal way to introduce yourself?",
            options: ["Hey, I'm John", "I'm John", "My name is John", "It's a pleasure to meet you, my name is John"],
            correctAnswer: 3
          },
          {
            question: "What time of day would you say 'Good evening'?",
            options: ["5-6 AM", "10-11 AM", "1-2 PM", "After 6 PM"],
            correctAnswer: 3
          }
        ]
      }
    ]
  };

  const step = lessonContent.steps[currentStep];

  const handleNextStep = () => {
    if (currentStep < lessonContent.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handlePlayAudio = async (text: string) => {
    try {
      await playAudio(text);
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    }
  };

  const renderStep = () => {
    switch (step.type) {
      case "text":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">{step.title}</h2>
            <div className="prose max-w-none">
              {step.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {step.examples && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Examples:</h3>
                <div className="space-y-2">
                  {step.examples.map((example, idx) => (
                    <div key={idx} className="p-3 bg-muted/30 rounded-lg flex justify-between items-center">
                      <span className="text-sm">{example.text}</span>
                      {example.audio && (
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlayAudio(example.text)}
                          className="ml-2"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case "exercise":
      case "quiz":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">{step.title}</h2>
            
            <div className="prose max-w-none mb-6">
              <p>{step.content}</p>
            </div>
            
            <div className="space-y-8">
              {step.questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <div className="text-lg font-medium">
                    {question.question.split("\n").map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < question.question.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        className={`p-3 rounded-lg border text-left ${
                          userAnswers[qIndex] === oIndex
                            ? userAnswers[qIndex] === question.correctAnswer
                              ? "bg-green-100 border-green-400"
                              : "bg-red-100 border-red-400"
                            : "border-gray-200 hover:bg-muted"
                        }`}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={handlePrevStep} className="mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          {currentStep === 0 ? "Back to Lessons" : "Previous Step"}
        </Button>
        
        <h1 className="text-3xl font-display font-bold">{lessonContent.title}</h1>
        <p className="text-muted-foreground mt-2">{lessonContent.description}</p>
      </div>
      
      <div className="mb-4 flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep + 1} of {lessonContent.steps.length}</span>
        {isCompleted && <span className="text-green-600 font-medium">Lesson Completed!</span>}
      </div>
      
      <Card>
        <CardContent className="p-6">
          {renderStep()}
        </CardContent>
      </Card>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handlePrevStep}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          {currentStep === 0 ? "Back to Lessons" : "Previous"}
        </Button>
        
        <Button onClick={handleNextStep}>
          {currentStep < lessonContent.steps.length - 1 ? "Next" : "Complete Lesson"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LessonContent;
