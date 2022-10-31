import { Router } from 'express';
import * as HabitHandler from './habit.handler';
import { validateRequest, requireAuth } from '../../middlewares';
import { CreateHabitSchema, UpdateDateSchema } from './habit.schema';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.use(requireAuth());
router.get('/', HabitHandler.findAll);
router.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  HabitHandler.findOne,
);
router.post(
  '/',
  validateRequest({
    body: CreateHabitSchema,
  }),
  HabitHandler.createOne,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  HabitHandler.deleteOne,
);

router.patch(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: CreateHabitSchema,
  }),
  HabitHandler.updateInfo,
);

router.patch(
  '/addDate/:id',
  validateRequest({
    params: ParamsWithId,
    body: UpdateDateSchema,
  }),
  HabitHandler.addDate,
);

router.patch(
  '/removeDate/:id',
  validateRequest({
    params: ParamsWithId,
    body: UpdateDateSchema,
  }),
  HabitHandler.removeDate,
);

export default router;
