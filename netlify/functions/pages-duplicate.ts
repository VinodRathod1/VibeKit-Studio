import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const user = getAuthUser(event);
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const { id } = JSON.parse(event.body || '{}');
    if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID required' }) };

    // Fetch existing page
    const { rows } = await pool.query(
      'SELECT * FROM pages WHERE id = $1 AND user_id = $2',
      [id, user.userId]
    );

    if (rows.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Page not found' }) };
    }

    const page = rows[0];
    const baseSlug = `${page.slug}-copy`;
    let slug = baseSlug;
    let counter = 1;

    // Collision avoidance loop
    while (true) {
      const { rows: collisionRows } = await pool.query('SELECT id FROM pages WHERE slug = $1', [slug]);
      if (collisionRows.length === 0) break;
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const result = await pool.query(
      'INSERT INTO pages (user_id, title, slug, theme, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user.userId, `${page.title} (Copy)`, slug, page.theme, page.content]
    );

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: result.rows[0] })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
  }
};
