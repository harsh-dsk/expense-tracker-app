import CategoryTag from './CategoryTag';
import DashboardWidget from './DashboardWidget';
import { formatCurrency } from '../utils/format';
import {
  getAverageMonthlySpending,
  getRecentPaymentMethod,
  getTopExpenseCategory,
} from '../utils/dashboardStats';

function ChartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M10 19V9M16 19v-4M22 19H2" />
    </svg>
  );
}

function ReceiptIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10v16l-2-1.5L13 20l-2-1.5L9 20l-2-1.5L5 20V4z" />
      <path strokeLinecap="round" d="M9 8h6M9 12h6" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4V2M17 4V2M5 8h14M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function WalletIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8V6a4 4 0 0 1 8 0v2M5 8h14v12H5V8z" />
      <path strokeLinecap="round" d="M15 14h3" />
    </svg>
  );
}

function PaymentIcon({ methodId, className }) {
  switch (methodId) {
    case 'upi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path strokeLinecap="round" d="M11 18h2" />
        </svg>
      );
    case 'cash':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'bank':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18L12 4 3 10zM5 10v8M19 10v8M9 10v8M15 10v8M4 18h16" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path strokeLinecap="round" d="M3 10h18M7 14h4" />
        </svg>
      );
  }
}

function DashboardWidgets({ expenses, className = '' }) {
  const topCategory = getTopExpenseCategory(expenses);
  const transactionCount = expenses.length;
  const averageMonthly = getAverageMonthlySpending(expenses);
  const recentPayment = getRecentPaymentMethod(expenses);

  const monthCount = new Set(expenses.map((e) => e.date.slice(0, 7))).size;

  return (
    <div
      className={[
        'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4',
        className,
      ].join(' ')}
      aria-label="Dashboard insights"
    >
      <DashboardWidget
        title="Top category"
        value={topCategory ? topCategory.label : '—'}
        badge={topCategory ? <CategoryTag categoryId={topCategory.id} /> : null}
        hint={
          topCategory
            ? `${formatCurrency(topCategory.amount)} spent · highest share`
            : 'Add expenses to see your top category'
        }
        accent={topCategory?.tone ?? 'zinc'}
        icon={<ChartIcon className="h-5 w-5" />}
      />

      <DashboardWidget
        title="Transactions"
        value={transactionCount.toLocaleString('en-IN')}
        hint={
          transactionCount === 1
            ? '1 recorded expense'
            : `${transactionCount} recorded expenses`
        }
        accent="sky"
        icon={<ReceiptIcon className="h-5 w-5" />}
      />

      <DashboardWidget
        title="Avg monthly"
        value={formatCurrency(averageMonthly)}
        hint={
          monthCount > 0
            ? `Across ${monthCount} active month${monthCount === 1 ? '' : 's'}`
            : 'No monthly data yet'
        }
        accent="violet"
        icon={<CalendarIcon className="h-5 w-5" />}
      />

      <DashboardWidget
        title="Last payment"
        value={recentPayment ? recentPayment.shortLabel : '—'}
        hint={
          recentPayment
            ? recentPayment.label
            : 'Payment method from your latest expense'
        }
        accent={recentPayment?.tone ?? 'zinc'}
        icon={
          <PaymentIcon
            methodId={recentPayment?.id}
            className="h-5 w-5"
          />
        }
      />
    </div>
  );
}

export default DashboardWidgets;
