import { NextFunction, Request, Response } from 'express';
import { createHabitInput, destroyHabitInput, showHabitInput, updateHabitInput } from '../schema/habit.schema';
import * as service from '../service/habit.service';

export async function createHandler(req: Request<{}, {}, createHabitInput['body']>, res: Response, next: NextFunction) {
	try {
		const userId = res.locals.user._id;

		const duplicate = await service.show({ name: req.body.name });
		if (duplicate) {
			res.status(409);
			throw new Error('Habit already exists');
		}

		const habit = await service.create({
			...req.body,
			userId,
		});
		res.status(201).json(habit);
	} catch (e) {
		next(e);
	}
}

export async function indexHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = res.locals.user._id;
		const habits = await service.index({ userId });
		res.json(habits);
	} catch (e) {
		next(e);
	}
}

export async function showHandler(req: Request<showHabitInput['params']>, res: Response, next: NextFunction) {
	try {
		const habit = await service.show({ _id: req.params.habitId });
		res.json(habit);
	} catch (e) {
		next(e);
	}
}

export async function updateHandler(
	req: Request<updateHabitInput['params'], {}, updateHabitInput['body']>,
	res: Response,
	next: NextFunction
) {
	try {
		const userId = res.locals.user._id;
		const habitId = req.params.habitId;

		const habit = await service.show({ _id: habitId });
		if (!habit) {
			res.status(404);
			throw new Error('Habit not found');
		}

		if (String(habit.userId) !== userId) {
			res.status(403);
			throw new Error('Forbidden Update');
		}

		await service.update({ _id: habitId }, req.body);
		return res.sendStatus(204);
	} catch (e) {
		next(e);
	}
}

export async function destroyHandler(
	req: Request<destroyHabitInput['params'], {}, {}>,
	res: Response,
	next: NextFunction
) {
	try {
		const userId = res.locals.user._id;
		const habitId = req.params.habitId;

		const habit = await service.show({ _id: habitId });
		if (!habit) {
			res.status(404);
			throw new Error('Habit not found');
		}

		if (String(habit.userId) !== userId) {
			res.status(403);
			throw new Error('Forbidden Update');
		}

		await service.destroy({ _id: habitId });
		return res.sendStatus(204);
	} catch (e) {
		next(e);
	}
}

/*
1. create		-- DONE
2. index		-- DONE
3. show			-- DONE
4. update		-- 
5. delete		--
*/
