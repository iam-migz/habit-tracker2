import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

export const User = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;

export const LoginSchema = User.omit({ name: true });
export type LoginSchema = z.infer<typeof LoginSchema>;

export const UserModel = db.collection<User>('users');
