import { z } from 'zod';

export const AddUserValidator = z.object({
  username: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  password: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  newUsername: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  newPassword: z.string().min(8, { message: 'Minimum length is 8 characters' }),
});

export type AddUserRequest = z.infer<typeof AddUserValidator>;
