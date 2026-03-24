import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TYPING_SPEED  = 80;   // ms per character
const HOLD_DURATION = 5000; // ms to show full text before fading
const FADE_DURATION = 1000; // ms for opacity fade out
const WAIT_DURATION = 2000; // ms blank pause before restarting

type Phase = 'waiting' | 'typing' | 'holding' | 'fading';

export function Hero() {
  const { t } = useLanguage();
  const fullText = t.hero.typewriter;

  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase]     = useState<Phase>('waiting');
  const [visible, setVisible] = useState(false);
  const indexRef  = useRef(0);
  // Reset when language changes so the new text types from the start
  const prevText  = useRef(fullText);

  useEffect(() => {
    if (prevText.current !== fullText) {
      prevText.current = fullText;
      setDisplayedText('');
      setVisible(false);
      indexRef.current = 0;
      setPhase('waiting');
    }
  }, [fullText]);

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
          setDisplayedText(fullText.slice(0, indexRef.current));
          if (indexRef.current >= fullText.length) {
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
        timer = setTimeout(() => {
          setDisplayedText('');
          setPhase('waiting');
        }, FADE_DURATION + 300);
        break;
    }

    return () => { clearTimeout(timer); clearInterval(ticker); };
  }, [phase, fullText]);

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

      {/* Subtle dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

      {/* Typewriter text — centred on screen, left-aligned within its block */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence>
          {visible && (
            <motion.p
              key="typewriter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
              className="text-left text-white w-full max-w-3xl leading-snug"
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
