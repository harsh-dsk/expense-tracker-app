import BudgetProgressIndicator from '../components/BudgetProgressIndicator';
import DashboardCard from '../components/DashboardCard';
import DashboardHero from '../components/DashboardHero';
import DashboardWidgets from '../components/DashboardWidgets';
import RecentActivity from '../components/RecentActivity';
import { formatCurrency } from '../utils/format';

function DashboardPage({ expenses, monthlyBudget = 50000, userName }) {
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

  const remainingBudget = monthlyBudget - monthlyExpenses;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="dashboard" className="space-y-6 lg:space-y-8">
        <DashboardHero
          userName={userName || 'there'}
          monthlySpent={monthlyExpenses}
          monthlyBudget={monthlyBudget}
          className="mb-4 sm:mb-6 lg:mb-8"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          <DashboardCard
            title="Total Balance"
            value={formatCurrency(monthlyBudget - totalExpenses)}
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
            hint={`${formatCurrency(Math.max(remainingBudget, 0))} left of ${formatCurrency(monthlyBudget)} budget`}
            accent="blue"
          />
          <BudgetProgressIndicator spent={monthlyExpenses} budget={monthlyBudget} />
        </div>

        <DashboardWidgets expenses={expenses} className="mt-4 lg:mt-6" />

        <RecentActivity expenses={expenses} className="mt-4 lg:mt-6" />
      </section>
    </main>
  );
}

export default DashboardPage;
