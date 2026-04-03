# VibeKit Studio 🌌✨

A premium, full-stack platform for creating and publishing themed mini-sites. Build your vibe, launch in minutes, and track your success.

## 🚀 Features
- **6 Premium Theme Presets**: Minimal, Neo Brutal, Glassmorphism, Midnight, Kawaii, and Corporate.
- **Interactive Page Builder**: Real-time split-layout editor with auto-save and multi-device preview.
- **Section Library**: Hero, Features, Gallery, and Contact blocks.
- **Public Rendering**: SEO-friendly /p/:slug pages with dynamic theme injection.
- **Analytics & Leads**: Dedicated view tracking and secure contact form submissions.
- **Authentication**: Secure JWT-based sessions with PostgreSQL persistence.

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VinodRathod1/VibeKit-Studio.git
   cd VibeKit-Studio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your values:
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g., Supabase).
   - `JWT_SECRET`: A random long string for session signing.

4. **Run Migrations**:
   Execute the SQL files in `netlify/functions/db/migrations/` in order (001, 002, 003) in your database.

5. **Start Dev Server**:
   ```bash
   npx netlify dev
   ```

## 🔐 Test Credentials
For quick testing, use:
- **Email**: `test@vibekit.com`
- **Password**: `testpass123`

## 🏗️ Technical Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion (for entrance animations).
- **Backend**: Netlify Functions (Serverless Node.js).
- **Database**: PostgreSQL (Supabase/Neon).
- **Security**: JWT (httpOnly Cookies) & Bcrypt password hashing.

## ⚖️ Tradeoffs & Improvements
- **JSONB Content**: Uses `jsonb` for page sections for maximum flexibility. *Next Step:* Normalize into a `sections` table for advanced querying.
- **Stateless Auth**: JWTs in cookies for easy scaling. *Next Step:* Add refresh tokens and device-specific revocation.
- **Auto-save**: 1.5s debounced persistence. *Next Step:* Add operational transform (OT) or conflict resolution for multi-tab editing.
- **Media**: Currently uses URL strings. *Next Step:* Integrate Cloudflare R2 for direct image uploads.

---
Built with ⚡ by VibeKit Team
