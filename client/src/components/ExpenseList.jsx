import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-12 text-center">
        <p className="text-sm font-medium text-zinc-300">No expenses yet</p>
        <p className="mt-1 text-xs text-zinc-500">
          Add your first expense using the form on the right.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Expense list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;
