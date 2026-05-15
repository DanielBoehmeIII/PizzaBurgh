import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './PizzaCinematic.css';

const TRANS_SRC = '/pizza-video/main.mp4';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function lateFade(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

interface Props {
  children: ReactNode;
  onProgress?: (p: number) => void;
}

export default function PizzaCinematic({ children, onProgress }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const mainUiRef  = useRef<HTMLDivElement>(null);
  const endFadeRef = useRef<HTMLDivElement>(null);

  const progressRef      = useRef(0);
  const rafIdRef         = useRef(0);
  const prevVideoTimeRef = useRef(-1);

  const onProgressRef = useRef(onProgress);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion) return;

    function loop() {
      const video = videoRef.current;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        if (scrollRange > 0) {
          progressRef.current = clamp(-rect.top / scrollRange, 0, 1);
        }
      }

      const p = progressRef.current;

      const transProgress = easeInOutCubic(clamp((p - 0.12) / 0.76, 0, 1));

      if (video && video.readyState >= 2 && video.duration > 0) {
        const targetTime = transProgress * video.duration;
        if (Math.abs(targetTime - prevVideoTimeRef.current) > 0.005) {
          video.currentTime = targetTime;
          prevVideoTimeRef.current = targetTime;
        }
      }

      if (mainUiRef.current) {
        mainUiRef.current.style.opacity = String(clamp(1 - (p / 0.12), 0, 1));
        mainUiRef.current.style.pointerEvents = p > 0.08 ? 'none' : '';
      }

      if (ctaRef.current) {
        const ctaOpacity = clamp((p - 0.70) / 0.18, 0, 1);
        ctaRef.current.style.opacity = String(ctaOpacity);
        ctaRef.current.style.pointerEvents = ctaOpacity > 0.3 ? 'auto' : 'none';
      }

      if (endFadeRef.current) {
        endFadeRef.current.style.opacity = String(lateFade((p - 0.78) / 0.22));
      }

      onProgressRef.current?.(p);
      rafIdRef.current = requestAnimationFrame(loop);
    }

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="pc-section" aria-label="Pizza Burgh hero">
      <div className="pc-sticky">

        <div className="pc-bg" aria-hidden="true" />

        <video
          ref={videoRef}
          className="pc-frame"
          src={TRANS_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />

        <div className="pc-veil" aria-hidden="true" />
        <div ref={endFadeRef} className="pc-end-fade" aria-hidden="true" />

        <div ref={mainUiRef} className="pc-main-ui">
          {children}
        </div>

        <div
          ref={ctaRef}
          className="pc-cta-panel"
          style={{ opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        />

      </div>
    </section>
  );
}
