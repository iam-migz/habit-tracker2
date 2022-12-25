import { NextFunction, Request, Response } from 'express';
import * as service from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';

export async function createHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response, next: NextFunction) {
	try {
		const duplicate = await service.show({ email: req.body.email });
		if (duplicate) {
			res.status(409);
			throw new Error('Email already in use');
		}

		const user = await service.create(req.body);
		return res.status(201).send(user);
	} catch (e) {
		next(e);
	}
}

export async function showHandler(req: Request, res: Response) {
	return res.send(res.locals.user);
}
