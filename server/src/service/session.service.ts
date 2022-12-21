import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDoc } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
	const session = await SessionModel.create({ userId, userAgent });
	return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDoc>) {
	return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDoc>, update: UpdateQuery<SessionDoc>) {
	return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
	const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');
	if (!decoded || !get(decoded, 'sessionId')) return false;

	const session = await SessionModel.findById(get(decoded, 'sessionId'));

	if (!session || !session.valid) return false;

	const user = await findUser({ _id: session.userId });

	if (!user) return false;

	const accessToken = signJwt(
		{
			...user,
			sessionId: session._id,
		},
		'accessTokenPrivateKey',
		{
			expiresIn: config.get('accessTokenTtl'), // 15 minutes
		}
	);

	return accessToken;
}
