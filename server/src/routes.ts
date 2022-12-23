import { Request, Response } from 'express';
import { Router } from 'express';

import * as session from './controllers/session.controller';
import * as habit from './controllers/habit.controller';
import * as user from './controllers/user.controller';
import validateResource from './midllewares/validateResource';
import requireUser from './midllewares/requireUser';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createHabitSchema, destroyHabitSchema, showHabitSchema, updateHabitSchema } from './schema/habit.schema';

const router = Router();

// Healthcheck
router.get('/', (req: Request, res: Response) => res.sendStatus(200));

// User
router.post('/users', validateResource(createUserSchema), user.createUserHandler);
router.get('/me', requireUser, user.getCurrentUser);

// Session
router.post('/sessions', validateResource(createSessionSchema), session.createUserSessionHandler);
router.get('/sessions', requireUser, session.getUserSessionsHandler);
router.delete('/sessions', requireUser, session.deleteSessionHandler);

// Habit
router.get('/habits', requireUser, habit.indexHandler);
router.post('/habits', [requireUser, validateResource(createHabitSchema)], habit.createHandler);
router.get('/habits/:habitId', [requireUser, validateResource(showHabitSchema)], habit.showHandler);
router.put('/habits/:habitId', [requireUser, validateResource(updateHabitSchema)], habit.updateHandler);
router.delete('/habits/:habitId', [requireUser, validateResource(destroyHabitSchema)], habit.destroyHandler);

export default router;
