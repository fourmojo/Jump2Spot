import { Category, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/stories';

export function CategoryBadge({ category, size = 'sm' }: { category: Category; size?: 'xs' | 'sm' }) {
  const colors = CATEGORY_COLORS[category];
  return (
    <span className={`inline-block font-medium tracking-wide uppercase ${
      size === 'xs' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'
    } rounded-full ${colors.bg} ${colors.text}`}>
      {CATEGORY_LABELS[category]}
    </span>
  );
}
