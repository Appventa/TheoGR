import { motion } from 'framer-motion';
import { staggerContainer, fadeScaleIn } from '../../lib/motion';
import { GalleryRow } from '../ui/GalleryRow';
import { galleryData } from '../../data/gallery';
import { useLanguage } from '../../context/LanguageContext';

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 bg-surface-low">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {/* Section Header */}
        <motion.div
          variants={fadeScaleIn}
          className="px-6 md:px-16 mb-12"
        >
          <p className="font-body text-label-sm text-primary uppercase tracking-widest mb-2">
            {t.gallery.sectionLabel}
          </p>
          <h2 className="font-display font-bold text-display-md text-on-surface">
            {t.gallery.sectionTitle}
          </h2>
        </motion.div>

        {/* Gallery Rows */}
        <div className="flex flex-col gap-10">
          {galleryData.filter(c => c.items.length > 0).map(category => (
            <motion.div key={category.id} variants={fadeScaleIn}>
              <GalleryRow category={category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
