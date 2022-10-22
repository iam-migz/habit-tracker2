import { NextFunction, Request, Response } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { CreateHabitInput, UpdateDateInput } from './habit.schema';
import HabitModel, { HabitDoc } from './habit.model';

export async function findAll(
  req: Request,
  res: Response<HabitDoc[]>,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user;
    const habits = await HabitModel.find({ userId });
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, {}, CreateHabitInput>,
  res: Response<HabitDoc>,
  next: NextFunction,
) {
  try {
    const { name } = req.body;
    const userId = res.locals.user;

    const duplicate = await HabitModel.findOne({ name });
    if (duplicate) {
      res.status(400);
      throw new Error('Habit already exists');
    }

    const habit = await HabitModel.create({
      name,
      userId,
    });

    res.status(201).json(habit);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<HabitDoc>,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.findOne({
      _id: req.params.id,
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
  res: Response<HabitDoc>,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!result) {
      res.status(404);
      throw new Error(`Habit with id "${req.params.id}" not found`);
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateName(
  req: Request<ParamsWithId, {}, UpdateDateInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: req.params.id,
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
  req: Request<ParamsWithId, {}, UpdateDateInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: req.params.id,
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
  req: Request<ParamsWithId, {}, UpdateDateInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await HabitModel.updateOne(
      {
        _id: req.params.id,
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
