
import { Button } from "@/components/ui/custom/Button";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-display font-semibold tracking-tight text-foreground">
              Fala Fácil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationItem label="Lições" href="/licoes">
              <div className="rounded-lg bg-white p-4 shadow-lg w-64 grid gap-2">
                <Link to="/licoes/iniciante" className="block p-2 hover:bg-muted rounded-md transition-colors">
                  Iniciante (A1-A2)
                </Link>
                <Link to="/licoes/intermediario" className="block p-2 hover:bg-muted rounded-md transition-colors">
                  Intermediário (B1-B2)
                </Link>
                <Link to="/licoes/avancado" className="block p-2 hover:bg-muted rounded-md transition-colors">
                  Avançado (C1-C2)
                </Link>
              </div>
            </NavigationItem>
            <NavigationItem label="Flashcards" href="/flashcards" />
            <NavigationItem label="Progresso" href="/progresso" />
            <NavigationItem label="Comunidade" href="/comunidade" />
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="subtle" size="sm" onClick={() => handleNavigation("/login")}>
              Entrar
            </Button>
            <Button size="sm" onClick={() => handleNavigation("/registro")}>
              Cadastrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-white z-40 px-6 py-8 md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <div className="text-lg font-medium py-2 border-b border-muted" onClick={() => handleNavigation("/licoes")}>
            Lições
          </div>
          <div className="text-lg font-medium py-2 border-b border-muted" onClick={() => handleNavigation("/flashcards")}>
            Flashcards
          </div>
          <div className="text-lg font-medium py-2 border-b border-muted" onClick={() => handleNavigation("/progresso")}>
            Progresso
          </div>
          <div className="text-lg font-medium py-2 border-b border-muted" onClick={() => handleNavigation("/comunidade")}>
            Comunidade
          </div>
        </nav>
        
        <div className="mt-8 flex flex-col space-y-4">
          <Button variant="subtle" width="full" onClick={() => handleNavigation("/login")}>
            Entrar
          </Button>
          <Button width="full" onClick={() => handleNavigation("/registro")}>
            Cadastrar
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavigationItemProps {
  label: string;
  href: string;
  children?: React.ReactNode;
}

const NavigationItem = ({ label, href, children }: NavigationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  if (children) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          onClick={handleClick}
          className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{label}</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform", 
            isHovered && "rotate-180"
          )} />
        </div>
        
        {isHovered && (
          <div className="absolute top-full left-0 pt-2 z-10 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      onClick={handleClick}
      className="text-foreground hover:text-primary transition-colors cursor-pointer"
    >
      {label}
    </div>
  );
};

export default Header;
