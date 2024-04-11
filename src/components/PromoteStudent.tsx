'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface PromoteStudentProps {
  studentId: string;
  studentClass: string;
}

const ClassTypeValues = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Degree',
] as const;

function getNextElement(input: any) {
  const index = ClassTypeValues.indexOf(input);
  if (index === -1 || index === ClassTypeValues.length - 1) {
    return null;
  } else {
    return ClassTypeValues[index + 1];
  }
}

const PromoteStudent: FC<PromoteStudentProps> = ({
  studentId,
  studentClass,
}) => {
  const router = useRouter();
  const { mutate: promoteStudent, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        studentClass: getNextElement(studentClass),
      };

      const { data } = await axios.post(
        `/api/student/promote?studentId=${studentId}`,
        payload
      );

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return toast({
            title: 'Student not found',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      console.log(err);
      toast({
        title: 'Student promotion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Student promotion successful',
      });
    },
  });

  return (
    <Button isLoading={isPending} onClick={() => promoteStudent()}>
      Promote Student
    </Button>
  );
};

export default PromoteStudent;
