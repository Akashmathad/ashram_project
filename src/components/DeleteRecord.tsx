'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface DeleteParentProps {
  recordId: string;
}

const DeleteRecord: FC<DeleteParentProps> = ({ recordId }) => {
  const router = useRouter();
  const { mutate: deleteRecord, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/student/addRecord?recordId=${recordId}`
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
        title: 'Record deletion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Record deletion successful',
      });
    },
  });

  return (
    <Button isLoading={isPending} onClick={() => deleteRecord()}>
      Delete
    </Button>
  );
};

export default DeleteRecord;
