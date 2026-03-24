export const translations = {
  el: {
    nav: {
      work:    'Δουλειές',
      about:   'Σχετικά',
      contact: 'Επικοινωνία',
    },
    hero: {
      label:      'Σκηνοθέτης Βίντεο & Οπτικός Αφηγητής',
      title:      'Θέος Κοκκινίδης',
      tagline:    'Δημιουργώ εικόνες που μένουν.',
      cta:        'Δες τη Δουλειά',
      typewriter: '25 χρόνια δημιουργίας βίντεο, σχεδιασμού και στρατηγικής brand. Από την ιδέα έως την υλοποίηση, παρέχω λύσεις που κάνουν το brand σας να ξεχωρίζει.',
    },
    gallery: {
      sectionLabel: 'Επιλεγμένες Εργασίες',
      sectionTitle: 'Η Δουλειά',
    },
    categories: {
      'tv-commercials': 'Τηλεοπτικές Διαφημίσεις',
      'music-videos':   'Μουσικά Βίντεο',
      'product-videos': 'Βίντεο Προϊόντων',
      'ugc-social':     'UGC & Social Media',
      'creative':       'Δημιουργικό',
    } as Record<string, string>,
    cta: {
      label:   'Διαθέσιμος για Projects',
      title:   'Ας δημιουργήσουμε κάτι αξέχαστο.',
      tagline: 'Έχεις ένα όραμα; Ας μιλήσουμε.',
      button:  'Επικοινωνία',
    },
    clients: {
      label: 'Συνεργάστηκα με',
    },
    footer: {
      copyright: '© {year} Θέος Κοκκινίδης. Όλα τα δικαιώματα κατοχυρωμένα.',
    },
    langToggle: 'EN',
  },
  en: {
    nav: {
      work:    'Work',
      about:   'About',
      contact: 'Contact',
    },
    hero: {
      label:      'Video Director & Visual Storyteller',
      title:      'Theo Kokkinidis',
      tagline:    'Crafting images that stay with you.',
      cta:        'View Work',
      typewriter: '25 years crafting video, design, and brand strategy. From concept to execution, I deliver solutions that make your brand stand out.',
    },
    gallery: {
      sectionLabel: 'Selected Work',
      sectionTitle: 'The Work',
    },
    categories: {
      'tv-commercials': 'TV Commercials',
      'music-videos':   'Music Videos',
      'product-videos': 'Product Videos',
      'ugc-social':     'UGC & Social',
      'creative':       'Creative',
    } as Record<string, string>,
    cta: {
      label:   'Available for Projects',
      title:   "Let's create something remarkable.",
      tagline: "Have a vision? Let's talk.",
      button:  'Get in Touch',
    },
    clients: {
      label: 'Trusted By',
    },
    footer: {
      copyright: '© {year} Theo Kokkinidis. All rights reserved.',
    },
    langToggle: 'ΕΛ',
  },
} as const;

export type Lang = keyof typeof translations;
export type Translations = typeof translations[Lang];
