import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';
import UserModel from './api/user/user.model';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    //
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
}

export function requireAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        new Error('Authorization token required');
      }
      const token = authorization?.split(' ')[1];
      const payload: any = jwt.verify(token!, process.env.JWT_SECRET!);
      const temp = await UserModel.findOne<{ _id: number }>(
        {
          _id: payload.id,
        },
        {
          projection: { _id: 1 },
        },
      );
      if (!temp) {
        new Error('Incorrect token');
      }
      res.locals.user = temp?._id;
      next();
    } catch (error) {
      console.log('not authenticated');
      res.status(401);
      next(error);
    }
  };
}
