
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Book, Award, BarChart3, ListChecks, Users } from "lucide-react";
import React from "react";

// Custom Flashcard icon since it's not in lucide-react
const FlashcardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <path d="M9 10 L6 10" />
    <path d="M9 14 L6 14" />
    <path d="M18 10 L15 10" />
    <path d="M18 8 L15 8" />
    <path d="M18 12 L15 12" />
  </svg>
);

const features = [
  {
    icon: <Book className="h-6 w-6 text-primary" />,
    title: "Lições Estruturadas",
    description: "Lições abrangentes organizadas por níveis de proficiência, do iniciante ao avançado."
  },
  {
    icon: <FlashcardIcon className="h-6 w-6 text-primary" />,
    title: "Sistema de Flashcards",
    description: "Domine o vocabulário com nosso sistema de repetição espaçada otimizado para retenção de memória."
  },
  {
    icon: <ListChecks className="h-6 w-6 text-primary" />,
    title: "Atividades Interativas",
    description: "Pratique com atividades diversas, incluindo múltipla escolha, reconhecimento de fala e muito mais."
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Gamificação",
    description: "Ganhe XP, desbloqueie conquistas e mantenha sequências para se manter motivado."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Acompanhamento de Progresso",
    description: "Monitore sua jornada de aprendizado com estatísticas detalhadas e métricas de desempenho."
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Comunidade",
    description: "Conecte-se com outros alunos, participe de desafios e compartilhe seu progresso."
  }
];

const Features = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-edge">
            Projetado para Aprendizado Eficaz
          </h2>
          <p className="text-muted-foreground">
            Nossa plataforma combina metodologias comprovadas de aprendizado de idiomas com tecnologia moderna para tornar o aprendizado de inglês fácil e agradável.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
