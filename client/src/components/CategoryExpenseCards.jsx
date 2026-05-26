import CategoryIcon from './CategoryIcon';
import { formatCurrency } from '../utils/format';
import { getFeaturedCategorySpending } from '../utils/dashboardStats';

const CARD_THEMES = {
  amber: {
    card: 'border-amber-500/25 bg-gradient-to-br from-amber-500/25 via-amber-600/10 to-zinc-950/50',
    glow: 'bg-amber-400/25',
    amount: 'text-amber-100',
    label: 'text-amber-200/90',
    meta: 'text-amber-300/70',
  },
  sky: {
    card: 'border-sky-500/25 bg-gradient-to-br from-sky-500/25 via-sky-600/10 to-zinc-950/50',
    glow: 'bg-sky-400/25',
    amount: 'text-sky-100',
    label: 'text-sky-200/90',
    meta: 'text-sky-300/70',
  },
  fuchsia: {
    card: 'border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/25 via-fuchsia-600/10 to-zinc-950/50',
    glow: 'bg-fuchsia-400/25',
    amount: 'text-fuchsia-100',
    label: 'text-fuchsia-200/90',
    meta: 'text-fuchsia-300/70',
  },
  violet: {
    card: 'border-violet-500/25 bg-gradient-to-br from-violet-500/25 via-violet-600/10 to-zinc-950/50',
    glow: 'bg-violet-400/25',
    amount: 'text-violet-100',
    label: 'text-violet-200/90',
    meta: 'text-violet-300/70',
  },
  rose: {
    card: 'border-rose-500/25 bg-gradient-to-br from-rose-500/25 via-rose-600/10 to-zinc-950/50',
    glow: 'bg-rose-400/25',
    amount: 'text-rose-100',
    label: 'text-rose-200/90',
    meta: 'text-rose-300/70',
  },
  teal: {
    card: 'border-teal-500/25 bg-gradient-to-br from-teal-500/25 via-teal-600/10 to-zinc-950/50',
    glow: 'bg-teal-400/25',
    amount: 'text-teal-100',
    label: 'text-teal-200/90',
    meta: 'text-teal-300/70',
  },
  zinc: {
    card: 'border-zinc-500/25 bg-gradient-to-br from-zinc-500/25 via-zinc-600/10 to-zinc-950/50',
    glow: 'bg-zinc-400/25',
    amount: 'text-zinc-100',
    label: 'text-zinc-200/90',
    meta: 'text-zinc-300/70',
  },
};

function CategoryExpenseCard({ category, amount, count }) {
  const theme = CARD_THEMES[category.tone] ?? CARD_THEMES.amber;

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-2xl border p-4 shadow-lg shadow-black/25',
        'backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/35',
        'sm:p-5',
        theme.card,
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl transition',
          'group-hover:scale-110',
          theme.glow,
        ].join(' ')}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <CategoryIcon
          categoryId={category.id}
          className="h-11 w-11 rounded-xl bg-white/10 ring-white/20"
        />
        <span className={['text-xs font-medium', theme.meta].join(' ')}>
          {count === 1 ? '1 txn' : `${count} txns`}
        </span>
      </div>

      <div className="relative mt-4">
        <h3 className={['text-sm font-semibold', theme.label].join(' ')}>
          {category.label}
        </h3>
        <p
          className={[
            'mt-1 text-2xl font-bold tracking-tight tabular-nums sm:text-[1.65rem]',
            theme.amount,
          ].join(' ')}
        >
          {formatCurrency(amount)}
        </p>
        <p className={['mt-1 text-xs', theme.meta].join(' ')}>
          {amount > 0 ? 'Total spent' : 'No expenses yet'}
        </p>
      </div>
    </article>
  );
}

function CategoryExpenseCards({ expenses, className = '' }) {
  const categories = getFeaturedCategorySpending(expenses);
  const totalFeatured = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <section
      className={className}
      aria-labelledby="category-cards-heading"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="category-cards-heading"
            className="text-lg font-semibold text-white"
          >
            Spending by category
          </h2>
          <p className="text-sm text-zinc-500">
            Spending across your categories
          </p>
        </div>
        <p className="text-sm text-zinc-400">
          Total{' '}
          <span className="font-semibold text-white">
            {formatCurrency(totalFeatured)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((entry) => (
          <CategoryExpenseCard
            key={entry.id}
            category={entry}
            amount={entry.amount}
            count={entry.count}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryExpenseCards;
