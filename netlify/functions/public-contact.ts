import { Handler } from '@netlify/functions';
import pool from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message, page_id } = JSON.parse(event.body || '{}');

  if (!name || !email || !message || !page_id) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'All fields are required' }) 
    };
  }

  try {
    const result = await pool.query(
      'INSERT INTO contact_submissions (page_id, name, email, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [page_id, name, email, message]
    );

    return { 
      statusCode: 201, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Message sent successfully', submission: result.rows[0] }) 
    };
  } catch (error: any) {
    console.error('CONTACT_SUBMISSION_ERROR:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database Error' }) };
  }
};
