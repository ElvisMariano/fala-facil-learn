
// Sample data for the Admin dashboard
export const usersData = [
  { id: 1, name: "Ana Oliveira", email: "ana.oliveira@email.com", level: "B1", registered: "10/03/2023", lastAccess: "12/06/2023", status: "active" },
  { id: 2, name: "Carlos Santos", email: "carlos.santos@email.com", level: "A2", registered: "15/04/2023", lastAccess: "10/06/2023", status: "active" },
  { id: 3, name: "Mariana Costa", email: "mariana.costa@email.com", level: "C1", registered: "05/01/2023", lastAccess: "11/06/2023", status: "active" },
  { id: 4, name: "Rafael Lima", email: "rafael.lima@email.com", level: "B2", registered: "20/02/2023", lastAccess: "01/06/2023", status: "inactive" },
  { id: 5, name: "Juliana Martins", email: "juliana.martins@email.com", level: "A1", registered: "30/05/2023", lastAccess: "08/06/2023", status: "active" }
];

export const lessonsData = [
  { id: 1, title: "Present Simple", category: "Grammar", level: "A1", students: 145, completion: 85, status: "published" },
  { id: 2, title: "Family Vocabulary", category: "Vocabulary", level: "A1", students: 132, completion: 78, status: "published" },
  { id: 3, title: "Past Simple", category: "Grammar", level: "A2", students: 98, completion: 62, status: "published" },
  { id: 4, title: "Conditionals", category: "Grammar", level: "B1", students: 76, completion: 45, status: "draft" },
  { id: 5, title: "Business English", category: "Conversation", level: "B2", students: 54, completion: 38, status: "published" }
];

export const analyticsData = {
  totalUsers: 1250,
  activeUsers: 876,
  totalLessons: 48,
  completedLessons: 4350,
  feedbackScore: 4.7,
  userGrowth: [
    { month: "Jan", users: 950 },
    { month: "Feb", users: 1020 },
    { month: "Mar", users: 1080 },
    { month: "Apr", users: 1150 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1250 }
  ],
  lessonCompletion: [
    { category: "Grammar", completed: 1850 },
    { category: "Vocabulary", completed: 1250 },
    { category: "Listening", completed: 650 },
    { category: "Speaking", completed: 350 },
    { category: "Reading", completed: 450 }
  ]
};

export const notificationsData = [
  { id: 1, type: "user", message: "Novo usuário registrado: Maria Silva", time: "1 hora atrás", read: false },
  { id: 2, type: "system", message: "Backup do sistema concluído com sucesso", time: "3 horas atrás", read: true },
  { id: 3, type: "message", message: "Nova mensagem no fórum: Dúvidas sobre verbos modais", time: "5 horas atrás", read: false },
  { id: 4, type: "alert", message: "Atenção: 5 usuários não acessam há mais de 30 dias", time: "1 dia atrás", read: true }
];

export const activitiesData = [
  { id: 1, title: "Vocabulário - Cores", type: "Lição", category: "Vocabulário", level: "A1", status: "active", createdAt: "15/05/2023" },
  { id: 2, title: "Present Continuous", type: "Exercício", category: "Gramática", level: "A2", status: "active", createdAt: "20/05/2023" },
  { id: 3, title: "Animais Domésticos", type: "Flashcards", category: "Vocabulário", level: "A1", status: "inactive", createdAt: "25/05/2023" },
  { id: 4, title: "Preposições de Lugar", type: "Quiz", category: "Gramática", level: "B1", status: "active", createdAt: "30/05/2023" },
  { id: 5, title: "Conversação - Restaurante", type: "Diálogo", category: "Conversação", level: "B2", status: "active", createdAt: "02/06/2023" }
];

export const forumPostsData = [
  { id: 1, title: "Dúvida sobre tempos verbais", author: "Ana Oliveira", date: "10/06/2023", status: "approved", flagged: false, replies: 5 },
  { id: 2, title: "Como praticar conversação?", author: "Carlos Santos", date: "09/06/2023", status: "approved", flagged: false, replies: 8 },
  { id: 3, title: "Material de estudo para iniciantes", author: "Mariana Costa", date: "08/06/2023", status: "pending", flagged: false, replies: 0 },
  { id: 4, title: "Conteúdo inapropriado", author: "Rafael Lima", date: "07/06/2023", status: "rejected", flagged: true, replies: 2 },
  { id: 5, title: "Cronograma de estudos", author: "Juliana Martins", date: "06/06/2023", status: "approved", flagged: false, replies: 4 }
];
