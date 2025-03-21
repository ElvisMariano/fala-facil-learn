
import { Button } from "@/components/ui/custom/Button";
import { ProgressIndicator } from "@/components/ui/custom/ProgressIndicator";
import { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, PlayCircle, Volume2 } from "lucide-react";

const questions = [
  {
    type: "multiple-choice",
    question: "What is the correct greeting for the morning?",
    options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
    correctAnswer: 0,
  },
  {
    type: "fill-in-blank",
    question: "Complete the sentence: 'I ___ a student.'",
    options: ["am", "is", "are", "be"],
    correctAnswer: 0,
  },
  {
    type: "listening",
    question: "Listen and select what you hear:",
    audioSrc: "#", // In a real app, this would be an actual audio file
    options: ["How are you?", "Where are you?", "Who are you?", "Why are you?"],
    correctAnswer: 0,
  }
];

const LessonPreview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === currentQuestion.correctAnswer);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsAnimating(false);
      }, 400);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsAnimating(false);
      }, 400);
    }
  };
  
  return (
    <section className="py-24 px-6 md:px-10 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-edge">
            Interactive Lessons
          </h2>
          <p className="text-muted-foreground">
            Try a sample of our engaging lesson format with various question types and immediate feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Lesson sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h3 className="font-medium text-lg">Lesson Progress</h3>
              <ProgressIndicator 
                value={((currentQuestionIndex + 1) / questions.length) * 100} 
                max={100}
                showValue={true}
              />
              
              <div className="space-y-4 mt-8">
                {questions.map((_, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setSelectedAnswer(null);
                      setIsCorrect(null);
                    }}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      index === currentQuestionIndex 
                        ? "bg-primary text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium">
                      {index === 0 ? "Multiple Choice" : index === 1 ? "Fill in the Blank" : "Listening"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Lesson content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              {/* Progress bar (mobile only) */}
              <div className="block lg:hidden mb-6">
                <ProgressIndicator 
                  value={((currentQuestionIndex + 1) / questions.length) * 100} 
                  max={100}
                  size="sm"
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {/* Question type */}
                <div className="mb-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {currentQuestion.type === "multiple-choice" 
                      ? "Multiple Choice" 
                      : currentQuestion.type === "fill-in-blank"
                      ? "Fill in the Blank"
                      : "Listening Comprehension"}
                  </span>
                </div>
                
                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
                  
                  {/* Audio player for listening type */}
                  {currentQuestion.type === "listening" && (
                    <div className="mb-6 flex justify-center">
                      <Button variant="subtle" className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        <span>Play Audio</span>
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Options */}
                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? isCorrect
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-muted bg-muted/50 hover:bg-muted"
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-white border border-muted flex items-center justify-center mr-3">
                          {selectedAnswer === index && isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                          )}
                          {!(selectedAnswer === index && isCorrect) && String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Feedback */}
                {isCorrect !== null && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    isCorrect ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                  }`}>
                    {isCorrect 
                      ? "Correct! Well done." 
                      : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
                  </div>
                )}
                
                {/* Navigation */}
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </Button>
                  
                  <Button 
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1 || selectedAnswer === null}
                    className="flex items-center gap-1"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPreview;
