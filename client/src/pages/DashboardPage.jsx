import BudgetProgressIndicator from '../components/BudgetProgressIndicator';
import CategoryExpenseCards from '../components/CategoryExpenseCards';
import DashboardCard from '../components/DashboardCard';
import DashboardHero from '../components/DashboardHero';
import DashboardWidgets from '../components/DashboardWidgets';
import ExpenseAnalyticsChart from '../components/ExpenseAnalyticsChart';
import RecentActivity from '../components/RecentActivity';
import { MONTHLY_BUDGET } from '../constants/budget';
import { formatCurrency } from '../utils/format';

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
        <DashboardHero
          monthlySpent={monthlyExpenses}
          monthlyBudget={MONTHLY_BUDGET}
          className="mb-6 lg:mb-8"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
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
          <BudgetProgressIndicator spent={monthlyExpenses} budget={MONTHLY_BUDGET} />
        </div>

        <DashboardWidgets expenses={expenses} className="mt-6 lg:mt-8" />

        <CategoryExpenseCards expenses={expenses} className="mt-6 lg:mt-8" />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-3 lg:gap-8">
          <ExpenseAnalyticsChart expenses={expenses} className="lg:col-span-2" />
          <RecentActivity expenses={expenses} />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
