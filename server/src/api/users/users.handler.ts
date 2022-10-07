import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/token';
import { LoginSchema, User, UserModel } from './users.model';

// interface and ? or OR
export async function register(
  req: Request<{}, { token: string; name: string; email: string }, User>,
  res: Response<{ token: string; name: string; email: string }>,
  next: NextFunction,
) {
  try {
    // 1. check if email is unique,
    const duplicate = await UserModel.findOne({ email: req.body.email });
    if (duplicate) {
      res.status(400);
      throw new Error('Email Already Exists');
    }

    // 2. hash password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // 3. save db
    const insertResult = await UserModel.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error Creating User');

    // 4. create and return token
    const token = createToken(insertResult.insertedId);

    res.status(201).json({
      token,
      name: req.body.name,
      email: req.body.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, { token: string; name: string; email: string }, LoginSchema>,
  res: Response<{ token: string; name: string; email: string }>,
  next: NextFunction,
) {
  try {
    // 1. findOne via email
    const result = await UserModel.findOne({ email: req.body.email });
    if (!result) {
      res.status(401);
      throw new Error('Incorrect Email');
    }

    // 2. check password
    const test = await bcrypt.compare(req.body.password, result.password);
    if (!test) {
      res.status(401);
      throw new Error('Incorrect Password');
    }
    // 3. returns a token
    const token = createToken(result._id);
    res.json({ token, email: result.email, name: result.name });
  } catch (error) {
    next(error);
  }
}
