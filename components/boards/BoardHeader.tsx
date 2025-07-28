import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Plus, 
  Filter, 
  Share2, 
  Settings 
} from "lucide-react";
import Link from "next/link";

interface BoardHeaderProps {
  boardName: string;
  onAddTask: () => void;
}

export function BoardHeader({ boardName, onAddTask }: BoardHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link href="/boards" className="hover:text-indigo-600 transition-colors">
          Boards
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{boardName}</span>
      </div>

      {/* Enhanced Board Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/boards">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{boardName}</h1>
            <p className="text-gray-600">Manage your project tasks and workflow</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Team Members */}
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
              const initials = ['JD', 'JS', 'MJ', 'SW'];
              return (
                <div key={i} className={`w-8 h-8 ${colors[i]} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-sm`}>
                  {initials[i]}
                </div>
              );
            })}
            <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-indigo-300 hover:text-indigo-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              onClick={onAddTask}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
