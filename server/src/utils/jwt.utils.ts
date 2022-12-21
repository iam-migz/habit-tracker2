import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
	payload: Object,
	keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
	options?: jwt.SignOptions | undefined
) {
	const signingKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

	return jwt.sign(payload, signingKey, {
		...(options && options),
		algorithm: 'RS256',
	});
}

export function verifyJwt(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey') {
	const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
	try {
		const decoded = jwt.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (e: any) {
		console.log('verifyJwt Error', e);
		return {
			valid: false,
			expired: e.message === 'jwt expired',
			decoded: null,
		};
	}
}
