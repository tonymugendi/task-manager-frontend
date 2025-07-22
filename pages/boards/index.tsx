import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTaskModal } from "@/components/tasks/add-task-modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

// Mock data for the board
const initialBoardData = {
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
        { id: "task-1", title: "Design the new landing page" },
        { id: "task-2", title: "Setup CI/CD pipeline" },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "task-3", title: "Implement login functionality" },
        { id: "task-4", title: "Write API documentation for auth" },
        { id: "task-5", title: "Add route protection for dashboard" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [{ id: "task-6", title: "Develop Kanban board UI" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "task-7", title: "Initialize Next.js project" }],
    },
  ],
};

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
});

const BoardsPage = () => {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskAdd = (task: z.infer<typeof taskSchema>) => {
    const newTask = { id: `task-${Date.now()}`, title: task.title };

    setBoardData((prevBoard) => {
      const newBoard = { ...prevBoard };
      const columnIndex = newBoard.columns.findIndex(
        (col) => col.title === task.status
      );

      if (columnIndex !== -1) {
        newBoard.columns[columnIndex].tasks.push(newTask);
      }
      return newBoard;
    });
  };

  const statuses = boardData.columns.map((col) => col.title);

  return (
    <div className="p-4 md:p-6">
      {/* Board Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Phoenix Board</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </header>

      {/* Kanban Board Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {boardData.columns.map((column) => (
          <div key={column.id} className="w-72 flex-shrink-0">
            <Card className="bg-gray-50/60">
              <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold">{column.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <p className="text-sm">{task.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdd={handleTaskAdd}
        statuses={statuses}
      />
    </div>
  );
};

export default BoardsPage;