'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  RecordValidator,
  RecordValidatorTypes,
} from '@/lib/validators/previousRecord';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const form = useForm<RecordValidatorTypes>({
    resolver: zodResolver(RecordValidator),
  });

  const { mutate: addRecord, isPending } = useMutation({
    mutationFn: async (values: RecordValidatorTypes) => {
      const payload: RecordValidatorTypes = {
        name: values.name,
        place: values.place,
        class: values.class,
        yearOfStudy: values.yearOfStudy,
        percentage: values.percentage,
      };

      const { data } = await axios.post(
        `/api/student/addRecord?studentId=${params.studentId}`,
        payload
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
        title: 'Record addtion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.back();
      router.refresh();
      toast({
        title: 'Record addition successful',
      });
    },
  });

  const onSubmit = async (values: RecordValidatorTypes) => {
    console.log(values);
    addRecord(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of School</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="First">First</SelectItem>
                  <SelectItem value="Second">Second</SelectItem>
                  <SelectItem value="Third">Third</SelectItem>
                  <SelectItem value="Fourth">Fourth</SelectItem>
                  <SelectItem value="Fifth">Fifth</SelectItem>
                  <SelectItem value="Sixth">Sixth</SelectItem>
                  <SelectItem value="Seventy">Seventy</SelectItem>
                  <SelectItem value="Eighth">Eighth</SelectItem>
                  <SelectItem value="Ninth">Ninth</SelectItem>
                  <SelectItem value="Tenth">Tenth</SelectItem>
                  <SelectItem value="Eleventh">Eleventh</SelectItem>
                  <SelectItem value="Twelfth">Twelfth</SelectItem>
                  <SelectItem value="Degree">Degree</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of study</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage (%)</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Page;
