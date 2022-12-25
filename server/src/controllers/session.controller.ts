import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { validatePassword } from '../service/user.service';
import * as service from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await validatePassword(req.body);
		if (!user) {
			res.status(401);
			throw new Error('Invalid email or password');
		}

		// create a session
		const session = await service.create(user._id, req.get('user-agent') || '');

		// create access token
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

		// create refresh token
		const refreshToken = signJwt(
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
		res.cookie('accessToken', accessToken, {
			maxAge: 900000, // 15 mins
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: false,
		});
		res.cookie('refreshToken', refreshToken, {
			maxAge: 3.154e10, // 1 year
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: false,
		});

		// return access & refresh token
		return res.send({ accessToken, refreshToken });
	} catch (e) {
		next(e);
	}
}

export async function showHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = res.locals.user._id;

		const sessions = await service.show({ userId, valid: true });

		return res.send(sessions);
	} catch (e) {
		next(e);
	}
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const sessionId = res.locals.user.sessionId;
		await service.update({ _id: sessionId }, { valid: false });
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		return res.send({
			accessToken: null,
			refreshToken: null,
		});
	} catch (e) {
		next(e);
	}
}
