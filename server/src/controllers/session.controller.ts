import { Request, Response } from 'express';
import config from 'config';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
	// Validate the user's password
	const user = await validatePassword(req.body);

	if (!user) return res.status(401).send('Invalid email or password');

	// create a session
	const session = await createSession(user._id, req.get('user-agent') || '');

	// create access token
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

	// create refresh token
	const refreshToken = signJwt(
		{
			...user,
			sessionId: session._id,
		},
		'refreshTokenPrivateKey',
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
}

export async function getUserSessionsHandler(req: Request, res: Response) {
	const userId = res.locals.user._id;

	const sessions = await findSessions({ userId, valid: true });

	return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
	const sessionId = res.locals.user.sessionId;
	await updateSession({ _id: sessionId }, { valid: false });

	return res.send({
		accessToken: null,
		refreshToken: null,
	});
}
