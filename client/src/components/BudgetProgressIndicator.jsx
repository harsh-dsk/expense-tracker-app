import { MONTHLY_BUDGET } from '../constants/budget';
import { formatCurrency } from '../utils/format';

const SIZE = 160;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getProgressState(spent, budget) {
  const percent = budget > 0 ? (spent / budget) * 100 : 0;
  const isOverBudget = percent > 100;
  const ringPercent = Math.min(percent, 100);
  const offset = CIRCUMFERENCE - (ringPercent / 100) * CIRCUMFERENCE;

  return {
    percent,
    displayPercent: Math.round(percent),
    ringPercent,
    offset,
    isOverBudget,
    remaining: budget - spent,
  };
}

function BudgetProgressIndicator({
  spent,
  budget = MONTHLY_BUDGET,
  className = '',
}) {
  const { percent, displayPercent, offset, isOverBudget, remaining } = getProgressState(
    spent,
    budget,
  );

  const progressStroke = isOverBudget
    ? 'url(#budgetProgressOver)'
    : 'url(#budgetProgressSafe)';

  const percentColor = isOverBudget
    ? 'text-rose-300'
    : percent >= 85
      ? 'text-amber-300'
      : 'text-emerald-300';

  return (
    <article
      className={[
        'relative flex flex-col items-center overflow-hidden rounded-2xl',
        'border border-white/[0.08] bg-gradient-to-br from-white/[0.07] via-zinc-900/25 to-zinc-950/40',
        'p-5 shadow-xl shadow-black/35 backdrop-blur-xl ring-1 ring-inset ring-white/[0.06]',
        'sm:p-6',
        className,
      ].join(' ')}
      aria-labelledby="budget-progress-heading"
    >
      <div
        className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-sky-500/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative w-full text-center">
        <h2
          id="budget-progress-heading"
          className="text-sm font-medium text-zinc-400"
        >
          Monthly budget
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500">
          {new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(
            new Date(),
          )}
        </p>
      </div>

      <div
        className="relative mt-4"
        role="img"
        aria-label={`${displayPercent}% of monthly budget spent`}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="budgetProgressSafe" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="budgetProgressOver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(63, 63, 70, 0.55)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={progressStroke}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tabular-nums tracking-tight ${percentColor}`}>
            {displayPercent}%
          </span>
          <span className="mt-0.5 text-xs font-medium text-zinc-500">spent</span>
        </div>
      </div>

      <dl className="relative mt-4 grid w-full grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/30 px-2 py-2.5">
          <dt className="text-zinc-500">Spent</dt>
          <dd className="mt-0.5 font-semibold text-zinc-200">{formatCurrency(spent)}</dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/30 px-2 py-2.5">
          <dt className="text-zinc-500">{isOverBudget ? 'Over by' : 'Remaining'}</dt>
          <dd
            className={[
              'mt-0.5 font-semibold',
              isOverBudget ? 'text-rose-400' : 'text-emerald-400',
            ].join(' ')}
          >
            {formatCurrency(Math.abs(remaining))}
          </dd>
        </div>
      </dl>

      <p className="relative mt-3 text-center text-xs text-zinc-500">
        of {formatCurrency(budget)} monthly limit
        {isOverBudget ? (
          <span className="mt-1 block font-medium text-rose-400/90">
            Budget exceeded
          </span>
        ) : null}
      </p>
    </article>
  );
}

export default BudgetProgressIndicator;
