import { motion } from 'framer-motion';
import { fadeScaleIn } from '../../lib/motion';
import { MarqueeStrip } from '../ui/MarqueeStrip';
import { clientLogos } from '../../data/clients';
import { useLanguage } from '../../context/LanguageContext';

export function Clients() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white overflow-hidden pause-on-hover">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={fadeScaleIn}
          className="font-body text-label-sm text-surface uppercase tracking-widest text-center mb-12"
        >
          {t.clients.label}
        </motion.p>

        <MarqueeStrip logos={clientLogos} />
      </motion.div>
    </section>
  );
}
