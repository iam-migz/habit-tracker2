import { Router } from 'express';
import * as HabitHandler from './habits.handler';
import { validateRequest, requireAuth } from '../../middlewares';
import { RawHabit } from './habits.model';
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
    body: RawHabit,
  }),
  HabitHandler.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: RawHabit,
  }),
  HabitHandler.updateOne,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  HabitHandler.deleteOne,
);

// patch update one specific thing
// put update the whole thing

export default router;
