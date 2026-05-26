import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';

function ExpensesPage({ expenses, onAddExpense, onDeleteExpense }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          View transactions and add new spending entries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <section id="expenses" className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent expenses</h2>
              <p className="text-sm text-zinc-500">Newest entries appear first.</p>
            </div>
          </div>
          <ExpenseList expenses={expenses} onDelete={onDeleteExpense} />
        </section>

        <aside className="lg:col-span-1">
          <AddExpenseForm onAdd={onAddExpense} />
        </aside>
      </div>
    </main>
  );
}

export default ExpensesPage;
