import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/custom/Button";
import { Menu, X, User, LogOut, Settings, Trophy, ChevronDown } from "lucide-react";
import NavigationItem from "./NavigationItem";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
            {user ? (
              <div className="relative">
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>{user.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to="/perfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Perfil
                      </Link>
                      <Link
                        to="/conquistas"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Conquistas
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      )}
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="subtle" size="sm" onClick={() => handleNavigation("/login")}>
                  Entrar
                </Button>
                <Button size="sm" onClick={() => handleNavigation("/registro")}>
                  Cadastrar
                </Button>
              </>
            )}
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
          {user ? (
            <>
              <Button variant="subtle" width="full" onClick={() => handleNavigation("/perfil")}>
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
              <Button variant="subtle" width="full" onClick={() => handleNavigation("/conquistas")}>
                <Trophy className="h-4 w-4 mr-2" />
                Conquistas
              </Button>
              {isAdmin && (
                <Button variant="subtle" width="full" onClick={() => handleNavigation("/admin")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              )}
              <Button width="full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="subtle" width="full" onClick={() => handleNavigation("/login")}>
                Entrar
              </Button>
              <Button width="full" onClick={() => handleNavigation("/registro")}>
                Cadastrar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
