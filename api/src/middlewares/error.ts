import { NextApiRequest, NextApiResponse } from 'next';
import { AppError } from '@/utils/errors';
import { env } from '@/config/env';

export function errorHandler(
  error: Error,
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        type: error.name,
        ...(env.NODE_ENV === 'development' && { details: error.details }),
      },
    });
  }

  console.error(error);

  return res.status(500).json({
    error: {
      message: env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      type: 'InternalServerError',
    },
  });
} 