import { NextFunction, Request, Response } from 'express';
import { HabitItemInput } from './habitItem.validation';
import HabitItemModel, { HabitItemDoc } from './habitItem.model';

export async function createOne(
  req: Request<{}, {}, HabitItemInput>,
  res: Response<HabitItemDoc>,
  next: NextFunction,
) {
  try {
    const { habitId, date, image, note } = req.body;

    const duplicate = await HabitItemModel.findOne({ date });
    if (duplicate) {
      res.status(400);
      throw new Error('Date already exists');
    }

    const item = await HabitItemModel.create({
      date,
      habitId,
      image,
      note,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function findByHabitId(
  req: Request<{ habitId: string }, {}, {}>,
  res: Response<HabitItemDoc[]>,
  next: NextFunction,
) {
  try {
    const habitId = req.params.habitId;
    const items = await HabitItemModel.find({ habitId });
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<{ id: string }, {}, {}>,
  res: Response<HabitItemDoc>,
  next: NextFunction,
) {
  try {
    const result = await HabitItemModel.findOne({
      _id: req.params.id,
    });
    if (!result) {
      res.status(404);
      throw new Error(`Habit Item with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitItemModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!result) {
      res.status(404);
      throw new Error(`Item with id: "${req.params.id}" not found`);
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteByHabitId(
  req: Request<{ habitId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitItemModel.deleteMany({
      habitId: req.params.habitId,
    });
    if (!result) {
      res.status(404);
      throw new Error(`items with habitId: "${req.params.habitId}" not found`);
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
}
