import { useRef } from 'react';
import type { MouseEvent } from 'react';

export function useDragScroll() {
  const ref       = useRef<HTMLDivElement>(null);
  const isDown    = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag   = useRef(false);

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    isDown.current    = true;
    didDrag.current   = false;
    startX.current    = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.classList.add('cursor-grabbing');
    ref.current.classList.remove('cursor-grab');
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    isDown.current = false;
    ref.current.classList.remove('cursor-grabbing');
    ref.current.classList.add('cursor-grab');
  };

  const onMouseUp = () => {
    if (!ref.current) return;
    isDown.current = false;
    ref.current.classList.remove('cursor-grabbing');
    ref.current.classList.add('cursor-grab');
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x    = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) didDrag.current = true;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, didDrag };
}
