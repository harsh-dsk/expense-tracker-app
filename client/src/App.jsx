import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';

const INITIAL_EXPENSES = [
  {
    id: crypto.randomUUID(),
    title: 'Weekly groceries',
    amount: 2450,
    category: 'food',
    paymentMethod: 'upi',
    date: '2026-05-24',
  },
  {
    id: crypto.randomUUID(),
    title: 'Metro pass',
    amount: 800,
    category: 'transport',
    paymentMethod: 'card',
    date: '2026-05-22',
  },
  {
    id: crypto.randomUUID(),
    title: 'Streaming subscription',
    amount: 499,
    category: 'entertainment',
    paymentMethod: 'card',
    date: '2026-05-20',
  },
];

function App() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  const handleAddExpense = useCallback((expense) => {
    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        ...expense,
      },
      ...prev,
    ]);
  }, []);

  const handleDeleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage expenses={expenses} />} />
          <Route
            path="/expenses"
            element={
              <ExpensesPage
                expenses={expenses}
                onAddExpense={handleAddExpense}
                onDeleteExpense={handleDeleteExpense}
              />
            }
          />
          <Route path="/analytics" element={<AnalyticsPage expenses={expenses} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
