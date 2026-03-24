import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FULL_TEXT =
  '25 years crafting video, design, and brand strategy. From concept to execution, I deliver solutions that make your brand stand out.';

const TYPING_SPEED  = 38;   // ms per character
const HOLD_DURATION = 4500; // ms to show full text before fading
const FADE_DURATION = 800;  // ms for opacity fade out
const WAIT_DURATION = 2200; // ms blank pause before restarting

type Phase = 'waiting' | 'typing' | 'holding' | 'fading';

export function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase]   = useState<Phase>('waiting');
  const [visible, setVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let ticker: ReturnType<typeof setInterval>;

    switch (phase) {
      case 'waiting':
        timer = setTimeout(() => {
          indexRef.current = 0;
          setDisplayedText('');
          setVisible(true);
          setPhase('typing');
        }, WAIT_DURATION);
        break;

      case 'typing':
        ticker = setInterval(() => {
          indexRef.current += 1;
          setDisplayedText(FULL_TEXT.slice(0, indexRef.current));
          if (indexRef.current >= FULL_TEXT.length) {
            clearInterval(ticker);
            setPhase('holding');
          }
        }, TYPING_SPEED);
        break;

      case 'holding':
        timer = setTimeout(() => setPhase('fading'), HOLD_DURATION);
        break;

      case 'fading':
        setVisible(false);
        // wait for fade-out to finish, then reset
        timer = setTimeout(() => {
          setDisplayedText('');
          setPhase('waiting');
        }, FADE_DURATION + 300);
        break;
    }

    return () => { clearTimeout(timer); clearInterval(ticker); };
  }, [phase]);

  const showCursor = phase === 'typing';

  return (
    <section className="relative h-dvh min-h-[600px] overflow-hidden">
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

      {/* Subtle dark vignette — just enough to read text */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

      {/* Typewriter text — centred lower-third */}
      <div className="absolute inset-0 flex items-end justify-center pb-28 px-6">
        <AnimatePresence>
          {visible && (
            <motion.p
              key="typewriter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
              className="font-display text-display-sm text-on-surface text-center max-w-2xl leading-snug"
            >
              {displayedText}
              {showCursor && (
                <span className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle animate-pulse" />
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom fade into Gallery section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
