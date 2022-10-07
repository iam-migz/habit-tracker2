import express from 'express';

import habits from './habits/habits.routes';

const router = express.Router();

router.get<{}, {}>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/habits', habits);

export default router;
