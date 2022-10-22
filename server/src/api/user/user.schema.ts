import { string, object, TypeOf } from 'zod';

export const RegisterSchema = object({
  name: string({
    required_error: 'Name is required',
  }).min(3, 'Name too short - should be 3 chars minimum'),
  password: string({
    required_error: 'Password is required',
  }).min(6, 'Password too short - should be 6 chars minimum'),
  email: string({
    required_error: 'Email is required',
  }).email('Not a valid email'),
});
export const LoginSchema = RegisterSchema.omit({ name: true });

export type RegisterInput = TypeOf<typeof RegisterSchema>;
export type LoginInput = TypeOf<typeof LoginSchema>;
