import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id } = JSON.parse(event.body || '{}');
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Page ID required' }) };
  }

  try {
    await pool.query('UPDATE pages SET view_count = view_count + 1 WHERE id = $1', [id]);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'View count incremented' })
    };
  } catch (error: any) {
    console.error('VIEW_COUNT_ERROR:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
  }
};
