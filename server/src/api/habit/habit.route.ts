import { Router } from 'express';
import * as HabitHandler from './habit.handler';
import { validateRequest, requireAuth } from '../../middlewares';
import { HabitSchema } from './habit.validation';
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
    body: HabitSchema,
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
    body: HabitSchema,
  }),
  HabitHandler.updateOne,
);

export default router;
