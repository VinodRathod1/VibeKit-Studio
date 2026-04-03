import { Handler } from '@netlify/functions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import pool from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password || password.length < 8) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Invalid email or password (min 8 chars)' }) 
      };
    }

    const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'User already exists' }) 
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, passwordHash]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    const cookie = serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return {
      statusCode: 201,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { id: user.id, email: user.email } })
    };
  } catch (error) {
    console.error(error);
    return { 
      statusCode: 500, 
      headers: { 'Content-Type': 'application/json' } as Record<string, string>,
      body: JSON.stringify({ error: 'Database connection failed. Please check Netlify environment variables.' }) 
    };
  }
};
