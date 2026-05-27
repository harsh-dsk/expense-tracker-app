import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { formatCurrency } from '../utils/format';

const CURRENCY_OPTIONS = [
  { id: 'INR', label: 'INR (₹)' },
  { id: 'USD', label: 'USD ($)' },
  { id: 'EUR', label: 'EUR (€)' },
  { id: 'GBP', label: 'GBP (£)' },
];

function formatJoinedDate(isoDate) {
  if (!isoDate) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate));
}

function UserAvatar({ name, size = 'lg' }) {
  const letter = (name || 'U').trim().charAt(0).toUpperCase();
  const sizeClass =
    size === 'lg'
      ? 'h-16 w-16 text-2xl rounded-2xl'
      : 'h-12 w-12 text-lg rounded-xl';

  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 font-bold text-zinc-950 shadow-lg shadow-emerald-500/20',
        sizeClass,
      ].join(' ')}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}

function ToggleSwitch({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-4">
      <span className="text-sm text-zinc-300">{label}</span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-emerald-500/80" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function EditProfileModal({ open, onClose, draft, onChange, onSave }) {
  return (
    <Modal open={open} onClose={onClose} titleId="edit-profile-title">
      <div className="animate-modal-in rounded-2xl border border-zinc-800/80 bg-zinc-900/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        <h2 id="edit-profile-title" className="text-xl font-semibold tracking-tight text-white">
          Edit profile
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400">
          Update your account details and financial preferences.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="edit-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Full name
            </label>
            <input
              id="edit-name"
              value={draft.name}
              onChange={(e) => onChange({ ...draft, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label htmlFor="edit-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Email address
            </label>
            <input
              id="edit-email"
              type="email"
              value={draft.email}
              onChange={(e) => onChange({ ...draft, email: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label htmlFor="edit-budget" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Monthly budget
            </label>
            <input
              id="edit-budget"
              type="number"
              min="0"
              step="100"
              value={draft.monthlyBudget}
              onChange={(e) => onChange({ ...draft, monthlyBudget: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label htmlFor="edit-currency" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Preferred currency
            </label>
            <select
              id="edit-currency"
              value={draft.currency}
              onChange={(e) => onChange({ ...draft, currency: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {CURRENCY_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800/80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400"
          >
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ProfileSignedOut({ onOpenSignIn }) {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section
        id="profile"
        className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8 text-center shadow-xl shadow-black/30 backdrop-blur-sm sm:p-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700/60 bg-zinc-950/60">
          <svg
            className="h-8 w-8 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path strokeLinecap="round" d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">Your account</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Sign in to manage your profile and preferences.
        </p>
        <button
          type="button"
          onClick={onOpenSignIn}
          className="mt-8 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        >
          Sign in
        </button>
      </section>
    </main>
  );
}

function ProfileSignedIn({
  expenses,
  userSession,
  userSettings,
  onSaveSettings,
  onLogout,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [prefsDraft, setPrefsDraft] = useState({
    monthlyBudget: userSettings.monthlyBudget,
    currency: userSettings.currency,
    notificationsEnabled: userSettings.notificationsEnabled,
  });
  const [editDraft, setEditDraft] = useState({
    name: userSettings.name,
    email: userSettings.email,
    monthlyBudget: userSettings.monthlyBudget,
    currency: userSettings.currency,
  });

  useEffect(() => {
    setPrefsDraft({
      monthlyBudget: userSettings.monthlyBudget,
      currency: userSettings.currency,
      notificationsEnabled: userSettings.notificationsEnabled,
    });
    setEditDraft({
      name: userSettings.name,
      email: userSettings.email,
      monthlyBudget: userSettings.monthlyBudget,
      currency: userSettings.currency,
    });
  }, [userSettings]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalTransactions = expenses.length;

  const handleSavePreferences = () => {
    onSaveSettings({
      monthlyBudget: prefsDraft.monthlyBudget,
      currency: prefsDraft.currency,
      notificationsEnabled: prefsDraft.notificationsEnabled,
    });
  };

  const handleSaveProfile = () => {
    onSaveSettings({
      name: editDraft.name,
      email: editDraft.email,
      monthlyBudget: editDraft.monthlyBudget,
      currency: editDraft.currency,
    });
    setEditOpen(false);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section id="profile" className="space-y-8">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg shadow-black/20 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <UserAvatar name={userSettings.name} />
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {userSettings.name}
                </h1>
                <p className="mt-0.5 truncate text-sm text-zinc-400">{userSettings.email}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  Joined {formatJoinedDate(userSession?.joinedAt ?? userSettings.joinedAt)}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800/80"
              >
                Edit profile
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-4 py-2 text-sm font-medium text-rose-300 transition hover:border-rose-500/30 hover:bg-rose-500/10"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/20">
            <h2 className="text-sm font-medium text-zinc-400">Total expenses</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-300">
              {formatCurrency(totalExpenses)}
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-lg shadow-black/20">
            <h2 className="text-sm font-medium text-zinc-400">Total transactions</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
              {totalTransactions.toLocaleString('en-IN')}
            </p>
          </article>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg shadow-black/20 sm:p-8">
          <div className="border-b border-zinc-800/80 pb-5">
            <h2 className="text-lg font-semibold text-white">Preferences</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Customize your budget, currency, and notification settings.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="pref-budget" className="mb-1.5 block text-xs font-medium text-zinc-400">
                Monthly budget
              </label>
              <input
                id="pref-budget"
                type="number"
                min="0"
                step="100"
                value={prefsDraft.monthlyBudget}
                onChange={(e) =>
                  setPrefsDraft((prev) => ({ ...prev, monthlyBudget: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label htmlFor="pref-currency" className="mb-1.5 block text-xs font-medium text-zinc-400">
                Preferred currency
              </label>
              <select
                id="pref-currency"
                value={prefsDraft.currency}
                onChange={(e) =>
                  setPrefsDraft((prev) => ({ ...prev, currency: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {CURRENCY_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <ToggleSwitch
              id="pref-notifications"
              label="Expense notifications"
              checked={prefsDraft.notificationsEnabled}
              onChange={(checked) =>
                setPrefsDraft((prev) => ({ ...prev, notificationsEnabled: checked }))
              }
            />
          </div>

          <button
            type="button"
            onClick={handleSavePreferences}
            className="mt-8 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 sm:w-auto sm:px-6"
          >
            Save changes
          </button>
        </div>
      </section>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        draft={editDraft}
        onChange={setEditDraft}
        onSave={handleSaveProfile}
      />
    </main>
  );
}

function ProfilePage({
  expenses,
  userSession,
  userSettings,
  onSaveSettings,
  onLogout,
  onOpenSignIn,
}) {
  if (!userSession) {
    return <ProfileSignedOut onOpenSignIn={onOpenSignIn} />;
  }

  return (
    <ProfileSignedIn
      expenses={expenses}
      userSession={userSession}
      userSettings={userSettings}
      onSaveSettings={onSaveSettings}
      onLogout={onLogout}
    />
  );
}

export default ProfilePage;
