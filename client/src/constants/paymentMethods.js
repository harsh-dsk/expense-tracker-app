export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', shortLabel: 'Card', tone: 'violet' },
  { id: 'upi', label: 'UPI', shortLabel: 'UPI', tone: 'sky' },
  { id: 'cash', label: 'Cash', shortLabel: 'Cash', tone: 'emerald' },
  { id: 'bank', label: 'Bank Transfer', shortLabel: 'Bank', tone: 'amber' },
];

export const PAYMENT_METHOD_BY_ID = Object.fromEntries(
  PAYMENT_METHODS.map((method) => [method.id, method]),
);

export const DEFAULT_PAYMENT_METHOD = 'card';
