import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookies = parse(event.headers.cookie || '');
  const token = cookies['auth-token'];

  if (!token) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Not authenticated' }) 
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      userId: string;
      email: string;
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user: { id: decoded.userId, email: decoded.email } 
      })
    };
  } catch (error) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Invalid or expired token' }) 
    };
  }
};
