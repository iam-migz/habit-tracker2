import { NextFunction, Request, Response } from 'express';
import { createToken } from '../../utils/token';
import { RegisterInput, LoginInput } from './user.validation';
import UserModel from './user.model';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = res.locals.user;
    const user = await UserModel.findById({ _id: id });
    res.json({
      id: user?._id,
      name: user?.name,
      email: user?.email,
    });
  } catch (error) {
    res.status(404);
    next(error);
  }
}

export async function register(
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const duplicate = await UserModel.findOne({ email: req.body.email });
    if (duplicate) {
      res.status(409);
      throw new Error('Email Already Exists');
    }

    const user = await UserModel.create(req.body);

    const token = createToken(user._id);

    res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(401);
      throw new Error('Incorrect Email');
    }

    if (await user.comparePassword(req.body.password)) {
      const token = createToken(user._id);
      res.json({ token });
    } else {
      res.status(401);
      throw new Error('Incorrect Password');
    }
  } catch (error) {
    next(error);
  }
}
