
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/custom/Button";
import { Search, FilePlus, Eye, X, Trash2, CheckCircle, Flag, ShieldAlert } from "lucide-react";

interface ForumTabProps {
  forumPostsData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ForumTab: React.FC<ForumTabProps> = ({ forumPostsData, searchTerm, setSearchTerm }) => {
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter data based on search term
  const filteredForumPosts = forumPostsData
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => filterStatus === "all" || post.status === filterStatus);

  const handleViewPost = (post: any) => {
    setCurrentPost(post);
    setShowPostDetails(true);
  };

  const handleApprovePost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Approving post with ID: ${id}`);
    // Then update the UI accordingly
  };

  const handleRejectPost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Rejecting post with ID: ${id}`);
    // Then update the UI accordingly
  };

  const handleDeletePost = (id: number) => {
    // In a real app, this would be an API call
    console.log(`Deleting post with ID: ${id}`);
    // Then update the UI accordingly
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Gerenciar Fórum</CardTitle>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <select 
                  className="border rounded-lg px-3 py-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todos os status</option>
                  <option value="approved">Aprovados</option>
                  <option value="pending">Pendentes</option>
                  <option value="rejected">Rejeitados</option>
                </select>
                <Button>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Novo Post
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Título</th>
                  <th className="py-3 px-2 text-left font-medium">Autor</th>
                  <th className="py-3 px-2 text-left font-medium">Data</th>
                  <th className="py-3 px-2 text-left font-medium">Respostas</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredForumPosts.map(post => (
                  <tr key={post.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2">
                      {post.flagged && <Flag className="h-4 w-4 text-red-500 inline mr-1" />}
                      {post.title}
                    </td>
                    <td className="py-3 px-2">{post.author}</td>
                    <td className="py-3 px-2">{post.date}</td>
                    <td className="py-3 px-2">{post.replies}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        post.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {post.status === 'approved' ? 'Aprovado' : post.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 hover:bg-muted rounded"
                          onClick={() => handleViewPost(post)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {post.status === 'pending' && (
                          <>
                            <button 
                              className="p-1 hover:bg-muted rounded text-green-500"
                              onClick={() => handleApprovePost(post.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-1 hover:bg-muted rounded text-red-500"
                              onClick={() => handleRejectPost(post.id)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button 
                          className="p-1 hover:bg-muted rounded text-red-500"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredForumPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {searchTerm ? `Nenhum post encontrado para "${searchTerm}"` : "Nenhum post com o status selecionado"}
              </p>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredForumPosts.length} de {forumPostsData.length} posts
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPostDetails && currentPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Detalhes do Post</h3>
              <button 
                className="p-1 hover:bg-muted rounded"
                onClick={() => setShowPostDetails(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Título</p>
                <p className="font-medium">{currentPost.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Autor</p>
                <p>{currentPost.author}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p>{currentPost.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  currentPost.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  currentPost.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {currentPost.status === 'approved' ? 'Aprovado' : 
                   currentPost.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                </span>
              </div>
              {currentPost.flagged && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 flex items-start">
                  <ShieldAlert className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">Conteúdo sinalizado</p>
                    <p className="text-sm text-red-600">Este post foi sinalizado por conter conteúdo potencialmente inapropriado.</p>
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Conteúdo</p>
                <p className="p-3 bg-muted/30 rounded-lg mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                  Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                  rhoncus ut eleifend nibh porttitor.
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Respostas ({currentPost.replies})</p>
                <div className="space-y-2 mt-1">
                  {currentPost.replies > 0 ? (
                    <>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium">Carlos Santos</p>
                        <p className="text-xs text-muted-foreground">08/06/2023</p>
                        <p className="mt-1 text-sm">
                          Eu também tenho essa dúvida. Alguém poderia explicar melhor?
                        </p>
                      </div>
                      {currentPost.replies > 1 && (
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium">Professor João</p>
                          <p className="text-xs text-muted-foreground">09/06/2023</p>
                          <p className="mt-1 text-sm">
                            Vou tentar explicar de uma forma mais clara na próxima aula!
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma resposta ainda.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              {currentPost.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleRejectPost(currentPost.id);
                      setShowPostDetails(false);
                    }}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button 
                    onClick={() => {
                      handleApprovePost(currentPost.id);
                      setShowPostDetails(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </>
              )}
              {currentPost.status !== 'pending' && (
                <Button 
                  onClick={() => setShowPostDetails(false)}
                >
                  Fechar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumTab;
