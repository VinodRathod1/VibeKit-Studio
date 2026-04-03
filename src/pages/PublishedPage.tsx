import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { ThemeProvider } from '../themes/ThemeProvider';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import GallerySection from '../components/sections/GallerySection';
import ContactSection from '../components/sections/ContactSection';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const PublishedPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchPage = async () => {
        try {
          const res = await api.getPublicPage(slug);
          setPage(res.page);
          document.title = `${res.page.title} | VibeKit Studio`;
          
          // Analytics: Increment view count
          api.incrementViewCount(res.page.id).catch(console.error);
        } catch (err: any) {
          setError(err.message || 'Page not found');
        } finally {
          setLoading(false);
        }
      };
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Skeleton UI */}
        <div className="h-[70vh] bg-gray-50 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
          <div className="w-2/3 h-20 bg-gray-200 rounded-full blur-sm"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded-full blur-sm opacity-50"></div>
          <div className="w-40 h-16 bg-gray-200 rounded-2xl blur-sm opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-gray-50 rounded-[3rem] relative overflow-hidden">
               <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-xl border border-gray-100 rounded-full shadow-2xl">
          <Loader2 className="animate-spin text-gray-400" size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Loading Vibe...</span>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center animate-in fade-in duration-1000">
        <div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-10 rotate-3 hover:rotate-0 transition-transform duration-500 group">
          <AlertCircle size={48} className="text-red-500 group-hover:scale-110 transition-transform" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>Vibe Not Found</h1>
        <p className="text-gray-500 mb-12 max-w-sm mx-auto font-medium text-lg leading-relaxed">
          The vibe you are looking for doesn't exist or has returned to the digital ether.
        </p>
        <Link 
          to="/" 
          className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-3"
        >
          <ArrowLeft size={20} /> Back to Studio
        </Link>
      </div>
    );
  }

  const sections = page.content.sections || [];

  return (
    <ThemeProvider theme={page.theme}>
      <main className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-forwards">
        {sections.length === 0 ? (
          <div className="h-screen flex items-center justify-center bg-[var(--color-bg)] italic opacity-20 font-black uppercase tracking-widest">
            This vibe is currently empty...
          </div>
        ) : (
          sections
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((s: any) => {
              switch (s.type) {
                case 'hero': return <HeroSection key={s.id} data={s.data} />;
                case 'features': return <FeaturesSection key={s.id} data={s.data} />;
                case 'gallery': return <GallerySection key={s.id} data={s.data} />;
                case 'contact': return <ContactSection key={s.id} pageId={page.id} data={s.data} />;
                default: return null;
              }
            })
        )}
        
        {/* Made with VibeKit badge */}
        <footer className="py-10 bg-[var(--color-bg)] opacity-30 text-center">
          <Link to="/" className="text-[10px] font-black uppercase tracking-widest hover:opacity-100 transition-opacity">
            Built with VibeKit Studio
          </Link>
        </footer>
      </main>
    </ThemeProvider>
  );
};

export default PublishedPage;
