export type Habit = {
  _id: string;
  name: string;
  description: string;
  dates: Date[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
