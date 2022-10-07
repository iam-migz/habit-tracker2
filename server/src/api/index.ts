import express from 'express';

import habits from './habits/habits.routes';
import users from './users/users.routes';

const router = express.Router();

router.get<{}, {}>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/habits', habits);
router.use('/users', users);

export default router;
