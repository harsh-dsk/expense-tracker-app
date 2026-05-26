import { CATEGORY_BY_ID } from '../constants/categories';

const TONE_STYLES = {
  amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  violet: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
  rose: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
  fuchsia: 'bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30',
  teal: 'bg-teal-500/15 text-teal-300 ring-teal-500/30',
  zinc: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
};

function CategoryTag({ categoryId, className = '' }) {
  const category = CATEGORY_BY_ID[categoryId] ?? CATEGORY_BY_ID.other;
  const toneClass = TONE_STYLES[category.tone] ?? TONE_STYLES.zinc;

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        toneClass,
        className,
      ].join(' ')}
    >
      {category.label}
    </span>
  );
}

export default CategoryTag;
