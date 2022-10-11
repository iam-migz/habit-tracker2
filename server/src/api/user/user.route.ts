import { Router } from 'express';
import * as userHandler from './user.handler';
import { validateRequest } from '../../middlewares';
import { RegisterSchema, LoginSchema } from './user.validation';

const router = Router();

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
