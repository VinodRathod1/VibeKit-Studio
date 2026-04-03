import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { LightningBoltIcon } from '../components/icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.login(email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="w-full max-w-md p-8 md:p-12 rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-accent)]/20 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[var(--color-accent)] rounded-xl flex items-center justify-center text-[var(--color-bg)] mb-4">
            <LightningBoltIcon size={24} />
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome Back
          </h1>
          <p className="opacity-50 text-sm mt-2">Sign in to manage your vibes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-[var(--radius)]">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold opacity-70 uppercase tracking-widest block">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-[var(--color-bg)] border border-[var(--color-accent)]/10 rounded-[var(--radius)] focus:border-[var(--color-accent)] outline-none transition-all"
              placeholder="you@vibe.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold opacity-70 uppercase tracking-widest block">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-[var(--color-bg)] border border-[var(--color-accent)]/10 rounded-[var(--radius)] focus:border-[var(--color-accent)] outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={isLoading}
            className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-black text-lg rounded-[var(--radius)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm opacity-60">
          Don't have an account? {' '}
          <Link to="/signup" className="text-[var(--color-accent)] font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
