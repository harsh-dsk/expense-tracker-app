import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseModal from '../components/EditExpenseModal';
import { CATEGORIES } from '../constants/categories';
import { formatCurrency } from '../utils/format';
import { useMemo, useState } from 'react';

function ExpensesPage({ expenses, onAddExpense, onDeleteExpense, onUpdateExpense }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const editingExpense = useMemo(() => {
    if (!editingExpenseId) return null;
    return expenses.find((e) => e.id === editingExpenseId) ?? null;
  }, [editingExpenseId, expenses]);

  const monthOptions = useMemo(() => {
    const monthKeys = Array.from(
      new Set(
        expenses
          .map((e) => (typeof e.date === 'string' ? e.date.slice(0, 7) : ''))
          .filter(Boolean),
      ),
    ).sort((a, b) => b.localeCompare(a));

    return monthKeys.map((key) => {
      const [yearStr, monthStr] = key.split('-');
      const year = Number(yearStr);
      const month = Number(monthStr);
      const label = new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        year: 'numeric',
      }).format(new Date(year, month - 1, 1));
      return { key, label };
    });
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = expenses.filter((expense) => {
      if (q && !expense.title.toLowerCase().includes(q)) return false;
      if (categoryFilter !== 'all' && expense.category !== categoryFilter) return false;
      if (monthFilter !== 'all') {
        const monthKey = typeof expense.date === 'string' ? expense.date.slice(0, 7) : '';
        if (monthKey !== monthFilter) return false;
      }
      return true;
    });

    const getDateMs = (dateStr) => {
      const dt = new Date(dateStr);
      return Number.isNaN(dt.getTime()) ? 0 : dt.getTime();
    };

    const sorted = [...filtered].sort((a, b) => {
      const dateDiff = getDateMs(a.date) - getDateMs(b.date);
      const amountDiff = a.amount - b.amount;

      switch (sortOption) {
        case 'oldest':
          return dateDiff || a.id.localeCompare(b.id);
        case 'highest':
          return -amountDiff || dateDiff || b.id.localeCompare(a.id);
        case 'lowest':
          return amountDiff || dateDiff || a.id.localeCompare(b.id);
        case 'newest':
        default:
          return -dateDiff || b.id.localeCompare(a.id);
      }
    });

    return sorted;
  }, [expenses, searchQuery, categoryFilter, monthFilter, sortOption]);

  const totals = useMemo(() => {
    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { total };
  }, [filteredExpenses]);

  const hasActiveFilters =
    searchQuery.trim() ||
    categoryFilter !== 'all' ||
    monthFilter !== 'all' ||
    sortOption !== 'newest';

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setMonthFilter('all');
    setSortOption('newest');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          View transactions and add new spending entries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <section id="expenses" className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent expenses</h2>
              <p className="text-sm text-zinc-500">Track, search, and edit transactions.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">
                {filteredExpenses.length} item{filteredExpenses.length === 1 ? '' : 's'}
              </p>
              <p className="text-sm font-semibold text-emerald-300/90">
                Total: {formatCurrency(totals.total)}
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4 shadow-lg shadow-black/10">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="expense-search" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Search by title
                </label>
                <input
                  id="expense-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. groceries"
                  className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>

              <div>
                <label htmlFor="expense-category" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Category
                </label>
                <select
                  id="expense-category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                >
                  <option value="all">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="expense-month" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Month
                </label>
                <select
                  id="expense-month"
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                >
                  <option value="all">All months</option>
                  {monthOptions.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="expense-sort" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Sort
                </label>
                <select
                  id="expense-sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest amount</option>
                  <option value="lowest">Lowest amount</option>
                </select>
              </div>
            </div>

            {hasActiveFilters ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-zinc-300 transition hover:text-white"
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>

          {expenses.length > 0 && filteredExpenses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
              <p className="text-sm font-medium text-zinc-300">No matching expenses</p>
              <p className="mt-1 text-xs text-zinc-500">
                Try adjusting your search, category, month, or sort settings.
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Reset filters
                </button>
              ) : null}
            </div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={onDeleteExpense}
              onEdit={(expense) => setEditingExpenseId(expense.id)}
            />
          )}
        </section>

        <aside className="lg:col-span-1">
          <AddExpenseForm onAdd={onAddExpense} />
        </aside>
      </div>

      <EditExpenseModal
        open={Boolean(editingExpenseId)}
        expense={editingExpense}
        onClose={() => setEditingExpenseId(null)}
        onSave={(updatedFields) => {
          if (!editingExpenseId) return;
          onUpdateExpense?.(editingExpenseId, updatedFields);
          setEditingExpenseId(null);
        }}
      />
    </main>
  );
}

export default ExpensesPage;
