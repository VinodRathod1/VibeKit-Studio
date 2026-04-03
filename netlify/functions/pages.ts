import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';
import { getAuthUser } from './utils/auth';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const handler: Handler = async (event) => {
  const user = getAuthUser(event);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // GET: List all pages for user
  if (event.httpMethod === 'GET') {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM pages WHERE user_id = $1 ORDER BY updated_at DESC',
        [user.userId]
      );
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: rows })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
    }
  }

  // POST: Create a new page
  if (event.httpMethod === 'POST') {
    try {
      const { title, theme } = JSON.parse(event.body || '{}');
      if (!title || !theme) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Title and theme required' }) };
      }

      let baseSlug = generateSlug(title) || 'untitled';
      let slug = baseSlug;
      let counter = 1;

      // Collision avoidance loop
      while (true) {
        const { rows } = await pool.query('SELECT id FROM pages WHERE slug = $1', [slug]);
        if (rows.length === 0) break;
        counter++;
        slug = `${baseSlug}-${counter}`;
      }

      const result = await pool.query(
        'INSERT INTO pages (user_id, title, slug, theme) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.userId, title, slug, theme]
      );

      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: result.rows[0] })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
    }
  }

  // DELETE: Delete a page
  if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body || '{}');
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID required' }) };

      await pool.query('DELETE FROM pages WHERE id = $1 AND user_id = $2', [id, user.userId]);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Page deleted' })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
