import { CATEGORY_BY_ID } from '../constants/categories';

const ICON_TONE_STYLES = {
  amber: 'bg-amber-500/15 text-amber-400 ring-amber-500/25',
  sky: 'bg-sky-500/15 text-sky-400 ring-sky-500/25',
  violet: 'bg-violet-500/15 text-violet-400 ring-violet-500/25',
  rose: 'bg-rose-500/15 text-rose-400 ring-rose-500/25',
  fuchsia: 'bg-fuchsia-500/15 text-fuchsia-400 ring-fuchsia-500/25',
  teal: 'bg-teal-500/15 text-teal-400 ring-teal-500/25',
  zinc: 'bg-zinc-500/15 text-zinc-400 ring-zinc-500/25',
};

function IconPaths({ categoryId, className }) {
  switch (categoryId) {
    case 'food':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3M6 8h12M8 8v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8" />
          <path strokeLinecap="round" d="M9 5c0-1.5 1.5-2 3-2s3 .5 3 2" />
        </svg>
      );
    case 'transport':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 16l1-5h12l1 5M6 16h12M8 19h2M14 19h2M7 11h10l-1-4H8l-1 4z" />
        </svg>
      );
    case 'shopping':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8V6a5 5 0 0 1 10 0v2M6 8h12l-1 12H7L6 8z" />
        </svg>
      );
    case 'bills':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10v16H7V4zM9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case 'entertainment':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 4-8 4V8zM16 8v8" />
        </svg>
      );
    case 'health':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'education':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 10l-10-5L2 10l10 5 10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-6" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="12" r="2" />
          <path strokeLinecap="round" d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
        </svg>
      );
  }
}

function CategoryIcon({ categoryId, className = '' }) {
  const category = CATEGORY_BY_ID[categoryId] ?? CATEGORY_BY_ID.education;
  const toneClass = ICON_TONE_STYLES[category.tone] ?? ICON_TONE_STYLES.zinc;

  return (
    <span
      className={[
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
        toneClass,
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      <IconPaths categoryId={category.id} className="h-5 w-5" />
    </span>
  );
}

export default CategoryIcon;
