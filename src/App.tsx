import { LanguageProvider } from './context/LanguageContext';
import { Navbar }      from './components/layout/Navbar';
import { Footer }      from './components/layout/Footer';
import { Hero }        from './components/sections/Hero';
import { Gallery }     from './components/sections/Gallery';
import { CtaSection }  from './components/sections/CtaSection';
import { Clients }     from './components/sections/Clients';

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-background min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <CtaSection />
          <Clients />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
