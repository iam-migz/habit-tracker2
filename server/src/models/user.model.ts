import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
	email: string;
	name: string;
	password: string;
}

export interface UserDoc extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password).catch(() => false);
};

const UserModel = mongoose.model<UserDoc>('User', userSchema);
export default UserModel;
