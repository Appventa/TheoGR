import type { Variants } from 'framer-motion';

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeScaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren:   0.1,
    },
  },
};

export const heroReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const heroStagger: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.3,
    },
  },
};
