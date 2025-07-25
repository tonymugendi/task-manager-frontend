import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBoardModal } from "@/components/boards/create-board-modal";
import withAuth from "@/components/auth/withAuth";
import axios from "@/lib/axios";
import { Plus, Kanban, Users, Calendar, MoreVertical, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { z } from "zod";

const boardSchema = z.object({
  name: z.string().min(3, "Board name must be at least 3 characters long"),
});

const BoardsListPage = () => {
  const { boards, isLoading, isError, mutate } = useBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleBoardCreate = async (board: z.infer<typeof boardSchema>) => {
    setIsCreating(true);
    try {
      await axios.post('/boards/boards', board);
      mutate();
      console.log("Board created successfully:", board.name);
    } catch (error: any) {
      console.error("Failed to create board:", error?.response?.data?.message || error.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Mock data for demonstration - replace with real data from API
  const getBoardStats = (boardId: string) => {
    return {
      tasks: Math.floor(Math.random() * 20) + 5,
      members: Math.floor(Math.random() * 8) + 2,
      progress: Math.floor(Math.random() * 100),
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  };

  const boardColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Boards</h1>
              <p className="text-gray-600">Organize your work with Kanban boards</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
              disabled={isCreating}
            >
              <Plus className="mr-2 h-5 w-5" />
              {isCreating ? 'Creating...' : 'Create New Board'}
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Boards</p>
                  <p className="text-2xl font-bold text-gray-900">{boards?.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">{boards ? boards.length * 3 : 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{boards ? Math.floor(boards.length * 1.5) : 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div>
          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Kanban className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Boards</h3>
              <p className="text-gray-600 mb-4">We couldn't fetch your boards. Please try again later.</p>
              <Button onClick={() => mutate()} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {boards && boards.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {boards.map((board, index) => {
                const stats = getBoardStats(board.id);
                const colorClass = boardColors[index % boardColors.length];

                return (
                  <Link href={`/boards/${board.id}`} key={board.id}>
                    <Card className="bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-indigo-200 group-hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center shadow-sm`}>
                            <Kanban className="w-5 h-5 text-white" />
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-900 mt-3 group-hover:text-indigo-600 transition-colors">
                          {board.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{stats.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${stats.progress}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Kanban className="w-4 h-4" />
                                <span>{stats.tasks}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{stats.members}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{stats.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : boards && !isLoading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Kanban className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Boards Yet</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get started by creating your first project board. Organize your tasks and collaborate with your team effectively.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Board
              </Button>
            </div>
          ) : null}
        </div>

        <CreateBoardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBoardCreate={handleBoardCreate}
        />
      </div>
    </div>
  );
};

export default withAuth(BoardsListPage);
