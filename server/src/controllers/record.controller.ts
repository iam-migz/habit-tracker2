import { NextFunction, Request, Response } from 'express';
import {
	createRecordInput,
	destroyRecordInput,
	indexRecordInput,
	showRecordInput,
	uploadRecordInput,
} from '../schema/record.schema';
import * as service from '../service/record.service';
import fs from 'fs';
import { APP_ROOT } from '../app';

export async function createHandler(
	req: Request<{}, {}, createRecordInput['body'], createRecordInput['query']>,
	res: Response,
	next: NextFunction
) {
	try {
		const habitId = req.query.habitId;

		const duplicate = await service.show({ date: req.body.date, habitId });
		if (duplicate) {
			res.status(409);
			throw new Error('Record already exists');
		}

		const record = await service.create({ ...req.body, habitId });
		res.status(201).json(record);
	} catch (e) {
		next(e);
	}
}

export async function indexHandler(
	req: Request<{}, {}, {}, indexRecordInput['query']>,
	res: Response,
	next: NextFunction
) {
	try {
		const habitId = req.query.habitId;
		const records = await service.index({ habitId });
		res.json(records);
	} catch (e) {
		next(e);
	}
}

export async function showHandler(req: Request<showRecordInput['params']>, res: Response, next: NextFunction) {
	try {
		const record = await service.show({ _id: req.params.recordId });
		res.json(record);
	} catch (e) {
		next(e);
	}
}

export async function destroyHandler(
	req: Request<destroyRecordInput['params'], {}, {}>,
	res: Response,
	next: NextFunction
) {
	try {
		const recordId = req.params.recordId;

		const record = await service.show({ _id: recordId });
		if (!record) {
			res.status(404);
			throw new Error('Record not found');
		}

		await service.destroy({ _id: record._id });
		return res.sendStatus(204);
	} catch (e) {
		next(e);
	}
}

export async function uploadImageHandler(
	req: Request<uploadRecordInput['params'], {}, {}>,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.file) {
			res.status(400);
			throw new Error('Image Missing');
		}
		service.update({ _id: req.params.recordId }, { image: req.file.filename });

		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
}

export async function deleteImageHandler(
	req: Request<uploadRecordInput['params'], {}, {}>,
	res: Response,
	next: NextFunction
) {
	try {
		const record = await service.show({ _id: req.params.recordId });
		const filename = record?.image;
		const directoryPath = APP_ROOT + '/uploads/';
		fs.unlinkSync(directoryPath + filename);

		service.update({ _id: req.params.recordId }, { image: '' });

		return res.sendStatus(200);
	} catch (e) {
		next(e);
	}
}
