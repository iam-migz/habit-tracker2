export type Habit = {
  _id: string;
  name: string;
  description: string;
  dates: Date[];
  userId: string;
  includeImages: boolean;
  createdAt: Date;
  updatedAt: Date;
};
