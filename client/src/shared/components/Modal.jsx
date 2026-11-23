import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open, onClose, eyebrow, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="header-gradient relative overflow-hidden p-5 text-white">
              <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">{eyebrow}</p>
              <h2 className="mt-1 font-display text-xl font-extrabold leading-tight">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-xl p-1.5 text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}