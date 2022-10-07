import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Habit, HabitModel, HabitWithId } from './habits.model';

export async function findAll(
  req: Request,
  res: Response<HabitWithId[]>,
  next: NextFunction,
) {
  try {
    const result = HabitModel.find();
    const habits = await result.toArray();
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, HabitWithId, Habit>,
  res: Response<HabitWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await HabitModel.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting Habit');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, HabitWithId, {}>,
  res: Response<HabitWithId>,
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
  req: Request<ParamsWithId, HabitWithId, Habit>,
  res: Response<HabitWithId>,
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
  req: Request<ParamsWithId, 0 | 1, {}>,
  res: Response<0 | 1>,
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
    res.status(204).json(result.ok);
    // res.json(result.value);
  } catch (error) {
    next(error);
  }
}
