import { Document, Schema, model } from 'mongoose';

export interface HabitDoc extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  dates: [Date];
  createdAt: Date;
  updatedAt: Date;
}

const HabitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    dates: {
      type: [Date],
    },
  },
  { timestamps: true },
);

const HabitModel = model<HabitDoc>('Habit', HabitSchema);
export default HabitModel;
