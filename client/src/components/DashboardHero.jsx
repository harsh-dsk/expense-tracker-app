import { Link } from 'react-router-dom';

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

function getMotivationalSubtitle(spent, budget) {
  if (!budget || budget <= 0) {
    return 'Track every expense and turn awareness into lasting financial freedom.';
  }

  const percent = (spent / budget) * 100;

  if (percent > 100) {
    return "You've gone over this month's budget — a quick review today can get you back on track.";
  }
  if (percent >= 85) {
    return "You're nearing your monthly limit — thoughtful choices now keep tomorrow stress-free.";
  }
  if (percent >= 50) {
    return "You're halfway through your budget — stay consistent and finish the month strong.";
  }
  return 'Small daily habits compound into real savings. Keep showing up for your goals.';
}

function PlusIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M10 19V9M16 19v-4M22 19H2" />
    </svg>
  );
}

function ListIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

const QUICK_ACTIONS = [
  {
    label: 'Add expense',
    to: '/expenses#add-expense',
    icon: PlusIcon,
    primary: true,
  },
  {
    label: 'View analytics',
    to: '/analytics',
    icon: ChartIcon,
  },
  {
    label: 'Transactions',
    to: '/expenses',
    icon: ListIcon,
  },
];

function DashboardHero({
  userName = 'there',
  monthlySpent = 0,
  monthlyBudget,
  className = '',
}) {
  const greeting = getTimeGreeting();
  const subtitle = getMotivationalSubtitle(monthlySpent, monthlyBudget);

  return (
    <header
      className={[
        'relative overflow-hidden rounded-2xl border border-white/[0.08]',
        'bg-gradient-to-br from-emerald-500/10 via-zinc-900/40 to-zinc-950/60',
        'p-6 shadow-xl shadow-black/30 backdrop-blur-xl ring-1 ring-inset ring-white/[0.06]',
        'sm:p-8',
        className,
      ].join(' ')}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(52,211,153,0.12),_transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-400/90">
            {new Intl.DateTimeFormat('en-IN', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            }).format(new Date())}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              {userName}
            </span>
            <span className="text-white">!</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <nav
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch xl:flex-row"
          aria-label="Quick actions"
        >
          {QUICK_ACTIONS.map(({ label, to, icon: Icon, primary }) => (
            <Link
              key={to + label}
              to={to}
              className={[
                'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                primary
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400'
                  : 'border border-white/10 bg-white/[0.04] text-zinc-200 backdrop-blur-md hover:border-white/20 hover:bg-white/[0.08]',
              ].join(' ')}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default DashboardHero;
