import { z } from 'zod';

export const BranchValidator = z.object({
  name: z.string(),
  head: z.string(),
  contact: z
    .string()
    .min(10, { message: 'Minimum length is 10' })
    .max(10, { message: 'Maximum length is 10' }),
  address: z.string(),
  place: z.string(),
  pincode: z.number(),
});

export type BranchRequest = z.infer<typeof BranchValidator>;
