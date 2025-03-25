import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('@fala-facil:token');
    const publicRoutes = ['/', '/login'];

    if (!token && !publicRoutes.includes(location.pathname)) {
      toast.error('Você precisa estar logado para acessar esta página');
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
} 