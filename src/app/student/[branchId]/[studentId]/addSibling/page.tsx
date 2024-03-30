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
  SiblingValidator,
  SiblingValidatorTypes,
} from '@/lib/validators/sibling';

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
  const form = useForm<SiblingValidatorTypes>({
    resolver: zodResolver(SiblingValidator),
  });

  const { mutate: addSibling, isPending } = useMutation({
    mutationFn: async (values: SiblingValidatorTypes) => {
      const payload: SiblingValidatorTypes = {
        name: values.name,
        nameOfSchool: values.nameOfSchool,
        class: values.class,
        age: values.age,
        gender: values.gender,
      };

      const { data } = await axios.post(
        `/api/student/addSibling?studentId=${params.studentId}`,
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
        title: 'Sibling addtion failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.back();
      router.refresh();
      toast({
        title: 'Sibling addition successful',
      });
    },
  });

  const onSubmit = async (values: SiblingValidatorTypes) => {
    addSibling(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter age"
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    field.onChange(isNaN(parsedValue) ? '' : parsedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nameOfSchool"
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

        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Page;
