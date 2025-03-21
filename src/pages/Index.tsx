
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LessonPreview from "@/components/home/LessonPreview";
import FlashcardDemo from "@/components/home/FlashcardDemo";
import ProgressDemo from "@/components/home/ProgressDemo";
import { Button } from "@/components/ui/custom/Button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />
        <Features />
        <LessonPreview />
        <FlashcardDemo />
        <ProgressDemo />
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
          
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-edge mb-6">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of learners who have improved their English skills with our interactive platform. Start learning today and see the results for yourself.
            </p>
            
            <Button size="lg" className="gap-2">
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">10k+</h3>
                <p className="text-muted-foreground">Active Learners</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground">Interactive Lessons</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">5k+</h3>
                <p className="text-muted-foreground">Flashcards</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
