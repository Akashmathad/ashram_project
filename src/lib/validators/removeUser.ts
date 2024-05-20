import { z } from 'zod';

export const DeleteUserValidator = z.object({
  username: z.string(),
  password: z.string(),
  delUsername: z.string(),
});

export type DeleteUserRequest = z.infer<typeof DeleteUserValidator>;
