import * as z from 'zod';

export const HabitItemSchema = z.object({
  habitId: z.string({
    required_error: 'habitId is required',
    invalid_type_error: 'Invalid habitId Type',
  }),
  date: z.preprocess(
    (arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: 'Date is required',
      invalid_type_error: 'Invalid Date Type',
    }),
  ),
  image: z.optional(
    z.string({
      invalid_type_error: 'image must be string',
    }),
  ),
  note: z.optional(
    z.string({
      invalid_type_error: 'note must be string',
    }),
  ),
});

export type HabitItemInput = z.TypeOf<typeof HabitItemSchema>;
