import mongoose from 'mongoose';
import RecordModel from './record.model';

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

HabitSchema.pre('deleteOne', { document: false, query: true }, async function () {
	const doc = await this.model.findOne(this.getFilter());
	await RecordModel.deleteMany({ habitId: doc._id });
});

const HabitModel = mongoose.model<HabitDoc>('Habit', HabitSchema);
export default HabitModel;
