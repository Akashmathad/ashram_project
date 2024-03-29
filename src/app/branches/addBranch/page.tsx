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

import { BranchRequest, BranchValidator } from '@/lib/validators/branch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const form = useForm<BranchRequest>({
    resolver: zodResolver(BranchValidator),
  });

  const { mutate: createBranch, isPending } = useMutation({
    mutationFn: async (values: BranchRequest) => {
      const payload: BranchRequest = {
        name: values.name,
        head: values.head,
        contact: values.contact,
        address: values.address,
        place: values.place,
        pincode: values.pincode,
      };

      const { data } = await axios.post('/api/branch/create', payload);
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
        if (err.response?.status === 401) {
          return router.push('/');
        }
      }
      toast({
        title: 'Branch creation failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.push('/branches');
      router.refresh();
      toast({
        title: 'Branch creation successful',
      });
    },
  });

  const onSubmit = async (values: BranchRequest) => {
    createBranch(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Branch</FormLabel>
              <FormControl>
                <Input placeholder="Name..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="head"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Head of branch</FormLabel>
              <FormControl>
                <Input
                  placeholder="Headmaster / Principal"
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
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter contact number.."
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address..." {...field} />
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
                <Input placeholder="Town / City..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter pincode"
                  type="text" // Change type to text since we're handling parsing
                  value={field.value} // No need to parse here
                  onChange={(e) => {
                    // Ensure that the value is always stored as a string in the form state
                    const parsedValue = parseInt(e.target.value);
                    field.onChange(isNaN(parsedValue) ? '' : parsedValue); // Ensure value is a number, otherwise set to empty string
                  }}
                />
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
