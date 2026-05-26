function DashboardCard({ title, value, hint, accent = 'emerald' }) {
  const accentStyles = {
    emerald: 'text-emerald-400',
    red: 'text-rose-400',
    blue: 'text-sky-400',
    amber: 'text-amber-400',
  };

  return (
    <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6">
      <h2 className="text-sm font-medium text-zinc-400">{title}</h2>
      <p
        className={[
          'mt-2 text-2xl font-bold tracking-tight sm:text-3xl',
          accentStyles[accent] ?? accentStyles.emerald,
        ].join(' ')}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </article>
  );
}

export default DashboardCard;
