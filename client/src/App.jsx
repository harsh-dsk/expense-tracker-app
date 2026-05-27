import { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import Toast from './components/Toast';
import { setPreferredCurrency } from './utils/format';
import {
  clearExpensesFromStorage,
  loadExpensesFromStorage,
  normalizeExpenseForStorage,
  saveExpensesToStorage,
} from './utils/expensesStorage';
import {
  clearUserDataFromStorage,
  DEFAULT_USER_SETTINGS,
  loadUserSessionFromStorage,
  loadUserSettingsFromStorage,
  normalizeUserSession,
  normalizeUserSettings,
  saveUserSessionToStorage,
  saveUserSettingsToStorage,
} from './utils/userSettingsStorage';

const STORAGE_SAVE_DEBOUNCE_MS = 150;

function App() {
  const [expenses, setExpenses] = useState(() => loadExpensesFromStorage());
  const [userSettings, setUserSettings] = useState(() => loadUserSettingsFromStorage());
  const [userSession, setUserSession] = useState(() => loadUserSessionFromStorage());
  const [signInOpen, setSignInOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({
      id: crypto.randomUUID(),
      message,
      type,
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      saveExpensesToStorage(expenses);
    }, STORAGE_SAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [expenses]);

  useEffect(() => {
    const normalized = normalizeUserSettings(userSettings);
    saveUserSettingsToStorage(normalized);
    setPreferredCurrency(normalized.currency);
  }, [userSettings]);

  useEffect(() => {
    saveUserSessionToStorage(userSession);
  }, [userSession]);

  const expensesStable = useMemo(() => expenses, [expenses]);

  const handleSignIn = useCallback(
    ({ name, email }) => {
      const session = normalizeUserSession({ name, email });
      if (!session) {
        showToast('Enter a valid name and email to sign in.', 'error');
        return false;
      }

      const joinedAt = userSettings.joinedAt ?? userSession?.joinedAt ?? session.joinedAt;
      const nextSession = { ...session, joinedAt };

      setUserSession(nextSession);
      setUserSettings((prev) =>
        normalizeUserSettings({
          ...prev,
          name: nextSession.name,
          email: nextSession.email,
          joinedAt,
        }),
      );
      showToast(`Welcome, ${nextSession.name}`, 'success');
      return true;
    },
    [showToast, userSession?.joinedAt, userSettings.joinedAt],
  );

  const handleLogout = useCallback(() => {
    clearExpensesFromStorage();
    clearUserDataFromStorage();

    setExpenses([]);
    setUserSession(null);
    setUserSettings({ ...DEFAULT_USER_SETTINGS });
    setPreferredCurrency(DEFAULT_USER_SETTINGS.currency);
    setSignInOpen(false);

    showToast('Logged out successfully', 'success');
  }, [showToast]);

  const handleSaveSettings = useCallback(
    (partial) => {
      const next = normalizeUserSettings({
        ...userSettings,
        ...partial,
      });

      if (!next.name || !next.email) {
        showToast('Name and email are required.', 'error');
        return false;
      }

      setUserSettings(next);

      if (userSession) {
        setUserSession(
          normalizeUserSession({
            ...userSession,
            name: next.name,
            email: next.email,
          }),
        );
      }

      showToast('Changes saved successfully', 'success');
      return true;
    },
    [showToast, userSession, userSettings],
  );

  const handleAddExpense = useCallback(
    (expense) => {
      const normalized = normalizeExpenseForStorage({
        id: crypto.randomUUID(),
        ...expense,
      });

      if (!normalized) {
        showToast('Could not save that expense. Please check the fields.', 'error');
        return;
      }

      setExpenses((prev) => [normalized, ...prev]);
      showToast('Expense saved', 'success');
    },
    [showToast],
  );

  const handleDeleteExpense = useCallback(
    (id) => {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      showToast('Expense deleted', 'success');
    },
    [showToast],
  );

  const handleUpdateExpense = useCallback(
    (id, updatedFields) => {
      setExpenses((prev) =>
        prev.map((expense) => {
          if (expense.id !== id) return expense;
          const normalized = normalizeExpenseForStorage({
            ...expense,
            ...updatedFields,
          });
          return normalized ?? expense;
        }),
      );
      showToast('Expense updated', 'success');
    },
    [showToast],
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar
          userSession={userSession}
          userSettings={userSettings}
          onOpenSignIn={() => setSignInOpen(true)}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                expenses={expensesStable}
                monthlyBudget={userSettings.monthlyBudget}
                userName={userSession?.name}
              />
            }
          />
          <Route
            path="/expenses"
            element={
              <ExpensesPage
                expenses={expensesStable}
                onAddExpense={handleAddExpense}
                onDeleteExpense={handleDeleteExpense}
                onUpdateExpense={handleUpdateExpense}
              />
            }
          />
          <Route
            path="/analytics"
            element={<AnalyticsPage expenses={expensesStable} />}
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                expenses={expensesStable}
                userSession={userSession}
                userSettings={userSettings}
                onSaveSettings={handleSaveSettings}
                onLogout={handleLogout}
                onOpenSignIn={() => setSignInOpen(true)}
              />
            }
          />
        </Routes>
        <SignInModal
          open={signInOpen}
          onClose={() => setSignInOpen(false)}
          onSubmit={handleSignIn}
          initialName={userSettings.name}
          initialEmail={userSettings.email}
        />
        <Toast toast={toast} />
      </div>
    </BrowserRouter>
  );
}

export default App;
