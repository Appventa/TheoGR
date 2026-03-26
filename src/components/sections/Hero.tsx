import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TYPING_SPEED  = 80;
const HOLD_DURATION = 5000;
const FADE_DURATION = 1000;
const WAIT_DURATION = 2000;

type Phase = 'waiting' | 'typing' | 'holding' | 'fading';

export function Hero() {
  const { t } = useLanguage();
  const fullText = t.hero.typewriter;

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase]     = useState<Phase>('waiting');
  const [visible, setVisible] = useState(false);
  const indexRef  = useRef(0);
  const prevText  = useRef(fullText);

  // Scroll-scrub refs
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const rafRef       = useRef<number>(0);

  // Reset typewriter when language changes
  useEffect(() => {
    if (prevText.current !== fullText) {
      prevText.current = fullText;
      setDisplayedText('');
      setVisible(false);
      indexRef.current = 0;
      setPhase('waiting');
    }
  }, [fullText]);

  // Typewriter phase machine
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

  // Scroll-driven video scrub
  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure video never plays on its own
    video.pause();

    const scrub = () => {
      const { top, height } = container.getBoundingClientRect();
      const scrolled   = -top;
      const scrollable = height - window.innerHeight;
      const progress   = Math.max(0, Math.min(1, scrolled / scrollable));

      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /* Tall container — 300vh gives 200vh of scroll travel for the video */
    <div ref={containerRef} style={{ height: '300vh' }}>

      {/* Sticky viewport — stays pinned while user scrolls through the container */}
      <div className="sticky top-0 h-dvh min-h-[600px] overflow-hidden">

        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="/herovid.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* Typewriter overlay */}
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

        {/* Bottom fade into gallery */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
