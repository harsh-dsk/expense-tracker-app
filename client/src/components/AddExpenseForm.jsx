import { useMemo } from 'react';
import { DEFAULT_PAYMENT_METHOD } from '../constants/paymentMethods';
import ExpenseForm from './ExpenseForm';

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function createResetValues() {
  return {
    title: '',
    amount: '',
    category: 'food',
    paymentMethod: DEFAULT_PAYMENT_METHOD,
    date: getTodayISODate(),
  };
}

function AddExpenseForm({ onAdd }) {
  const initialValues = useMemo(() => createResetValues(), []);

  return (
    <ExpenseForm
      initialValues={initialValues}
      onSubmit={onAdd}
      submitLabel="Save expense"
      heading="Add expense"
      formId="add-expense"
      resetOnSuccess={true}
      getResetValues={createResetValues}
    />
  );
}

export default AddExpenseForm;
