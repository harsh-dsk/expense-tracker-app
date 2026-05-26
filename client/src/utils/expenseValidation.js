import { CATEGORIES, CATEGORY_BY_ID } from '../constants/categories';
import { PAYMENT_METHOD_BY_ID } from '../constants/paymentMethods';

export function validateExpenseDraft(draft) {
  const title = String(draft?.title ?? '').trim();
  if (!title) {
    return { ok: false, error: 'Please enter a description.' };
  }

  const amountNumber =
    typeof draft?.amount === 'number' ? draft.amount : Number(draft?.amount);
  if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
    return { ok: false, error: 'Please enter a valid amount greater than zero.' };
  }

  const categoryId = String(draft?.category ?? '').trim();
  if (!categoryId || !CATEGORY_BY_ID[categoryId]) {
    return { ok: false, error: 'Please choose a category.' };
  }

  const paymentMethodId = String(draft?.paymentMethod ?? '').trim();
  if (!paymentMethodId || !PAYMENT_METHOD_BY_ID[paymentMethodId]) {
    return { ok: false, error: 'Please choose a payment method.' };
  }

  const date = String(draft?.date ?? '').trim();
  const dt = new Date(date);
  if (!date || Number.isNaN(dt.getTime())) {
    return { ok: false, error: 'Please select a valid date.' };
  }

  // Keep only supported categories (helps with storage/copy/paste edge cases).
  const allowedCategoryIds = new Set(CATEGORIES.map((c) => c.id));
  if (!allowedCategoryIds.has(categoryId)) {
    return { ok: false, error: 'Please choose a valid category.' };
  }

  return {
    ok: true,
    value: {
      title,
      amount: amountNumber,
      category: categoryId,
      paymentMethod: paymentMethodId,
      date,
    },
  };
}

