import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDoc } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';
import { show as showUser } from './user.service';
import config from 'config';

export async function create(userId: string, userAgent: string) {
	const session = await SessionModel.create({ userId, userAgent });
	return session.toJSON();
}

export async function show(query: FilterQuery<SessionDoc>) {
	return SessionModel.find(query).lean();
}

export async function update(query: FilterQuery<SessionDoc>, update: UpdateQuery<SessionDoc>) {
	return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
	const { decoded } = verifyJwt(refreshToken, 'refreshTokenSecret');
	if (!decoded || !get(decoded, 'sessionId')) return false;

	const session = await SessionModel.findById(get(decoded, 'sessionId'));

	if (!session || !session.valid) return false;

	const user = await showUser({ _id: session.userId });

	if (!user) return false;

	const accessToken = signJwt(
		{
			...user,
			sessionId: session._id,
		},
		'accessTokenSecret',
		{
			expiresIn: config.get('accessTokenTtl'),
		}
	);

	return accessToken;
}
