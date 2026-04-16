import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon } from './PlayIcon';
import type { VideoItem } from '../../types';

interface VideoCardProps {
  item:      VideoItem;
  portrait?: boolean;
}

export function VideoCard({ item, portrait }: VideoCardProps) {
  const [open, setOpen] = useState(false);

  const isYoutube  = !!item.youtubeId;
  const isPlayable = isYoutube || !!item.videoUrl;
  const thumbnail  = item.thumbnail || (isYoutube
    ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
    : '');

  return (
    <>
      <motion.div
        className={`relative flex-shrink-0 rounded-md overflow-hidden bg-surface-highest ${isPlayable ? 'cursor-pointer' : ''} ${portrait ? 'w-[180px] h-[320px]' : 'w-[320px] h-[200px]'}`}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={() => isPlayable && setOpen(true)}
      >
        <img
          src={thumbnail}
          alt={item.title}
          draggable={false}
          className="w-full h-full object-cover"
        />

        <motion.div
          className="absolute inset-0 bg-background/75 flex flex-col items-center justify-center gap-3 px-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <PlayIcon size={44} />
          {item.title && (
            <p className="font-body text-body-md text-on-surface text-center leading-snug">
              {item.title}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && isPlayable && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-10 right-0 text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label="Close"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {isYoutube ? (
                  <div className="relative w-full rounded-md overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <video
                    src={item.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full rounded-md bg-black"
                    style={{ maxHeight: '80dvh' }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
