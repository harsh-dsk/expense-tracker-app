import { CATEGORY_BY_ID } from '../constants/categories';
import { PAYMENT_METHOD_BY_ID } from '../constants/paymentMethods';

function sortByNewest(expenses) {
  return [...expenses].sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return b.id.localeCompare(a.id);
  });
}

export function getTopExpenseCategory(expenses) {
  if (!expenses.length) {
    return null;
  }

  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  }, {});

  const [categoryId, amount] = Object.entries(totals).reduce((top, entry) =>
    entry[1] > top[1] ? entry : top,
  );

  const category = CATEGORY_BY_ID[categoryId] ?? CATEGORY_BY_ID.education;

  return { ...category, amount };
}

export function getAverageMonthlySpending(expenses) {
  if (!expenses.length) {
    return 0;
  }

  const monthlyTotals = expenses.reduce((acc, expense) => {
    const monthKey = expense.date.slice(0, 7);
    acc[monthKey] = (acc[monthKey] ?? 0) + expense.amount;
    return acc;
  }, {});

  const totals = Object.values(monthlyTotals);
  const sum = totals.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / totals.length);
}

export const FEATURED_CATEGORY_IDS = [
  'food',
  'transport',
  'shopping',
  'bills',
  'entertainment',
  'health',
  'education',
];

export function getFeaturedCategorySpending(
  expenses,
  categoryIds = FEATURED_CATEGORY_IDS,
) {
  const totals = expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { amount: 0, count: 0 };
      }
      acc[expense.category].amount += expense.amount;
      acc[expense.category].count += 1;
      return acc;
    },
    {},
  );

  return categoryIds.map((id) => {
    const category = CATEGORY_BY_ID[id];
    const stats = totals[id] ?? { amount: 0, count: 0 };
    return {
      ...category,
      amount: stats.amount,
      count: stats.count,
    };
  });
}

export function getRecentPaymentMethod(expenses) {
  const latest = sortByNewest(expenses)[0];
  if (!latest?.paymentMethod) {
    return null;
  }

  return PAYMENT_METHOD_BY_ID[latest.paymentMethod] ?? null;
}
