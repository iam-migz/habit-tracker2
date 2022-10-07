import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const createToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};
