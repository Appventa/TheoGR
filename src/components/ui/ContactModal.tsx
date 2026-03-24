import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface ContactModalProps {
  isOpen:  boolean;
  onClose: () => void;
}

interface FormState {
  name:     string;
  services: string[];
  website:  string;
  desc:     string;
  email:    string;
  phone:    string;
}

const empty: FormState = { name: '', services: [], website: '', desc: '', email: '', phone: '' };

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const m = t.modal;

  const [form, setForm]       = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleService = (s: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter(x => x !== s)
        : [...f.services, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // TODO: wire Resend API here
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
  };

  const handleClose = () => { onClose(); setTimeout(() => { setForm(empty); setSubmitted(false); }, 300); };

  const inputBase =
    'w-full bg-surface-highest text-on-surface placeholder-outline rounded-md px-4 py-3 ' +
    'text-body-md font-body outline-none border border-transparent ' +
    'focus:border-primary transition-colors duration-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-surface-low rounded-md shadow-2xl overflow-y-auto max-h-[90dvh]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="font-display font-bold text-display-sm text-on-surface">
                  {m.title}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 p-1"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="w-full h-px bg-outline-variant/20 mx-0" />

              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffc965" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-display-sm text-on-surface">{m.successTitle}</h3>
                  <p className="font-body text-body-lg text-on-surface-variant max-w-xs">{m.successMsg}</p>
                  <button onClick={handleClose} className="mt-2 font-body text-label-md text-primary hover:opacity-80 transition-opacity">
                    ✕ Close
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-label-md text-on-surface font-semibold">
                      {m.fieldName} <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={m.fieldNameHolder}
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputBase}
                    />
                  </div>

                  {/* Services */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-label-md text-on-surface font-semibold">
                      {m.fieldServices} <span className="text-primary">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(m.services as readonly string[]).map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={
                            'px-3 py-3 rounded-md text-body-md font-body transition-all duration-200 text-center ' +
                            (form.services.includes(s)
                              ? 'bg-primary text-primary-on font-semibold'
                              : 'bg-surface-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-high border border-outline-variant/20')
                          }
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-label-md text-on-surface font-semibold">
                      {m.fieldWebsite}
                    </label>
                    <input
                      type="url"
                      placeholder={m.fieldWebsiteHolder}
                      value={form.website}
                      onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                      className={inputBase}
                    />
                  </div>

                  {/* Project description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-label-md text-on-surface font-semibold">
                      {m.fieldDesc} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={m.fieldDescHolder}
                      value={form.desc}
                      onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                      className={inputBase + ' resize-none'}
                    />
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-label-md text-on-surface font-semibold">
                      {m.fieldContact} <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder={m.fieldEmail}
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputBase}
                    />
                    <input
                      type="tel"
                      placeholder={m.fieldPhone}
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputBase}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending || form.services.length === 0}
                    className="w-full bg-primary-gradient text-primary-on font-display font-semibold
                               text-label-md py-4 rounded-sm uppercase tracking-wider
                               transition-opacity duration-200 hover:opacity-90
                               disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  >
                    {sending ? m.submitting : m.submit}
                  </button>

                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
