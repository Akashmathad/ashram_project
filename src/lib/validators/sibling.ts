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

export const SiblingValidator = z.object({
  name: z.string(),
  nameOfSchool: z.string(),
  class: z.enum(ClassTypeValues),
  gender: z.enum(GenderTypeValues),
  age: z.number(),
});

export type SiblingValidatorTypes = z.infer<typeof SiblingValidator>;
