import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../utils/format';

function formatAxisAmount(value) {
  if (value >= 1000) {
    return `₹${Math.round(value / 1000)}k`;
  }
  return `₹${value}`;
}

function buildMonthlyData(expenses) {
  if (!expenses?.length) {
    return [];
  }

  const buckets = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    if (Number.isNaN(date.getTime())) {
      return acc;
    }

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}`;

    acc[monthKey] = (acc[monthKey] ?? 0) + expense.amount;
    return acc;
  }, {});

  const formatter = new Intl.DateTimeFormat('en-IN', { month: 'short' });

  return Object.keys(buckets)
    .sort()
    .map((monthKey) => {
      const [year, month] = monthKey.split('-').map(Number);
      const label = formatter.format(new Date(year, month - 1, 1));

      return {
        month: label,
        amount: buckets[monthKey],
      };
    });
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-700/80 bg-zinc-900/95 px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-sm">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-emerald-400">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

function ExpenseAnalyticsChart({ expenses, className = '' }) {
  const data = buildMonthlyData(expenses);
  const total = data.reduce((sum, entry) => sum + entry.amount, 0);
  const average = data.length ? Math.round(total / data.length) : 0;
  const peak = data.reduce(
    (max, entry) => (entry.amount > max.amount ? entry : max),
    data[0] ?? { month: '—', amount: 0 },
  );

  return (
    <article
      className={[
        'rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby="expense-analytics-heading"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2
            id="expense-analytics-heading"
            className="text-lg font-semibold text-white"
          >
            Monthly spending
          </h2>
          <p className="text-sm text-zinc-500">
            Expense totals by month
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="text-zinc-500">Year total</dt>
            <dd className="font-semibold text-emerald-400">{formatCurrency(total)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Monthly avg</dt>
            <dd className="font-semibold text-zinc-200">{formatCurrency(average)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Peak</dt>
            <dd className="font-semibold text-sky-400">
              {peak.month} · {formatCurrency(peak.amount)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="h-64 w-full sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
            barCategoryGap="18%"
          >
            <defs>
              <linearGradient id="expenseBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#3f3f46"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: '#52525b' }}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 11 }}
              tickFormatter={formatAxisAmount}
              width={48}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: 'rgba(63, 63, 70, 0.35)', radius: 6 }}
            />
            <Bar
              dataKey="amount"
              fill="url(#expenseBarGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export default ExpenseAnalyticsChart;
