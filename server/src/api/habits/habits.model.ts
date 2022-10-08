import { ObjectId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

export const Habit = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  name: z.string().min(3),
  dates: z.string(),
});

export const RawHabit = Habit.omit({ _id: true, userId: true });
export type RawHabit = z.infer<typeof RawHabit>;

// export type Habit = z.infer<typeof Habit>;
export interface Habit {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  dates: string;
}

export const HabitModel = db.collection<Habit>('habits');
