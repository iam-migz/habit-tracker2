import mongoose from 'mongoose';

export interface HabitInput {
	userId: mongoose.Schema.Types.ObjectId;
	name: string;
	description: string;
}

export interface HabitDoc extends HabitInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const HabitSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
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
	{ timestamps: true }
);

const HabitModel = mongoose.model<HabitDoc>('Habit', HabitSchema);
export default HabitModel;
