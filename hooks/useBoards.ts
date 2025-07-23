import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface Board {
  id: string;
  name: string;
}

export const useBoards = () => {
  const { data, error, isLoading, mutate } = useSWR<Board[]>('/boards/boards', fetcher);

  return {
    boards: data,
    isLoading,
    isError: error,
    mutate,
  };
};
