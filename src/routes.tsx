
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

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/licoes/*" element={<Lessons />} />
    <Route path="/flashcards" element={<FlashcardPage />} />
    <Route path="/vocabulario/*" element={<Vocabulary />} />
    <Route path="/gramatica" element={<Grammar />} />
    <Route path="/gramatica/modal-verbs" element={<ModalVerbsLesson />} />
    <Route path="/conversacao/*" element={<Conversation />} />
    <Route path="/progresso" element={<Progress />} />
    <Route path="/comunidade" element={<Community />} />
    <Route path="/perfil" element={<Perfil />} />
    <Route path="/conquistas" element={<Conquistas />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />
    <Route path="/admin/*" element={<Admin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
