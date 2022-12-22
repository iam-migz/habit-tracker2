import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
	try {
		const user = await createUser(req.body);
		return res.send(user);
	} catch (e: any) {
		return res.status(409).send(e.message); // conflict
	}
}

export async function getCurrentUser(req: Request, res: Response) {
	return res.send(res.locals.user);
}
