const GLOW_STYLES = {
  emerald: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  sky: 'from-sky-500/20 via-sky-500/5 to-transparent',
  violet: 'from-violet-500/20 via-violet-500/5 to-transparent',
  amber: 'from-amber-500/20 via-amber-500/5 to-transparent',
  rose: 'from-rose-500/20 via-rose-500/5 to-transparent',
  fuchsia: 'from-fuchsia-500/20 via-fuchsia-500/5 to-transparent',
  teal: 'from-teal-500/20 via-teal-500/5 to-transparent',
  zinc: 'from-zinc-400/15 via-zinc-500/5 to-transparent',
};

const ICON_STYLES = {
  emerald: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20',
  sky: 'bg-sky-500/10 text-sky-300 ring-sky-400/20',
  violet: 'bg-violet-500/10 text-violet-300 ring-violet-400/20',
  amber: 'bg-amber-500/10 text-amber-300 ring-amber-400/20',
  rose: 'bg-rose-500/10 text-rose-300 ring-rose-400/20',
  fuchsia: 'bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-400/20',
  teal: 'bg-teal-500/10 text-teal-300 ring-teal-400/20',
  zinc: 'bg-zinc-500/10 text-zinc-300 ring-zinc-400/20',
};

const VALUE_STYLES = {
  emerald: 'text-emerald-300',
  sky: 'text-sky-300',
  violet: 'text-violet-300',
  amber: 'text-amber-300',
  rose: 'text-rose-300',
  fuchsia: 'text-fuchsia-300',
  teal: 'text-teal-300',
  zinc: 'text-zinc-200',
};

function DashboardWidget({
  title,
  value,
  hint,
  badge,
  icon,
  accent = 'emerald',
  className = '',
}) {
  const glowClass = GLOW_STYLES[accent] ?? GLOW_STYLES.emerald;
  const iconClass = ICON_STYLES[accent] ?? ICON_STYLES.emerald;
  const valueClass = VALUE_STYLES[accent] ?? VALUE_STYLES.emerald;

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-2xl border border-white/[0.08]',
        'bg-gradient-to-br from-white/[0.07] via-zinc-900/25 to-zinc-950/40',
        'p-4 shadow-xl shadow-black/35 backdrop-blur-xl',
        'ring-1 ring-inset ring-white/[0.06]',
        'transition duration-300 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/40',
        'sm:p-5',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br blur-2xl',
          glowClass,
        ].join(' ')}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.06),_transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {title}
          </h3>
          <p
            className={[
              'mt-2 truncate text-xl font-bold tracking-tight sm:text-2xl',
              valueClass,
            ].join(' ')}
          >
            {value}
          </p>
          {badge ? <div className="mt-2">{badge}</div> : null}
          {hint ? (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
              {hint}
            </p>
          ) : null}
        </div>

        {icon ? (
          <div
            className={[
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset backdrop-blur-md',
              iconClass,
            ].join(' ')}
            aria-hidden="true"
          >
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default DashboardWidget;
