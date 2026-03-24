import type { ReactNode } from 'react';

interface AmberButtonProps {
  children:   ReactNode;
  href?:      string;
  onClick?:   () => void;
  className?: string;
}

export function AmberButton({ children, href, onClick, className = '' }: AmberButtonProps) {
  const base =
    'inline-block bg-primary-gradient text-primary-on font-display font-semibold ' +
    'text-label-md px-8 py-3 rounded-sm uppercase tracking-wider ' +
    'transition-opacity duration-200 hover:opacity-90 ' + className;

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}
