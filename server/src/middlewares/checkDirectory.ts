import fs from 'fs';
import { APP_ROOT } from '../app';
import { NextFunction, Request, Response } from 'express';

const checkDirectory = (req: Request, res: Response, next: NextFunction) => {
	const dir = APP_ROOT + '/uploads/';
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	return next();
};

export default checkDirectory;
