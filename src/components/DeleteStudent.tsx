'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface DeleteParentProps {
  branchId: string;
  studentId: string;
  studentClass: string;
}

const DeleteStudent: FC<DeleteParentProps> = ({
  studentId,
  studentClass,
  branchId,
}) => {
  const router = useRouter();
  const { mutate: deleteStudent, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/student/create?studentId=${studentId}`
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
        title: 'Student deletion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.push(`/branches/${branchId}/${studentClass}`);
      router.refresh();
      toast({
        title: 'Student deletion successful',
      });
    },
  });

  return (
    <Button isLoading={isPending} onClick={() => deleteStudent()}>
      Delete Student
    </Button>
  );
};

export default DeleteStudent;
