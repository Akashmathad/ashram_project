'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface DeleteParentProps {
  parentId: string;
}

const DeleteParent: FC<DeleteParentProps> = ({ parentId }) => {
  const router = useRouter();
  const { mutate: deleteParent, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/student/addParent?parentId=${parentId}`
      );
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return toast({
            title: 'Parent not found',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      toast({
        title: 'Parent deletion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Parent deletion successful',
      });
    },
  });

  return (
    <Button isLoading={isPending} onClick={() => deleteParent()}>
      Delete
    </Button>
  );
};

export default DeleteParent;
