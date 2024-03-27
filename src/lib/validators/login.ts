import { z } from 'zod';

export const LoginValidator = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginValidator>;
