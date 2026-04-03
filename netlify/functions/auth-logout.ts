import { Handler } from '@netlify/functions';
import { serialize } from 'cookie';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookie = serialize('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0)
  });

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Logged out' })
  };
};
