import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = getAuthUser(event);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const { id } = JSON.parse(event.body || '{}');
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID required' }) };

  try {
    const result = await pool.query(
      'UPDATE pages SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      ['draft', id, user.userId]
    );

    if (result.rows.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Page not found' }) };
    }

    return { 
      statusCode: 200, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: result.rows[0] }) 
    };
  } catch (error: any) {
    console.error('PAGE_UNPUBLISH_ERROR:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Database Error' }) };
  }
};
