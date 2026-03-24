import { motion } from 'framer-motion';
import { staggerContainer, fadeScaleIn } from '../../lib/motion';
import { AmberButton } from '../ui/AmberButton';
import { useLanguage } from '../../context/LanguageContext';

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="py-24 bg-background overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={fadeScaleIn}
          className="font-body text-label-sm text-primary uppercase tracking-[0.2em]"
        >
          {t.cta.label}
        </motion.p>

        <motion.h2
          variants={fadeScaleIn}
          className="font-display font-bold text-display-md text-on-surface"
        >
          {t.cta.title}
        </motion.h2>

        <motion.p
          variants={fadeScaleIn}
          className="font-body text-body-lg text-on-surface-variant max-w-md"
        >
          {t.cta.tagline}
        </motion.p>

        <motion.div variants={fadeScaleIn}>
          <AmberButton href="mailto:theo@theokokkinidis.com">
            {t.cta.button}
          </AmberButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
