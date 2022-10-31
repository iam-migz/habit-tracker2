import { string, object, TypeOf } from 'zod';

export const CreateHabitSchema = object({
  name: string({
    required_error: 'Name is required',
  }).min(3, 'Name too short, should be 3 chars minimum'),
  description: string({
    required_error: 'Description is required',
  }).min(3, 'Description too short, should be 3 chars minimum'),
});

export const UpdateDateSchema = object({
  date: string({
    required_error: 'Date is required',
  }),
});

export type CreateHabitInput = TypeOf<typeof CreateHabitSchema>;
export type UpdateDateInput = TypeOf<typeof UpdateDateSchema>;
