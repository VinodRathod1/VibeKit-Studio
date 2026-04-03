import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { ThemeProvider } from '../themes/ThemeProvider';
import { themes } from '../themes/index';
import PreviewSection from '../components/preview/PreviewSection';
import SectionEditor from '../components/editor/SectionEditor';
import { 
  ArrowLeft, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Plus, 
  ExternalLink,
  CheckCircle,
  Loader2
} from 'lucide-react';

const EditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Initial Fetch
  useEffect(() => {
    if (id) {
      api.getPage(id)
        .then((res) => {
          setPage(res.page);
          setSections(res.page.content.sections || []);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Debounced Auto-Save
  useEffect(() => {
    if (!page || loading) return;

    const timer = setTimeout(async () => {
      setSaving(true);
      try {
        await api.updatePage(page.id, {
          title: page.title,
          slug: page.slug,
          theme: page.theme,
          content: { sections }
        });
        setLastSaved(new Date());
      } catch (err) {
        console.error('Auto-save failed:', err);
      } finally {
        setSaving(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [page?.title, page?.slug, page?.theme, sections]);

  const addSection = (type: string) => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      order: sections.length,
      data: type === 'hero' ? { title: 'New Hero', subtitle: 'Change me' } : {}
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, newData: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, data: newData } : s));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setSections(newSections);
  };

  const togglePublish = async () => {
    if (!page) return;
    const isPublished = page.status === 'published';
    try {
      const res = isPublished 
        ? await api.unpublishPage(page.id)
        : await api.publishPage(page.id);
      setPage(res.page);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white text-gray-900">
      {/* Top Bar */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white z-20 shrink-0">
        <div className="flex items-center gap-6">
          <Link to="/app" className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={18} /> Dashboard
          </Link>
          <div className="h-6 w-px bg-gray-200" />
          <input 
            type="text" 
            value={page?.title || ''} 
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            className="text-lg font-bold outline-none border-b-2 border-transparent focus:border-black transition-colors px-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 mr-4">
            {saving ? (
              <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Saving...</span>
            ) : lastSaved ? (
              <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle size={12} /> Saved</span>
            ) : null}
          </div>

          {page?.status === 'published' && (
            <a 
              href={`/p/${page.slug}`} 
              target="_blank" 
              className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-50 flex items-center gap-2"
            >
              <ExternalLink size={14} /> View Live
            </a>
          )}

          <button 
            onClick={togglePublish}
            className={`px-6 py-2 rounded text-sm font-bold transition-all ${
              page?.status === 'published' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-black text-white hover:opacity-90'
            }`}
          >
            {page?.status === 'published' ? 'Published' : 'Publish Page'}
          </button>
        </div>
      </header>

      {/* Main Split View */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <aside className="w-[400px] xl:w-[450px] border-r overflow-y-auto bg-gray-50 p-6 flex flex-col gap-8 shrink-0 pb-32">
          {/* Theme & URL */}
          <section className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Vibe Preset</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(themes).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setPage({ ...page, theme: t })}
                    className={`p-3 rounded border text-[10px] uppercase font-bold text-center transition-all ${
                      page?.theme === t ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white hover:border-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Slug URL</label>
              <div className="flex items-center gap-2 p-2 bg-white border rounded text-xs font-mono text-gray-400">
                vibekit.studio/p/
                <input 
                  type="text" 
                  value={page?.slug || ''} 
                  onChange={(e) => setPage({ ...page, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="text-black outline-none w-full font-bold"
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section List */}
          <section>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Page Content</label>
            <div className="space-y-4">
              {sections.map((s, i) => (
                <SectionEditor 
                  key={s.id}
                  section={s}
                  onUpdate={(data) => updateSection(s.id, data)}
                  onRemove={() => removeSection(s.id)}
                  onMoveUp={() => moveSection(i, 'up')}
                  onMoveDown={() => moveSection(i, 'down')}
                  isFirst={i === 0}
                  isLast={i === sections.length - 1}
                />
              ))}
            </div>

            <div className="mt-8 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Add Section</p>
              <div className="grid grid-cols-2 gap-2">
                {['hero', 'features', 'gallery', 'contact'].map(type => (
                  <button 
                    key={type}
                    onClick={() => addSection(type)}
                    className="flex flex-col items-center gap-2 p-3 bg-white border rounded hover:border-black transition-colors"
                  >
                    <Plus size={16} />
                    <span className="text-[10px] font-bold uppercase">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </aside>

        {/* Live Preview Panel */}
        <section className="flex-1 bg-gray-100 overflow-y-auto flex flex-col relative">
          {/* Device Toggles */}
          <div className="sticky top-6 left-1/2 -translate-x-1/2 z-10 w-fit bg-white p-1 rounded-full shadow-xl border flex items-center gap-1 mb-8 self-center mt-6">
            <button 
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-full transition-colors ${previewMode === 'mobile' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
              <Smartphone size={18} />
            </button>
            <button 
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-full transition-colors ${previewMode === 'tablet' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
              <Tablet size={18} />
            </button>
            <button 
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-full transition-colors ${previewMode === 'desktop' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
              <Monitor size={18} />
            </button>
          </div>

          {/* Actual Preview Content */}
          <div 
            className={`mx-auto bg-white shadow-2xl transition-all duration-300 mb-20 ${
              previewMode === 'mobile' ? 'w-[375px]' : previewMode === 'tablet' ? 'w-[768px]' : 'w-full'
            }`}
          >
            <ThemeProvider theme={page?.theme || 'minimal'}>
              <div className="min-h-screen bg-[var(--color-bg)]">
                {sections.length === 0 ? (
                  <div className="h-[50vh] flex items-center justify-center text-gray-300 italic font-medium">
                    No sections added yet...
                  </div>
                ) : (
                  sections.sort((a, b) => a.order - b.order).map((s) => (
                    <PreviewSection key={s.id} type={s.type} data={s.data} />
                  ))
                )}
              </div>
            </ThemeProvider>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditorPage;
