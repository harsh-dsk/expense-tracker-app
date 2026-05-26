import CategoryTag from './CategoryTag';
import { formatCurrency, formatDate } from '../utils/format';

function TrashIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    </svg>
  );
}

function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="group flex flex-col gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition hover:border-zinc-700/80 hover:bg-zinc-900/70 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-zinc-100">{expense.title}</p>
          <CategoryTag categoryId={expense.category} />
        </div>
        <p className="mt-1 text-xs text-zinc-500">{formatDate(expense.date)}</p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-lg font-semibold text-rose-400 tabular-nums">
          −{formatCurrency(expense.amount)}
        </p>
        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50"
          aria-label={`Delete ${expense.title}`}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
