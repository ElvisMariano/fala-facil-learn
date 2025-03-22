
import { api } from "./api";

export interface Lesson {
  id?: string;
  title: string;
  description: string;
  level: string;
  category: string;
  content: string;
  status: "draft" | "published";
}

export const lessonService = {
  getAll: async (params = {}) => {
    return api.get("/lessons", params);
  },
  
  getById: async (id: string) => {
    return api.get(`/lessons/${id}`);
  },
  
  create: async (lesson: Lesson) => {
    return api.post("/lessons", lesson);
  },
  
  update: async (id: string, lesson: Partial<Lesson>) => {
    return api.put(`/lessons/${id}`, lesson);
  },
  
  delete: async (id: string) => {
    return api.delete(`/lessons/${id}`);
  },
  
  publishLesson: async (id: string) => {
    return api.put(`/lessons/${id}`, { status: "published" });
  },
  
  unpublishLesson: async (id: string) => {
    return api.put(`/lessons/${id}`, { status: "draft" });
  }
};
