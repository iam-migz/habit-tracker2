import mongoose from 'mongoose';
import { HabitDoc } from './habit.model';

export interface RecordInput {
	habitId: HabitDoc['_id'];
	date: Date;
	image?: string;
	note?: string;
}

export interface RecordDoc extends RecordInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const RecordSchema = new mongoose.Schema(
	{
		habitId: {
			type: mongoose.Schema.Types.ObjectId,
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
	{ timestamps: true }
);

const RecordModel = mongoose.model<RecordDoc>('Record', RecordSchema);
export default RecordModel;
