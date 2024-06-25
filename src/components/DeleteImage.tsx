'use client';
import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface DeleteImageProps {
  studentId: string;
}

const DeleteImage: FC<DeleteImageProps> = ({ studentId }) => {
  const router = useRouter();
  const { mutate: deleteImage, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/student/upload?studentId=${studentId}`
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid Inputs',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      console.log(err);
      toast({
        title: 'Image delation failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Image deleted successful',
      });
    },
  });

  return (
    <Button
      variant="default"
      onClick={() => deleteImage()}
      isLoading={isPending}
    >
      Delete Image
    </Button>
  );
};

export default DeleteImage;
