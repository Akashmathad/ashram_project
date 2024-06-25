import { z } from 'zod';

export const LoginValidator = z.object({
  username: z.string().min(8, { message: 'Minimum length is 8 characters' }),
  password: z.string().min(8, { message: 'Minimum length is 8 characters' }),
});

export type LoginRequest = z.infer<typeof LoginValidator>;
