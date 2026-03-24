import type { ClientLogo } from '../../types';

interface MarqueeStripProps {
  logos:   ClientLogo[];
  speed?:  number;
}

export function MarqueeStrip({ logos, speed = 35 }: MarqueeStripProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-16 animate-marquee whitespace-nowrap items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex-shrink-0 h-8 flex items-center"
          >
            <img
              src={logo.src}
              alt={logo.name}
              draggable={false}
              className="h-full w-auto object-contain opacity-40 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
              onError={(e) => {
                // Fallback: render brand name as text if logo file missing
                const target = e.currentTarget;
                const parent = target.parentElement;
                if (parent) {
                  target.style.display = 'none';
                  const text = document.createElement('span');
                  text.className = 'font-display font-bold text-label-md text-on-surface-variant uppercase tracking-widest';
                  text.textContent = logo.name;
                  parent.appendChild(text);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
