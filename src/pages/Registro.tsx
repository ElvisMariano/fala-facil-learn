import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AtSign, Eye, EyeOff, Lock, User, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error: authError } = useAuth();
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar conta. Tente novamente.");
    }
  };
  
  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Criar Conta</CardTitle>
              <CardDescription className="text-center">
                Preencha os dados abaixo para começar a aprender inglês
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(error || authError) && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                  {error || authError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Nome de Usuário
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="username"
                      type="text"
                      placeholder="Seu nome de usuário"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2 border rounded-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  <div className="space-y-2 mt-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className={`px-2 py-1 rounded-full ${hasMinLength ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        <div className="flex items-center gap-1">
                          {hasMinLength && <CheckCircle className="h-3 w-3" />}
                          Mínimo 8 caracteres
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full ${hasUpperCase ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        <div className="flex items-center gap-1">
                          {hasUpperCase && <CheckCircle className="h-3 w-3" />}
                          Letra maiúscula
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full ${hasLowerCase ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        <div className="flex items-center gap-1">
                          {hasLowerCase && <CheckCircle className="h-3 w-3" />}
                          Letra minúscula
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full ${hasNumber ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        <div className="flex items-center gap-1">
                          {hasNumber && <CheckCircle className="h-3 w-3" />}
                          Número
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Eu concordo com os{" "}
                      <Link to="/termos" className="text-primary hover:underline">
                        Termos de Serviço
                      </Link>{" "}
                      e{" "}
                      <Link to="/privacidade" className="text-primary hover:underline">
                        Política de Privacidade
                      </Link>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registrando..." : "Criar Conta"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Entrar
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registro;
