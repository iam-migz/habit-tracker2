import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Habit, HabitModel, HabitName, UpdateDate } from './habits.model';

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
  req: Request<{}, {}, HabitName>,
  res: Response<Habit>,
  next: NextFunction,
) {
  try {
    const { name } = req.body;
    const userId = res.locals.user;

    // check if habit name duplicate
    const duplicate = await HabitModel.findOne({ name });
    if (duplicate) {
      res.status(400);
      throw new Error('Habit already exists');
    }

    const insertResult = await HabitModel.insertOne({
      name,
      userId,
    });
    if (!insertResult.acknowledged) throw new Error('Error inserting Habit');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      name,
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

export async function updateName(
  req: Request<ParamsWithId, {}, HabitName>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
    );
    if (!result.acknowledged) {
      res.status(404);
      throw new Error(`could not update habit ${req.params.id}`);
    }
    res.status(204).json({ ok: result.acknowledged });
  } catch (error) {
    next(error);
  }
}

export async function addDate(
  req: Request<ParamsWithId, {}, UpdateDate>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $addToSet: {
          dates: req.body.date,
        },
      },
    );
    if (!result.acknowledged) {
      res.status(404);
      throw new Error(`could not update habit ${req.params.id}`);
    }
    res.status(204).json({ ok: result.acknowledged });
  } catch (error) {
    next(error);
  }
}

export async function removeDate(
  req: Request<ParamsWithId, {}, UpdateDate>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $pull: {
          dates: req.body.date,
        },
      },
    );
    if (!result.acknowledged) {
      res.status(404);
      throw new Error(`could not update habit ${req.params.id}`);
    }
    res.status(204).json({ ok: result.acknowledged });
  } catch (error) {
    next(error);
  }
}
