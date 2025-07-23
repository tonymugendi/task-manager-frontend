import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTaskModal } from "@/components/tasks/add-task-modal";
import withAuth from "@/components/auth/withAuth";
import { useBoard } from "@/hooks/useBoard";
import axios from "@/lib/axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";



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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading board...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load board. Please try again later.</p>
          <Button onClick={() => mutate()}>Retry</Button>
        </div>
      </div>
    );
  }

  // No board data
  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">Board not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Board Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{boardName}</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </header>

      {/* Kanban Board Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {board.lists.map((list) => (
          <div key={list.id} className="w-72 flex-shrink-0">
            <Card className="bg-gray-50/60">
              <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold">{list.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-3">
                {list.tasks && list.tasks.length > 0 ? (
                  list.tasks.map((task) => (
                    <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <p className="text-sm">{task.title}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-4">No tasks yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdd={handleTaskAdd}
        lists={board.lists}
      />
    </div>
  );
};

export default withAuth(BoardsPage);