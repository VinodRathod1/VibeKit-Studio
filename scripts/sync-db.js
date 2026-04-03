import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

// Connection should be picked up from process.env.DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const runMigrations = async () => {
  const migrationsDir = 'netlify/functions/db/migrations';
  const files = ['001_create_users.sql', '002_create_pages.sql', '003_create_contact_submissions.sql'];

  console.log('🚀 Starting Database Synchronization...');

  try {
    for (const file of files) {
      console.log(`📄 Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
      console.log(`✅ ${file} successfully applied.`);
    }
    console.log('⭐ Database is fully synchronized and ready!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();
