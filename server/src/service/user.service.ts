import { FilterQuery } from 'mongoose';
import UserModel, { UserDoc, UserInput } from '../models/user.model';
import { omit } from 'lodash';

export async function create(input: UserInput) {
	const user = await UserModel.create(input);
	return omit(user.toJSON(), 'password');
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
	const user = await UserModel.findOne({ email });
	if (!user) return false;

	const isValid = await user.comparePassword(password);
	if (!isValid) return false;

	return omit(user.toJSON(), 'password');
}

export async function show(query: FilterQuery<UserDoc>) {
	const user = await UserModel.findOne(query);
	if (!user) throw new Error('Could not find user');

	return omit(user.toJSON(), 'password');
}
