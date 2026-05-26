import { useState } from 'react';
import { CATEGORIES } from '../constants/categories';

const initialForm = {
  title: '',
  amount: '',
  category: 'food',
  date: new Date().toISOString().slice(0, 10),
};

function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const amount = Number(form.amount);

    if (!title) {
      setError('Please enter a description.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    onAdd({
      title,
      amount,
      category: form.category,
      date: form.date,
    });

    setForm({
      ...initialForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setError('');
  };

  const inputClass =
    'w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25';

  return (
    <form
      id="add-expense"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 sm:p-6"
      aria-labelledby="add-expense-heading"
    >
      <h2
        id="add-expense-heading"
        className="text-lg font-semibold tracking-tight text-white"
      >
        Add expense
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Track spending with a title, amount, and category.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Description
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Groceries"
            className={inputClass}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="amount" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Amount (₹)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="date" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORIES.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p className="text-sm text-rose-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        >
          Save expense
        </button>
      </div>
    </form>
  );
}

export default AddExpenseForm;
