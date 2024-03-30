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

export const RecordValidator = z.object({
  name: z.string(),
  place: z.string(),
  class: z.enum(ClassTypeValues),
  yearOfStudy: z.string(),
  percentage: z.string(),
});

export type RecordValidatorTypes = z.infer<typeof RecordValidator>;
