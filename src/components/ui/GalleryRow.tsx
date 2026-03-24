import { useDragScroll } from '../../hooks/useDragScroll';
import { VideoCard } from './VideoCard';
import { useLanguage } from '../../context/LanguageContext';
import type { GalleryCategory } from '../../types';

interface GalleryRowProps {
  category: GalleryCategory;
}

export function GalleryRow({ category }: GalleryRowProps) {
  const { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useDragScroll();
  const { t } = useLanguage();

  const label = t.categories[category.id] ?? category.label;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-label-sm text-on-surface-variant uppercase tracking-widest px-6 md:px-16">
        {label}
      </p>
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-4 overflow-x-scroll no-scrollbar cursor-grab px-6 md:px-16 pb-2 select-none"
      >
        {category.items.map(item => (
          <VideoCard key={item.id} item={item} portrait={category.portrait} />
        ))}
      </div>
    </div>
  );
}
