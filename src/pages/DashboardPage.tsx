import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { themes } from '../themes';
import { 
  LightningBoltIcon, 
  TrashIcon, 
  CopyIcon, 
  EditIcon, 
  PlusIcon,
  LogOutIcon
} from '../components/icons';

const DashboardPage = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTheme, setNewTheme] = useState('minimal');
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { user: userData } = await api.getMe();
        const { pages: pagesData } = await api.getPages();
        setUser(userData);
        setPages(pagesData);
      } catch (err) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleLogout = async () => {
    await api.logout();
    navigate('/login');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { page } = await api.createPage(newTitle, newTheme);
      navigate(`/app/pages/${page.id}`);
    } catch (err) {
      alert('Failed to create page');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const { page } = await api.duplicatePage(id);
      setPages([page, ...pages]);
    } catch (err) {
      alert('Failed to duplicate page');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await api.deletePage(id);
      setPages(pages.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete page');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <header className="h-16 border-b border-[var(--color-accent)]/10 animate-pulse bg-gray-50"></header>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="h-10 w-48 bg-gray-100 rounded-full mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-50 rounded-[var(--radius)] border border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-20 fade-up">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-accent)]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center text-[var(--color-bg)] hover:rotate-12 transition-transform duration-500">
              <LightningBoltIcon size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tight hidden sm:block font-[var(--font-heading)]">VibeKit Studio</h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm font-medium opacity-50 hidden md:block">{user?.email}</span>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
              title="Logout"
            >
              <LogOutIcon size={20} />
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-black rounded-[var(--radius)] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--color-accent)]/10"
            >
              <PlusIcon size={18} />
              <span className="hidden sm:inline">New Page</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-black mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard</h2>
        
        {pages.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center bg-[var(--color-surface)] rounded-[3rem] border-2 border-dashed border-gray-200 fade-up">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-10 shadow-xl">
              <PlusIcon size={48} className="text-[var(--color-accent)]/40" />
            </div>
            <h3 className="text-3xl font-black mb-4">No Vibes Found</h3>
            <p className="opacity-50 mb-10 max-w-sm mx-auto text-lg">Your design playground is waiting. Create your first themed mini-site in seconds.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-10 py-5 bg-[var(--color-accent)] text-[var(--color-bg)] font-black rounded-[var(--radius)] hover:scale-110 active:scale-95 transition-transform shadow-2xl shadow-[var(--color-accent)]/20"
            >
              Build your first Vibe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page, index) => (
              <div 
                key={page.id} 
                className={`group p-8 rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-accent)]/5 hover-raise fade-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black mb-2 truncate max-w-[200px]">{page.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                        page.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {page.status}
                      </span>
                      <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">{page.theme} theme</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                    <button 
                      onClick={() => handleDuplicate(page.id)}
                      className="p-3 hover:bg-[var(--color-accent)]/10 rounded-xl transition-colors text-[var(--color-text)]"
                      title="Duplicate"
                    >
                      <CopyIcon size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(page.id)}
                      className="p-3 hover:bg-red-500/10 rounded-xl transition-colors text-red-500"
                      title="Delete"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-accent)]/5">
                  <div className="text-[11px] opacity-40 font-black uppercase tracking-widest">
                    {page.view_count} views • {new Date(page.created_at).toLocaleDateString()}
                  </div>
                  <button 
                    onClick={() => navigate(`/app/pages/${page.id}`)}
                    className="flex items-center gap-2 text-sm font-black text-[var(--color-accent)] hover:gap-4 transition-all"
                  >
                    Edit Vibe
                    <EditIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Page Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-xl p-8 rounded-[var(--radius)] bg-[var(--color-surface)] border border-[var(--color-accent)]/20 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Create New Vibe</h2>
            
            <form onSubmit={handleCreate} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50">Page Title</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. My Personal Brand"
                  className="w-full p-4 bg-[var(--color-bg)] border border-[var(--color-accent)]/10 rounded-[var(--radius)] outline-none focus:border-[var(--color-accent)] transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest opacity-50">Choose a Vibe Preset</label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(themes).map(([key, t]: [string, any]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setNewTheme(key)}
                      className={`p-4 rounded-[var(--radius)] border-2 text-left transition-all ${
                        newTheme === key ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-transparent bg-[var(--color-bg)]'
                      }`}
                    >
                      <p className="font-bold text-sm">{t.name}</p>
                      <div className="flex gap-1 mt-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.colors.accent }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.colors.bg }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.colors.text }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 font-bold opacity-50 hover:opacity-100 transition-opacity"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-black rounded-[var(--radius)] hover:opacity-90 transition-opacity"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
