import type { ClientLogo } from '../../types';

interface MarqueeStripProps {
  logos:  ClientLogo[];
  speed?: number;
}

export function MarqueeStrip({ logos, speed = 40 }: MarqueeStripProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-20 animate-marquee whitespace-nowrap items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex-shrink-0 h-14 flex items-center"
          >
            <img
              src={logo.src}
              alt={logo.name}
              draggable={false}
              className="h-full w-auto object-contain grayscale brightness-0"
              onError={(e) => {
                const target = e.currentTarget;
                const parent = target.parentElement;
                if (parent) {
                  target.style.display = 'none';
                  const text = document.createElement('span');
                  text.style.cssText = 'font-family: Inter, sans-serif; font-weight: 700; font-size: 1rem; color: #131313; text-transform: uppercase; letter-spacing: 0.05em;';
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
