import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { PAYMENT_METHODS } from '../constants/paymentMethods';
import { validateExpenseDraft } from '../utils/expenseValidation';

const inputClass =
  'w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/25';

function ExpenseForm({
  initialValues,
  onSubmit,
  submitLabel,
  resetOnSuccess = false,
  getResetValues,
  heading,
  submitDisabled = false,
  onCancel,
  formId,
}) {
  const headingId = formId ? `${formId}-heading` : 'expense-form-heading';

  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const result = validateExpenseDraft(form);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    try {
      setIsSaving(true);

      await onSubmit?.(result.value);

      if (resetOnSuccess) {
        setForm(getResetValues ? getResetValues() : initialValues);
      }
    } catch (e) {
      const message = e?.message ?? 'Failed to save expense.';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 sm:p-6"
      aria-labelledby={heading ? headingId : undefined}
    >
      <div className="mb-4">
        <h2
          id={headingId}
          className="text-lg font-semibold tracking-tight text-white"
        >
          {heading ?? 'Add expense'}
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Track spending with a title, amount, category, and payment method.
        </p>
      </div>

      <div className="space-y-4">

        {/* Description */}
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-xs font-medium text-zinc-400"
          >
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

        {/* Amount + Date */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
              Amount (₹)
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className={`${inputClass} appearance-none`}
              inputMode="numeric"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
              Date
            </label>

            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
              />

              <Calendar
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>
          </div>

        </div>

        {/* Category + Payment Method */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
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

          <div>
            <label
              htmlFor="paymentMethod"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
              Payment method
            </label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className={inputClass}
            >
              {PAYMENT_METHODS.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Error */}
        {error ? (
          <p className="text-sm text-rose-400" role="alert">
            {error}
          </p>
        ) : null}

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving || submitDisabled}
              className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5 text-sm font-semibold text-zinc-200 shadow-sm transition hover:bg-zinc-900/60 disabled:opacity-60"
            >
              Cancel
            </button>
          ) : null}

          <button
            type="submit"
            disabled={isSaving || submitDisabled}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-70"
          >
            {isSaving ? 'Saving…' : submitLabel}
          </button>

        </div>

      </div>
    </form>
  );
}

export default ExpenseForm;