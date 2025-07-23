import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBoardModal } from "@/components/boards/create-board-modal";
import withAuth from "@/components/auth/withAuth";
import axios from "@/lib/axios";
import { Plus } from "lucide-react";
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


  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Board
        </Button>
      </header>

      <div>
        {isLoading && <p>Loading boards...</p>}
        {isError && <p className="text-red-500">Failed to load boards. Please try again later.</p>}
        {boards && boards.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boards.map((board) => (
              <Link href={`/boards/${board.id}`} key={board.id} legacyBehavior>
                <a className="block">
                  <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <CardHeader>
                      <CardTitle>{board.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Select board</p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : boards ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Boards Yet</h2>
            <p className="text-gray-500 mb-4">Get started by creating your first project board.</p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Board
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
  );
};

export default withAuth(BoardsListPage);
