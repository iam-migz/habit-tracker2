import { Express, Request, Response } from 'express';
import { createUserHandler, getCurrentUser } from './controllers/user.controller';
import validateResource from './midllewares/validateResource';
import { createUserSchema } from './schema/user.schema';
import {
	createUserSessionHandler,
	deleteSessionHandler,
	getUserSessionsHandler,
} from './controllers/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './midllewares/requireUser';

function routes(app: Express) {
	// healthcheck
	app.get('/', (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	// User
	app.post('/api/users', validateResource(createUserSchema), createUserHandler);
	app.get('/api/me', requireUser, getCurrentUser);

	// Session
	app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

	app.get('/api/sessions', requireUser, getUserSessionsHandler);

	app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
