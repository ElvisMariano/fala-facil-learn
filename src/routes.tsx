
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/licoes/*" element={<Lessons />} />
      <Route path="/flashcards" element={<FlashcardPage />} />
      <Route path="/vocabulario/*" element={<Vocabulary />} />
      <Route path="/gramatica/*" element={<Grammar />} />
      <Route path="/conversacao/*" element={<Conversation />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/conquistas" element={<Conquistas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
