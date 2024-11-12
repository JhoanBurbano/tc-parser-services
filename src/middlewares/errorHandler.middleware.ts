import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/logger';

export const errorHandler = (
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  log(error.message, 'error');
  if (error?.message) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
