import { Request, Response, Router } from 'express';
import * as session from './controllers/session.controller';
import * as habit from './controllers/habit.controller';
import * as user from './controllers/user.controller';
import * as record from './controllers/record.controller';
import validateResource from './middlewares/validateResource';
import requireUser from './middlewares/requireUser';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createHabitSchema, destroyHabitSchema, showHabitSchema, updateHabitSchema } from './schema/habit.schema';
import {
	createRecordSchema,
	destroyRecordSchema,
	indexRecordSchema,
	showRecordSchema,
	uploadRecordSchema,
} from './schema/record.schema';
import uploadMiddleware from './middlewares/upload';
import checkDirectory from './middlewares/checkDirectory';

const router = Router();

// Healthcheck
router.get('/', (req: Request, res: Response) => res.sendStatus(201));

// Users
router.post('/users', validateResource(createUserSchema), user.createHandler);
router.get('/users', requireUser, user.showHandler);

// User Sessions
router.post('/sessions', validateResource(createSessionSchema), session.createHandler);
router.get('/sessions', requireUser, session.showHandler);
router.delete('/sessions', requireUser, session.deleteHandler);

// Habits
router.post('/habits', [requireUser, validateResource(createHabitSchema)], habit.createHandler);
router.get('/habits', requireUser, habit.indexHandler);
router.get('/habits/:habitId', [requireUser, validateResource(showHabitSchema)], habit.showHandler);
router.put('/habits/:habitId', [requireUser, validateResource(updateHabitSchema)], habit.updateHandler);
router.delete('/habits/:habitId', [requireUser, validateResource(destroyHabitSchema)], habit.destroyHandler);

// Records
router.post('/records', [requireUser, validateResource(createRecordSchema)], record.createHandler);
router.get('/records', [requireUser, validateResource(indexRecordSchema)], record.indexHandler);
router.get('/records/:recordId', [requireUser, validateResource(showRecordSchema)], record.showHandler);
router.delete('/records/:recordId', [requireUser, validateResource(destroyRecordSchema)], record.destroyHandler);

router.patch(
	'/records/uploadImage/:recordId',
	[requireUser, checkDirectory, validateResource(uploadRecordSchema), uploadMiddleware],
	record.uploadImageHandler
);
router.patch(
	'/records/deleteImage/:recordId',
	[requireUser, validateResource(uploadRecordSchema)],
	record.deleteImageHandler
);

export default router;
