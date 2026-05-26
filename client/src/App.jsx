import { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import Toast from './components/Toast';
import {
  loadExpensesFromStorage,
  normalizeExpenseForStorage,
  saveExpensesToStorage,
} from './utils/expensesStorage';

const STORAGE_SAVE_DEBOUNCE_MS = 150;

function App() {
  const [expenses, setExpenses] = useState(() => loadExpensesFromStorage());
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

  const expensesStable = useMemo(() => expenses, [expenses]);

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
          // If the update becomes invalid, keep the old data rather than losing it.
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
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage expenses={expensesStable} />} />
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
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Toast toast={toast} />
      </div>
    </BrowserRouter>
  );
}

export default App;
