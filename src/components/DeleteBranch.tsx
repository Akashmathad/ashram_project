'use client';
import { FC, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import Alert from './Alert';

interface DeleteBranchProps {
  branchId: string;
  branchName: string;
}

const DeleteBranch: FC<DeleteBranchProps> = ({ branchId, branchName }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: DeleteBranch, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/branch/create?branchId=${branchId}`
      );
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return toast({
            title: 'Branch not found',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      toast({
        title: 'Branch deletion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.push(`/branches`);
      router.refresh();
      toast({
        title: 'Branch deletion successful',
      });
    },
  });

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Delete Student</Button>
      {open && (
        <Alert
          handleCancel={setOpen}
          handleSubmit={DeleteBranch}
          displayString={`Are you sure, you want to delete ${branchName} completely?`}
          isLoading={isPending}
        />
      )}
    </div>
  );
};

export default DeleteBranch;
