import { CATEGORIES, CATEGORY_BY_ID } from '../constants/categories';
import { formatCurrency } from '../utils/format';

function AnalyticsPage({ expenses }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const byCategory = CATEGORIES.map((category) => {
    const amount = expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { ...category, amount };
  }).filter((entry) => entry.amount > 0);

  const maxCategoryAmount = Math.max(...byCategory.map((entry) => entry.amount), 1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="analytics">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Spending breakdown by category across all transactions.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 sm:p-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-zinc-800/80 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Category breakdown</h2>
              <p className="text-sm text-zinc-500">
                {expenses.length} transaction{expenses.length === 1 ? '' : 's'} tracked
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Total:{' '}
              <span className="text-emerald-400">{formatCurrency(totalExpenses)}</span>
            </p>
          </div>

          {byCategory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-zinc-300">No spending data yet</p>
              <p className="mt-1 text-xs text-zinc-500">
                Add expenses to see category analytics here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4" aria-label="Spending by category">
              {byCategory.map((entry) => {
                const label = CATEGORY_BY_ID[entry.id]?.label ?? entry.label;
                const percent = totalExpenses
                  ? Math.round((entry.amount / totalExpenses) * 100)
                  : 0;
                const barWidth = `${Math.round((entry.amount / maxCategoryAmount) * 100)}%`;

                return (
                  <li key={entry.id}>
                    <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                      <span className="font-medium text-zinc-200">{label}</span>
                      <span className="text-zinc-400">
                        {formatCurrency(entry.amount)}{' '}
                        <span className="text-zinc-600">({percent}%)</span>
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                        style={{ width: barWidth }}
                        role="presentation"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default AnalyticsPage;
