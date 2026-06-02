import { Film, Music, Camera, User, Palette, Lightbulb } from 'lucide-react';
import { Category, CATEGORY_COLORS } from '../data/stories';

const ICONS: Record<Category, React.ElementType> = {
  film: Film,
  music: Music,
  photo: Camera,
  biography: User,
  art: Palette,
  innovation: Lightbulb,
};

export function CategoryIcon({ category, size = 20 }: { category: Category; size?: number }) {
  const Icon = ICONS[category];
  const colors = CATEGORY_COLORS[category];
  return (
    <div className={`flex items-center justify-center rounded-xl ${colors.light}`}
      style={{ width: size * 2, height: size * 2 }}>
      <Icon size={size} className={colors.text} />
    </div>
  );
}
