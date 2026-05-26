export const CATEGORIES = [
  { id: 'food', label: 'Food', tone: 'amber' },
  { id: 'transport', label: 'Transport', tone: 'sky' },
  { id: 'shopping', label: 'Shopping', tone: 'violet' },
  { id: 'bills', label: 'Bills', tone: 'rose' },
  { id: 'entertainment', label: 'Entertainment', tone: 'fuchsia' },
  { id: 'health', label: 'Health', tone: 'teal' },
  { id: 'other', label: 'Other', tone: 'zinc' },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
);
