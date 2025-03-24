
import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
  
  return NextResponse.json(
    { error: 'Erro interno do servidor' },
    { status: 500 }
  );
}
