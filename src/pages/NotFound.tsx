
import React from "react";
import { Button } from "@/components/ui/custom/Button";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-display font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Página Não Encontrada</h2>
          <p className="text-muted-foreground mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
            <Button variant="outline" as={Link} to="/licoes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Explorar Lições
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
