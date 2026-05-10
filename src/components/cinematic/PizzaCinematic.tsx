import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './PizzaCinematic.css';

const LERP_FACTOR  = 0.07;
const FRAME_COUNT  = 97;
const FRAMES_BASE  = '/pizza-frames/';
const TRANS_SRC    = '/pizza-video/main.mp4';

function frameUrl(i: number) {
  return `${FRAMES_BASE}frame_${String(i).padStart(4, '0')}.png`;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lateFade(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function finalHoldProgress(p: number): number {
  return clamp(p / 0.94, 0, 1);
}

interface Props {
  children: ReactNode;
  onProgress?: (p: number) => void;
}

export default function PizzaCinematic({ children, onProgress }: Props) {
  const sectionRef   = useRef<HTMLElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const transRef     = useRef<HTMLVideoElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const mainUiRef    = useRef<HTMLDivElement>(null);
  const endFadeRef   = useRef<HTMLDivElement>(null);

  const targetProgressRef    = useRef(0);
  const displayedProgressRef = useRef(0);
  const rafIdRef             = useRef(0);
  const prevFrameRef         = useRef(0);
  const preloadedRef         = useRef<Set<number>>(new Set());
  const framesErrorRef       = useRef(false);

  const onProgressRef = useRef(onProgress);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);

  const [framesError, setFramesError] = useState(false);

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const readProgress = useCallback(() => {
    const sect = sectionRef.current;
    if (!sect) return;
    const scrollContainer = sect.parentElement;
    if (!scrollContainer) return;
    // getBoundingClientRect is relative to the viewport; since the page div
    // is the scroll container (overflow-y: auto; position: fixed), the rect
    // top changes as the user scrolls inside that container.
    const rect = sect.getBoundingClientRect();
    const scrollRange = rect.height - window.innerHeight;
    if (scrollRange <= 0) return;
    targetProgressRef.current = clamp(-rect.top / scrollRange, 0, 1);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const scrollContainer = sectionRef.current?.parentElement;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', readProgress, { passive: true });

    // Preload first frame immediately
    const p1 = new Image(); p1.src = frameUrl(1); preloadedRef.current.add(1);

    // Background preload remaining frames
    let bgIdx = 2;
    let idleCbId = 0;
    function preloadNext(deadline: IdleDeadline) {
      while (deadline.timeRemaining() > 0 && bgIdx <= FRAME_COUNT) {
        if (!preloadedRef.current.has(bgIdx)) {
          const pn = new Image();
          pn.src = frameUrl(bgIdx);
          preloadedRef.current.add(bgIdx);
        }
        bgIdx++;
      }
      if (bgIdx <= FRAME_COUNT) idleCbId = requestIdleCallback(preloadNext);
    }
    if (typeof requestIdleCallback !== 'undefined') {
      idleCbId = requestIdleCallback(preloadNext);
    }

    function loop() {
      const tp  = targetProgressRef.current;
      const dp  = displayedProgressRef.current;
      const diff = tp - dp;
      const newDp = Math.abs(diff) < 0.0001 ? tp : dp + diff * LERP_FACTOR;
      displayedProgressRef.current = clamp(newDp, 0, 1);
      const p = displayedProgressRef.current;

      const img   = imgRef.current;
      const trans = transRef.current;

      if (!framesErrorRef.current && img) {
        img.style.opacity = '1';

        const transProgress = easeInOut(finalHoldProgress(p));
        const fi = Math.max(1, Math.min(FRAME_COUNT, Math.round(transProgress * (FRAME_COUNT - 1)) + 1));
        if (fi !== prevFrameRef.current) {
          img.src = frameUrl(fi);
          prevFrameRef.current = fi;
          // Look-ahead preload
          for (let j = Math.max(1, fi - 4); j <= Math.min(FRAME_COUNT, fi + 8); j++) {
            if (!preloadedRef.current.has(j)) {
              const pn2 = new Image(); pn2.src = frameUrl(j); preloadedRef.current.add(j);
            }
          }
        }
      } else if (framesErrorRef.current && trans) {
        trans.style.opacity = '1';
        if (trans.duration > 0) {
          const targetTime = easeInOut(p) * trans.duration;
          if (Math.abs(targetTime - trans.currentTime) > 0.02) {
            trans.currentTime = targetTime;
          }
        }
      }

      // Hero content: fade out as scroll starts p 0.0→0.12
      if (mainUiRef.current) {
        mainUiRef.current.style.opacity = String(clamp(1 - (p / 0.12), 0, 1));
        mainUiRef.current.style.pointerEvents = p > 0.08 ? 'none' : '';
      }

      // CTA panel: fade in p 0.70→0.88
      if (ctaRef.current) {
        const ctaOpacity = clamp((p - 0.70) / 0.18, 0, 1);
        ctaRef.current.style.opacity = String(ctaOpacity);
        ctaRef.current.style.pointerEvents = ctaOpacity > 0.3 ? 'auto' : 'none';
      }

      if (endFadeRef.current) {
        const fadeProgress = tp > 0.94 ? Math.max(p, tp) : p;
        endFadeRef.current.style.opacity = String(lateFade((fadeProgress - 0.78) / 0.22));
      }

      onProgressRef.current?.(p);
      rafIdRef.current = requestAnimationFrame(loop);
    }

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (idleCbId && typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleCbId);
      scrollContainer.removeEventListener('scroll', readProgress);
    };
  }, [reducedMotion, readProgress]);

  return (
    <section ref={sectionRef} className="pc-section" aria-label="Pizza Burgh hero">
      <div className="pc-sticky">

        {/* Warm dark gradient background — always visible */}
        <div className="pc-bg" aria-hidden="true" />

        {/* Frame sequence — primary cinematic layer */}
        <img
          ref={imgRef}
          className="pc-frame"
          src={frameUrl(1)}
          alt=""
          aria-hidden="true"
          style={{ opacity: 1, display: framesError ? 'none' : undefined }}
          onError={() => {
            framesErrorRef.current = true;
            setFramesError(true);
          }}
        />

        {/* Video fallback if frames fail */}
        {framesError && (
          <video
            ref={transRef}
            className="pc-frame"
            src={TRANS_SRC}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            style={{ opacity: 1 }}
            aria-hidden="true"
          />
        )}

        {/* Warm cinematic veil — bottom gradient for readability */}
        <div className="pc-veil" aria-hidden="true" />
        <div ref={endFadeRef} className="pc-end-fade" aria-hidden="true" />

        {/* Hero UI — fades out as user scrolls */}
        <div ref={mainUiRef} className="pc-main-ui">
          {children}
        </div>

        {/* CTA arrival panel — fades in near end of scroll */}
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
