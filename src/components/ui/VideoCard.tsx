import { motion } from 'framer-motion';
import { PlayIcon } from './PlayIcon';
import type { VideoItem } from '../../types';

interface VideoCardProps {
  item: VideoItem;
}

export function VideoCard({ item }: VideoCardProps) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[320px] h-[200px] rounded-md overflow-hidden bg-surface-highest cursor-pointer"
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <img
        src={item.thumbnail}
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
        <p className="font-body text-body-md text-on-surface text-center leading-snug">
          {item.title}
        </p>
        {item.duration && (
          <span className="font-body text-label-sm text-primary">{item.duration}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
