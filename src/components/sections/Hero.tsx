import { motion } from 'framer-motion';
import { heroReveal, heroStagger } from '../../lib/motion';
import { AmberButton } from '../ui/AmberButton';
import { useLanguage } from '../../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/Hero_BG_video_LOOP.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/70" />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={heroReveal}
          className="font-body text-label-sm text-primary uppercase tracking-[0.2em] mb-4"
        >
          {t.hero.label}
        </motion.p>

        <motion.h1
          variants={heroReveal}
          className="font-display font-bold text-display-lg text-on-surface mb-6"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          variants={heroReveal}
          className="font-body text-body-lg text-on-surface-variant max-w-lg mx-auto mb-10"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div variants={heroReveal}>
          <AmberButton onClick={scrollToGallery}>
            {t.hero.cta}
          </AmberButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
