import { Router } from 'express';
import { validateRequest, requireAuth } from '../../middlewares';
import * as handler from './habitItem.handler';
import { HabitItemSchema } from './habitItem.validation';

const router = Router();

router.use(requireAuth());

router.get('/findByHabitId/:habitId', handler.findByHabitId);
router.get('/:id', handler.findOne);
router.delete('/:id', handler.deleteOne);
router.delete('/deleteByHabitId/:habitId', handler.deleteByHabitId);
router.post(
  '/',
  validateRequest({
    body: HabitItemSchema,
  }),
  handler.createOne,
);
export default router;
