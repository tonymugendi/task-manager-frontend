import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MoreVertical, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Circle 
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface TaskCardProps {
  task: Task;
  priority: string;
  assignee: {
    name: string;
    avatar: string;
    color: string;
  };
}

export function TaskCard({ task, priority, assignee }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'medium': return <Circle className="w-3 h-3 text-yellow-500" />;
      case 'low': return <CheckCircle2 className="w-3 h-3 text-green-500" />;
      default: return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const priorityColor = getPriorityColor(priority);

  return (
    <Card className={`${priorityColor} border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer group`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
              {task.title}
            </h4>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
          
          {(task as any).description && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {(task as any).description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getPriorityIcon(priority)}
              <span className="text-xs text-gray-500 capitalize">{priority}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Due {new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className={`w-6 h-6 ${assignee.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                {assignee.avatar}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
