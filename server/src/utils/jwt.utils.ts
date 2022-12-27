import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
	payload: Object,
	keyName: 'accessTokenSecret' | 'refreshTokenSecret',
	options?: jwt.SignOptions | undefined
) {
	const signingKey = config.get<string>(keyName);

	return jwt.sign(payload, signingKey, {
		...(options && options),
	});
}

export function verifyJwt(token: string, keyName: 'accessTokenSecret' | 'refreshTokenSecret') {
	const signingKey = config.get<string>(keyName);
	try {
		const decoded = jwt.verify(token, signingKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (e: any) {
		return {
			valid: false,
			expired: e.message === 'jwt expired',
			decoded: null,
		};
	}
}
