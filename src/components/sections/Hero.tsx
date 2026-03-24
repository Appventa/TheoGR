import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const FULL_TEXT =
  '25 years crafting video, design, and brand strategy. From concept to execution, I deliver solutions that make your brand stand out.';

const TYPING_SPEED  = 80;   // ms per character — slow, deliberate
const HOLD_DURATION = 5000; // ms to show full text before fading
const FADE_DURATION = 1000; // ms for opacity fade out
const WAIT_DURATION = 2000; // ms blank pause before restarting

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

      {/* Typewriter text — vertically centred, left-anchored */}
      <div className="absolute inset-0 flex items-center px-8 md:px-20">
        <AnimatePresence>
          {visible && (
            <motion.p
              key="typewriter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
              className="text-left text-white max-w-3xl leading-snug"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.25rem', fontWeight: 300 }}
            >
              {displayedText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom fade into Gallery section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
