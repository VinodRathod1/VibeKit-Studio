import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export const getAuthUser = (event: any) => {
  const cookies = parse(event.headers.cookie || '');
  const token = cookies['auth-token'];

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      userId: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
};
