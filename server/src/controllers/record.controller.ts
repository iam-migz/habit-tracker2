import { NextFunction, Request, Response } from 'express';
import { createRecordInput, destroyRecordInput, indexRecordInput, showRecordInput } from '../schema/record.schema';
import * as service from '../service/record.service';

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
