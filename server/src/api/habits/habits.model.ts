import { ObjectId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

export const Habit = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  name: z.string().min(3),
  dates: z.array(z.string()),
});

export const HabitName = Habit.pick({ name: true });
export type HabitName = z.infer<typeof HabitName>;

export const UpdateDate = z.object({ date: z.string() });
export type UpdateDate = z.infer<typeof UpdateDate>;

export interface Habit {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  dates?: string[];
}

export const HabitModel = db.collection<Habit>('habits');
