import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './PizzaCinematic.css';

const FRAME_COUNT = 97;
const FRAMES_BASE = '/pizza-frames/';
const TRANS_SRC   = '/pizza-video/main.mp4';
function frameUrl(i: number) {
  return `${FRAMES_BASE}frame_${String(i).padStart(4, '0')}.png`;
}

function nearestDecoded(desired: number, decoded: Set<number>): number {
  if (decoded.has(desired)) return desired;
  for (let d = 1; d <= 15; d++) {
    if (desired - d >= 1 && decoded.has(desired - d)) return desired - d;
    if (desired + d <= FRAME_COUNT && decoded.has(desired + d)) return desired + d;
  }
  return desired;
}

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
  const imgRef     = useRef<HTMLImageElement>(null);
  const transRef   = useRef<HTMLVideoElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const mainUiRef  = useRef<HTMLDivElement>(null);
  const endFadeRef = useRef<HTMLDivElement>(null);

  const progressRef     = useRef(0);
  const prevProgressRef = useRef(0);
  const rafIdRef        = useRef(0);
  const prevFrameRef    = useRef(0);
  const preloadedRef    = useRef<Set<number>>(new Set());
  const decodedRef      = useRef<Set<number>>(new Set());
  const framesErrorRef  = useRef(false);

  const onProgressRef = useRef(onProgress);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);

  const [framesError, setFramesError] = useState(false);

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion) return;

    // Preload first frame immediately
    const p1 = new Image();
    p1.src = frameUrl(1);
    preloadedRef.current.add(1);
    p1.decode().then(() => decodedRef.current.add(1)).catch(() => {});

    // Background preload remaining frames
    let bgIdx = 2;
    let idleCbId = 0;
    function preloadNext(deadline: IdleDeadline) {
      while (deadline.timeRemaining() > 0 && bgIdx <= FRAME_COUNT) {
        if (!preloadedRef.current.has(bgIdx)) {
          const pn = new Image();
          pn.src = frameUrl(bgIdx);
          preloadedRef.current.add(bgIdx);
          pn.decode().then(() => decodedRef.current.add(bgIdx)).catch(() => {});
        }
        bgIdx++;
      }
      if (bgIdx <= FRAME_COUNT) idleCbId = requestIdleCallback(preloadNext);
    }
    if (typeof requestIdleCallback !== 'undefined') {
      idleCbId = requestIdleCallback(preloadNext);
    }

    function loop() {
      const img   = imgRef.current;
      const trans = transRef.current;

      // Read progress directly from DOM every frame — no lerp, no lag
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        if (scrollRange > 0) {
          progressRef.current = clamp(-rect.top / scrollRange, 0, 1);
        }
      }

      const p = progressRef.current;

      // Scroll velocity for adaptive preload
      const vel = Math.abs(p - prevProgressRef.current);
      prevProgressRef.current = p;

      // Phase mapping: scrub frames across the scroll range,
      // holding the first frame at p=0 and last frame at p=1.
      const transProgress = easeInOutCubic(clamp((p - 0.12) / 0.76, 0, 1));

      if (!framesErrorRef.current && img) {
        const frameIn  = clamp((p - 0.08) / 0.08, 0, 1);
        const frameOut = clamp(1 - (p - 0.88) / 0.12, 0, 1);
        img.style.opacity = String(Math.min(frameIn, frameOut));

        const fi = Math.round(transProgress * (FRAME_COUNT - 1)) + 1;
        const clampedFi = Math.max(1, Math.min(FRAME_COUNT, fi));

        if (clampedFi !== prevFrameRef.current) {
          // Show nearest decoded frame to avoid blank/green flash
          const showFi = nearestDecoded(clampedFi, decodedRef.current);
          img.src = frameUrl(showFi);
          prevFrameRef.current = clampedFi;

          // Adaptive preload: widen window at high scroll velocity
          const radius = Math.max(10, Math.min(40, Math.round(vel * FRAME_COUNT * 5)));
          for (let j = Math.max(1, clampedFi - radius); j <= Math.min(FRAME_COUNT, clampedFi + radius); j++) {
            if (!preloadedRef.current.has(j)) {
              const pn2 = new Image();
              pn2.src = frameUrl(j);
              preloadedRef.current.add(j);
              pn2.decode().then(() => decodedRef.current.add(j)).catch(() => {});
            }
          }
        }
      } else if (framesErrorRef.current && trans) {
        trans.style.opacity = '1';
        if (trans.duration > 0) {
          const targetTime = transProgress * trans.duration;
          if (Math.abs(targetTime - trans.currentTime) > 0.01) {
            trans.currentTime = targetTime;
          }
        }
      }

      // Hero content: fade out p 0.0→0.12
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

      // End fade blends into dark post-cinematic section
      if (endFadeRef.current) {
        endFadeRef.current.style.opacity = String(lateFade((p - 0.78) / 0.22));
      }

      onProgressRef.current?.(p);
      rafIdRef.current = requestAnimationFrame(loop);
    }

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (idleCbId && typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleCbId);
    };
  }, [reducedMotion]);

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
          decoding="async"
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
