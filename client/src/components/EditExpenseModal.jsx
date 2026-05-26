import ExpenseForm from './ExpenseForm';
import Modal from './Modal';
import { useMemo } from 'react';

function EditExpenseModal({ open, expense, onClose, onSave }) {
  const initialValues = useMemo(() => {
    if (!expense) return null;
    return {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      date: expense.date,
    };
  }, [expense]);

  return (
    <Modal open={open} onClose={onClose} titleId="edit-expense-heading">
      {initialValues ? (
        <ExpenseForm
          initialValues={initialValues}
          onSubmit={(values) => onSave?.(values)}
          submitLabel="Save changes"
          heading="Edit expense"
          formId="edit-expense"
          resetOnSuccess={false}
          onCancel={onClose}
        />
      ) : null}
    </Modal>
  );
}

export default EditExpenseModal;

