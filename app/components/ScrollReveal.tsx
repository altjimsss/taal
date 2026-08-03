"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "./transitions/usePageTransition";

gsap.registerPlugin(ScrollTrigger);

type SectionSpec = {
  trigger: string;
  build: (tl: gsap.core.Timeline) => void;
};

const SECTIONS: SectionSpec[] = [
  {
    trigger: ".headline",
    build(tl) {
      tl.from(
        ".headline h2",
        { y: 22, opacity: 0, duration: 1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".headline .trust-badges",
        { y: 12, opacity: 0, duration: 0.85, ease: "power3.out" },
        "-=0.6",
      );
    },
  },
  {
    trigger: ".value-section",
    build(tl) {
      tl.from(
        ".value-section .value-left",
        { y: 26, opacity: 0, duration: 1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".value-section .value-right",
        { y: 26, opacity: 0, duration: 1, ease: "power3.out" },
        0,
      );
    },
  },
  {
    trigger: ".pick-section",
    build(tl) {
      tl.from(
        ".pick-section .pick-header > *",
        { y: 18, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".pick-section .filter-bar",
        { y: 14, opacity: 0, duration: 0.75, ease: "power3.out" },
        "-=0.5",
      );
      tl.from(
        ".pick-section .dest-card",
        { y: 26, opacity: 0, duration: 0.85, stagger: 0.07, ease: "power3.out" },
        "-=0.5",
      );
    },
  },
  {
    trigger: ".feature-section",
    build(tl) {
      tl.from(
        ".feature-section .pick-header > *",
        { y: 18, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".feature-section .feature-card",
        { y: 28, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.55",
      );
    },
  },
  {
    trigger: ".steps-section",
    build(tl) {
      tl.from(
        ".steps-section .pick-header > *",
        { y: 18, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".steps-section .step",
        { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        "-=0.55",
      );
    },
  },
  {
    trigger: ".testi-section",
    build(tl) {
      tl.from(
        ".testi-section .pick-header > *",
        { y: 18, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0,
      );
      tl.from(
        ".testi-section .testimonial",
        { y: 26, opacity: 0, duration: 0.95, ease: "power3.out" },
        "-=0.55",
      );
    },
  },
  {
    trigger: ".cta-section",
    build(tl) {
      tl.from(
        ".cta-section > *",
        { y: 20, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        0,
      );
    },
  },
  {
    trigger: "footer",
    build(tl) {
      tl.from(
        "footer > *",
        { y: 14, opacity: 0, duration: 0.85, ease: "power2.out" },
        0,
      );
    },
  },
];

export default function ScrollReveal() {
  const { isTransitioning } = usePageTransition();

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.querySelector(".value-section")) return;

    SECTIONS.forEach(({ trigger, build }) => {
      const el = document.querySelector<HTMLElement>(trigger);
      if (!el) return;

      const tl = gsap.timeline({
        defaults: { clearProps: "all" },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      build(tl);
    });

    // Re-measure triggers once layout is final: after images load and a grace
    // period, so late-loading imagery doesn't throw off the "top 80%" scroll
    // start points (which otherwise fire instantly => no visible animation).
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