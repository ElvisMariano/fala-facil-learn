
import { sign, verify } from 'jsonwebtoken';
import { AuthToken } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload: AuthToken): string {
  return sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): AuthToken {
  try {
    const decoded = verify(token, JWT_SECRET) as AuthToken;
    return decoded;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
