import { Router } from 'express';
import * as userHandler from './user.handler';
import { requireAuth, validateRequest } from '../../middlewares';
import { RegisterSchema, LoginSchema } from './user.schema';

const router = Router();

router.get('/', requireAuth(), userHandler.getUser);

router.post(
  '/register',
  validateRequest({
    body: RegisterSchema,
  }),
  userHandler.register,
);

router.post(
  '/login',
  validateRequest({
    body: LoginSchema,
  }),
  userHandler.login,
);

export default router;
