import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import FlashcardPage from "./pages/FlashcardPage";
import Perfil from "./pages/Perfil";
import Conquistas from "./pages/Conquistas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Conversation from "./pages/Conversation";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Admin from "./pages/Admin";
import ModalVerbsLesson from "./pages/grammar/ModalVerbsLesson";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/registro",
    element: <Registro />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/licoes/*",
    element: <ProtectedRoute><Lessons /></ProtectedRoute>
  },
  {
    path: "/flashcards",
    element: <ProtectedRoute><FlashcardPage /></ProtectedRoute>
  },
  {
    path: "/vocabulario/*",
    element: <ProtectedRoute><Vocabulary /></ProtectedRoute>
  },
  {
    path: "/gramatica",
    element: <ProtectedRoute><Grammar /></ProtectedRoute>
  },
  {
    path: "/gramatica/modal-verbs",
    element: <ProtectedRoute><ModalVerbsLesson /></ProtectedRoute>
  },
  {
    path: "/conversacao/*",
    element: <ProtectedRoute><Conversation /></ProtectedRoute>
  },
  {
    path: "/progresso",
    element: <ProtectedRoute><Progress /></ProtectedRoute>
  },
  {
    path: "/comunidade",
    element: <ProtectedRoute><Community /></ProtectedRoute>
  },
  {
    path: "/perfil",
    element: <ProtectedRoute><Perfil /></ProtectedRoute>
  },
  {
    path: "/conquistas",
    element: <ProtectedRoute><Conquistas /></ProtectedRoute>
  },
  {
    path: "/admin/*",
    element: <ProtectedRoute requireAdmin><Admin /></ProtectedRoute>
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
