import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import config from 'config';
import { show as showSession } from '../service/session.service';
import { show as showUser } from '../service/user.service';

// refresh tokens -> moving window
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = get(req, 'cookies.accessToken') ?? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
	const refreshToken = get(req, 'cookies.refreshToken') ?? get(req, 'headers.x-refresh', '');

	if (!accessToken && !refreshToken) {
		return next();
	}

	if (accessToken) {
		const { decoded, expired } = verifyJwt(accessToken, 'accessTokenSecret');
		if (!expired) {
			res.locals.user = decoded;
			return next();
		}
	}

	if (refreshToken) {
		const { decoded, expired } = verifyJwt(refreshToken, 'refreshTokenSecret');
		if (expired) return next();

		const sessionId = get(decoded, 'sessionId');

		const session = await showSession({ _id: sessionId });
		if (!session || !session?.valid) return next();

		const user = await showUser({ _id: session.userId });
		if (!user) return next();

		const newAccessToken = signJwt(
			{
				...user,
				sessionId: session._id,
			},
			'accessTokenSecret',
			{
				expiresIn: config.get('accessTokenTtl'),
			}
		);
		const newRefreshToken = signJwt(
			{
				...user,
				sessionId: session._id,
			},
			'refreshTokenSecret',
			{
				expiresIn: config.get('refreshTokenTtl'),
			}
		);
		// set cookies
		res.cookie('accessToken', newAccessToken, {
			maxAge: config.get<number>('accessTokenMaxAge'),
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: false,
		});
		res.cookie('refreshToken', newRefreshToken, {
			maxAge: config.get<number>('refreshTokenMaxAge'),
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: false,
		});
		res.locals.user = decoded;
		console.log('Issued new tokens');
	}

	return next();
};

export default deserializeUser;
