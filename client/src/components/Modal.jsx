import { useEffect } from 'react';

function Modal({ open, onClose, titleId, children }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4"
      onMouseDown={(e) => {
        // Close only on backdrop click.
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}

export default Modal;

