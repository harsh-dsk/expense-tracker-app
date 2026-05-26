import DashboardCard from '../components/DashboardCard';
import { formatCurrency } from '../utils/format';

const MONTHLY_BUDGET = 50000;

function DashboardPage({ expenses }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const now = new Date();
  const monthlyExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === now.getFullYear() &&
        expenseDate.getMonth() === now.getMonth()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const remainingBudget = MONTHLY_BUDGET - monthlyExpenses;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="dashboard" className="mb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Overview of your spending and recent transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <DashboardCard
            title="Total Balance"
            value={formatCurrency(MONTHLY_BUDGET - totalExpenses)}
            hint="Budget minus all-time expenses"
            accent="emerald"
          />
          <DashboardCard
            title="Total Expenses"
            value={formatCurrency(totalExpenses)}
            hint={`${expenses.length} transaction${expenses.length === 1 ? '' : 's'}`}
            accent="red"
          />
          <DashboardCard
            title="This Month"
            value={formatCurrency(monthlyExpenses)}
            hint={`${formatCurrency(Math.max(remainingBudget, 0))} left of ${formatCurrency(MONTHLY_BUDGET)} budget`}
            accent="blue"
          />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
