import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

export const Habit = z.object({
  name: z.string().min(3),
});

export type Habit = z.infer<typeof Habit>;
export type HabitWithId = WithId<Habit>;
export const HabitModel = db.collection<Habit>('habits');
