import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const slug = event.queryStringParameters?.slug;
  if (!slug) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Slug required' }) };
  }

  try {
    // 1. Connection Test
    try {
      await pool.query('SELECT 1');
    } catch (dbError: any) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Database connection failed.' }) 
      };
    }

    // 2. Fetch page by slug (must be published)
    const { rows } = await pool.query(
      'SELECT * FROM pages WHERE slug = $1 AND status = $2',
      [slug, 'published']
    );

    if (rows.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Page not found or not published' }) };
    }

    const page = rows[0];

    // 3. Increment view count (fire and forget)
    pool.query('UPDATE pages SET view_count = view_count + 1 WHERE id = $1', [page.id])
      .catch(err => console.error('VIEW_INCREMENT_ERROR:', err));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page })
    };
  } catch (error: any) {
    console.error('PUBLIC_PAGE_GET_ERROR:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
