import { Document, Schema, model } from 'mongoose';

export interface HabitDoc extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  description: string;
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
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const HabitModel = model<HabitDoc>('Habit', HabitSchema);
export default HabitModel;
