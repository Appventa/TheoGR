import { useLanguage } from '../../context/LanguageContext';

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  { href: '#', label: 'Instagram', Icon: IconInstagram },
  { href: '#', label: 'Facebook',  Icon: IconFacebook  },
  { href: '#', label: 'LinkedIn',  Icon: IconLinkedIn  },
];

export function Navbar() {
  const { t, toggleLang } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-[20px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">

        {/* Left — Social Icons */}
        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full bg-surface-highest flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-high transition-colors duration-200"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Right — Nav links + Language Toggle */}
        <nav className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => scrollTo('gallery')}
            className="font-body text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            {t.nav.work}
          </button>
          <button
            onClick={() => scrollTo('cta')}
            className="font-body text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200 hidden sm:block"
          >
            {t.nav.contact}
          </button>
          <button
            onClick={toggleLang}
            className="font-body text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200 border border-outline-variant/30 px-3 py-1 rounded-sm"
          >
            {t.langToggle}
          </button>
        </nav>

      </div>
    </header>
  );
}
