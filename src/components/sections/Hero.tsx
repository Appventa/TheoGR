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

  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase]       = useState<Phase>('waiting');
  const [visible, setVisible]   = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const indexRef     = useRef(0);
  const prevText     = useRef(fullText);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const rafRef       = useRef(0);

  // Reset typewriter on language change
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

    // iOS Safari ignores preload="auto" — calling play() on a muted+playsInline
    // video is the only reliable way to kick off buffering. We pause immediately.
    const kickBuffer = () => {
      const p = video.play();
      if (p) p.then(() => { video.pause(); video.currentTime = 0; }).catch(() => {});
    };

    // loadedmetadata fires on iOS (canplaythrough often doesn't) — use it as
    // the readiness gate so the spinner clears and scrubbing can start.
    const onReady = () => setVideoReady(true);
    if (video.readyState >= 1) {   // HAVE_METADATA — duration already known
      setVideoReady(true);
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true });
    }
    // Also accept canplaythrough for fully-buffered desktop case
    video.addEventListener('canplaythrough', onReady, { once: true });

    kickBuffer();

    const scrub = () => {
      if (!video.duration) return;
      const { top, height } = container.getBoundingClientRect();
      const scrolled   = -top;
      const scrollable = height - window.innerHeight;
      const progress   = Math.max(0, Math.min(1, scrolled / scrollable));
      video.currentTime = progress * video.duration;
    };

    // Desktop: scroll event + RAF
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    };

    // Mobile: continuous RAF loop during active touch for fluid scrubbing
    // (iOS batches scroll events; this fires every frame instead)
    let touching  = false;
    let touchLoop = 0;
    const runTouchLoop = () => {
      scrub();
      if (touching) touchLoop = requestAnimationFrame(runTouchLoop);
    };
    const onTouchStart = () => {
      touching = true;
      touchLoop = requestAnimationFrame(runTouchLoop);
    };
    const onTouchEnd = () => {
      touching = false;
      cancelAnimationFrame(touchLoop);
    };

    window.addEventListener('scroll',     onScroll,     { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    window.addEventListener('touchcancel',onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('touchcancel',onTouchEnd);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(touchLoop);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('canplaythrough', onReady);
    };
  }, []);

  return (
    /* 200vh = 100vh scrollable → 2× faster than before */
    <div ref={containerRef} style={{ height: '200vh' }}>

      <div className="sticky top-0 h-dvh min-h-[600px] overflow-hidden">

        <video
          ref={videoRef}
          src="/herovid.mp4"
          muted
          playsInline
          preload="auto"
          x-webkit-airplay="deny"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Spinner shown until video is buffered */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        )}

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
