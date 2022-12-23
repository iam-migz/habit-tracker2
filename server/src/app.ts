import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './utils/connect';
import deserializeUser from './midllewares/deserializeUser';
import { errorHandler } from './midllewares/errorHandler';
import router from './routes';
import morgan from 'morgan';

const port = config.get<number>('port');

const app = express();

app.use(
	cors({
		origin: config.get('origin'),
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(deserializeUser);
app.use('/api', router);

app.use(errorHandler);

app.listen(port, async () => {
	console.log(`Listening: http://localhost:${port}`);
	await connect();
});
