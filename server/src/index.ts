import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to db');
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  })
  .catch((err) => console.log(err));
