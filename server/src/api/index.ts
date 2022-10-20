import express from 'express';

import habits from './habit/habit.route';
import users from './user/user.route';

const router = express.Router();

router.get<{}, {}>('/', (req, res) => {
  res.json({
    message: 'API connection established 👋',
  });
});

router.use('/habit', habits);
router.use('/user', users);

export default router;
