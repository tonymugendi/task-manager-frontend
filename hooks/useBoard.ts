import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface Task {
  id: string;
  title: string;
  status: string;
}

interface List {
  id: string;
  name: string;
  position: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  lists: List[];
}

export const useBoard = (boardId: string | string[] | undefined) => {
  // Only fetch if boardId is a valid string
  const shouldFetch = typeof boardId === 'string' && boardId;
  const url = shouldFetch ? `/boards/boards/${boardId}` : null;
  
  const { data, error, isLoading, mutate } = useSWR<Board>(url, fetcher);

  return {
    board: data,
    isLoading,
    isError: error,
    mutate,
  };
};
