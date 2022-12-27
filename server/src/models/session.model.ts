import mongoose from 'mongoose';
import { UserDoc } from './user.model';

export interface SessionDoc extends mongoose.Document {
	userId: UserDoc['_id'];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		valid: {
			type: Boolean,
			default: true,
		},
		userAgent: {
			type: String,
		},
	},
	{ timestamps: true }
);

const SessionModel = mongoose.model<SessionDoc>('Session', sessionSchema);
export default SessionModel;
