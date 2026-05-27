import { CATEGORIES, CATEGORY_BY_ID } from '../constants/categories';
import { PAYMENT_METHOD_BY_ID } from '../constants/paymentMethods';
import CategoryExpenseCards from '../components/CategoryExpenseCards';
import ExpenseAnalyticsChart from '../components/ExpenseAnalyticsChart';
import { formatCurrency } from '../utils/format';

function AnalyticsPage({ expenses }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const hasExpenses = expenses.length > 0;

  const highestExpense = hasExpenses
    ? expenses.reduce(
        (max, expense) => (expense.amount > max.amount ? expense : max),
        expenses[0],
      )
    : null;

  const categoryUsageTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + 1;
    return acc;
  }, {});

  const mostUsedCategoryId =
    Object.keys(categoryUsageTotals).length > 0
      ? Object.entries(categoryUsageTotals).reduce((top, entry) =>
          entry[1] > top[1] ? entry : top,
        )[0]
      : null;

  const mostUsedCategory = mostUsedCategoryId
    ? CATEGORY_BY_ID[mostUsedCategoryId] ?? null
    : null;

  const paymentUsageTotals = expenses.reduce((acc, expense) => {
    if (!expense.paymentMethod) return acc;
    acc[expense.paymentMethod] = (acc[expense.paymentMethod] ?? 0) + 1;
    return acc;
  }, {});

  const mostUsedPaymentMethodId =
    Object.keys(paymentUsageTotals).length > 0
      ? Object.entries(paymentUsageTotals).reduce((top, entry) =>
          entry[1] > top[1] ? entry : top,
        )[0]
      : null;

  const mostUsedPaymentMethod = mostUsedPaymentMethodId
    ? PAYMENT_METHOD_BY_ID[mostUsedPaymentMethodId] ?? null
    : null;

  const averageTransactionAmount = hasExpenses
    ? Math.round(totalExpenses / expenses.length)
    : 0;

  const byCategory = CATEGORIES.map((category) => {
    const amount = expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { ...category, amount };
  }).filter((entry) => entry.amount > 0);

  const maxCategoryAmount = Math.max(...byCategory.map((entry) => entry.amount), 1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="analytics" className="space-y-8 lg:space-y-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Deep dive into your spending patterns, categories, and payment habits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-6">
            <h2 className="text-sm font-medium text-zinc-400">Highest expense</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-rose-400">
              {highestExpense ? formatCurrency(highestExpense.amount) : '—'}
            </p>
            <p className="mt-2 line-clamp-1 text-xs text-zinc-500">
              {highestExpense ? highestExpense.title : 'Add expenses to see the peak spend'}
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-6">
            <h2 className="text-sm font-medium text-zinc-400">Most used category</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-400">
              {mostUsedCategory ? mostUsedCategory.label : '—'}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {mostUsedCategory
                ? 'Based on transaction frequency'
                : 'Add expenses to see your top category'}
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-6">
            <h2 className="text-sm font-medium text-zinc-400">Most used payment</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-sky-400">
              {mostUsedPaymentMethod ? mostUsedPaymentMethod.shortLabel : '—'}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {mostUsedPaymentMethod
                ? mostUsedPaymentMethod.label
                : 'Based on how you pay most often'}
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-6">
            <h2 className="text-sm font-medium text-zinc-400">Avg transaction</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
              {formatCurrency(averageTransactionAmount)}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {hasExpenses
                ? `${expenses.length} transaction${expenses.length === 1 ? '' : 's'} tracked`
                : 'No transactions recorded yet'}
            </p>
          </article>
        </div>

        <ExpenseAnalyticsChart
          expenses={expenses}
          className="w-full"
          chartHeightClass="h-72 sm:h-80 lg:h-96"
        />

        <CategoryExpenseCards expenses={expenses} className="pt-1" />

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 sm:p-6 lg:p-7">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-zinc-800/80 pb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Category breakdown</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {expenses.length} transaction{expenses.length === 1 ? '' : 's'} tracked
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Total: <span className="text-emerald-400">{formatCurrency(totalExpenses)}</span>
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
            <ul className="space-y-5" aria-label="Spending by category">
              {byCategory.map((entry) => {
                const label = CATEGORY_BY_ID[entry.id]?.label ?? entry.label;
                const percent = totalExpenses
                  ? Math.round((entry.amount / totalExpenses) * 100)
                  : 0;
                const barWidth = `${Math.round((entry.amount / maxCategoryAmount) * 100)}%`;

                return (
                  <li key={entry.id}>
                    <div className="mb-2 flex items-center justify-between gap-2 text-sm">
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
