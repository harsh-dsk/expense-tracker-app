import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

const INITIAL_EXPENSES = [
  {
    id: crypto.randomUUID(),
    title: 'Weekly groceries',
    amount: 2450,
    category: 'food',
    date: '2026-05-24',
  },
  {
    id: crypto.randomUUID(),
    title: 'Metro pass',
    amount: 800,
    category: 'transport',
    date: '2026-05-22',
  },
  {
    id: crypto.randomUUID(),
    title: 'Streaming subscription',
    amount: 499,
    category: 'entertainment',
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <Dashboard
        expenses={expenses}
        onAddExpense={handleAddExpense}
        onDeleteExpense={handleDeleteExpense}
      />
    </div>
  );
}

export default App;
