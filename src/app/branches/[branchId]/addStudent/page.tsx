'use client';
import {
  StudentValidator,
  StudentValidatorTypes,
} from '@/lib/validators/student';
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
import { FC, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface pageProps {
  params: {
    branchId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<StudentValidatorTypes>({
    resolver: zodResolver(StudentValidator),
  });

  const { mutate: createStudent, isPending } = useMutation({
    mutationFn: async (values: StudentValidatorTypes) => {
      const payload: StudentValidatorTypes = {
        name: values.name,
        class: values.class,
        academicYear: values.academicYear,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        religion: values.religion,
        caste: values.caste,
        aadharNo: String(values.aadharNo),
        mobileNo: String(values.mobileNo),
        address: values.address,
        pincode: values.pincode,
        motherTongue: values.motherTongue,
        bloodGroup: values.bloodGroup,
        father: values.father,
        mother: values.mother,
        staysWith: values.staysWith,
        branchId: params.branchId,
      };

      const { data } = await axios.post('/api/student/create', payload);

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
      console.log(err);
      toast({
        title: 'Branch creation failed',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Branch creation successful',
      });
    },
  });

  function onSubmit(values: StudentValidatorTypes) {
    console.log(values);
    createStudent(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Student</FormLabel>
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
          name="academicYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Academic Year..."
                  type="date"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  placeholder="Academic Year..."
                  type="date"
                  onChange={(e) => field.onChange(e.target.value)}
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
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <FormControl>
                <Input placeholder="Religion..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caste</FormLabel>
              <FormControl>
                <Input placeholder="Caste..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aadharNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number</FormLabel>
              <FormControl>
                <Input placeholder="Aadhar number..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Mobile number..." type="text" {...field} />
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
                <Textarea placeholder="Address..." {...field} />
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
          name="motherTongue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother Tongue</FormLabel>
              <FormControl>
                <Input placeholder="Mother Tongue..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                <Input placeholder="Blood Group..." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="father"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father</FormLabel>
              <Select
                value={
                  field.value === undefined
                    ? ''
                    : field.value
                    ? 'true'
                    : 'false'
                }
                onValueChange={(e) => field.onChange(e === 'true')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Yes / No" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mother"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father</FormLabel>
              <Select
                value={
                  field.value === undefined
                    ? ''
                    : field.value
                    ? 'true'
                    : 'false'
                }
                onValueChange={(e) => field.onChange(e === 'true')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Yes / No" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="staysWith"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stays With</FormLabel>
              <FormControl>
                <Input placeholder="Stays With ___" type="text" {...field} />
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
