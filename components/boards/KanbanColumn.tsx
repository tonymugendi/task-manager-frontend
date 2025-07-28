import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface List {
  id: string;
  name: string;
  tasks?: Task[];
}

interface KanbanColumnProps {
  list: List;
  listIndex: number;
  onAddTask: () => void;
  getTaskPriority: (taskId: string) => string;
  getTaskAssignee: (taskId: string) => {
    name: string;
    avatar: string;
    color: string;
  };
}

export function KanbanColumn({ 
  list, 
  listIndex, 
  onAddTask, 
  getTaskPriority, 
  getTaskAssignee 
}: KanbanColumnProps) {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({
    id: list.id,
    data: {
      type: 'column',
      list,
    },
  });

  const listColors = [
    'border-t-blue-500',
    'border-t-yellow-500', 
    'border-t-green-500',
    'border-t-purple-500',
    'border-t-pink-500'
  ];
  const listColor = listColors[listIndex % listColors.length];
  
  const taskIds = list.tasks?.map(task => task.id) || [];

  return (
    <div className="w-80 flex-shrink-0">
      <Card 
        ref={setNodeRef}
        className={`bg-white shadow-sm border border-gray-200 border-t-4 ${listColor} ${
          isOver ? 'ring-2 ring-indigo-400 ring-opacity-50 bg-indigo-50' : ''
        } transition-all duration-200`}
      >
        <CardHeader className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              {list.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {list.tasks?.length || 0}
              </Badge>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className={`space-y-3 mb-4 min-h-[100px] ${
            isOver ? 'bg-indigo-25' : ''
          } rounded-lg transition-colors duration-200`}>
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
              {list.tasks && list.tasks.length > 0 ? (
                list.tasks.map((task) => {
                  const priority = getTaskPriority(task.id);
                  const assignee = getTaskAssignee(task.id);
                  
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      priority={priority}
                      assignee={assignee}
                      listId={list.id}
                    />
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {isOver ? 'Drop task here' : 'No tasks yet'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isOver ? 'Release to add task to this column' : 'Add a task to get started'}
                  </p>
                </div>
              )}
            </SortableContext>
          </div>
          
          {/* Add Task Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-all duration-200"
            onClick={onAddTask}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add a task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
