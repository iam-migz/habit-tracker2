import { Router } from 'express';
import * as HabitHandler from './habits.handler';
import { validateRequest, requireAuth } from '../../middlewares';
import { HabitName, UpdateDate } from './habits.model';
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
    body: HabitName,
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
  '/updateName/:id',
  validateRequest({
    params: ParamsWithId,
    body: HabitName,
  }),
  HabitHandler.updateName,
);

router.patch(
  '/addDate/:id',
  validateRequest({
    params: ParamsWithId,
    body: UpdateDate,
  }),
  HabitHandler.addDate,
);

router.patch(
  '/removeDate/:id',
  validateRequest({
    params: ParamsWithId,
    body: UpdateDate,
  }),
  HabitHandler.removeDate,
);

export default router;
