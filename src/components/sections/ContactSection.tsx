import React, { useState } from 'react';
import { api } from '../../lib/api';
import { Loader2, CheckCircle, Send } from 'lucide-react';

interface ContactSectionProps {
  pageId?: string;
  data: {
    heading?: string;
    subheading?: string;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ pageId, data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageId) return;
    
    setStatus('submitting');
    try {
      await api.submitContact({ ...formData, page_id: pageId });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6 bg-[var(--color-surface)] border-t border-[var(--color-text)] border-opacity-5">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-[var(--font-heading)] text-[var(--color-text)] mb-4">
          {data.heading || 'Let’s Chat'}
        </h2>
        <p className="text-xl font-[var(--font-body)] text-[var(--color-text)] opacity-60 mb-12 leading-relaxed">
          {data.subheading || 'Have a question or a project in mind? Fill out the form below and I will get back to you within 24 hours.'}
        </p>

        {status === 'success' ? (
          <div className="p-10 rounded-[var(--radius)] bg-green-50 border border-green-100 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <CheckCircle className="text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-green-800 mb-2 font-[var(--font-heading)]">Message Sent!</h3>
            <p className="text-green-700 font-[var(--font-body)]">Thanks for reaching out. I will be in touch soon.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-bold text-green-800 underline uppercase tracking-widest"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text)] opacity-50 ml-2">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full p-4 bg-[var(--color-bg)] rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-10 focus:border-[var(--color-accent)] outline-none transition-all font-[var(--font-body)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text)] opacity-50 ml-2">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-4 bg-[var(--color-bg)] rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-10 focus:border-[var(--color-accent)] outline-none transition-all font-[var(--font-body)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text)] opacity-50 ml-2">Message</label>
              <textarea 
                required
                value={formData.message} 
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can I help you?"
                className="w-full p-4 h-40 bg-[var(--color-bg)] rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-10 focus:border-[var(--color-accent)] outline-none transition-all font-[var(--font-body)] resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>
            )}
            <button 
              disabled={status === 'submitting'}
              type="submit"
              className={`w-full py-5 rounded-[var(--radius)] font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3
                ${process.env.VITE_BTN_STYLE === 'glow' ? 'shadow-[0_0_20px_var(--color-accent)]' : ''}
                ${process.env.VITE_BTN_STYLE === 'outline' ? 'border-2 border-[var(--color-accent)] text-[var(--color-accent)]' : 'bg-[var(--color-accent)] text-white'}
                hover:opacity-90 disabled:opacity-50`}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
