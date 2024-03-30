import { z } from 'zod';

const ParentType = ['Father', 'Mother', 'Guardain'] as const;

export const ParentValidator = z.object({
  name: z.string(),
  qualification: z.string(),
  type: z.enum(ParentType),
  occupation: z.string(),
  aadharNo: z.string(),
  mobileNo: z.string(),
  income: z.string(),
});

export type ParentValidatorTypes = z.infer<typeof ParentValidator>;
