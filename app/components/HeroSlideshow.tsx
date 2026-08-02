"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";

/* Unsplash CDN (the same one already used elsewhere on this page) instead of
   Wikimedia's thumbnail proxy, which throttles/403s requests from
   datacenter/cloud IP ranges. Every slide also keeps its OWN fallback so one
   failed image can never collapse all six strips to an identical backup. */
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    fallback:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1600&auto=format&fit=crop",
    alt: "Minor Basilica of Saint Martin de Tours in Taal, Batangas",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    fallback:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    alt: "Ancestral houses in Taal, Batangas",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    fallback:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    alt: "Taal Volcano rising from Taal Lake",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    fallback:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    alt: "Heritage streets and valley light in Taal, Batangas",
  },
];

/* Strip layout mirrors the 72-px architectural grid:
   [72px] [inner×4 equal] [72px]
   — outer strips align with the corner-square boxes,
   — inner strips align with the 4 hero-search field separators. */
const CORNER = 72; // px, matches .corner-square-bottom-left / .explore-square
const STRIP_COUNT = 6; // 1 left + 4 inner + 1 right
const AUTOPLAY_MS = 3800;
const OUT_S = 0.5;
const IN_S = 0.8;
const OUT_STAGGER = 0.04;
const IN_STAGGER = 0.06;
const DIRECTIONS = ["start", "center", "end"] as const;

export function HeroSlideshow() {
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideshowRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const dirRef = useRef(0);

  const getStrips = useCallback(
    () => stripRefs.current.filter((el): el is HTMLDivElement => el !== null),
    [],
  );

  const applyImage = useCallback(
    (slideIndex: number) => {
      const slide = SLIDES[slideIndex];
      getStrips().forEach((strip) => {
        const img = strip.querySelector("img");
        if (img) {
          img.dataset.fallback = slide.fallback;
          img.src = slide.src;
        }
      });
    },
    [getStrips],
  );

  /* If the primary fails (blocked/firewall), fall through to that slide's own
     backup image — a failed slide never collapses the whole hero. */
  const handleImgError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const fallback = img.dataset.fallback;
      if (fallback && img.src !== fallback) img.src = fallback;
    },
    [],
  );

  const preload = useCallback((slideIndex: number) => {
    /* Preload both the primary and the slide's own fallback so an onError
       swap never flashes in late from the network. */
    const slide = SLIDES[slideIndex];
    [slide.src, slide.fallback].forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      const target = ((next % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (animatingRef.current || target === indexRef.current) return;

      animatingRef.current = true;
      indexRef.current = target;
      preload((target + 1) % SLIDES.length);

      const strips = getStrips();
      if (strips.length === 0) {
        animatingRef.current = false;
        return;
      }

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        applyImage(target);
        gsap.set(strips, { scaleY: 1 });
        animatingRef.current = false;
        return;
      }

      try {
        const dir = DIRECTIONS[dirRef.current % DIRECTIONS.length];
        dirRef.current += 1;

        timelineRef.current?.kill();
        const tl = gsap.timeline({
          onComplete: () => {
            animatingRef.current = false;
          },
        });
        tl.to(strips, {
          scaleY: 0,
          duration: OUT_S,
          stagger: { each: OUT_STAGGER, from: dir },
          ease: "power3.in",
          overwrite: "auto",
        });
        tl.call(() => applyImage(target));
        tl.to(strips, {
          scaleY: 1,
          duration: IN_S,
          stagger: { each: IN_STAGGER, from: dir },
          ease: "power3.out",
          overwrite: "auto",
        });
        timelineRef.current = tl;
      } catch {
        /* GSAP failed for any reason — degrade gracefully: swap the image and
           force every strip fully open so the hero is never stuck mid-wipe. */
        console.warn(
          "[HeroSlideshow] GSAP transition failed; fell back to an instant swap.",
        );
        applyImage(target);
        strips.forEach((strip) => {
          strip.style.transform = "scaleY(1)";
        });
        animatingRef.current = false;
      }
    },
    [applyImage, getStrips, preload],
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(
      () => goToSlide(indexRef.current + 1),
      AUTOPLAY_MS,
    );
  }, [goToSlide, stopTimer]);

  /* Mount: GSAP strip reveal on first paint. useLayoutEffect runs before the
     browser paints, so setting scaleY:0 here never flashes the full image.
     Reduced-motion users skip the animation and stay fully open. */
  useLayoutEffect(() => {
    const strips = getStrips();
    applyImage(0);
    preload(1);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduced) {
      gsap.fromTo(
        strips,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          stagger: IN_STAGGER,
          ease: "power3.inOut",
        },
      );
    }

    startTimer();
    return () => {
      stopTimer();
      timelineRef.current?.kill();
      gsap.killTweensOf(strips);
    };
  }, [applyImage, getStrips, preload, startTimer, stopTimer]);

  /* Measure the slideshow's actual pixel width and expose it as --hero-w.
     This must use clientWidth (not 100vw) so it matches the hero-bottom-bar
     which is also sized by the container, not the viewport (excludes scrollbar
     width on Windows). The CSS var is used for image left offsets so strip
     seams align pixel-perfectly with the hero-search separator lines. */
  useLayoutEffect(() => {
    const el = slideshowRef.current;
    if (!el) return;
    const sync = () =>
      el.style.setProperty("--hero-w", `${el.clientWidth}px`);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div
      className="hero-slideshow"
      ref={slideshowRef}
      aria-roledescription="carousel"
      aria-label="Scenes of Taal, Batangas"
    >
      {Array.from({ length: STRIP_COUNT }).map((_, i) => {
        // Strip layout mirrors the 72-px architectural grid:
        //   [72px] [ equal×4 inner ] [72px]
        //
        // IMAGE OFFSET KEY:
        //   `left` on <img> is relative to the STRIP's width (its containing block),
        //   NOT the full slideshow. We use `vw` units so the offset is always
        //   viewport-relative and correctly cancels the strip's viewport position,
        //   producing a seamless single-photo appearance across all 6 strips.
        //
        // SEAM:
        //   Each strip (except the last) is 0.5px wider than its slot so
        //   sub-pixel rounding never leaves a gap between adjacent strips.

        const SEAM = "0.5px";
        const INNER = STRIP_COUNT - 2; // 4 inner strips

        let stripLeft: string;
        let stripWidth: string;
        let imgLeft: string;

        if (i === 0) {
          // ── Left corner strip ──────────────────────────────────────────
          // Strip left uses 100% (= slideshow width = hero width).
          // Image left = 0 (starts at left edge, no offset needed).
          stripLeft = "0px";
          stripWidth = `calc(${CORNER}px + ${SEAM})`;
          imgLeft = "0px";
        } else if (i === STRIP_COUNT - 1) {
          // ── Right corner strip ─────────────────────────────────────────
          // Strip left = 100% - 72px (slideshow-relative, correct).
          // Image left = -(hero width - 72px), using --hero-w (px) so it
          // references the same coordinate system as the strip's 100%.
          stripLeft = `calc(100% - ${CORNER}px)`;
          stripWidth = `${CORNER}px`;
          imgLeft = `calc(-1 * var(--hero-w, 100vw) + ${CORNER}px)`;
        } else {
          // ── Inner strip n (i = 1…4) ────────────────────────────────────
          // Strip left expressed with 100% (slideshow-relative).
          // Image left uses var(--hero-w) so it matches the strip's coordinate.
          const n = i - 1;
          stripLeft = `calc(${CORNER}px + ${n} * (100% - ${2 * CORNER}px) / ${INNER})`;
          stripWidth = `calc((100% - ${2 * CORNER}px) / ${INNER} + ${SEAM})`;
          imgLeft = `calc(-${CORNER}px - ${n} * (var(--hero-w, 100vw) - ${2 * CORNER}px) / ${INNER})`;
        }

        return (
          <div
            key={i}
            className="hero-strip"
            style={{ left: stripLeft, width: stripWidth } as CSSProperties}
            ref={(el) => {
              stripRefs.current[i] = el;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SLIDES[0].src}
              data-fallback={SLIDES[0].fallback}
              alt=""
              onError={handleImgError}
              style={{
                width: "var(--hero-w, 100vw)",
                maxWidth: "none",
                left: imgLeft,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

