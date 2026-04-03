import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = getAuthUser(event);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const id = event.queryStringParameters?.id || JSON.parse(event.body || '{}').id;

  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Page ID required' }) };
  }

  // GET: Fetch single page
  if (event.httpMethod === 'GET') {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM pages WHERE id = $1 AND user_id = $2',
        [id, user.userId]
      );

      if (rows.length === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Page not found' }) };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: rows[0] })
      };
    } catch (error: any) {
      console.error('PAGE_GET_ERROR:', error);
      return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Database Error' }) };
    }
  }

  // PUT: Update page
  if (event.httpMethod === 'PUT') {
    try {
      const { title, slug, theme, content } = JSON.parse(event.body || '{}');
      
      const { rows: ownerCheck } = await pool.query(
        'SELECT id FROM pages WHERE id = $1 AND user_id = $2',
        [id, user.userId]
      );

      if (ownerCheck.length === 0) {
        return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
      }

      const result = await pool.query(
        `UPDATE pages 
         SET title = $1, slug = $2, theme = $3, content = $4, updated_at = NOW() 
         WHERE id = $5 
         RETURNING *`,
        [title, slug, theme, JSON.stringify(content), id]
      );

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: result.rows[0] })
      };
    } catch (error: any) {
      console.error('PAGE_UPDATE_ERROR:', error);
      return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Database Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
