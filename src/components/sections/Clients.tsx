import { motion } from 'framer-motion';
import { fadeScaleIn } from '../../lib/motion';
import { MarqueeStrip } from '../ui/MarqueeStrip';
import { clientLogos } from '../../data/clients';
import { useLanguage } from '../../context/LanguageContext';

export function Clients() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white overflow-hidden pause-on-hover">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading — bold, dark, centred, matching reference */}
        <motion.h3
          variants={fadeScaleIn}
          className="text-center font-display font-bold text-display-sm text-surface mb-12"
        >
          {t.clients.label}
        </motion.h3>

        <MarqueeStrip logos={clientLogos} />
      </motion.div>
    </section>
  );
}
