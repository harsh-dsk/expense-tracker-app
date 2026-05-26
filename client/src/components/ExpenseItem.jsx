import CategoryTag from './CategoryTag';
import { formatCurrency, formatDate } from '../utils/format';
import { PAYMENT_METHOD_BY_ID } from '../constants/paymentMethods';

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

function ExpenseItem({ expense, onDelete, onEdit }) {
  const paymentMethod = PAYMENT_METHOD_BY_ID[expense.paymentMethod];

  return (
    <li className="group flex flex-col gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition hover:border-zinc-700/80 hover:bg-zinc-900/70 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-zinc-100">{expense.title}</p>
          <CategoryTag categoryId={expense.category} />
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>{formatDate(expense.date)}</span>
          {paymentMethod ? (
            <span className="inline-flex items-center rounded-full bg-zinc-800/50 px-2 py-0.5 text-[11px] ring-1 ring-zinc-700/80">
              {paymentMethod.shortLabel}
            </span>
          ) : null}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-lg font-semibold text-rose-400 tabular-nums">
          −{formatCurrency(expense.amount)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(expense)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-emerald-500/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            aria-label={`Edit ${expense.title}`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onDelete(expense.id)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50"
            aria-label={`Delete ${expense.title}`}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ExpenseItem;
