import { Link } from 'react-router-dom';
import CategoryIcon from './CategoryIcon';
import CategoryTag from './CategoryTag';
import { formatCurrency, formatRelativeTime, formatTimestamp } from '../utils/format';

const DEFAULT_LIMIT = 5;

function sortByNewest(expenses) {
  return [...expenses].sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return b.id.localeCompare(a.id);
  });
}

function RecentActivityItem({ expense }) {
  const relativeLabel = formatRelativeTime(expense.date);
  const absoluteLabel = formatTimestamp(expense.date);

  return (
    <li className="flex gap-3 rounded-xl p-2 transition hover:bg-zinc-800/40">
      <CategoryIcon categoryId={expense.category} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-zinc-100">{expense.title}</p>
          <CategoryTag categoryId={expense.category} />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          <time dateTime={expense.date} title={absoluteLabel}>
            {relativeLabel}
          </time>
          <span className="mx-1.5 text-zinc-700" aria-hidden="true">
            ·
          </span>
          <span>{absoluteLabel}</span>
        </p>
      </div>

      <p className="shrink-0 text-sm font-semibold tabular-nums text-rose-400">
        −{formatCurrency(expense.amount)}
      </p>
    </li>
  );
}

function RecentActivity({ expenses, limit = DEFAULT_LIMIT, className = '' }) {
  const recent = sortByNewest(expenses).slice(0, limit);
  const hasMore = expenses.length > limit;

  return (
    <article
      className={[
        'flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby="recent-activity-heading"
    >
      <div className="mb-4 flex items-end justify-between gap-2 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 id="recent-activity-heading" className="text-lg font-semibold text-white">
            Recent activity
          </h2>
          <p className="text-sm text-zinc-500">Latest transactions at a glance</p>
        </div>
        {hasMore ? (
          <Link
            to="/expenses"
            className="shrink-0 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            View all
          </Link>
        ) : null}
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 px-4 py-10 text-center">
          <p className="text-sm font-medium text-zinc-300">No activity yet</p>
          <p className="mt-1 text-xs text-zinc-500">
            Add an expense to see it listed here.
          </p>
          <Link
            to="/expenses"
            className="mt-4 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            Add expense
          </Link>
        </div>
      ) : (
        <ul className="space-y-1" aria-label="Recent transactions">
          {recent.map((expense) => (
            <RecentActivityItem key={expense.id} expense={expense} />
          ))}
        </ul>
      )}
    </article>
  );
}

export default RecentActivity;
