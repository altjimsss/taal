"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}