import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { ThemeProvider } from '../themes/ThemeProvider';
import PreviewSection from '../components/preview/PreviewSection';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const PublishedPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      api.getPublicPage(slug)
        .then((res) => {
          setPage(res.page);
          document.title = `${res.page.title} | VibeKit Studio`;
        })
        .catch((err) => {
          setError(err.message || 'Page not found');
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-gray-400">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Page not found.</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
          The vibe you are looking for doesn't exist yet or hasn't been published.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-black text-white rounded font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const sections = page.content.sections || [];

  return (
    <ThemeProvider theme={page.theme}>
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-forwards">
        {sections.length === 0 ? (
          <div className="h-screen flex items-center justify-center bg-[var(--color-bg)] italic opacity-30 font-medium">
            This vibe is currently empty...
          </div>
        ) : (
          sections
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((s: any) => (
              <PreviewSection key={s.id} type={s.type} data={s.data} />
            ))
        )}
      </main>
    </ThemeProvider>
  );
};

export default PublishedPage;
