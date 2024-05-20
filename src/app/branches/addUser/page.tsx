'use client';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { AddUserRequest, AddUserValidator } from '@/lib/validators/addUser';

const Page = () => {
  const router = useRouter();
  const form = useForm<AddUserRequest>({
    resolver: zodResolver(AddUserValidator),
  });

  const { mutate: addUser, isPending } = useMutation({
    mutationFn: async (values: AddUserRequest) => {
      const payload: AddUserRequest = {
        username: values.username,
        password: values.password,
        newUsername: values.newUsername,
        newPassword: values.newPassword,
      };

      const { data } = await axios.post('/api/User/addUser', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid Inputs',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 409) {
          return toast({
            title: 'Wrong Username or Password!',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      toast({
        title: 'User creation failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
      toast({
        title: 'User creation successful',
      });
    },
  });

  const onSubmit = async (values: AddUserRequest) => {
    addUser(values);
    console.log(values);
  };

  return (
    <div className="flex w-full p-10 items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1  w-full max-w-lg  border border-zinc-500 bg-card p-6 shadow-lg duration-200  sm:rounded-lg"
        >
          <h2 className="text-3xl font-semibold text-center text-primary">
            User Details
          </h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password.." type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Username</FormLabel>
                <FormControl>
                  <Input placeholder="New Username.." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New Password.." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 mt-3">
            <BackButton />
            <Button type="submit" isLoading={isPending} className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
