import { useLanguage } from '../../context/LanguageContext';

export function Navbar() {
  const { t, toggleLang } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-[20px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-display-sm text-primary tracking-tight leading-none"
        >
          THEO
        </button>

        {/* Nav + Lang Toggle */}
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

          {/* Language Toggle */}
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
