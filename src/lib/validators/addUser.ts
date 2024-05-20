import { z } from 'zod';

export const AddUserValidator = z.object({
  username: z.string(),
  password: z.string(),
  newUsername: z.string(),
  newPassword: z.string(),
});

export type AddUserRequest = z.infer<typeof AddUserValidator>;
