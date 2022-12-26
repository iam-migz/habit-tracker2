import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDoc } from '../models/session.model';

export async function create(userId: string, userAgent: string) {
	const session = await SessionModel.create({ userId, userAgent });
	return session.toJSON();
}

export async function show(query: FilterQuery<SessionDoc>) {
	return SessionModel.findOne(query).lean();
}

export async function update(query: FilterQuery<SessionDoc>, update: UpdateQuery<SessionDoc>) {
	return SessionModel.updateOne(query, update);
}
