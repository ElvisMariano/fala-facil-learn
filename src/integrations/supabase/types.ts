export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          createdAt: string
          criteria: Json
          description: string
          id: string
          points: number
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          criteria: Json
          description: string
          id: string
          points: number
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          criteria?: Json
          description?: string
          id?: string
          points?: number
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      decks: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          language: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          language: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          language?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          back: string
          created_at: string
          deck_id: string
          front: string
          hint: string | null
          id: string
          updated_at: string
        }
        Insert: {
          back: string
          created_at?: string
          deck_id: string
          front: string
          hint?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          back?: string
          created_at?: string
          deck_id?: string
          front?: string
          hint?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          content: string
          createdAt: string
          deletedAt: string | null
          id: string
          status: string
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          deletedAt?: string | null
          id: string
          status?: string
          title: string
          updatedAt: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          deletedAt?: string | null
          id?: string
          status?: string
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          content: string
          createdAt: string
          deletedAt: string | null
          id: string
          postId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          deletedAt?: string | null
          id: string
          postId: string
          updatedAt: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          deletedAt?: string | null
          id?: string
          postId?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          category: string
          content: Json
          createdAt: string
          deletedAt: string | null
          description: string
          id: string
          level: string
          order: number
          status: string
          title: string
          updatedAt: string
        }
        Insert: {
          category: string
          content: Json
          createdAt?: string
          deletedAt?: string | null
          description: string
          id: string
          level: string
          order: number
          status?: string
          title: string
          updatedAt: string
        }
        Update: {
          category?: string
          content?: Json
          createdAt?: string
          deletedAt?: string | null
          description?: string
          id?: string
          level?: string
          order?: number
          status?: string
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          attempts: number
          completedAt: string | null
          createdAt: string
          errors: number
          id: string
          lessonId: string
          nextReview: string | null
          reviewCount: number
          startedAt: string | null
          status: Database["public"]["Enums"]["Status"]
          timeSpent: number
          updatedAt: string
          userId: string
          xpEarned: number
        }
        Insert: {
          attempts?: number
          completedAt?: string | null
          createdAt?: string
          errors?: number
          id: string
          lessonId: string
          nextReview?: string | null
          reviewCount?: number
          startedAt?: string | null
          status?: Database["public"]["Enums"]["Status"]
          timeSpent?: number
          updatedAt: string
          userId: string
          xpEarned?: number
        }
        Update: {
          attempts?: number
          completedAt?: string | null
          createdAt?: string
          errors?: number
          id?: string
          lessonId?: string
          nextReview?: string | null
          reviewCount?: number
          startedAt?: string | null
          status?: Database["public"]["Enums"]["Status"]
          timeSpent?: number
          updatedAt?: string
          userId?: string
          xpEarned?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_lessonId_fkey"
            columns: ["lessonId"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievementId: string
          id: string
          unlockedAt: string
          userId: string
        }
        Insert: {
          achievementId: string
          id: string
          unlockedAt?: string
          userId: string
        }
        Update: {
          achievementId?: string
          id?: string
          unlockedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievementId_fkey"
            columns: ["achievementId"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          card_id: string
          created_at: string
          deck_id: string
          difficulty: string | null
          id: string
          last_reviewed: string | null
          next_review_date: string | null
          review_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          deck_id: string
          difficulty?: string | null
          id?: string
          last_reviewed?: string | null
          next_review_date?: string | null
          review_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          deck_id?: string
          difficulty?: string | null
          id?: string
          last_reviewed?: string | null
          next_review_date?: string | null
          review_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          createdAt: string
          deletedAt: string | null
          email: string
          id: string
          lastActivityAt: string
          level: number
          name: string
          passwordHash: string
          role: Database["public"]["Enums"]["UserRole"]
          streak: number
          timezone: string
          updatedAt: string
          xp: number
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          email: string
          id: string
          lastActivityAt?: string
          level?: number
          name: string
          passwordHash: string
          role?: Database["public"]["Enums"]["UserRole"]
          streak?: number
          timezone?: string
          updatedAt: string
          xp?: number
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          email?: string
          id?: string
          lastActivityAt?: string
          level?: number
          name?: string
          passwordHash?: string
          role?: Database["public"]["Enums"]["UserRole"]
          streak?: number
          timezone?: string
          updatedAt?: string
          xp?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
      UserRole: "ADMIN" | "STUDENT" | "MODERATOR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
