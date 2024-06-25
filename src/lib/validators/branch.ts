import { z } from 'zod';

export const BranchValidator = z.object({
  name: z.string().max(50, { message: 'Maximum length is 50 characters' }),
  head: z.string().max(50, { message: 'Maximum length is 50 characters' }),
  contact: z
    .string()
    .min(10, { message: 'Minimum length is 10' })
    .max(10, { message: 'Maximum length is 10' }),
  address: z.string().max(50, { message: 'Maximum length is 150 characters' }),
  place: z.string(),
  pincode: z.number(),
});

export type BranchRequest = z.infer<typeof BranchValidator>;
