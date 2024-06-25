import { z } from 'zod';

const ClassTypeValues = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Degree',
] as const;

const GenderTypeValues = ['MALE', 'FEMALE', 'OTHERS'] as const;

export const StudentValidator = z.object({
  name: z.string(),
  class: z.enum(ClassTypeValues),
  academicYear: z.string(),
  dateOfBirth: z.string(),
  gender: z.enum(GenderTypeValues),
  religion: z.string(),
  caste: z.string(),
  aadharNo: z
    .string()
    .min(12, { message: 'Minimum length is 12' })
    .max(12, { message: 'Maximum length is 12' }),
  mobileNo: z
    .string()
    .min(10, { message: 'Minimum length is 10' })
    .max(10, { message: 'Maximum length is 10' }),
  address: z.string(),
  pincode: z.number(),
  motherTongue: z.string(),
  bloodGroup: z.string(),
  father: z.boolean(),
  mother: z.boolean(),
  staysWith: z.string(),
  branchId: z.string().optional(),
});

export type StudentValidatorTypes = z.infer<typeof StudentValidator>;
