import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './utils/connect';
import routes from './routes';
import deserializeUser from './midllewares/deserializeUser';

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
app.use(deserializeUser);

app.listen(port, async () => {
	console.log(`Listening: http://localhost:${port}`);
	await connect();
	routes(app);
});

/*
	TODO
	---
	1. log every request made
	2. error handler
*/
