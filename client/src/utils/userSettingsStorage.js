export const USER_SETTINGS_STORAGE_KEY = 'expense-tracker.user-settings.v1';
export const USER_SESSION_STORAGE_KEY = 'expense-tracker.user-session.v1';

export const DEFAULT_USER_SETTINGS = {
  name: '',
  email: '',
  monthlyBudget: 50000,
  currency: 'INR',
  notificationsEnabled: true,
  joinedAt: null,
};

const ALLOWED_CURRENCIES = new Set(['INR', 'USD', 'EUR', 'GBP']);

function sanitizeName(name) {
  return String(name ?? '').trim().slice(0, 60);
}

function sanitizeEmail(email) {
  return String(email ?? '').trim().slice(0, 120);
}

function sanitizeBudget(budget) {
  const amount = Number(budget);
  if (!Number.isFinite(amount) || amount < 0) return DEFAULT_USER_SETTINGS.monthlyBudget;
  return Math.round(amount);
}

function sanitizeCurrency(currency) {
  const value = String(currency ?? '').trim().toUpperCase();
  return ALLOWED_CURRENCIES.has(value) ? value : DEFAULT_USER_SETTINGS.currency;
}

function sanitizeJoinedAt(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function normalizeUserSettings(raw) {
  const next = raw ?? {};
  return {
    name: sanitizeName(next.name),
    email: sanitizeEmail(next.email),
    monthlyBudget: sanitizeBudget(next.monthlyBudget),
    currency: sanitizeCurrency(next.currency),
    notificationsEnabled: Boolean(
      next.notificationsEnabled ?? DEFAULT_USER_SETTINGS.notificationsEnabled,
    ),
    joinedAt: sanitizeJoinedAt(next.joinedAt),
  };
}

export function loadUserSettingsFromStorage() {
  try {
    const raw = localStorage.getItem(USER_SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_USER_SETTINGS };
    const parsed = JSON.parse(raw);
    return normalizeUserSettings(parsed);
  } catch {
    return { ...DEFAULT_USER_SETTINGS };
  }
}

export function saveUserSettingsToStorage(settings) {
  try {
    localStorage.setItem(USER_SETTINGS_STORAGE_KEY, JSON.stringify(normalizeUserSettings(settings)));
  } catch {
    // Ignore localStorage persistence failures.
  }
}

export function normalizeUserSession(raw) {
  if (!raw) return null;
  const name = sanitizeName(raw.name);
  const email = sanitizeEmail(raw.email);
  if (!name || !email) return null;
  return {
    name,
    email,
    joinedAt: sanitizeJoinedAt(raw.joinedAt) ?? new Date().toISOString(),
  };
}

export function loadUserSessionFromStorage() {
  try {
    const raw = localStorage.getItem(USER_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return normalizeUserSession(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveUserSessionToStorage(session) {
  try {
    const normalized = normalizeUserSession(session);
    if (!normalized) {
      localStorage.removeItem(USER_SESSION_STORAGE_KEY);
      return;
    }
    localStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Ignore localStorage persistence failures.
  }
}

export function clearUserDataFromStorage() {
  try {
    localStorage.removeItem(USER_SESSION_STORAGE_KEY);
    localStorage.removeItem(USER_SETTINGS_STORAGE_KEY);
  } catch {
    // Ignore localStorage persistence failures.
  }
}
