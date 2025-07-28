import { Button } from "@/components/ui/button";
import { AddTaskModal } from "@/components/tasks/add-task-modal";
import withAuth from "@/components/auth/withAuth";
import { useBoard } from "@/hooks/useBoard";
import axios from "@/lib/axios";
import { AlertCircle, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { BoardHeader } from "@/components/boards/BoardHeader";
import { BoardStats } from "@/components/boards/BoardStats";
import { KanbanColumn } from "@/components/boards/KanbanColumn";



const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  listId: z.string().min(1, "List is required"),
});

const BoardsPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const { board, isLoading, isError, mutate } = useBoard(boardId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log({board});

  // Use board name from API or format boardId as fallback
  const boardName = board?.name || (
    typeof boardId === 'string'
      ? boardId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : 'Board'
  );

  // Mock data for enhanced UI - replace with real data from API
  const getBoardStats = () => {
    if (!board?.lists) return { total: 0, completed: 0, inProgress: 0, todo: 0 };
    
    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let todo = 0;
    
    board.lists.forEach(list => {
      if (list.tasks) {
        total += list.tasks.length;
        if (list.name.toLowerCase().includes('done') || list.name.toLowerCase().includes('complete')) {
          completed += list.tasks.length;
        } else if (list.name.toLowerCase().includes('progress') || list.name.toLowerCase().includes('doing')) {
          inProgress += list.tasks.length;
        } else {
          todo += list.tasks.length;
        }
      }
    });
    
    return { total, completed, inProgress, todo };
  };

  const getTaskPriority = (taskId: string) => {
    // Mock priority assignment - replace with real data
    const priorities = ['high', 'medium', 'low'];
    return priorities[Math.floor(Math.random() * priorities.length)];
  };

  const getTaskAssignee = (taskId: string) => {
    // Mock assignee data - replace with real data
    const assignees = [
      { name: 'John Doe', avatar: 'JD', color: 'bg-blue-500' },
      { name: 'Jane Smith', avatar: 'JS', color: 'bg-green-500' },
      { name: 'Mike Johnson', avatar: 'MJ', color: 'bg-purple-500' },
      { name: 'Sarah Wilson', avatar: 'SW', color: 'bg-pink-500' }
    ];
    return assignees[Math.floor(Math.random() * assignees.length)];
  };



  const handleTaskAdd = async (task: z.infer<typeof taskSchema>) => {
    try {
      await axios.post(`/boards/${boardId}/lists/${task.listId}/tasks`, {
        title: task.title,
        description: task.description || null, // Send null if empty
        // Backend will handle position calculation
      });
      
      // Refresh the board to show the new task
      mutate();
      
      console.log("Task created successfully:", task.title);
    } catch (error: any) {
      console.error("Failed to create task:", error?.response?.data?.message || error.message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-48 h-8 bg-gray-200 rounded"></div>
                <div className="w-32 h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="w-16 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Columns Skeleton */}
            <div className="flex gap-6 overflow-x-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-80 flex-shrink-0">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="w-24 h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-full h-20 bg-gray-100 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Board</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the board data. Please check your connection and try again.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => mutate()} variant="outline">
              Try Again
            </Button>
            <Link href="/boards">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Boards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No board data
  if (!board) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Board Not Found</h3>
          <p className="text-gray-600 mb-6">The board you're looking for doesn't exist or you don't have access to it.</p>
          <Link href="/boards">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Boards
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = getBoardStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Board Header Component */}
        <BoardHeader 
          boardName={boardName} 
          onAddTask={() => setIsModalOpen(true)} 
        />
        
        {/* Board Stats Component */}
        <BoardStats stats={stats} />

        {/* Enhanced Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {board.lists.map((list, listIndex) => (
            <KanbanColumn
              key={list.id}
              list={list}
              listIndex={listIndex}
              onAddTask={() => setIsModalOpen(true)}
              getTaskPriority={getTaskPriority}
              getTaskAssignee={getTaskAssignee}
            />
          ))}
        </div>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskAdd={handleTaskAdd}
          lists={board.lists}
        />
      </div>
    </div>
  );
};

export default withAuth(BoardsPage);