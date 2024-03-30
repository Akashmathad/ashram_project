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
  aadharNo: z.string(),
  mobileNo: z.string(),
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
