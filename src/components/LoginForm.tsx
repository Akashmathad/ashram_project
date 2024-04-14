'use client';

import { LoginRequest, LoginValidator } from '@/lib/validators/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { ModeToggle } from './ModeToggle';

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginRequest>({ resolver: zodResolver(LoginValidator) });

  const onSubmit = async (values: LoginRequest) => {
    setIsLoading(true);
    try {
      const signInData = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (signInData?.status === 401) {
        toast({
          title: 'Login failed',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
      } else if (signInData?.error) {
        toast({
          title: 'Login failed',
          description: 'Something went wrong, please try again',
          variant: 'destructive',
        });
      } else {
        router.push('/branches');
        router.refresh();
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 border  border-border rounded-md bg-card shadow-md backdrop-blur relative">
      <div className="absolute top-2 right-2">
        {' '}
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-semibold text-center">Welcome to Ashram</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[300px] lg:w-[400px] flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username..."
                    type="text"
                    {...field}
                  />
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
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={isLoading}
            type="submit"
            className="font-semibold text-xl tracking-wide mt-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
