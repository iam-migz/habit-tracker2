import { NextFunction, Request, Response } from 'express';
import { createUser } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';
import { findUser } from '../service/user.service';

export async function createUserHandler(
	req: Request<{}, {}, CreateUserInput['body']>,
	res: Response,
	next: NextFunction
) {
	try {
		const duplicate = await findUser({ email: req.body.email });
		if (duplicate) {
			res.status(409);
			throw new Error('Email already in use');
		}

		const user = await createUser(req.body);
		return res.status(201).send(user);
	} catch (e) {
		next(e);
	}
}

export async function getCurrentUser(req: Request, res: Response) {
	return res.send(res.locals.user);
}
