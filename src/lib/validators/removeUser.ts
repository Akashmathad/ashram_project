import { z } from 'zod';

export const DeleteUserValidator = z.object({
  username: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  password: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  delUsername: z.string().min(8, { message: 'Minimum length is 8 characters' }),
});

export type DeleteUserRequest = z.infer<typeof DeleteUserValidator>;
