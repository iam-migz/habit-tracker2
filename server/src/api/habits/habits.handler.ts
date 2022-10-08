import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Habit, HabitModel, RawHabit } from './habits.model';

export async function findAll(
  req: Request,
  res: Response<Habit[]>,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user;
    const habits = await HabitModel.find({ userId }).toArray();
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, {}, RawHabit>,
  res: Response<Habit>,
  next: NextFunction,
) {
  try {
    const { name, dates } = req.body;
    const userId = res.locals.user;

    // check if habit name duplicate
    const duplicate = await HabitModel.findOne({ name });
    if (duplicate) {
      res.status(400);
      throw new Error('Habit already exists');
    }

    const insertResult = await HabitModel.insertOne({
      name,
      dates,
      userId,
    });
    if (!insertResult.acknowledged) throw new Error('Error inserting Habit');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      name,
      dates,
      userId,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<Habit>,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Habit with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, {}, RawHabit>,
  res: Response<Habit>,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    );
    if (!result.value) {
      res.status(404);
      throw new Error(`Habit with id "${req.params.id}" not found`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Habit with id "${req.params.id}" not found`);
    }
    res.status(204).json(result.value);
  } catch (error) {
    next(error);
  }
}
