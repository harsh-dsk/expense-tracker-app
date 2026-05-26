import { CATEGORY_BY_ID } from '../constants/categories';
import { PAYMENT_METHOD_BY_ID } from '../constants/paymentMethods';

export const EXPENSES_STORAGE_KEY = 'expense-tracker.expenses.v1';

function isValidDateString(dateString) {
  if (typeof dateString !== 'string' || !dateString.trim()) return false;
  const dt = new Date(dateString);
  return !Number.isNaN(dt.getTime());
}

export function normalizeExpenseForStorage(expense) {
  if (!expense) return null;

  const id = String(expense.id ?? '').trim();
  const title = String(expense.title ?? '').trim();
  const amount = typeof expense.amount === 'number' ? expense.amount : Number(expense.amount);
  const category = String(expense.category ?? '').trim();
  const paymentMethod = String(expense.paymentMethod ?? '').trim();
  const date = String(expense.date ?? '').trim();

  if (!id) return null;
  if (!title) return null;
  if (!Number.isFinite(amount) || amount <= 0) return null;
  if (!CATEGORY_BY_ID[category]) return null;
  if (!PAYMENT_METHOD_BY_ID[paymentMethod]) return null;
  if (!isValidDateString(date)) return null;

  return {
    id,
    title,
    amount,
    category,
    paymentMethod,
    date,
  };
}

export function loadExpensesFromStorage() {
  try {
    const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const normalized = parsed
      .map((e) => normalizeExpenseForStorage(e))
      .filter(Boolean);

    return normalized;
  } catch {
    return [];
  }
}

export function saveExpensesToStorage(expenses) {
  try {
    localStorage.setItem(
      EXPENSES_STORAGE_KEY,
      JSON.stringify((expenses ?? []).map((e) => normalizeExpenseForStorage(e)).filter(Boolean)),
    );
  } catch {
    // Ignore persistence errors (quota/full browser privacy mode, etc).
  }
}

