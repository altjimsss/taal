"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "./transitions/usePageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  const { isTransitioning } = usePageTransition();

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.querySelector(".value-section")) return;

    const reveal = (selector: string, vars: gsap.TweenVars) => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;
      gsap.from(els, {
        ...vars,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: els[0],
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    };

    reveal(".headline", { y: 36, opacity: 0, duration: 1.4 });
    reveal(".value-section .value-left", { y: 40, opacity: 0, duration: 1.4, delay: 0.25 });
    reveal(".value-section .value-right", { y: 40, opacity: 0, duration: 1.4, delay: 0.45 });
    reveal(".pick-header > *", { y: 30, opacity: 0, duration: 1.2, stagger: 0.2, delay: 0.3 });
    reveal(".filter-bar", { y: 30, opacity: 0, duration: 1.2, delay: 0.35 });
    reveal(".dest-card", { y: 40, opacity: 0, duration: 1.1, stagger: 0.12, delay: 0.3 });

    reveal(".feature-section .feature-card", { y: 40, opacity: 0, duration: 1.2 });
    reveal(".steps", { y: 40, opacity: 0, duration: 1.2 });
    reveal(".testimonial", { y: 40, opacity: 0, duration: 1.2 });
    reveal(".cta-section", { y: 40, opacity: 0, duration: 1.2 });
    reveal(".footer", { y: 30, opacity: 0, duration: 1 });

    // Re-measure triggers once layout is final: after images load and a grace
    // period, so late-loading hero/destination imagery doesn't throw off the
    // "top 85%" scroll-start points (which otherwise fire instantly => no
    // visible animation).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 900);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.clearTimeout(t);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // When landing on Home through the cross transition, the page mounts behind
  // the shutter; re-measure ScrollTrigger once the reveal completes so anything
  // already in viewport animates properly.
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  return null;
}