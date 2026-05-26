const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

function parseExpenseDate(dateString) {
  return new Date(dateString.includes('T') ? dateString : `${dateString}T12:00:00`);
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseExpenseDate(dateString));
}

export function formatTimestamp(dateString) {
  const hasTime = dateString.includes('T');
  const date = parseExpenseDate(dateString);

  if (!hasTime) {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatRelativeTime(dateString) {
  const date = parseExpenseDate(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 45) {
    return 'just now';
  }

  const units = [
    { unit: 'year', seconds: 60 * 60 * 24 * 365 },
    { unit: 'month', seconds: 60 * 60 * 24 * 30 },
    { unit: 'week', seconds: 60 * 60 * 24 * 7 },
    { unit: 'day', seconds: 60 * 60 * 24 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
  ];

  for (const { unit, seconds } of units) {
    const value = Math.round(diffSec / seconds);
    if (Math.abs(value) >= 1) {
      return relativeTimeFormatter.format(value, unit);
    }
  }

  return relativeTimeFormatter.format(diffSec, 'second');
}
