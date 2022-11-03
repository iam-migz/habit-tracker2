import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI);

const server = app.listen(port, () => {
  console.log(`Listening: http://localhost:${port} \nPID: ${process.pid}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nserver closed');
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('\nserver closed');
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

mongoose.connection.on('connected', () => {
  console.log('db connected');
});
mongoose.connection.on('disconnected', () => {
  console.log('db disconnected ');
});
mongoose.connection.on('error', (err) => {
  console.log('db error ', err.message);
});
