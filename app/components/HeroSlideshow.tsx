"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";

/* Fallback if a Wikimedia image fails to load (e.g. blocked on user's network). */
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=1200&auto=format&fit=crop";

const SLIDES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Minor_Basilica_of_Saint_Martin_of_Tours_%28Taal_Basilica%29_-_Taal%2C_Batangas%2C_Philippines.jpg/1280px-Minor_Basilica_of_Saint_Martin_of_Tours_%28Taal_Basilica%29_-_Taal%2C_Batangas%2C_Philippines.jpg",
    alt: "Minor Basilica of Saint Martin de Tours in Taal, Batangas",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ancestral_House_in_Taal%2C_Batangas.jpg/1280px-Ancestral_House_in_Taal%2C_Batangas.jpg",
    alt: "Ancestral house in Taal, Batangas",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Taal_Volcano_aerial_2013.jpg/1280px-Taal_Volcano_aerial_2013.jpg",
    alt: "Taal Volcano rising from Taal Lake",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Minor_Basilica_of_Saint_Martin_of_Tours_or_Taal_Basilica_85M7772.jpg/1280px-Minor_Basilica_of_Saint_Martin_of_Tours_or_Taal_Basilica_85M7772.jpg",
    alt: "Minor Basilica of Saint Martin de Tours, Taal, Batangas",
  },
];

const STRIP_COUNT = 6;
const AUTOPLAY_MS = 5000;
const OUT_S = 0.5;
const IN_S = 0.8;
const OUT_STAGGER = 0.04;
const IN_STAGGER = 0.06;
const DIRECTIONS = ["start", "center", "end"] as const;

export function HeroSlideshow() {
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  /* Latest-callback ref so the timeline onComplete can dispatch a queued
     dot click without self-referencing goToSlide (avoids react-hooks/immutability). */
  const goToSlideRef = useRef<((next: number) => void) | null>(null);
  const dirRef = useRef(0);
  const [index, setIndex] = useState(0);

  const getStrips = useCallback(
    () => stripRefs.current.filter((el): el is HTMLDivElement => el !== null),
    [],
  );

  const applyImage = useCallback(
    (slideIndex: number) => {
      const src = SLIDES[slideIndex].src;
      getStrips().forEach((strip) => {
        const img = strip.querySelector("img");
        if (img) img.src = src;
      });
    },
    [getStrips],
  );

  const handleImgError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
    },
    [],
  );

  const preload = useCallback((slideIndex: number) => {
    const img = new Image();
    img.src = SLIDES[slideIndex].src;
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      const target = ((next % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (animatingRef.current || target === indexRef.current) return;

      animatingRef.current = true;
      indexRef.current = target;
      setIndex(target);

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

      const dir = DIRECTIONS[dirRef.current % DIRECTIONS.length];
      dirRef.current += 1;

      timelineRef.current?.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
          if (pendingRef.current !== null) {
            const queued = pendingRef.current;
            pendingRef.current = null;
            goToSlideRef.current?.(queued);
          }
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

      preload((target + 1) % SLIDES.length);
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

  /* keep the latest goToSlide reachable from the timeline's onComplete */
  useLayoutEffect(() => {
    goToSlideRef.current = goToSlide;
  }, [goToSlide]);

  useLayoutEffect(() => {
    const strips = getStrips();
    applyImage(0);
    preload(1);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      // CSS owns the hidden state (scaleY: 0); JS only reveals
      gsap.to(strips, {
        scaleY: 1,
        duration: IN_S,
        stagger: { each: IN_STAGGER, from: "start" },
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    // reduced-motion: the CSS media query already shows scaleY(1)

    startTimer();
    return () => {
      stopTimer();
      timelineRef.current?.kill();
      gsap.killTweensOf(strips);
    };
  }, [applyImage, getStrips, preload, startTimer, stopTimer]);

  return (
    <div
      className="hero-slideshow"
      aria-roledescription="carousel"
      aria-label="Scenes of Taal, Batangas"
    >
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <div
          key={i}
          className="hero-strip"
          style={
            {
              "--strip-i": i,
              "--hero-strips": STRIP_COUNT,
            } as CSSProperties
          }
          ref={(el) => {
            stripRefs.current[i] = el;
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SLIDES[0].src}
            alt=""
            onError={handleImgError}
            style={{
              width: `${STRIP_COUNT * 100}%`,
              left: `${-i * 100}%`,
            }}
          />
        </div>
      ))}

      {/* If JS is disabled/blocked, reveal the first slide via CSS
          instead of leaving the hero blank (noscript is inert when JS runs) */}
      <noscript>
        <style>{`.hero-strip { transform: scaleY(1); }`}</style>
      </noscript>

      <span className="hero-geo-corner hero-geo-corner--tl" aria-hidden />
      <span className="hero-geo-corner hero-geo-corner--tr" aria-hidden />
      <span className="hero-geo-corner hero-geo-corner--bl" aria-hidden />
      <span className="hero-geo-corner hero-geo-corner--br" aria-hidden />

      <div
        className="hero-dots"
        aria-label="Taal photos"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to photo ${i + 1}: ${slide.alt}`}
            aria-current={i === index ? "true" : undefined}
            className={`hero-dot${i === index ? " is-active" : ""}`}
            onClick={() => {
              stopTimer();
              if (animatingRef.current) {
                if (i !== indexRef.current) pendingRef.current = i;
              } else {
                goToSlide(i);
              }
              startTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
}
