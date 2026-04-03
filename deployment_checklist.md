# 🚀 VibeKit Studio Production Deployment Checklist

Follow these steps to deploy VibeKit Studio to Netlify with full backend and database support.

## 1. Database Setup (Supabase/Neon)
- [ ] Create a new PostgreSQL database.
- [ ] Run the migrations in `/netlify/functions/db/migrations/` in order:
  - `001_create_users.sql`
  - `002_create_pages.sql`
  - `003_create_contact_submissions.sql`
- [ ] Note your connection string (e.g., `postgresql://postgres:password@db.supabase.co:5432/postgres`).

## 2. Netlify Configuration
- [ ] **Site Name**: Choose a unique name (e.g., `my-vibekit-studio.netlify.app`).
- [ ] **Environment Variables**: Add these in Netlify Dashboard (`Site settings > Environment variables`):
  - `DATABASE_URL`: Your PostgreSQL connection string.
  - `JWT_SECRET`: A long random string (at least 32 chars).
- [ ] **Build Settings**:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`

## 3. Post-Deployment Audit
- [ ] **Auth Check**: Sign up a new user and log in.
- [ ] **Editor Check**: Create a page, add sections, and verify the "Saved ✓" indicator appears.
- [ ] **Publish Check**: Set a page to `published` and visit `/p/your-slug`.
- [ ] **Analytics Check**: Refresh the public page and verify `view_count` increments on the Dashboard.
- [ ] **Lead Check**: Submit a contact form on the public page and verify the submission in the database.
- [ ] **Performance**: Ensure skeleton loaders appear during transitions.

## 4. Final Polish Tips
- [ ] Enable **Deploy Previews** in Netlify to test feature branches safely.
- [ ] Configure a **Custom Domain** for a more professional brand presence.
- [ ] Set up **Netlify Identity** if you want to manage users directly from the dashboard (optional fallback).

---
Ready for lift-off! 🚀🌌✨
