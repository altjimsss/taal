"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type RevealRule = {
  selector: string;
  y: number;
  opacity: number;
  duration: number;
  stagger?: number;
};

const HOME_RULES: RevealRule[] = [
  { selector: ".headline h2", y: 22, opacity: 0, duration: 1 },
  { selector: ".headline .trust-badges", y: 12, opacity: 0, duration: 0.85 },
  { selector: ".value-section .value-left", y: 26, opacity: 0, duration: 1 },
  { selector: ".value-section .value-right", y: 26, opacity: 0, duration: 1 },
  { selector: ".pick-header > *", y: 18, opacity: 0, duration: 0.85, stagger: 0.1 },
  { selector: ".filter-bar", y: 14, opacity: 0, duration: 0.75 },
  { selector: ".dest-card", y: 26, opacity: 0, duration: 0.85, stagger: 0.07 },
  { selector: ".feature-section .feature-card", y: 28, opacity: 0, duration: 1 },
  { selector: ".steps .step", y: 24, opacity: 0, duration: 0.9, stagger: 0.1 },
  { selector: ".cta-section > *", y: 20, opacity: 0, duration: 0.9, stagger: 0.1 },
  { selector: "footer > *", y: 14, opacity: 0, duration: 0.85 },
];

export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      // Generic reveal: any element with [data-reveal]. Grouped elements
      // (same data-reveal-group) share one trigger and stagger together.
      const grouped = new Map<string, HTMLElement[]>();
      const singles: HTMLElement[] = [];

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const g = el.dataset.revealGroup;
        if (g) {
          if (!grouped.has(g)) grouped.set(g, []);
          grouped.get(g)!.push(el);
        } else {
          singles.push(el);
        }
      });

      singles.forEach((el) => {
        gsap.from(el, {
          y: parseFloat(el.dataset.revealY || "24"),
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: el.dataset.revealStart || "top 88%",
            once: true,
          },
        });
      });

      grouped.forEach((els) => {
        gsap.from(els, {
          y: 24,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: els[0],
            start: "top 88%",
            once: true,
          },
        });
      });

      HOME_RULES.forEach(({ selector, y, opacity, duration, stagger }) => {
        const els = document.querySelectorAll<HTMLElement>(selector);
        if (!els.length) return;
        gsap.from(els, {
          y,
          opacity,
          duration,
          ease: "power3.out",
          stagger,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: els[0],
            start: "top 85%",
            once: true,
          },
        });
      });

      // Recompute trigger positions once the layout has settled (route paint,
      // transition opening) and after images finish loading.
      const refresh = () => ScrollTrigger.refresh();
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>("main img"),
      );
      const handlers: { img: HTMLImageElement; fn: () => void }[] = [];
      images.forEach((img) => {
        if (img.complete) return;
        const fn = () => refresh();
        img.addEventListener("load", fn, { once: true });
        handlers.push({ img, fn });
      });

      const settle = window.setTimeout(refresh, 350);

      return () => {
        window.clearTimeout(settle);
        handlers.forEach(({ img, fn }) => img.removeEventListener("load", fn));
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  return null;
}
