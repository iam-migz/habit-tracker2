import { Router } from 'express';
import * as userHandler from './users.handler';
import { validateRequest } from '../../middlewares';
import { User, LoginSchema } from './users.model';

const router = Router();

router.post(
  '/register',
  validateRequest({
    body: User,
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
