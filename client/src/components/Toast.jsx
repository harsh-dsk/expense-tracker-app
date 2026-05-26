function Toast({ toast }) {
  if (!toast) return null;

  const tone =
    toast.type === 'error'
      ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2"
    >
      <div
        className={[
          'rounded-2xl border px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl',
          'transition-all duration-300',
          tone,
        ].join(' ')}
      >
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}

export default Toast;

