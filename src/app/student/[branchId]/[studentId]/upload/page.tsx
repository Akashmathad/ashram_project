'use client';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const { mutate: upload, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('file', file!);

      const { data } = await axios.post(
        `/api/student/upload?studentId=${params.studentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
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
        title: 'Image upload failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.back();
      router.refresh();
      toast({
        title: 'Image uploaded successful',
      });
    },
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      upload();
    } else {
      toast({
        title: 'No file selected',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-1  w-full max-w-lg  border border-zinc-500 bg-card p-6 shadow-lg duration-200  sm:rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-center text-primary">
          Upload Image
        </h2>
        <Input
          className="mt-4 mb-4"
          type="file"
          onChange={handleFileChange}
          placeholder="Upload image"
        />

        <div className="flex gap-3 mt-3">
          <BackButton />
          <Button isLoading={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
