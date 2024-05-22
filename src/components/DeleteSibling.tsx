'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface DeleteParentProps {
  siblingId: string;
}

const DeleteSibling: FC<DeleteParentProps> = ({ siblingId }) => {
  const router = useRouter();
  const { mutate: deleteSibling, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/student/addSibling?siblingId=${siblingId}`
      );
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return toast({
            title: 'Record not found',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      toast({
        title: 'Sibling deletion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Sibling deletion successful',
      });
    },
  });

  return (
    <Button isLoading={isPending} onClick={() => deleteSibling()}>
      Delete
    </Button>
  );
};

export default DeleteSibling;
