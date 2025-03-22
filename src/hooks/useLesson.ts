
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService, Lesson } from "@/services/lessonService";
import { toast } from "sonner";

export const useLesson = (initialSearch = "") => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filters, setFilters] = useState({
    level: "all",
    category: "all",
    status: "all",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  
  const queryClient = useQueryClient();
  
  // Query para buscar lições
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['lessons', searchTerm, filters, pagination],
    queryFn: async () => {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        level: filters.level !== "all" ? filters.level : undefined,
        category: filters.category !== "all" ? filters.category : undefined,
        status: filters.status !== "all" ? filters.status : undefined,
      };
      
      try {
        // Por enquanto, vamos usar dados simulados
        // Em um ambiente real, isso seria:
        // return lessonService.getAll(params);
        
        // Simulando resposta da API
        return {
          lessons: [
            {
              id: "lesson1",
              title: "Introdução ao Inglês",
              description: "Uma introdução básica ao idioma inglês",
              level: "beginner",
              category: "grammar",
              status: "published",
              students: 120
            },
            {
              id: "lesson2",
              title: "Tempos Verbais",
              description: "Aprenda sobre os diferentes tempos verbais em inglês",
              level: "intermediate",
              category: "grammar",
              status: "published",
              students: 85
            },
            {
              id: "lesson3",
              title: "Vocabulário de Viagem",
              description: "Palavras e frases essenciais para viagens",
              level: "beginner",
              category: "vocabulary",
              status: "draft",
              students: 0
            }
          ],
          pagination: {
            total: 3,
            pages: 1,
            currentPage: 1,
            perPage: 10
          }
        };
      } catch (error) {
        console.error("Erro ao buscar lições:", error);
        throw error;
      }
    },
  });
  
  // Mutação para criar uma lição
  const createMutation = useMutation({
    mutationFn: (newLesson: Lesson) => {
      // Em um ambiente real, isso seria:
      // return lessonService.create(newLesson);
      
      // Simulando resposta da API
      return Promise.resolve({
        lesson: {
          id: `lesson-${Date.now()}`,
          ...newLesson,
          students: 0
        },
        message: "Lição criada com sucesso"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success("Lição criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar lição: ${error.message || "Tente novamente mais tarde"}`);
    }
  });
  
  // Mutação para atualizar uma lição
  const updateMutation = useMutation({
    mutationFn: ({ id, lesson }: { id: string, lesson: Partial<Lesson> }) => {
      // Em um ambiente real, isso seria:
      // return lessonService.update(id, lesson);
      
      // Simulando resposta da API
      return Promise.resolve({
        lesson: {
          id,
          ...lesson
        },
        message: "Lição atualizada com sucesso"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success("Lição atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar lição: ${error.message || "Tente novamente mais tarde"}`);
    }
  });
  
  // Mutação para excluir uma lição
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      // Em um ambiente real, isso seria:
      // return lessonService.delete(id);
      
      // Simulando resposta da API
      return Promise.resolve({
        message: "Lição excluída com sucesso"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success("Lição excluída com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir lição: ${error.message || "Tente novamente mais tarde"}`);
    }
  });
  
  return {
    lessons: data?.lessons || [],
    pagination: data?.pagination,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    setPagination,
    refetch,
    createLesson: createMutation.mutate,
    updateLesson: updateMutation.mutate,
    deleteLesson: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
};
