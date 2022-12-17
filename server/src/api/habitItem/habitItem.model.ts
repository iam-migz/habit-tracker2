import { Document, Schema, model } from 'mongoose';

export interface HabitItemDoc extends Document {
  habitId: Schema.Types.ObjectId;
  date: Date;
  image?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HabitItemSchema = new Schema(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

const HabitItemModel = model<HabitItemDoc>('HabitItem', HabitItemSchema);
export default HabitItemModel;
